// Show the plugins on the server, if tab complete is enabled
let tabs = await bot.tabComplete('/');
tabs.filter(e => e.match.includes(':')).map(e => e.match.split(':')[0]).sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
})
