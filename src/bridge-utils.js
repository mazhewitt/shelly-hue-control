const v3 = require('node-hue-api').v3
  , discovery = require('node-hue-api').discovery
  , hueApi = v3.api


const appName = 'node-hue-api';
const deviceName = 'aduki-user';


async function discoverBridge() {
  const discoveryResults = await discovery.nupnpSearch(1000);

  if (discoveryResults.length === 0) {
    console.error('Failed to resolve any Hue Bridges');
    return null;
  } else {
    // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
    return discoveryResults[0].ipaddress;
  }
}

async function getNewAuthenticatedClientKey() {
  const ipAddress = await discoverBridge();

  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const unauthenticatedApi = await hueApi.createLocal(ipAddress).connect();

  try {
    return await unauthenticatedApi.users.createUser(appName, deviceName);
    
  } catch(err) {
    if (err.getHueErrorType() === 101) {
      console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
    } else {
      console.error(`Unexpected Error: ${err.message}`);
    }
  }
}

exports.discoverBridge = discoverBridge
exports.getNewAuthenticatedClientKey = getNewAuthenticatedClientKey
