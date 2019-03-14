const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');
const cors = require('cors')
const userController = require('./user.controller')
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

  const config = {
    channelAccessToken: functions.config().line.channel_access_token,
    channelSecret: functions.config().line.channel_secret,
  };

  

  // create LINE SDK client
  const client = new line.Client(config);


// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(cors({ origin: true }));

// register a webhook handler with middleware
// about the middleware, please refer to 
app.get('/', (req,res) =>{
    res.send("Hi")
})
app.post('/', line.middleware(config), (req, res) => {
    console.log('yo test here')
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function handleEvent(event) {
    if(event.type == "follow"){
        console.log('follow event')
        console.log(event)
        

        
        return client.getProfile(event.source.userId).then(profile => {
            console.log('profile')
            console.log(profile)
            const introduction = { type: 'text', text: `Thank you for adding me ${profile.displayName}. I'm Janet and Now i'm creating ur profile ` };
            return client.replyMessage(event.replyToken, introduction);
        } ).then(replyEvent => userController.createUserProfile(event.source.userId, "line") )
        
    }else if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
    return userController.getUserProfile(event.source.userId).then(doc => {
      var replyMessage = { type: 'text', text: event.message.text };
      if (!doc.exists) {
        console.log(doc)
        replyMessage = { type: 'text', text: "Please wait for a while we creating your profile!!" };
      } else {
        console.log('Document data:', doc.data());
      }
      return client.replyMessage(event.replyToken, replyMessage);
    })
    
  
    // create a echoing text message
    
  }

exports.lineback = functions.https.onRequest(app)

// webhook for dialogflow
exports.test = functions.https.onRequest((req, res) => {
  
  
   return cors({ origin: true })(req, res, () => {
    const agent = new WebhookClient({
      request: req,
      response: res
    });
     console.log('run v agent6')
     let intentMap = new Map();
    intentMap.set("Save Stuff", () => {
      var params = req.body.queryResult.parameters;
      if(req.body.originalDetectIntentRequest.source == 'line'){
        var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
        console.log('going to process line stuff:', lineId)
        console.log(params)
        return userController.saveUserStuff(lineId, params.name, params.stuff ).then(result =>{
          console.log('done ')
          console.log(result)
          return agent.add("Done Save")
        })
      }
    } );
    intentMap.set("Get Stuff", () => {
      var params = req.body.queryResult.parameters;
      if(req.body.originalDetectIntentRequest.source == 'line'){
        var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
        return userController.getUserStuff(lineId, params.name).then(snap => {
          if(snap && snap.val())
            return agent.add(snap.val());
          else
            return agent.get(`Cant find ${params.name}.`)
        })
      }
    })
    agent.handleRequest(intentMap);
   } )
})