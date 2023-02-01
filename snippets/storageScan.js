bot.storage_manager = []; // for later manipulation

let chest_id = bot.registry.blocksByName['chest'].id;
let chests = bot.findBlocks({
  matching: function(block) {
    // Get a single side of double-chests, and all single chests.
    return block.type === chest_id && (block.getProperties().type === 'single' || block.getProperties().type === 'right')
  },
  useExtraInfo: true,
  maxDistance: 16,
  count: 50
});

bot.chat(`I see ${chests.length} chests to scan..`);

// loop through chest locations, navigate to each chest, open it, and store the chest items inside the bot's storage manager for later reference.
for(let a = 0; a < chests.length; a++) {
  let chest = chests[a];
  await bot.pathfinder.goto(new GoalLookAtBlock(chest, bot.world));
  let chest_window = await bot.openContainer(bot.blockAt(chest));
  // OPTIONAL: Delay for servers not loading chests fast enough.
  // await delay(1000)
  let chest_items = chest_window.containerItems();
  bot.storage_manager.push({ location: chest, items: chest_items })
  console.log(`[storageScan] Chest at ${chest} has ${chest_items.length} items.`)
  await bot.closeWindow(chest_window)
}

console.log('Done Saving:')
console.log(bot.storage_manager)
