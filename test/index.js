const Telegraf = require('telegraf');
const app = new Telegraf("886750169:AAF40utD9rfqf5hB6OhbOaH7s6enYaXJwMg");

app.hears('hi', ctx => {
 return ctx.reply('What is up?');
});

app.startPolling();
