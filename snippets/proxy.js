// Notes:
// -> Using `socks5h` to pass a domain
// -> If your proxy doesn't have authentication, set them as `undefined` or remove the fields.

// Note: If you get the error
// FetchError: request to https://sessionserver.mojang.com/session/minecraft/join failed, reason: certificate has expired

// You'll need to add this to the top of the file
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let PROXY_IP = '';
let PROXY_PORT = '';
let PROXY_USERNAME = '';
let PROXY_PASSWORD = '';

let MC_SERVER_ADDRESS = 'mc.hypixel.net'
let MC_SERVER_PORT = 25565;
const bot = mineflayer.createBot({
  connect: client => {
    socks.createConnection({
      proxy: {
        host: PROXY_IP,
        port: parseInt(PROXY_PORT),
        type: 5,
        userId: PROXY_USERNAME,
        password: PROXY_PASSWORD,
      },
      command: 'connect',
      destination: {
        host: MC_SERVER_ADDRESS,
        port: parseInt(MC_SERVER_PORT)
      }
    }, (err, info) => {
      if (err) {
        console.log(err)
        return
      }
      client.setSocket(info.socket)
      client.emit('connect')
    })
  },
  agent: new ProxyAgent({
    protocol: 'socks5h:',
    host: PROXY_IP,
    port: parseInt(PROXY_PORT),
    username: PROXY_USERNAME,
    password: PROXY_PASSWORD
  }),
  host: MC_SERVER_ADDRESS,
  auth: 'microsoft',
  username: 'CHANGE_ME',
  version: '1.8.9',
})
