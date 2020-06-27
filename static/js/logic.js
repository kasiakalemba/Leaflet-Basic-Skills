// Leaftlet map for recent earthquakes and their relationship to tectonic plate locations

// URLs for APIs 
// URL for earthquake json 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// URL for tectonic plates
var tectnoic = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Backgrounds for the map: 
// grayscale 
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// outdoors  
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// satellite 
var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibWFudWVsYW1hY2hhZG8iLCJhIjoiY2ppczQ0NzBtMWNydTNrdDl6Z2JhdzZidSJ9.BFD3qzgAC2kMoEZirGaDjA");

// map object to an array of layers we created.
var myMap = L.map("map", {
  center: [40.00, -110.00],
  zoom: 3,
  layers: [satellitemap, graymap, outdoors]
});

// layers for earthquakes and plate locations
var tectonicplates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// base layers for the basemaps 
var baseMaps = {
  Satellite: satellitemap,
  Grayscale: graymap,
  Outdoors: outdoors,
};

// overlays for the earthquakes and plates
var overlayMaps = {
  "Tectonic Plates": tectonicplates,
  "Earthquakes": earthquakes
};

// add layers and overlays 
L.control.layers(baseMaps, overlayMaps)
  .addTo(myMap);

// define colors depending on the magnituge of the earthquake
function colorMag(mag) {
  switch (true) {
    case mag >= 5.0:
      return 'red';
    case mag >= 4.0:
      return 'orangered';
    case mag >= 3.0:
      return 'orange';
    case mag >= 2.0:
      return 'darkorange';
    case mag >= 1.0:
      return 'yellow';
    default:
      return 'white';
  };
};

// access the geojson for the earthquakes
d3.json(url, function (data) {
  createFeatures(data.features);

  // function to create features for earthquake data
  function createFeatures(data) {
    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: feature.properties.mag * 5,
          fillColor: colorMag(feature.properties.mag),
          color: "black",
          weight: 0.5,
          opacity: 0.5,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(earthquakes);
    earthquakes.addTo(myMap);
  };
});

// access the geojson for the plate locations
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
  function (platedata) {
    L.geoJson(platedata, {
      color: "orange",
      weight: 2
    })
      .addTo(tectonicplates);
    // add the lines to the layer
    tectonicplates.addTo(myMap);
  });

// make a legend foe the magnitudes
var legend = L.control({ position: "bottomright" });
legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grade = [0, 1, 2, 3, 4, 5];
  for (var i = 0; i < grade.length; i++) {
    div.innerHTML += '<i style="background:' + colorMag(grade[i]) + '"></i> ' + [i] + (grade[i + 1] ? '&ndash;' +
      grade[i + 1] + '<br>' : '+');}
  return div;
};

// Add legend to the map
legend.addTo(myMap);



