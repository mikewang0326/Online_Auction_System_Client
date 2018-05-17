<template>
  <div id="discover">

    <div id="category_bar">
      <span >Select one Category: {{ search_parameter.category_select }}</span>
      <select v-model="search_parameter.category_select">
        <option v-for="category in categories" v-bind:value="category.categoryId">
          {{ category.categoryTitle }}
        </option>
      </select>
    </div>

    <div class="input-group">
      <input v-model="search_parameter.q" type="text" class="form-control" placeholder="Search for...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" v-on:click="search">搜索</button>
      </span>
    </div>


    <div id="auctions">
      <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
      <ul v-for="auction in auctions">
        <li v-on:click="goToAuctionDetailPage(auction)">
          <div id="auction_item">
            <h5><strong>{{ auction.title }}</strong></h5>
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
          category_select: -1,
          q:''
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
      this.getCategories();
      this.search();
    },

    methods: {
      formattedstartDateTime:function(millseconds){
        return timeHelper.convertMillsecondsToFormattedTimeYMDHMS(millseconds);
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

        var q = this.search_parameter.q;
        var categoryId = this.search_parameter.category_select;

        var params = {}
        if(undefined != q && !validator.isEmpty(q.toString())) {
           params.q = q;
        }

        if(undefined != categoryId && validator.isNumeric(categoryId.toString()) && parseInt(categoryId) > 0) {
          params['category-id'] = categoryId;
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

  #handle_auction_layout{
    background-color: khaki;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
  }

  .img-thumbnail {
    height: 100px;
    width: 100px;
  }
</style>
