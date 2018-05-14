<template>
  <div id="discover">
    <h1>Discover Page</h1>
    <span>Current Category: {{ search_parameter.category_select }}</span>
    <select v-model="search_parameter.category_select">
      <option v-for="category in categories" v-bind:value="category.categoryId">
        {{ category.categoryTitle }}
      </option>
    </select>
    <div class="input-group">
      <input v-model="search_parameter.q" type="text" class="form-control" placeholder="Search for...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" v-on:click="search">搜索</button>
      </span>
    </div>

    <div id="auctions">
      <ol v-for="auction in auctions">
        <li>
          <div>
            <td>{{ auction.title }}</td>
            <td><router-link :to="{ name :'auction', params:{ auction_id: auction.id }}"> Go to Auction Page </router-link></td>
          </div>
        </li>
      </ol>
    </div>

  </div>
</template>

<script>
  const validator = require('validator');
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        users:[],
        search_parameter:{
          category_select: -1,
          q:''
        },
        default_category:{categoryId:-1, categoryTitle:"None", categoryDescription:''},
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
    },

    methods: {
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
        this.$http.get("http://localhost:4941/api/v1/auctions", this.getSearchParameters())
          .then((response) => {
            console.log("get response")
            console.log(response)
            this.auctions = response['data'];
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
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

      getUsers: function () {
        this.$http.get("http://localhost:4941/api/v1/users")
          .then(function (response) {
            console.log("get response")
            this.users = response.data;
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          })
      },

    }

  }
</script>
