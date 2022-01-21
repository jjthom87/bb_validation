const ebayApi = require("./../ebay_api/ebay_api.js");
const beanieLogic = require("./beanie_logic.js");
const validationService = require("./validation_service.js");

exports.searchBeanieBabiesAuctions = async function(){
  return new Promise(async function(resolve,reject){
    await ebayApi.getItemsFromSearch({bidCount: true}, function(result){
      const sortedResult = result.sort(function (a, b) {
        return b.currentBidPrice.value - a.currentBidPrice.value;
      });
      resolve(sortedResult);
    });
  });
}

exports.searchByBeanie = async function(beanie){
  return new Promise(async function(resolve,reject){
    const highestValue = await validationService.getValues(beanie, null, null);
    await ebayApi.getItemsFromSearch({beanie: beanie}, function(ebayResult){
      const validValues = [];
      console.log(highestValue)
      ebayResult.forEach((e) => {
        if(parseFloat(e.price.value) < highestValue && e.title.toLowerCase().includes(beanie.toLowerCase())){
          validValues.push(e)
        }
      })
      resolve(validValues);
    });
  });
}
