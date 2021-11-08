const ebayApi = require("./ebay_api.js");
const beanieLogic = require("./beanie_logic.js");

exports.validateSearchItems = async function(searchQuery){
  return new Promise(async function(resolve,reject){
    await ebayApi.getItemsFromSearch(searchQuery, function(result){
      resolve(beanieLogic.splitRecords(result));
    });
  });
}
