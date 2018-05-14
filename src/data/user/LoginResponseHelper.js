exports.isLoginSucceed = function (response) {
  // status: 200, statusText: "OK"
  let ret = false;
  if (undefined != response && null != response) {
     if (response['status'] == 200) {
       ret = true;
     }
  }
  return ret;
}

exports.getErrorInfo = function (response) {
  // status: 201, statusText: "Created"
  let ret = "Login error";
  if (undefined != response && null != response) {
      ret = response['error'];
  }
  return ret;
}


