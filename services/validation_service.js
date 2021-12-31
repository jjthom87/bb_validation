const ebayApi = require("./../ebay_api/ebay_api.js");
const beanieLogic = require("./beanie_logic.js");

exports.validateSearchItems = async function(){
  return new Promise(async function(resolve,reject){
    await ebayApi.getItemsFromSearch("[10..50]", function(firstResult){
      ebayApi.getItemsFromSearch("[1..10]", function(secondResult){
        const totalResult = firstResult.concat(secondResult)
        resolve(totalResult);
      });
    });
  });
}
