const beanieLogic = require("./beanie_logic.js");

module.exports = (app) => {
  app.get("/beanie-search", function(req, res){
    beanieLogic.callEbay(req.query.searchQuery, function(result){
      res.json(beanieLogic.splitRecords(result));
    });
  });
}
