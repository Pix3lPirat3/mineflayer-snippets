const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'survival.deptofcraft.com',
  username: '',
  auth: 'microsoft'
})

let prefix = '!';
bot.on('chat', function(username, message) {
  const args = message.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'clicker') {
    if(args[0] === 'start') autoClicker.start();
    if(args[0] === 'stop') autoClicker.stop();
    if(args[0] === 'speed')  {
      if(args.length < 2) bot.chat('You must specify a speed..');
      autoClicker.click_interval = args[1];
      console.log(autoClicker.running)
      if(autoClicker.running) {
        autoClicker.stop();
        autoClicker.start();
      }
    }
  }
})

bot.on('messagestr', (message) => console.log(message))
bot.on('kicked', console.log)
bot.on('error', console.log)

const autoClicker = {
  running: undefined,
  click_interval: 1000,
  blacklist: ['experience_orb'],
  start: () => {
    if (autoClicker.running) return
    autoClicker.running = setInterval(async function () {
      const entity = bot.entityAtCursor()
      if (!entity || autoClicker.blacklist.includes(entity.name)) return bot.swingArm()
      bot.attack(entity, true)
    }, autoClicker.click_interval)
  },
  stop: () => {
    autoClicker.running = clearInterval(autoClicker.running)
  }
}
