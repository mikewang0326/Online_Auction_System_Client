exports.isValid = function (response) {
  let ret = isSucceed(response) && isResultNotEmpty(response);
  return ret;
}

function isSucceed(response) {
  let ret = false;
  if (undefined != response && null != response) {
     if (response['status'] == 200) {
       ret = true;
     }
  }
  console.log("isSucceed :" + ret);
  return ret;
}

function isResultNotEmpty(response) {
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
  let ret = "Get user info error.";
  if (!isSucceed(response)) {
      ret = response['error'];
  } else if (!isResultNotEmpty(response)) {
      ret = "No results"
  }
  return ret;
}






