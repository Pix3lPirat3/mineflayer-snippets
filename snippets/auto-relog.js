const mineflayer = require('mineflayer');

var options = {
      host: 'localhost',
      username: 'email@example.com',
      password: '12345678'
}

var bot = mineflayer.createBot(options);

function startMinecraft(bot) {
    bot.on('kicked', function(reason) {
        bot = mineflayer.createBot(options);
        setTimeout(function() {
            startMinecraft(bot);
        }, 6000);
    });
    bot.on('error', console.log)
}

startMinecraft(bot);
