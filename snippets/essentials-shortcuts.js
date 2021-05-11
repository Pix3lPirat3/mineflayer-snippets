// This guide assumes you've already launched Mineflayer, and set it to a 'bot' variable
// Please pretty this up..

// shortcuts.json -> https://github.com/EssentialsX/Essentials/blob/2.x/Essentials/src/main/resources/items.json

var fs = require('fs');
var shortcuts;
const mcData = require('minecraft-data')(bot.version)

function toEssentials(name) {
    name = name.toLowerCase();
    if(!shortcuts) shortcuts = JSON.parse(fs.readFileSync(`shortcuts.json`, 'utf8'));
    var item = shortcuts[name];
    if(!item) return undefined;
    if(item.material) return item.material.toLowerCase();
    if(item) return item.toLowerCase();
}

function toMCData(name) {
    name = toEssentials(name)
    return mcData.blocksByName[name]
}

console.log('Object Data for dblock (Diamond Block): ', toMCData('dblock'))
