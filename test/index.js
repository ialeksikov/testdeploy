'use strict'
// const Telegraf = require('telegraf');
// const app = new Telegraf("886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg");

// app.hears('hi', ctx => {
//  return ctx.reply('What is up?');
// });

// app.startPolling();

//let dictionaryStorage = [];


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

const db = admin.firestore;

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

bot.getWebHookInfo().then(data=>{console.log(data)});
setInterval(
    function(){
        bot.setWebHook("https://testdeploy-8a2xqxrvo.now.sh:80/test", {certificate:"‪../IGOR.cer"});
        bot.getWebHookInfo().then(data=>{console.log(data)});
    }
, 2000);
bot.on('message', (msg) => {
  const groupId = -377348263;
  const adminId = 445916330;
  const activeChatID = msg.chat.id;
  const sender = msg.from.id;
  console.log(msg);
  //hardcoded group id -377348263
  // send a message to the chat acknowledging receipt of their message
  if(msg.reply_to_message){
          if(msg.text == "+" || msg.text == "-"){
                if(msg.from.id != msg.reply_to_message.from.id){
                    //dictionaryStorage[updateMsg.reply_to_message.from.id][updateMsg.chat.id].value ++;
                    //console.dir(dictionaryStorage);
                    db.collection("usersReply").add({
                        chat: msg.chat.id,
                        user: msg.from.id,
                        value: msg.text
                    }).then(()=>{
                        bot.sendMessage(adminId, `User with ID [${msg.from.id}] has just replied to user with ID[${msg.reply_to_message.from.id}] with the following message: ${msg.text}`);
                    });
                }
                
            }
    }
//   bot.getUpdates().then(function(data){
//     const updateMsg = data[0].message;
//     if(updateMsg.chat.id != -1001464129820)return;
//     if(updateMsg.reply_to_message){
//       if(updateMsg.text == "+" || updateMsg.text == "-"){
//             if(updateMsg.from.id != updateMsg.reply_to_message.from.id){
//                 //dictionaryStorage[updateMsg.reply_to_message.from.id][updateMsg.chat.id].value ++;
//                 //console.dir(dictionaryStorage);
//                 db.collection("usersReply").add({
//                     chat: updateMsg.chat.id,
//                     user: updateMsg.from.id,
//                     value: updateMsg.text
//                 }).then(()=>{
//                     bot.sendMessage(adminId, `User with ID [${updateMsg.from.id}] has just replied to user with ID[${updateMsg.reply_to_message.from.id}] with the following message: ${updateMsg.text}`);
//                 });
//             }
            
//         }
//     }
//   });
  
  
});
//webhook string
// https://api.telegram.org/bot899749548:AAGIIElymhEWxF6ZPkYfILZZ9o2BU1Rtn-Y/setWebhook?url=https://testdeploy-8a2xqxrvo.now.sh:80/899749548:AAGIIElymhEWxF6ZPkYfILZZ9o2BU1Rtn-Y/
//curl -F 'url=https://testdeploy-8a2xqxrvo.now.sh/test/' -F 'max_connections=5' -F 'allowed_updates=' -F 'certificate=@IGOR.cer' 'https://api.telegram.org/bot899749548:AAGIIElymhEWxF6ZPkYfILZZ9o2BU1Rtn-Y/setWebhook'