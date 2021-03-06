// FSQ apiKey = fsq3SJOSR/AN2zIVAskFv10Owv3CUYaEA2nmhRcRcpuEqyc=


// Build Map + Info 
// CONST TO HOLD .this calls
const mapInfo = {
coordinates: [],
localBusiness: [],
map: {},
markers: {},

renderMap () {
this.map = L.map('map', {
center: this.coordinates,
zoom: 10,
});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '20',
    }).addTo(this.map)

    const uMarker = L.marker(this.coordinates) .addTo(this.map).bindPopup('I know where you sleep c:').openPopup();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic291bGxlc3NseSIsImEiOiJja3pnYWhzcDQza2J1MnBvMG9wbWtweDY1In0.HOw-voEIPel6Y2BaEJuZMw'
}).addTo(this.map);

const userMarker = L.marker(this.userCoords).addTo(this.map).bindPopup('I know where you sleep.').openPopup();
},

createMarkers() {
    for (var i = 0; i < this.localBusiness.length; i++) {
        this.markers = L.marker([ this.localBusiness[i].lat, this.localBusiness[i].long,])
        .bindPopup(`${this.localBusiness[i].name}`)
        .addTo(this.map);
        }
    },
};

// User Location Info
async function userLocation () {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [pos.coords.latitude, pos.coords.longitude];
}


// Get Foursquare
async function getFoursquare(business) {
    const options = {
        method: 'GET', 
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3SJOSR/AN2zIVAskFv10Owv3CUYaEA2nmhRcRcpuEqyc='
        },
    };
let limit = 10;
let lat = mapInfo.coordinates[0]
let lon = mapInfo.coordinates[1]
let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options);
let data = await response.text()
let parsedData = JSON.parse(data)
let localBusiness = parsedData.results
return localBusiness;
}

// Process 4SQ info
function processFoursquare(info) {
let localBusiness = data.map((element) => {
    let location = {
        name: element.name,
        lat: element.geocodes.main.latitude,
        long: element.geocodes.main.longitude,
    };
    return location;
})
return localBusiness;
}

// Win Load + button
window.onload = async () => {
    const userGPS = await userLocation()
    mapInfo.coordinates = userGPS
    mapInfo.renderMap()
var button = document.getElementById('submitbtn');
 button.addEventListener('click', async () => {
    let localBusiness = document.getElementById("capitalism").value
    let data = await getFoursquare(business)
    mapInfo.localBusiness = processFoursquare(info)
    mapInfo.createMarkers()
  })
}