#!/usr/bin/node
const prompt = require('async-prompt');
bridgeConfig = require ('./bridge-config.js');

(async () => {
    const pressed = await prompt("Have you pressed the hue controller? (y/n) :")
    let username = ""
    await bridgeConfig.init()
    await bridgeConfig.storeNewClientKey()
    username =  await bridgeConfig.getStoredUsername()
    console.log (username)

})()