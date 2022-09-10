const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'survival.deptofcraft.com',
  username: 'Pix3lPirat3',
  auth: 'microsoft'
})

let prefix = '!';
bot.on('chat', function(username, message) {
  const args = message.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'say') {
    bot.chat(args.join(' '));
  }
  if(command === 'slot') {
    if(!args.length) bot.chat('You must specify a slot (0-8)');
    bot.setQuickBarSlot(args[0])
    bot.chat(`Set my quick bar slot to #${args[0]}`)
  }
  if(command === 'clicker') {
    if(args[0] === 'start') autoClicker.start();
    if(args[0] === 'stop') autoClicker.stop();
    if(args[0] === 'speed')  {
      if(args.length < 2) bot.chat('You must specify a speed..');
      autoClicker.click_interval = args[1];
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
    if (this.running) return
    this.running = setInterval(async function () {
      const entity = bot.entityAtCursor()
      if (!entity) return bot.swingArm()
      if (autoClicker.blacklist.includes(entity.name)) return
      bot.attack(entity, true)
    }, autoClicker.click_interval)
  },
  stop: () => {
    this.running = clearInterval(this.running)
  }
}
