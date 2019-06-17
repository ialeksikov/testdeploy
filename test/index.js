'use strict'
// const Telegraf = require('telegraf');
// const app = new Telegraf("886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg");

// app.hears('hi', ctx => {
//  return ctx.reply('What is up?');
// });

// app.startPolling();

//let dictionaryStorage = [];

var request = require('request');
var admin = require("firebase-admin");
var functions = require("firebase-functions");
var express = require("express");
const app = express();
app.get('/timestamp', (request, response)=>
    {
        response.send('${Date.now()}');
    }
);

var serviceAccount = require("../myfirst-23ce4-firebase-adminsdk-htwji-6267dfbb17.json");

exports.startConnection = functions.https.onRequest(app);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myfirst-23ce4.firebaseio.com"
});

const db = admin.firestore();

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('End work\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const TelegramBot = require('node-telegram-bot-api');

const token = '899749548:AAGIIElymhEWxF6ZPkYfILZZ9o2BU1Rtn-Y';


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, 
    {
        webHook: {
            port: 80,
        },
    }
    );
    //${token}
    //use URL + TOKEN for secure connection
    const webHookUrl = `https://testdeploy.igoraleksikov99.now.sh`; //?${token}

    const setWebHook = () => {
        const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook`;
      
        request.post({
          url: setWebhookUrl,
          method: 'post',
          body: {
            url: webHookUrl
          },
          json: true
        },
        (error, response, body) => {
          console.log(body);
        })
      };
      
      //Call me to set a webhook
      setWebHook();
      setInterval(function(){
        bot.getWebHookInfo().then((data) =>{
            console.log(data);
        });

      }, 5000);
//Bot messaging logic
bot.on('message', (msg) => {
  //const groupId = -377348263;
  //const adminId = 604941595;
  console.log(msg);
//   bot.sendMessage(adminId, `${msg.from.id}`);
  if(msg.chat.type == "group" || msg.chat.type == "supergroup"){
        if(msg.reply_to_message && (msg.text == "+" || msg.text == "-") && msg.from.id != msg.reply_to_message.from.id){
            //dictionaryStorage[updateMsg.reply_to_message.from.id][updateMsg.chat.id].value ++;
            //console.dir(dictionaryStorage);
            //console.log(1);
            updateUserScore(msg);
              
        }
    }else if(msg.chat.type == "private"){
        if(msg.text == "/score")
        sendUserScore(msg);
        else sendHelpMessage(msg);
        
    }
  
  
  
});


//Function prototypes
function getUserScore(msg){
    return Math.round(Math.random()*20);
}
function sendUserScore(msg){
    let score = getUserScore(msg);
    bot.sendMessage(msg.from.id, `${msg.from.first_name}, your score is ${score}`);
}
function updateUserScore(msg){
    // db.collection("usersReply").add({
    //     chat: msg.chat.id,
    //     user: msg.from.id,
    //     value: msg.text
    // }).then(()=>{
    //     bot.sendMessage(adminId, `User with ID [${msg.from.id}] has just replied to user with ID[${msg.reply_to_message.from.id}] with the following message: ${msg.text}`);
    // });
    bot.sendMessage(msg.reply_to_message.from.id, `Your score was ${msg.text == "+" ? "increased" : "descreased"}`);
}

function sendHelpMessage(msg){
    bot.sendMessage(msg.from.id, `Hi there! Please send me "/score" command to get your score`);
}