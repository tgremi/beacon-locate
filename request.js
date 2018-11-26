const request = require("request");

const postDataInServer = async (data, callbackFunc) => {
    console.log("\n\n [postDataInServer] \n\n ")
  var options = {
    method: "POST",
    url: "http://localhost:4000/dataFromBeacon",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.parse(JSON.stringify(data)),
    json: true
  };

  console.log(typeof callbackFunc, "<---- typeof");
  request(options, function(error, response, body) {
    
    if (typeof callbackFunc == "function") {
      if (error) {
        callbackFunc(error, undefined);
      } else {
        callbackFunc(undefined, response);
      }
    }
    console.log(body);
  });
};

module.exports = {
  postDataInServer
};
