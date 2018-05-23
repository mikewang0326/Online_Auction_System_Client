<template>
  <div id="auction_list">
    <h1 id="title_bar">{{ this.pageTitle }}</h1>
    <div id="auctions">
      <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
      <ul v-for="auction in auctions">
        <li v-on:click="goToAuctionDetailPage(auction)">
          <div id="auction_item">
            <img v-bind:src="getAuctionPhotoUrl(auction.id)" class="img-thumbnail">
            <h5><strong>{{ auction.title }}</strong></h5>
            <h6>Start     Date : {{ formattedstartDateTime(auction.startDateTime) }} </h6>
            <h6>End       Date : {{ formattedstartDateTime(auction.endDateTime) }} </h6>
            <h6>Reserver Price : ${{ auction.reservePrice}}</h6>
            <h6 v-if="auction.startingBid">Starting Bid : {{ auction.startingBid}}</h6>
            <h6 v-if="auctions.length">Bids number : {{ auctions.length}}</h6>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  const validator = require('validator');
  const responseHelper = require('../../data/discover/SearchResponseHelper');
  const userHelper = require('../../utils/UserHelper');
  const timeHelper = require('../../utils/TimeHelper');
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
          // {
          //   id:1,
          //   categoryTitle:'apparel',
          //   categoryId:1,
          //   title:"Super cape",
          //   reservePrice:10,
          //   startDateTime:1518606000000,
          //   endDateTime:1520938800000,
          //   currentBid:0.01
          // },
        ],
      }
    },

    mounted: function () {
      this.handleSearch();
    },

    beforeRouteEnter: function (to, from, next) {
      if (undefined == to.params.status) {
        for (var key in to.meta.params) {
          to.params[key] = to.meta.params[key];
        }
      }

      next();
    },

    beforeRouteLeave: function (to, from, next) {
      if (to.fullPath == '/auction_detail') {
        for (var key in from.params) {
          from.meta.params[key] = from.params[key];
        }
      } else if (to.fullPath == '/selling' || to.fullPath == '/buying') {
        from.meta.params = {};
      }

      next();
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
      handleSearch:function() {
           if (this.$route.params['status'] == 'won') {
             this.searchWon()
           } else {
             this.search()
           }
      },

      formattedstartDateTime:function(millseconds){
        return timeHelper.convertMillsecondsToFormattedTimeYMDHMS(millseconds);
      },

      getAuctionPhotoUrl:function(id){
        return "http://localhost:4941/api/v1/auctions/"+ id + "/photos";
      },
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
              console.log("xxxxx");
              this.status_message.content = responseHelper.getErrorInfo(response)
            }
          }, function (error) {
            this.status_message.content = "Search error, please try again !".toString();
          })
      },

      searchWon: function () {
        console.log(this.getSearchParameters());
        this.status_message.content = "Now is searching, please wait...".toString();
        let axiosConfig = {
          headers: {
            'Content-Type':'application/json',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };
        this.$http.get("http://localhost:4941/api/v1/my_won_auctions", axiosConfig)
          .then((response) => {
            console.log(response)
            this.status_message.content = "".toString()
            if (responseHelper.isValid(response)) {
              this.auctions = response['data'];
            } else {
              console.log("xxxxx");
              this.status_message.content = responseHelper.getErrorInfo(response)
            }
          }, function (error) {
            this.status_message.content = "Search error, please try again !".toString();
          })
      },

      getSearchParameters: function() {
        let params = this.$route.params;
        return {params}

      },

      goToAuctionDetailPage: function (item) {
        this.$router.push({ name: 'auction_detail', params: { auction_id: item.id }})
      }

    }

  }
</script>
