/*
Will stand in one spot and will mine blocks in it's eye level
*/

async function dig() {
  if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
    var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0];
    if (pickaxe) await bot.equip(pickaxe, 'hand')
    if(!pickaxe) bot.quit(); // TMP : QUIT IF NO PICKAXES.
  }
  var block = bot.blockAtCursor(4);
  if (!block) return setTimeout(function() {
    dig();
  }, 100);
  await bot.dig(block, 'ignore', 'raycast') // 2nd param: true to 'snap at block' or 'ignore' to just not turn head
  dig()
}

dig()
