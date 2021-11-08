var request = require('request');
var auth = require("./ebay_auth.js");

var user = {token: null}

const getItemsFromSearch = async function(searchQuery, cb){
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
        getItemsFromSearch(searchQuery,cb);
      } else {
        cb(response)
      }
  	}
  })
}

module.exports = {getItemsFromSearch: getItemsFromSearch}
