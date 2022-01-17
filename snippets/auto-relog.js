const mineflayer = require('mineflayer');

var config = {
  host: 'localhost', // minecraft server ip
  username: 'email@example.com', // minecraft username
  password: '12345678' // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
}

var bot;

/**
 * Allow the user to auto-relog after being kicked from the server.
 * All events must be registered in this function 
 * References Used:
 * https://github.com/PrismarineJS/mineflayer/issues/164
 * https://github.com/PrismarineJS/mineflayer/issues/623
 */
function startMinecraft() {
    bot = mineflayer.createBot(config)
    bot.on('login', function() {
        console.info("[Client] Successfully logged into account");
    });
      
    bot.on('kicked', function(reason) {
        console.log("Kicked: ", reason);
    });
    
    bot.on('end', function(reason) {
        console.log("End: ", reason);
        setTimeout(function() {
            startMinecraft();
        }, 6000)
    });
    
    bot.on('error', console.log)
    
}

startMinecraft();
