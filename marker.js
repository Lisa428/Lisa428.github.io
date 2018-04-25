
let myMap = L.map('mapdiv'); //http://leafletjs.com/reference-1.3.0.html#map-l-map
//let myLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 
let markerGroup=L.featureGroup();
let myLayers = {
    
    osm : L.tileLayer( //http://leafletjs.com/reference-0.7.7.html#tilelayer
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {//http://leafletjs.com/reference-0.7.7.html#tilelayer-l.tilelayer
            subdomains: ['a', 'b', 'c'],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }
    ),
    geolandbasemap :  L.tileLayer(
        'https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //http://leafletjs.com/reference-0.7.7.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //http://leafletjs.com/reference-0.7.7.html#tilelayer-attribution
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
        }
),
    
};




myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-0.7.7.html#map-addlayer

myMap.setView([47.267,11.383],11);//http://leafletjs.com/reference-0.7.7.html#map-setview

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-0.7.7.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    'Marker': markerGroup,
},{
    collapsed: false //http://leafletjs.com/reference-0.7.7.html#control-layers-collapsed
    
});
myMap.addControl(myMapControl);  //http://leafletjs.com/reference-0.7.7.html#map-addcontrol


L.control.scale( { //http://leafletjs.com/reference-0.7.7.html#control-scale
    position: 'bottomleft', // (wäre eigentlich default) http://leafletjs.com/reference-0.7.7.html#control-scale-position
    maxWidth:200, //http://leafletjs.com/reference-0.7.7.html#control-scale-maxwidth
    imperial : false} //http://leafletjs.com/reference-0.7.7.html#control-scale-imperial
).addTo(myMap);

const uni=[47.264,11.385];
const usi=[47.257, 11.356];
const technik=[47.263, 11.343];
const igls=[47.2308, 11.4106];
const patscherkofel=[47.2087, 11.4607];
const seegrube=[47.3032022,11.3811517];

myMap.addLayer(markerGroup);

const markerOptions={
    title: 'Uni Innsbruck',
    opacity: 0.4, //Transparenz d. Markers
    draggable: true
}
L.marker(uni, markerOptions).addTo(markerGroup);  //Marker mit folgendern Koordinaten hinzugefügt 
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
L.marker(igls, markerOptions).addTo(markerGroup);
L.marker(patscherkofel, markerOptions).addTo(markerGroup);  
let patscherkofelMarker=L.marker(patscherkofel).addTo(markerGroup);//definiert neue variable um bild als popup zum marker hinzuzufügen
patscherkofelMarker.bindPopup("<p>Patscherkofel</p><img style='width:200px' src='patscherkofel.jpg' alt='Patscherkofel'/>"); //fügt bild als popup zum Marker
L.marker(seegrube, markerOptions).addTo(markerGroup).bindPopup("<p>Patscherkofel</p><img style='width:200px' src='patscherkofel.jpg' alt='Patscherkofel'/>"); 
myMap.fitBounds(markerGroup.getBounds()); //regelt zoomstufe des layer

let lift= L.polyline([igls,patscherkofel], {color: 'red'}); //fügt linie zwischen igls und Patscherkofel
myMap.addLayer(lift);
//L.polyline([igls,patscherkofel], {color: 'red'}).addTo(myMap); //ist das gleiche

let uniPolygon=L.polygon([uni,usi,technik]);
myMap.addLayer(uniPolygon);
uniPolygon.bindPopup('Ende!');

//myMap.setView(uni,14);