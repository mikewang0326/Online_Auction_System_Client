exports.isRegisterSucceed = function (response) {
  // status: 201, statusText: "Created"
  let ret = false;
  if (undefined != response && null != response) {
     if (response['status'] == 201) {
       ret = true;
     }
  }
  return ret;
}

exports.getErrorInfo = function (response) {
  // status: 201, statusText: "Created"
  let ret = "Register error";
  if (undefined != response && null != response) {
      ret = response['error'];
  }
  return ret;
}


