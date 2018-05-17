exports.isValid = function (response) {
  // ok: true, status: 200
  let ret = isSucceed(response) && isResultNotEmpty(response);
  return ret;
}

function isSucceed(response) {
  // ok: true, status: 200
  let ret = false;
  console.log('isSucceed response = ' + response)
  if (undefined != response && null != response) {
     if (response['status'] == 200) {
       ret = true;
     }
  }
  return ret;
}

function isResultNotEmpty(response) {
  // ok: true, status: 200
  let ret = false;
  if (undefined != response && null != response) {
    let data = response['data'];
    if (undefined != data && null != data && data.length > 0) {
      ret = true;
    }
  }
  return ret;
}


exports.getErrorInfo = function (response) {
  // status: 200, statusText: "Created"
  let ret = "Login error".toString();
  if (!isSucceed(response)) {
      ret = response['error'];
  } else if (!isResultNotEmpty(response)) {
      ret = "No search result".toString()
  }
  console.log('SearchResponseHelper getErrorInfo ret = ' + ret);
  return ret;
}


