var databaseConnection = require("./../db/connection.js");

exports.getValues = function(beanie){
  databaseConnection.query("SELECT * FROM `2022`", function(err, records){
    if(err){
      throw new Error(err)
    }

    const matchingRecords = records.filter((rec) => {
      const beanieBabyName = rec['Beanie Baby Name'];
      return beanieBabyName.toLowerCase() == beanie.toLowerCase();
    });

    databaseConnection.end();

    return matchingRecords;
  });
}
