/*
Just say clicker start or clicker stop to.. yea..
*/

const mineflayer = require('mineflayer')

// Done in ms
const CLICK_INTERVAL = 1000

const bot = mineflayer.createBot({
  host: '',
  version: '',
  username: '',
  auth: ''
})

const autoClicker = {
  running: undefined,
  blacklist: ['experience_orb'],
  start: () => {
    if (this.running) return
    this.running = setInterval(async function () {
      const entity = bot.entityAtCursor()
      if (!entity) return bot.swingArm()
      if (autoClicker.blacklist.includes(entity.name)) return
      bot.attack(entity, true)
    }, CLICK_INTERVAL)
  },
  stop: () => {
    this.running = clearInterval(this.running)
  }
}

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  switch (message) {
    case 'clicker start':
      autoClicker.start()
      break
    case 'clicker stop':
      autoClicker.stop()
      break
    default:
      bot.chat('What do you want me to do? start or stop.')
      break
  }
})
