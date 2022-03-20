async function feedSheep() {

  // Grab nearby sheep that are within 5 blocks, and is not a baby (!e.metadata[16] = isBaby)
  let nearbySheep = Object.values(bot.entities).filter(e => e.name == 'sheep' && e.position.distanceTo(bot.entity.position) < 5 && !e.metadata[16]);

  // Select a random sheep from the nearby sheep
  let sheep = nearbySheep[Math.floor(Math.random() * nearbySheep.length)];

  if(!sheep) return term.echo('[Warn] There are no nearby sheep to breed.');
  
  await bot.lookAt(sheep.position, false)

  let wheat = bot.inventory.items().filter(item => item.name == 'wheat')[0];

  if(!wheat) return term.echo('[Warn] There is no wheat in my inventory.');

  await bot.equip(wheat, 'hand');
  await bot.activateEntity(sheep)

  setTimeout(function() {
    feedSheep();
  }, 5000)
}
