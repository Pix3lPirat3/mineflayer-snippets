bot.on('spawn', async function() {

  tameWolves()

  async function tameWolves() {
    setTimeout(async function() {

      // Grab nearby wolves that are within 5 blocks, and is not tamed (!e.metadata[17] = isTamed)
      let nearbyUntamedWolves = Object.values(bot.entities).filter(e => e.name == 'wolf' && e.position.distanceTo(bot.entity.position) < 5 && !e.metadata[17]);

      // Select a random wolf from the nearby wolves
      let wolf = nearbyUntamedWolves[Math.floor(Math.random() * nearbyUntamedWolves.length)];

      if(!wolf) {
        term.echo('[Warn] There are no nearby wolf to tame.');
        return tameWolves();
      }
      
      await bot.lookAt(wolf.position, false)

      let bone = bot.inventory.items().filter(item => item.name == 'bone')[0];

      if(!bone) {
        term.echo('[Warn] There is no bone in my inventory.');
        return tameWolves();
      }

      await bot.equip(bone, 'hand');
      await bot.activateEntity(wolf)

      tameWolves();
      
    }, 2000)
  }



});
