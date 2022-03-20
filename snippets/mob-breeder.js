          bot.on('spawn', async function() {

            startBreeding()

            async function startBreeding() {
              setTimeout(async function() {

                // Grab nearby sheep that are within 5 blocks, and is not a baby (!e.metadata[16] = isBaby)
                let nearbySheep = Object.values(bot.entities).filter(e => e.name == 'sheep' && e.position.distanceTo(bot.entity.position) < 5 && !e.metadata[16]);

                // Select a random sheep from the nearby sheep
                let sheep = nearbySheep[Math.floor(Math.random() * nearbySheep.length)];

                if(!sheep) {
                  term.echo('[Warn] There are no nearby sheep to milk.');
                  return startBreeding();
                }
                
                await bot.lookAt(sheep.position, false)

                let wheat = bot.inventory.items().filter(item => item.name == 'wheat')[0];

                if(!wheat) {
                  term.echo('[Warn] There is no wheat in my inventory.');
                  return startBreeding();
                }

                await bot.equip(wheat, 'hand');
                await bot.activateEntity(sheep)

                startBreeding();
              }, 2000)
            }



          });
