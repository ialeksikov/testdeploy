'use strict'
// const Telegraf = require('telegraf');
// const app = new Telegraf("886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg");

// app.hears('hi', ctx => {
//  return ctx.reply('What is up?');
// });

// app.startPolling();

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);
});
const TelegramBot = require('node-telegram-bot-api');

const token = '899749548:AAGIIElymhEWxF6ZPkYfILZZ9o2BU1Rtn-Y';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', () => {
  //const groupId = -377348263;
  const adminId = 445916330;
  //const activeChatID = msg.chat.id;
  //const sender = msg.from.id;
  //hardcoded group id -377348263
  // send a message to the chat acknowledging receipt of their message
  bot.getUpdates().then(function(data){
    const updateMsg = data[0].message;
    if(updateMsg.chat.id != -1001464129820)return;
    if(updateMsg.reply_to_message){
      if(updateMsg.text == "+" || updateMsg.text == "-")
      bot.sendMessage(adminId, `User with ID [${updateMsg.from.id}] has just replied to user with ID[${updateMsg.reply_to_message.from.id}] with the following message: ${updateMsg.text}`);
    }
  });
  
  
});