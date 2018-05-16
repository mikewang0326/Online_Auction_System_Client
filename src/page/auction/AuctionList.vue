<template>
  <div id="auction_list">
    <h1>{{ this.pageTitle }}</h1>
    <div id="auctions">
      <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
      <ol v-for="auction in auctions">
        <li>
          <div>
            <td>{{ auction.title }}</td>
            <td><router-link :to="{ name :'auction_detail', params:{ auction_id: auction.id }}"> Go to Auction Page </router-link></td>
          </div>
        </li>
      </ol>
    </div>

  </div>
</template>

<script>
  const validator = require('validator');
  const responseHelper = require('../../data/discover/SearchResponseHelper');
  const userHelper = require('../../utils/UserHelper');
  export default {
    data () {
      return {
        status_message:{
          content: ''
        },

        default_category:{categoryId:-1, categoryTitle:"all", categoryDescription:''},

        categories:[
          {categoryId:1, categoryTitle:"", categoryDescription:''},
        ],
        auctions:[
          {
            id:1,
            categoryTitle:'apparel',
            categoryId:1,
            title:"Super cape",
            reservePrice:10,
            startDateTime:1518606000000,
            endDateTime:1520938800000,
            currentBid:0.01
          },
        ],
      }
    },

    mounted: function () {
      this.search();
    },

    computed: {
      pageTitle:function(){
        let ret = "Auction List Page";
        let status= this.$route.params['status'];
        if(status == 'all') {
          ret =  "All Auctions";
        } else if (status == 'active') {
          ret =  "Active Auctions";
        } else if (status == 'expired') {
          ret =  "Expired Auctions";
        } else if (status == 'won') {
          ret =  "Won Auctions";
        } else if (status == 'upcoming') {
          ret =  "Upcoming Auctions";
        }

        console.log('pageTitle :' + ret);
        return ret;
      },
    },

    methods: {
      search: function () {
        console.log(this.getSearchParameters());
        this.status_message.content = "Now is searching, please wait...".toString();
        this.$http.get("http://localhost:4941/api/v1/auctions", this.getSearchParameters())
          .then((response) => {
            console.log(response)
            this.status_message.content = "".toString()
            if (responseHelper.isValid(response)) {
              this.auctions = response['data'];
            } else {
              this.status_message.content = responseHelper.getErrorInfo(response)
            }
          }, function (error) {
            this.status_message.content = error;
          })
      },

      getSearchParameters: function() {
        let params = this.$route.params;
        return {params}

      },

    }

  }
</script>
