# World Earthquake View 

## Summary 
This app allows visualization of earthquake data which is pulled each time user loads the page. The data set is a collection of a massive amount of data from all over the world each day from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php.

## Final Product
 https://kasiakalemba.github.io/Leaflet-World-Earthquakes/
 
![](images/map.png)

## Technologies
* Javascript: Leaflet 
* HTML, CSS 
* GeoJSON data

## To run the Code: 
* Download the repository files 
* Open your folder in terminal
* Run the command “python -m http.server”.
* Run the listed server http://0.0.0.0:8000/ in a browser
* Pick and choose which type of map and layers you prefer to see the earthquake data in

## Development:
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I used the URL of this JSON to pull in the data for our visualization.
I created a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude. I also illustrated the relationship between tectonic plates and seismic activity. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates. 

![](images/code.png)











