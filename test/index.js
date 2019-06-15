'use strict'
//const Telegraf = require('telegraf');
//const app = new Telegraf("886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg");
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/(.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('text', (msg) => {
  const groupId = -377348263;
  const activeChatID = msg.chat.id;
  const sender = msg.from.id;
  //hardcoded group id -377348263
  // send a message to the chat acknowledging receipt of their message
  
  bot.getUpdates().then(function(data){
    console.log(data);
  });
  bot.sendMessage(msg.chat.id, `User with ID [${sender}] has just sent me a message`);
});