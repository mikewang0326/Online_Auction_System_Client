// {
//   "categoryId": 1,
//     "categoryTitle": "apparel",
//     "title": "Super cape",
//     "reservePrice": 10,
//     "startDateTime": 1518606000000,
//     "endDateTime": 1520938800000,
//     "description": "One slightly used cape",
//     "creationDateTime": 1518519600000,
//     "seller": {
//     "id": 2,
//       "username": "superman"
//   },
//   "startingBid": 0.01,
//     "currentBid": 10,
//     "bids": [
//     {
//       "amount": 10,
//       "datetime": 1519038060000,
//       "buyerId": 1,
//       "buyerUsername": "black.panther"
//     },
//     {
//       "amount": 10,
//       "datetime": 1519038060000,
//       "buyerId": 1,
//       "buyerUsername": "black.panther"
//     }
//   ]
// }

const timeHelper = require('../../utils/TimeHelper');
const userHelper = require('../../utils/UserHelper');

exports.isValid = function (response) {
  // ok: true, status: 201
  let ret = isSucceed(response) && isResultNotEmpty(response);
  return ret;
}

function isSucceed(response) {
  // ok: true, status: 201
  let ret = false;
  if (undefined != response && null != response) {
     if (response['status'] == 201) {
       ret = true;
     }
  }
  console.log("isSucceed :" + ret);
  return ret;
}

function isResultNotEmpty(response) {
  // ok: true, status: 201
  let ret = false;
  if (undefined != response && null != response) {
    let data = response['data'];
    if (undefined != data && null != data) {
      ret = true;
    }
  }
  console.log("isResultNotEmpty :" + ret);
  return ret;
}


exports.getErrorInfo = function (response) {
  // status: 201, statusText: "Created"
  let ret = "Login error";
  if (!isSucceed(response)) {
      ret = response['error'];
  } else if (!isResultNotEmpty(response)) {
      ret = "No search result"
  }
  return ret;
}

// {
//   "categoryId": 1,
//     "categoryTitle": "apparel",
//     "title": "Super cape",
//     "reservePrice": 10,
//     "startDateTime": 1518606000000,
//     "endDateTime": 1520938800000,
//     "description": "One slightly used cape",
//     "creationDateTime": 1518519600000,
//     "seller": {
//     "id": 2,
//       "username": "superman"
//   },
//   "startingBid": 0.01,
//     "currentBid": 10,
//     "bids": [
//     {
//       "amount": 10,
//       "datetime": 1519038060000,
//       "buyerId": 1,
//       "buyerUsername": "black.panther"
//     },
//     {
//       "amount": 10,
//       "datetime": 1519038060000,
//       "buyerId": 1,
//       "buyerUsername": "black.panther"
//     }
//   ]
// }
exports.formatData = function (response) {
  let data = response['data']
  let auction_info = {
    categoryId: data['categoryId'],
    categoryTitle: data['categoryTitle'],
    title: data['title'],
    reservePrice: data['reservePrice'],
    startDateTime: timeHelper.convertMillsecondsToFormattedTime(data['startDateTime']),
    endDateTime: timeHelper.convertMillsecondsToFormattedTime(data['endDateTime']),
    description: data['description'],
    creationDateTime: timeHelper.convertMillsecondsToFormattedTime(data['creationDateTime']),
    startingBid: data['startingBid'],
    currentBid: data['currentBid'],
    seller: {
      id: data['seller']['id'],
      username: data['seller']['username']
    },
    bids: createAuctionBidsData(data['bids']),
    status:{
      isLoginUserSeller: false, // enable edit button
      isSupportBid: false,     // enable bid button
    },
  }

  // add status info
  auction_info.status = createStatusInfo(auction_info);

  return auction_info;
}

function createAuctionBidsData(result) {
  let data = Array();
  let length = result.length;
  for (let i=0; i< length; i++) {
    let item = {
      'amount':result[i]['amount'],
      'datetime':timeHelper.convertMillsecondsToFormattedTime(result[i]['datetime']),
      'buyerId':result[i]['buyerId'],
      'buyerUsername':result[i]['buyerUsername'],
    }

    data.push(item);
  }

  return data
}

function createStatusInfo(auction_info) {
  let status_info = {
    isLoginUserSeller: isLoginUserSeller(auction_info), // enable edit button
    isSupportBid: isSupportBid(auction_info),     // enable bid button
  };

  return status_info;
}

function isLoginUserSeller(auction_info) {
  let ret = false;
  ret = userHelper.isCurrentUser(auction_info.seller.id)
  return ret;
}

function isSupportBid(auction_info) {
  let ret = true;
  return ret;
}





