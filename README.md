# shelly-hue-control
docker create -p 8080:8080 --restart unless-stopped --name shelly_hue mazhewitt/shelly_hue:1.1
docker start shelly_hue
docker exec -it shelly_hue node authorise.js