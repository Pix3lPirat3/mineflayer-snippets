# mineflayer-snippets
A collection of snippets for [Mineflayer](https://github.com/PrismarineJS/mineflayer)

## How do I

#### Use a trapdoor
```JS
let trapdoor = bot.registry.blocksByName['oak_trapdoor'].id
let block = bot.findBlock({ trapdoor })
if(!block) return console.log('There is no trapdoor to use!')
bot.activateBlock(block)
```