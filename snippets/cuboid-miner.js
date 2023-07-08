// A simple cuboid miner script, for the people wanting to mine a cuboid (or do other things with "blocks between two positions")

// OUTDATED: Check https://github.com/Pix3lPirat3/mineflayer-snippets/blob/main/snippets/mineflayer-cuboid.js

/*
DO NOT USE
REFER TO LINE 3

THIS IS JUST HERE FOR ARCHIVE PURPOSES

THIS SNIPPET IS NOW OUTDATED AND DOESN'T WORK HALF THE TIME
*/



















































var v = require('vec3')
// Accepts Vec3
function getCuboid(c1, c2) {
    let positions = [];
    for (let x = c1.x; x <= c2.x; x++) {
        for (let y = c1.y; y <= c2.y; y++) {
            for (let z = c1.z; z <= c2.z; z++) {
                positions.push(v(x, y, z))
            }
        }
    }
    return positions;
}

// Usage (Using mineflayer-pathfinder module)
bot.once('spawn', async function() {
  // Sort by Y high to Y low
  let cuboid = getCuboid(v(-94, 60, -104), v(-88, 63, -99)).sort((p1, p2) => { return p2.y - p1.y; })
  for(var a = 0; a < cuboid.length; a++) {
    let pos = cuboid[a]
    await bot.pathfinder.goto(new GoalNear(pos.x, pos.y, pos.z, 3))
    await bot.dig(bot.blockAt(pos)) // Note: If not a solid area, remember to check if "block" exists
  }
})
