var request = require('request');
var auth = require("./ebay_auth.js");

var user = {token: null}

var sellersWhoPostReplicas = ["beaniebabesnc"]

exports.callEbay = async function(searchQuery, cb){
  console.log("making request to ebay")
  var cool = "https://api.ebay.com/buy/browse/v1/item_summary/search?&q=" + searchQuery;

  if(!user.token){
    user.token = await auth.getToken();
  }
  var headers = {"Authorization": "Bearer " + user.token}

  const options = {
    url: cool,
    headers: headers
  };

  request(options, async function(error, response, body) {
  	if (!error && response.statusCode === 200) {
      const body = JSON.parse(response.body);
      cb(body.itemSummaries);
  	} else {
      if(response.statusCode === 401){
        console.log("unauthorized. regenerating token.")
        user.token = await auth.getToken();
        callEbay(searchQuery,cb);
      } else {
        cb(response)
      }
  	}
  })
}

exports.splitRecords = function(items){
  const noAdditionalPictures = items.filter(item => !item.additionalImages);
  const additionalPictures = items.filter(item => item.additionalImages);
  return {valid: additionalPictures, invalid: noAdditionalPictures}
}

// const callEbay = function(searchQuery){
//   return new Promise(async function(resolve, reject){
//     console.log("making request to ebay")
//     var cool = "https://api.ebay.com/buy/browse/v1/item_summary/search?&q=" + searchQuery;
//
//     if(!user.token){
//       user.token = await getToken();
//     }
//     var headers = {"Authorization": "Bearer " + user.token}
//
//     const options = {
//       url: cool,
//       headers: headers
//     };
//
//     request(options, async function(error, response, body) {
//     	if (!error && response.statusCode === 200) {
//         const body = JSON.parse(response.body);
//         console.log(body.itemSummaries.length)
//         resolve(body.itemSummaries);
//     	} else {
//         if(response.statusCode === 401){
//           console.log("unauthorized. regenerating token.")
//           user.token = await getToken();
//           callEbay(searchQuery);
//         } else {
//           reject(response)
//         }
//     	}
//     })
//   });
// }
//
// app.get("/beanie-search", async function(req, res){
//   const result = await callEbay(req.query.searchQuery)
//   res.json(result);
// })
