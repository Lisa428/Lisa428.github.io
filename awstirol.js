let myMap = L.map('mapdiv');  //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 
//let mystations = L.weatherStations
let myLayers = {
    
    osm : L.tileLayer( 
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            subdomains: ['a', 'b', 'c'],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }
    ),
    geolandbasemap :  L.tileLayer(
        'https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" 
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

myMap.addLayer(myLayers.geolandbasemap); 
myMap.setView([47.267,11.383],11);

let myMapControl = L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    //"Weather Stations": mystations
},{
    collapsed: false 
    
});

myMap.addControl(myMapControl); 

L.control.scale( { 
    maxWidth:200, 
    imperial : false} 
).addTo(myMap);
