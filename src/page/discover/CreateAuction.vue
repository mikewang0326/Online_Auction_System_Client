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
                <div v-if="validate_info.startDateTime.enable" class="text-left text-danger">{{ validate_info.startDateTime.error }}</div>
              </div>
              <!-- endDateTime -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">End date time</label>
                <input v-model="auction_info.endDateTime" type="date" class="form-control"
                       id="endDateTime" placeholder="end date time" required>
                <div v-if="validate_info.endDateTime.enable" class="text-left text-danger">{{ validate_info.endDateTime.error }}</div>

              </div>
              <!-- reservePrice -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">ReservePrice</label>
                <input v-model="auction_info.reservePrice" type="number" class="form-control"
                       id="reservePrice" step="0.01" placeholder="reserve price" required>
                <div v-if="validate_info.reservePrice.enable" class="text-left text-danger">{{ validate_info.reservePrice.error }}</div>

              </div>
              <!-- startingBid -->
              <div class="form-group has-feedback">
                <label class="cols-sm-2 control-label">Starting bid</label>
                <input v-model="auction_info.startingBid" type="number" class="form-control"
                       id="startingBid" step="0.01" placeholder="starting bid" required>
                <div v-if="validate_info.startingBid.enable" class="text-left text-danger">{{ validate_info.startingBid.error }}</div>

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
        validate_info:{
          startDateTime:{
            enable: false,
            error: 'Start date must after today'
          },
          endDateTime:{
            enable:false,
            error: 'End date must after start date'
          },
          reservePrice:{
            enable:false,
            error: 'Reserve price must above 0'
          },
          startingBid:{
            enable:false,
            error: 'Start bid must above 0 and lower reserve price'
          }
        },

        status_message:{
          content: ''
        },

        auction_info: {
          title: "Underwater bat suit",
          categoryId: 1,
          description: "A Bat suit to use underwater. Keeps you dry. Sometimes.",
          startDateTime: "2018-06-17",
          endDateTime: "2018-09-17",
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

        return;

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
        let ret = false;

        if (timeHelper.convertFormattedTimeToMillseconds(this.auction_info.startDateTime) < new Date().getTime()) {
           this.validate_info.startDateTime.enable = true;
        } else {
          this.validate_info.startDateTime.enable = false;
        }

        if (timeHelper.convertFormattedTimeToMillseconds(this.auction_info.endDateTime)
          < timeHelper.convertFormattedTimeToMillseconds(this.auction_info.startDateTime)) {
          this.validate_info.endDateTime.enable = true;
        } else {
          this.validate_info.endDateTime.enable = false;
        }

        if (parseFloat(this.auction_info.reservePrice.toString()) <= 0) {
          this.validate_info.reservePrice.enable = true;
        } else {
          this.validate_info.reservePrice.enable = false;
        }

        if (parseFloat(this.auction_info.startingBid.toString()) <= 0) {
          this.validate_info.startingBid.enable = true;
        } else if (parseFloat(this.auction_info.startingBid.toString()) > parseInt(this.auction_info.reservePrice.toString())) {
          this.validate_info.startingBid.enable = true;
        } else {
          this.validate_info.startingBid.enable = false;
        }

        if (!this.validate_info.startDateTime.enable && !this.validate_info.endDateTime.enable
          && !this.validate_info.reservePrice.enable && !this.validate_info.startingBid.enable) {
          ret = true;
        }

        return ret;
      },

    }
  }
</script>

<style scoped>
</style>
