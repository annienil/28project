
Promise.all([
  d3.csv('data/hikes.csv'), //luteal - 1-2
  d3.csv('data/lynncanyon.csv'),
  d3.csv('data/woodhaven.csv'),
  d3.csv('data/pump.csv'), // follicular 3 - 5
  d3.csv('data/seymour.csv'),
  d3.csv('data/strachan.csv'), 
  d3.csv('data/grouse.csv'),// ovulation 6 - 9
  d3.csv('data/hanes.csv'),
  d3.csv('data/lynnpeak.csv'),
  d3.csv('data/bishop.csv'), 
  d3.csv('data/capilano.csv'), // menstrual - 10 -21
  d3.csv('data/buntzen.csv'),
  d3.csv('data/goat.csv'),
  d3.csv('data/jug.csv'),
  d3.csv('data/kennedy.csv'),
  d3.csv('data/lighthouse.csv'),
  d3.csv('data/lynnloop.csv'),
  d3.csv('data/mystery.csv'),
  d3.csv('data/norvan.csv'),
  d3.csv('data/quarry.csv'),
  d3.csv('data/rice.csv'),
  d3.csv('data/smount.csv')
]).then(data => {

function getColor(d) {
  return d == "Follicular" ? '#ffb6cc' :
         d == "Ovulation" ? '#ff719d' :
         d == "Luteal"  ? '#d8225a' : '#960934';
}

const map = L.map('my-map').setView([49.36, -123.01], 12);

// Add Open Street Map tiles to the map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// make arcteryx stores (will make better later)
const arcKits = L.circle([49.268210, -123.155140], {
  color: 'steelblue',
  fillColor: 'steelblue',
  fillOpacity: 1,
  radius: 200
}).addTo(map);

arcKits.bindPopup("Arc'teryx - Kitsilano");

const arcDT = L.circle([49.283260, -123.123340], {
  color: 'steelblue',
  fillColor: 'steelblue',
  fillOpacity: 1,
  radius: 200
}).addTo(map);

arcDT.bindPopup("Arc'teryx - Downtown");

const arcPR = L.circle([49.325810, -123.141110], {
  color: 'steelblue',
  fillColor: 'steelblue',
  fillOpacity: 1,
  radius: 200
}).addTo(map);

arcPR.bindPopup("Arc'teryx - Park Royal");

const arcHQ = L.circle([49.306290, -123.012800], {
  color: 'steelblue',
  fillColor: 'steelblue',
  fillOpacity: 1,
  radius: 200
}).addTo(map);

arcHQ.bindPopup("Arc'teryx - Headquarters");

// do trailheads

for (i = 1; i<data.length; i++) {
  const points = [];
  data[i].forEach(d=> {
    d.lats = +d.lats;
    d.longs = +d.longs;
    points.push([d.lats, d.longs]);
  });

  if (i <= 2) {
    var polyline = L.polyline(points, {color: '#d8225a'}).addTo(map);
  } else if (i > 2 && i <= 5) {
    var polyline = L.polyline(points, {color: "#ffb6cc"}).addTo(map);
  } else if (i > 6 && i <= 9) {
    var polyline = L.polyline(points, {color: '#ff719d'}).addTo(map);
  } else {
    var polyline = L.polyline(points, {color: '#960934'}).addTo(map);
  }
}


data[0].forEach(d => {
  d.trail_lon = +d.trail_lon;
  d.trail_lat = +d.trail_lat;
   console.log(d.phase);
   var circle = L.circle([d.trail_lon, d.trail_lat], {
    color: getColor(d.phase),
    fillColor: getColor(d.phase),
    fillOpacity: 0.6,
    radius:200
  }).addTo(map);

  circle.bindPopup(`<b>${d.name}</b><br>
                    Recommended phase: ${d.phase}<br>
                    Difficulty: ${d.difficulty}<br>
                    Distance: ${d.distance}km<br>
                    Elevation: ${d.elevation}m<br>
                    Duration: ${d.time}hr(s)`);
 });


// do trail test (bishop)


// do trail legends
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');

div.innerHTML += '<i style="background:#ffb6cc"></i> Follicular<br>';
div.innerHTML += '<i style="background:#ff719d"></i> Ovulation<br>';
div.innerHTML += '<i style="background:#d8225a"></i> Luteal<br>';
div.innerHTML += '<i style="background:#960934"></i> Menstruation<br>';

return div;
}

legend.addTo(map);


})
.catch(error => console.error(error));