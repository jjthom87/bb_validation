const ebayService = require("./ebay_service.js");

module.exports = (app) => {
  app.get("/bid-count-search", async function(req, res){
      const result = await ebayService.searchBeanieBabiesAuctions();
      res.json(result);
  });

  app.get("/search-by-beanie", async function(req, res){
    const result = await ebayService.searchByBeanie(req.query.beanie);
    res.json(result);
  });
}
