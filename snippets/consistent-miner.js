const mineflayer = require("mineflayer");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const prefix = "!";
var isDigging = false;

const bot = mineflayer.createBot({
    host: "survival.deptofcraft.com",
    username: "consistentMiner",
    // auth: "microsoft",
    skipValidation: true,
});

async function dig() {
    if (!isDigging) return
    const block = bot.blockAtCursor(4);

    if (!block) {
        await sleep(100);
    } else {
        await bot.dig(block, "ignore", "raycast"); // 2nd param: true to 'snap at block' or 'ignore' to just not turn head
    }
    
    dig()
}

function equip(itemName) {
    const item = bot.inventory.items().filter((item) => item.name.includes(itemName))[0];
    if (item) {
        bot.equip(item, "hand");
        bot.chat(`I equipped a ${itemName}!`);
    } else {
        bot.chat(`I don't have a ${itemName}!`);
    }
}

bot.on("messagestr", (message) => console.log(message));

bot.on("chat", async (username, message) => {
    if (username === bot.username) return;

    const [command, ...args] = message.slice(prefix.length).trim().split(/ +/g);

    if (command === "mining") {
        if (args.length < 1 || (args[0] !== "start" && args[0] !== "stop")) {
            bot.chat("You must tell me to start or stop!");
            return;
        }

        if (args[0] === "start") {
            bot.chat("Started digging!");
            isDigging = true;
            dig();
        } else if (args[0] === "stop") {
            bot.chat("Stopped digging!");
            isDigging = false;
        }
    } else if (command === "equip") {
        if (args.length < 1) {
            bot.chat("You must specify an item name!");
            return;
        }

        equip(args[0]);
    } else {
        bot.chat("I don't understand you!");
    }
});

bot.on("kicked", console.log);
bot.on("error", console.log);
