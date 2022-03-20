// Will start milking cows around the player

bot.on('spawn', async function() {

  startMilking()

  async function startMilking() {
    setTimeout(async function() {

      // Grab nearby cows that are within 5 blocks, and is not a baby (!e.metadata[16] = isBaby)
      let nearbyCows = Object.values(bot.entities).filter(e => e.name == 'cow' && e.position.distanceTo(bot.entity.position) < 5 && !e.metadata[16]);

      // Select a random cpw from the nearby cows
      let cow = nearbyCows[Math.floor(Math.random() * nearbyCows.length)];

      if(!cow) {
        term.echo('[Warn] There are no nearby cows to milk.');
        return startMilking();
      }

      await bot.lookAt(cow.position, false)

      let empty_bucket = bot.inventory.items().filter(item => item.name == 'bucket')[0];

      if(!empty_bucket) {
        term.echo('[Warn] There is no empty bucket in my inventory.');
        return startMilking();
      }

      await bot.equip(empty_bucket, 'hand');
      await bot.useOn(cow)

      startMilking();
    }, 2000)
  }



});
