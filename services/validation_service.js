var databaseConnection = require("./../db/connection.js");

exports.getValues = async function(beanie, mint, tag){
  return new Promise(async function(resolve,reject){
    databaseConnection.query("SELECT * FROM `2022`", function(err, records){
      if(err){
        throw new Error(err)
      }

      const values = [];

      records.forEach((rec) => {
        const beanieBabyName = rec['Beanie Baby Name'];
        if(beanieBabyName.toLowerCase() == beanie.toLowerCase()){
          if(!mint && !tag){
            let value = rec['Mint'].substring(1, rec['Mint'].length)
            if(value.indexOf("- ") > -1){
              value = value.split("- ")
              value.forEach((v) => {
                values.push(parseInt(v));
              })
            } else {
              value = value.split("-")
              value.forEach((v) => {
                values.push(parseInt(v));
              })
            }
          }
        }
      });

      databaseConnection.end();

      resolve(values.sort()[values.length - 1]);
    });
  });
}
