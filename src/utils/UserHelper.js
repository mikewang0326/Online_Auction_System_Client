const validator = require('validator');

exports.saveLoginStatus = function (userId, token) {
  localStorage.userId = userId;
  localStorage.token = token;
}


exports.clearLoginStatus = function () {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
}

exports.isLogin = function () {
  let ret = false;
  var userId = localStorage.userId;
  var token = localStorage.token;

  if (undefined != userId && validator.isNumeric(userId.toString())
    && undefined != token && !validator.isEmpty(token.toString())) {
    ret = true;
  }

  return ret;
}

exports.getUserInfo = function () {
 let user = {
   name: 'test',
   id: localStorage.userId,
   token: localStorage.token
 }

  return user;
}




