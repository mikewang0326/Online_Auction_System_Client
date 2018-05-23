<template>
  <div id="discover">
    <div id="category_bar">
      <span>Auction Category: {{  }}</span>
      <select v-model="category_select">
        <option v-for="category in categories" v-bind:value="category.categoryId">
          {{ category.categoryTitle }}
        </option>
      </select>

      <div id='layout_auction_status_option'>
        <span> Auction   Status   :</span>
        <input type="radio" id="status_all" value="all" v-model="checkedNames" checked="checked">
        <label for="status_all">All</label>
        <input type="radio" id="status_active" value="active" v-model="checkedNames">
        <label for="status_active">Active</label>
        <input type="radio" id="status_expired" value="expired" v-model="checkedNames">
        <label for="status_expired">Expired</label>
        <br>
        <!--<span>Checked names: {{ checkedNames }}</span>-->
      </div>

    </div>

    <div class="input-group">
      <input v-model="search_parameter.q" type="text" class="form-control" placeholder="Search for..."
             v-on:keyup.enter="search">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" v-on:click="search">Search</button>
      </span>
    </div>


    <div id="auctions">
      <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
      <ul v-for="auction in auctions">
        <li v-on:click="goToAuctionDetailPage(auction)">
          <div id="auction_item">
            <img v-bind:src="getAuctionPhotoUrl(auction.id)" class="img-thumbnail">
            <h5><strong>{{ auction.title }}</strong></h5>
            <h6>Category Id : {{ auction.categoryId }} </h6>
            <h6>Category Title : {{ auction.categoryTitle }} </h6>
            <h6>Start     Date : {{ formattedstartDateTime(auction.startDateTime) }} </h6>
            <h6>End       Date : {{ formattedstartDateTime(auction.endDateTime) }} </h6>
            <h6>Reserver Price : ${{ auction.reservePrice}}</h6>
            <h6 v-if="auction.startingBid">Starting Bid : {{ auction.startingBid}} </h6>
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
  const timeHelper = require('../../utils/TimeHelper');
  export default {
    data () {
      return {
        status_message:{
          content: ''
        },
        error:"",
        errorFlag: false,
        users:[],
        search_parameter:{
          q:''
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
        category_select: -1,
        checkedNames: "all", // default value
      }
    },

    watch: {
      checkedNames: function (newCheckNames, oldCheckname) {
        console.log('watch checkedNames newCheckNames"' + newCheckNames + " oldCheckname:" + oldCheckname);
        this.search();
      },
      category_select:function (newCategory, oldCategory) {
        console.log('watch category_select newCategory"' + newCategory + " oldCategory:" + oldCategory);
        this.search();
      }
    },

    mounted: function () {
      this.getCategories();
      this.search();
    },


    methods: {
      formattedstartDateTime:function(millseconds){
        return timeHelper.convertMillsecondsToFormattedTimeYMDHMS(millseconds);
      },

      getAuctionPhotoUrl:function(id){
        return "http://localhost:4941/api/v1/auctions/"+ id + "/photos";
      },

      getCategories: function () {
        this.$http.get("http://localhost:4941/api/v1/categories")
          .then(function (response) {
            console.log("get response")
            console.log(response)
            this.categories = response['data'];
            this.categories.push(this.default_category);
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          })
      },

      search: function () {
        //reset data
        this.auctions = [];

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
             this.status_message.content = "Search error, please try it again".toString();
          })
      },

      getSearchParameters: function() {


        var params = {}

        // 1, category
        var categoryId = this.category_select;
        if(undefined != categoryId && validator.isNumeric(categoryId.toString()) && parseInt(categoryId) > 0) {
          params['category-id'] = categoryId;
        }

        // 2, status
        var status = this.checkedNames;
        if(undefined != status && null != status && !validator.isEmpty(status.toString())) {
          params['status'] = status;
        }

        // 3, query
        var q = this.search_parameter.q;
        if(undefined != q && !validator.isEmpty(q.toString())) {
          params.q = q;
        }

        return {params}

      },

      goToAuctionDetailPage: function (item) {
        this.$router.push({ name: 'auction_detail', params: { auction_id: item.id }})
      }

    }

  }
</script>

<style>
  #discover {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 20px;
  }

  #auctions {
    background-color: khaki;
    margin: 5px 10px 5px 10px;
    padding: 10px 10px 10px 10px;
  }

  #auction_item{
    background-color: white;
    margin: 10px 0px 10px 0px;
    padding: 10px 10px 10px 10px;
  }
  .input-group{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  #category_bar{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  #layout_auction_status_option{
    background-color: khaki;
  }

  .img-thumbnail {
    height: 100px;
    width: 100px;
  }
</style>
