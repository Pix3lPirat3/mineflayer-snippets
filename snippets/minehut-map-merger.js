const { Canvas, Image } = require('canvas');
const {
  mapDownloader
} = require('mineflayer-item-map-downloader')
const mineflayer = require('mineflayer');
let mergeImages = require('merge-images');
let fs = require('fs');

const bot = mineflayer.createBot({
  host: 'minehut.com',
  username: 'Player001',
  auth: 'microsoft',
  version: '1.18.2'
})

bot.loadPlugin(mapDownloader)

bot.once('spawn', function() {
    console.log(` >> I have spawned on the server.. ${bot.entity.position} (${bot.username})`)
  
    mergeMaps(); // A delay incase maps don't load immediately ?

})
bot.on('kicked', console.log)
bot.on('error', console.log)
bot.on('messagestr', (message) => console.log(message))

//mergeMaps()

function mergeMaps() {

  let pos = function(number) {
    return number * 128;
  }

  // are the IDs of maps always the same? I don't know..
  mergeImages([
      { src: 'map_032765.png', x: pos(1), y: 0 },
      { src: 'map_032764.png', x: pos(1), y: 128 },
      { src: 'map_032763.png', x: pos(2), y: 0 },
      { src: 'map_032762.png', x: pos(2), y: 128 },
      { src: 'map_032761.png', x: pos(3), y: 0 },
      { src: 'map_032760.png', x: pos(3), y: 128 },
      { src: 'map_032759.png', x: pos(4), y: 0 },
      { src: 'map_032758.png', x: pos(4), y: 128 },
      { src: 'map_032767.png', x: pos(0), y: 0 },
      { src: 'map_032766.png', x: pos(0), y: 128 },
    ], {
      Canvas: Canvas,
      Image: Image,
      width: 640,
      height: 256
    }).then(function(base64) {
      var base64Data = base64.replace(/^data:image\/png;base64,/, "");

      fs.writeFile("MERGED.png", base64Data, 'base64', function(err) {
        console.log(err);
        console.log('IMAGES MERGED.')
      });
    });
}
