exports.isValid = function (response) {
  // ok: true, status: 200
  let ret = isSucceed(response) && isResultNotEmpty(response);
  return ret;
}

function isSucceed(response) {
  // ok: true, status: 200
  let ret = false;
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
  // status: 201, statusText: "Created"
  let ret = "Login error";
  if (!isSucceed()) {
      ret = response['error'];
  } else if (!isResultNotEmpty(response)) {
      ret = "No search result"
  }
  return ret;
}

