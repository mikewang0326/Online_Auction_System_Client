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
  let ret = "Upload photo error";
  if (!isSucceed(response)) {
      ret = response['error'];
  }
  return ret;
}






