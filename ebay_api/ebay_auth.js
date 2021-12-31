const EbayAuthToken = require('ebay-oauth-nodejs-client');

const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

exports.getToken = async function(){
  console.log("generating new token")
  const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  return token;
}
