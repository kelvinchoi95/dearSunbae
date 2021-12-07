const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const paypal = require('@paypal/payouts-sdk');

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);
let requestBody = {
  "sender_batch_header": {
    "recipient_type": "EMAIL",
    "email_message": "SDK payouts test txn",
    "note": "Enjoy your Payout!!",
    "sender_batch_id": "Test_sdk_1",
    "email_subject": "This is a test transaction from SDK"
  },
  "items": [{
    "note": "Your 1$ Payout!",
    "amount": {
      "currency": "USD",
      "value": "1.00"
    },
    "receiver": "payout-sdk-1@paypal.com",
    "sender_item_id": "Test_txn_1"
  }, {
    "note": "Your 1$ Payout!",
    "amount": {
      "currency": "USD",
      "value": "1.00"
    },
    "receiver": "payout-sdk-2@paypal.com",
    "sender_item_id": "Test_txn_2"
  }, {
    "note": "Your 1$ Payout!",
    "amount": {
      "currency": "USD",
      "value": "1.00"
    },
    "receiver": "payout-sdk-3@paypal.com",
    "sender_item_id": "Test_txn_3"
  }, {
    "note": "Your 1$ Payout!",
    "amount": {
      "currency": "USD",
      "value": "1.00"
    },
    "receiver": "payout-sdk-4@paypal.com",
    "sender_item_id": "Test_txn_4"
  }, {
    "note": "Your 1$ Payout!",
    "amount": {
      "currency": "USD",
      "value": "1.00"
    },
    "receiver": "payout-sdk-5@paypal.com",
    "sender_item_id": "Test_txn_5"
  }]
}

// Construct a request object and set desired parameters
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
module.exports = createPayouts  = async function(){
    console.log("IN CREATE PAYOUT FUNCTION");
      let response = await client.execute(request);
      console.log(`Response: ${JSON.stringify(response)}`);
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
}
//createPayouts();

module.exports = router;