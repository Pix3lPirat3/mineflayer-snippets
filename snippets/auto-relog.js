const mineflayer = require('mineflayer');

var minecraft;

/**
 * Allow the user to auto-relog after being kicked from the server.
 * All events must be registered in this function 
 * References Used:
 * https://github.com/PrismarineJS/mineflayer/issues/164
 * https://github.com/PrismarineJS/mineflayer/issues/623
 */
function startMinecraft(minecraft) {
    minecraft = mineflayer.createBot(config.minecraft)
    minecraft.on('login', function() {
        console.info("[Client] Successfully logged into account");
    });
      
    minecraft.on('kicked', function(reason) {
        console.log("[Kick] ", reason);
        setTimeout(function() {
            startMinecraft(minecraft);
        }, 6000)
    });
    
    /* Do not call startMinecraft on 'error', as any small error will cause a complete reboot */
    minecraft.on('error', function(err) {
        console.log('[Client] Error:', err)
    })
    
}

startMinecraft(minecraft);
