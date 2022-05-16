/*
Using entityAtCursor from:
https://github.com/PrismarineJS/mineflayer/pull/2077

Just say clicker start or clicker stop to.. yea..
*/

const mineflayer = require('mineflayer');
var Vec3 = require('Vec3');
const {
  RaycastIterator
} = require('prismarine-world').iterators

var bot = mineflayer.createBot({
  host: '',
  version: '',
  username: '',
  auth: ''
})

let autoClicker = {
  running: undefined,
  blacklist: ['experience_orb', 'player'],
  start: function() {
    if (this.running) return;
    this.running = setInterval(async function() {
      var entity = bot.entityAtCursor(3.5);
      if (!entity) return;
      if(autoClicker.blacklist.includes(entity.name)) return;
      await bot.attack(entity, true).catch(() => console.log);
    }, 1000);
  },
  stop: function() {
  	this.running = clearInterval(this.running) 
  }
}

bot.on('chat', function(username, message) {
  if (!message.startsWith('clicker')) return;

  var type = message.split(' ')[1];
  if (!type) return bot.chat('What do you want me to do? start or stop.');

  if (type === 'start') {
    autoClicker.start();
  }
  if (type === 'stop') {
    autoClicker.stop();
  }
})

bot.entityAtCursor = (maxDistance = 3.5) => {
  const block = bot.blockAtCursor(maxDistance)
  maxDistance = block?.intersect.distanceTo(bot.entity.position)??maxDistance

  const entities = Object.values(bot.entities)
    .filter(entity => entity.type !== 'object' && entity.username !== bot.username && entity.position.distanceTo(bot.entity.position) <= maxDistance)

  const dir = new Vec3(-Math.sin(bot.entity.yaw) * Math.cos(bot.entity.pitch), Math.sin(bot.entity.pitch), -Math.cos(bot.entity.yaw) * Math.cos(bot.entity.pitch))
  const iterator = new RaycastIterator(bot.entity.position.offset(0, bot.entity.height, 0), dir.normalize(), maxDistance)

  let targetEntity = null
  let targetDist = maxDistance

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    const w = entity.width / 2

    const shapes = [
      [-w, 0, -w, w, entity.height + (entity.type === 'player' ? 0.18 : 0), w]
    ]
    const intersect = iterator.intersect(shapes, entity.position)
    if (intersect) {
      const entityDir = entity.position.minus(bot.entity.position) // Can be combined into 1 line
      const sign = Math.sign(entityDir.dot(dir))
      if (sign !== -1) {
        const dist = bot.entity.position.distanceTo(intersect.pos)
        if (dist < targetDist) {
          targetEntity = entity
          targetDist = dist
        }
      }
    }
  }

  return targetEntity
}
