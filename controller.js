const validationService = require("./validation_service.js");

module.exports = (app) => {
  app.get("/beanie-search", async function(req, res){
      const result = await validationService.validateSearchItems(req.query.searchQuery);
      res.json(result);
  });
}
