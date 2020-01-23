var express = require('express');
var router = express.Router();
const {ManagedIdentityCredential} = require('@azure/identity');
const {SecretClient} = require('@azure/keyvault-secrets');

// ManagedIdentityCredential created by "identity assign" command
const credential = new ManagedIdentityCredential();
const vaultName = "TwitterSecretsVault";
const url = `https://${vaultName}.vault.azure.net`;
  
const client = new SecretClient(url, credential);

// Replace value with your secret name here
const consumerkey = "consumerkey";
const consumersecret = "consumersecret";
const accesstokenkey = "accesstokenkey";
const accesstokensecret = "accesstokensecret";

router.get('/', function(req, res, next) {
  var Twitter = require('twitter');
  console.log("Starting up")

  async function main(){
    // Get the secret we created
  const consumerkeyname = await client.getSecret(secretName);
  const consumersecretname = await client.getSecret(secretName);
  const accesstokenkeyname = await client.getSecret(secretName);
  const accesstokensecretname = await client.getSecret(secretName);
  
  console.log(`Your consumerkey value is: ${consumerkeyname.value}`);
  console.log(`Your consumersecret value is: ${consumersecretname.value}`);
  console.log(`Your accesstokenkey value is: ${accesstokenkeyname.value}`);
  console.log(`Your accesstokensecret value is: ${accesstokensecretname.value}`);
  }
  
  main().catch((err) => {
    response.write(`error code: ${err.code}`);
    response.write(`error message: ${err.message}`);
    response.write(`error stack: ${err.stack}`);
    response.end();
  });
   
  var client = new Twitter({
    consumer_key: `${consumerkeyname.value}`,
    consumer_secret: `${consumersecretname.value}`,
    access_token_key: `${accesstokenkeyname.value}`,
    access_token_secret: `${accesstokensecretname.value}`

  });
   
  var params = {screen_name: 'similola', count: '1'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var i;
        var tweets;
        //console.log(response.body);
        console.log('********');
        const json=JSON.parse(response.body);
        console.log("**JSON response raw***");
        console.log(json);
        console.log("**Output***");
        console.log("Latest Tweet by @"+json[0].user.screen_name+": "+json[0].text);

       res.send("Latest Tweet by @"+json[0].user.screen_name+": "+json[0].text);
    }
  });
 
   
});



module.exports = router;
