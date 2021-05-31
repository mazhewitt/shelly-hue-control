var express = require('express');
var app = express();
const v3 = require('node-hue-api').v3
  , discovery = require('node-hue-api').discovery
  , hueApi = v3.api, GroupLightState = v3.lightStates.GroupLightState
const bridge_utils = require ('./bridge-utils.js')
const bridgeConfig = require ('./bridge-config.js');

let username =  ""
let host = ""
let localApi = {}



app.get('/toggle/:light', async function (req, res) {
    response = ""
    group_name = req.params.light
    matchedGroups = await localApi.groups.getGroupByName(group_name)
    groupState = ""
    if (matchedGroups && matchedGroups.length > 0) {
      // Iterate over the light objects showing details
      matchedGroups.forEach(group => {
        if (group.state.any_on){
          groupState = new GroupLightState().off()
        }
        else{
          groupState = new GroupLightState().on()
        }
        localApi.groups.setGroupState(group.id, groupState);
        response = group.toStringDetailed()
      });
    } else {
     details = `No groups found with names that match: '${group_name}'`
     console.log(response);
    }
    res.send(response)
  });

app.get('/index/groups/', async function (req, res) {
    
    groups = await localApi.groups.getAll();
    console.log(groups)
    res.send(groups)

  });


app.listen(8081, async () => {
    await bridgeConfig.init()
    username = await bridgeConfig.getStoredUsername()
    host = await bridge_utils.discoverBridge();
    localApi = await hueApi.createLocal(host).connect(username);
})