const { GoalNear, GoalXZ } = require("mineflayer-pathfinder").goals;

module.exports = {
  init: function (logger) {},
  register: function (bot) {
    bot.on("chat", async function (username, message) {
      if (!bot.players[username] || username === bot.username) return; // The player doesn't exist
      if(username !== 'CorruptedPirate') return;

      if (message.startsWith("goto")) {
        bot.pathfinder.setGoal(null);

        const args = message.trim().split(/ +/g).slice(1);
        if(args.length === 0) return bot.chat('You need to specify a player or coordinates.');

        if (args.length === 1) {
          let target = bot.players[args[0]]?.entity;
          if (!target)
            return bot.chat(
              `${args[0]} is not online or out of my render distance.`
            );
          //if(target.username === bot.username) return bot.chat(`I am already at my own position.`);

          bot.chat(
            `Going to "${args[0]}", they are ${Math.round(
              bot.entity.position.distanceTo(target.position)
            )} blocks away.`
          );

          let pos = target.position;
          await bot.pathfinder.setGoal(new GoalNear(pos.x, pos.y, pos.z, 1), true); // true for dynamic..

          return bot.chat(`Arrived at desination.`) //${target.username} (At ${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)})`)

        }

        if (args.length === 3) {
          var pos = {
            x: parseInt(args[0]),
            y: parseInt(args[1]),
            z: parseInt(args[2]),
          };

          var goal = isNaN(pos.y)
            ? new GoalNearXZ(pos.x, pos.z, 2)
            : new GoalNear(pos.x, pos.y, pos.z, 2);

          if (!isNaN(pos.y)) {
            goal = new GoalXZ(pos.x, pos.z);
          }

          bot.chat(`Trying to go to ${pos.x}, ${pos.y}, ${pos.z}`);

          await bot.pathfinder.setGoal(goal, false);

          return bot.chat(`I have arrived at ${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)}`)

        }
      }
    });
  },
};
