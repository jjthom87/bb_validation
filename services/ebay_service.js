const ebayApi = require("./../ebay_api/ebay_api.js");
const beanieLogic = require("./beanie_logic.js");
const validationService = require("./validation_service.js");

exports.searchBeanieBabiesAuctions = async function(){
  return new Promise(async function(resolve,reject){
    await ebayApi.getItemsFromSearch({bidCount: true}, function(result){
      resolve(result);
    });
  });
}

exports.searchByBeanie = async function(beanie){
  return new Promise(async function(resolve,reject){
    const dbRecords = validationService.getValues(beanie);
    await ebayApi.getItemsFromSearch({beanie: beanie}, function(ebayResult){
      resolve(result);
    });
  });
}
