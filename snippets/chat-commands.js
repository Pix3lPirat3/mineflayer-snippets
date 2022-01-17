/*
  Usage: ".say Hello World!"
  Usage: ".echo Hello World!"
*/
bot.on("chat", function (username, message) {
  if (username === bot.username) return
  if (!message.startsWith(".")) return;

  var args = message.split(" ");
  const cmd = args[0].substring(1); // remove '.' from cmd
  args = args.slice(1); // remove 'cmd' (args[0]) from array, only return command args

  console.log("Cmd:", cmd);
  console.log("Args:", args);

  if (cmd === "say" || cmd === "echo") {
    bot.chat("Say: " + args.join(" "));
  }
});
