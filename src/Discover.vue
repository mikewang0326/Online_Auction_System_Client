<template>
  <div id="discover">
    <h1>Discover Page</h1>
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button">搜索</button>
      </span>
    </div>

    <div id="auctions">
      <table>
        <tr v-for="auction in auctions">
          <td>{{ auction.name }}</td>
          <td><router-link :to="{ name :'auction', params:{ auction_id: auction.auction_id }}"> Go to Auction Page </router-link></td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        users:[],
        selected: 0,
        options:[
          {text:'Category  ', value:0, },
          {text:'Category 1', value:1, },
          {text:'Category 2', value:2, },
          {text:'Category 3', value:3, },
        ],
        auctions:[
          {name:'auction 1', auction_id:1},
          {name:'auction 2', auction_id:2},
          {name:'auction 3', auction_id:3},
        ],
      }
    },

    mounted: function () {
      // this.getUsers()
    },

    methods: {
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
