/*
Username: Pix3lPirat3
Message: Welcome to the server Player01
Translate: undefined
jsonMsg: ChatMessage {
  json: { text: '', extra: [ [Object], [Object] ] },
  text: '',
  extra: [
    ChatMessage {
      json: [Object],
      text: '<Pix3lPirat3> ',
      bold: false,
      italic: false,
      underlined: false,
      strikethrough: false,
      obfuscated: false,
      color: 'white'
    },
    ChatMessage {
      json: [Object],
      text: '',
      extra: [Array],
      bold: undefined,
      italic: undefined,
      underlined: undefined,
      strikethrough: undefined,
      obfuscated: undefined,
      color: undefined
    }
  ],
  bold: undefined,
  italic: undefined,
  underlined: undefined,
  strikethrough: undefined,
  obfuscated: undefined,
  color: undefined
}
*/

// Notice: Uses the startMinecraft() function from https://github.com/Pix3lPirat3/mineflayer-snippets/blob/main/snippets/auto-relog.js

function startMinecraft() {
  
    bot.on('chat', function (username, message, translate, jsonMsg) {
        console.log('Username:', username)
        console.log('Message:', message)
        console.log('Translate:', translate)
        console.log('jsonMsg:', jsonMsg)
    })
    
}
