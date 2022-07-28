/*
  threshold - Once bot.food is lower than this, we can eat the item.
  filter - (Optional) An array of items to eat ['apple', 'cooked_beef']
*/
const eat = function(threshold, filter = []) {
  return new Promise(async function(resolve, reject) {
    if(bot.food > threshold) return reject(new Error("threshold")); // The bot had more hunger than the threshold
    let items = getItems(); // Get a list of food items sorted by food points (Optional : filter)
    if(!items.length) return reject(new Error("no_food")); // We have no edible items
    await bot.equip(items[0].id, 'hand');
    await bot.consume()
    return resolve(items[0]);

    function getItems() {
      let foodByPoints = Object.values(bot.registry.foods).sort((a,b) => b.foodPoints - a.foodPoints); // Sort food items by foodPoints (Yes, I know about foodsByFoodPoints)
      let filtered = filter.length ? foodByPoints.filter(i => filter.includes(i.name)) : foodByPoints; // If there's a filter use it, use foodByPoints list
      console.log('FILTERED', filtered)
      let edible = filtered.filter(i => bot.inventory.items().map(e => e.name).includes(i.name))
      return edible;
    }

  })
}


eat(5, ['beetroot', 'cooked_beef', 'apple', 'pumpkin_pie']).then(function(item) {
  console.log(`I ate a(n) ${item.name}`)
}).catch(function(e) {
  if(e.message === 'threshold') return echo(`The bot was too full to eat, skipping.`);
  if(e.message === 'no_food') return echo(`We have no items to eat!`);
  console.log(e)
})
