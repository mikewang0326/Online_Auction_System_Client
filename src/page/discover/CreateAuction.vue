<template>
  <div>
    <div class="container">
      <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Create an auction</h3>
          </div>
          <div class="panel-body">
            <form @submit.prevent="createAuction">
              <!-- title -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Title</label>
                <input v-model="auction_info.title" type="text" class="form-control" id="title"
                       placeholder="title" autofocus required>
              </div>
              <!-- categoryId -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Category Id</label>
                <input v-model="auction_info.categoryId" type="text" class="form-control" id="categoryId"
                       placeholder="categoryId" autofocus required>
              </div>
              <!-- description -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Description</label>
                <input v-model="auction_info.description" type="text" class="form-control" id="description"
                       placeholder="description" autofocus required>
              </div>
              <!-- startDateTime -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Start date time</label>
                <input v-model="auction_info.startDateTime" type="date" class="form-control"
                       id="startDateTime" placeholder="start date time" required>
              </div>
              <!-- endDateTime -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">End date time</label>
                <input v-model="auction_info.endDateTime" type="date" class="form-control"
                       id="endDateTime" placeholder="end date time" required>
              </div>
              <!-- reservePrice -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">ReservePrice</label>
                <input v-model="auction_info.reservePrice" type="number" class="form-control"
                       id="reservePrice" step="0.01" placeholder="reserve price" required>
              </div>
              <!-- startingBid -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Starting bid</label>
                <input v-model="auction_info.startingBid" type="number" class="form-control"
                       id="startingBid" step="0.01" placeholder="starting bid" required>
              </div>

              <div v-if="status_message.content" class="text-center text-danger">{{ status_message.content }}</div>
              <div class="checkbox" >
                <button class="btn btn-primary pull-right">Register</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '../../axios';
  const timeHelper = require('../../utils/TimeHelper');
  const userHelper = require('../../utils/UserHelper')
  const responseHelper = require('../../data/discover/CreateAuctionResponseHelper');

  export default {
    name: 'CreateAuctionComponent',
    data() {
      return {
        status_message:{
          content: ''
        },

        auction_info: {
          title: "Underwater bat suit",
          categoryId: 1,
          description: "A Bat suit to use underwater. Keeps you dry. Sometimes.",
          startDateTime: "2018-05-17",
          endDateTime: "2018-06-17",
          reservePrice: 1000,
          startingBid: 100,
          auctionId: ""
        }
      }
    },
    mounted: function () {

    },
    methods: {
      createAuction: function () {
        console.log(this.auction_info);

        if(this.preValidateCheck() == false) {
          return;
        }

        this.status_message.content = "Now creating, please wait".toString();
        let axiosConfig = {
          headers: {
            'Content-Type':'application/json',
            'X-Authorization': userHelper.getUserInfo().token
          }
        };
        axios.post('/auctions/', {
          'title': this.auction_info.title,
          'categoryId': this.auction_info.categoryId,
          'description': this.auction_info.description,
          'startDateTime': timeHelper.convertFormattedTimeToMillseconds(this.auction_info.startDateTime),
          'endDateTime': timeHelper.convertFormattedTimeToMillseconds(this.auction_info.endDateTime),
          'reservePrice': this.auction_info.reservePrice,
          'startingBid': this.auction_info.startingBid,
        }, axiosConfig)
          .then((response) => {
            console.log(response);
            if (responseHelper.isValid(response)) {
              // this.$router.go(-1);
              // this.$router.replace('/user');
              this.$router.replace({ name: 'auction_detail', params: { auction_id: responseHelper.getAuctionId(response) }})
            } else {
              this.status_message.content = responseHelper.getErrorInfo(response);
            }
          })
          .catch((error) => {
            this.status_message.content = error.toString();
          });
      },

      /**
       * basic check
       *
       * 1, date
       * 2, reserve price > 0 && starting bid > 0
       * 3, starting bid < reserve price
       *
       */
      preValidateCheck:function () {
        let ret = true;
        // this.status_message.content = "pre Validate check failed!".toString();
        return ret;
      },

    }
  }
</script>

<style scoped>
</style>
