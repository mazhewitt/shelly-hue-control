const storage = require('node-persist');
const myStorage = storage.create({dir: './config/bridge_store.cfg', ttl: false});
const bridge_utils = require ('./bridge-utils.js')
async function init(){
    await myStorage.init();
    
}


// need to press the button on the bridge before calling.
async function storeNewClientKey(){
    let createdUser = await bridge_utils.getNewAuthenticatedClientKey()        
    await myStorage.setItem('bridge-user', createdUser.username);
    await myStorage.setItem('client-key', createdUser.clientKey);
}


async function getStoredUsername(){
   return myStorage.getItem('bridge-user')
}

exports.init = init
exports.storeNewClientKey = storeNewClientKey
exports.getStoredUsername = getStoredUsername