var request = require('request');
var auth = require("./ebay_auth.js");

var user = {token: null}

const getItemsFromSearch = async function(obj, cb){
  console.log("making request to ebay")

  let url;
  if(obj.bidCount){
    url = "https://api.ebay.com/buy/browse/v1/item_summary/search?q=beanie+baby&limit=200&filter=buyingOptions:{AUCTION}&filter=bidCount:[1..75]";
  } else {
    const beanie = obj.beanie.split(" ").join("+") + "+beanie+baby";
    url = "https://api.ebay.com/buy/browse/v1/item_summary/search?q="+beanie+"&limit=150";
  }

  if(!user.token){
    user.token = await auth.getToken();
  }
  var headers = {"Authorization": "Bearer " + user.token}

  const options = {
    url: url,
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
        getItemsFromSearch(searchQuery,cb);
      } else {
        cb(response)
      }
  	}
  })
}

module.exports = {getItemsFromSearch: getItemsFromSearch}
