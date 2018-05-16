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
  // ok: true, status: 200
  let ret = isSucceed(response) && isResultNotEmpty(response);
  return ret;
}

function isSucceed(response) {
  // ok: true, status: 200
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
  // ok: true, status: 200
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
  if (!isSucceed()) {
      ret = response['error'];
  } else if (!isResultNotEmpty(response)) {
      ret = "No search result"
  }
  return ret;
}
exports.getAuctionId = function (response) {
  return response['data']['id'];
}






