
let myMap = L.map('mapdiv'); //http://leafletjs.com/reference-1.3.0.html#map-l-map
//let myLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 
const awsGroup = L.featureGroup();  //neue featureGroup erstellt
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




myMap.addLayer(myLayers.osm); //http://leafletjs.com/reference-0.7.7.html#map-addlayer
myMap.setView([47.267,11.383],11);//http://leafletjs.com/reference-0.7.7.html#map-setview

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-0.7.7.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    'Wetterstationen: ': awsGroup,   //feature Group dem Overlay-Layer hinzufügen
},{
    collapsed: false //http://leafletjs.com/reference-0.7.7.html#control-layers-collapsed
    
});
myMap.addControl(myMapControl);  //http://leafletjs.com/reference-0.7.7.html#map-addcontrol



L.control.scale( { //http://leafletjs.com/reference-0.7.7.html#control-scale
    position: 'bottomleft', // (wäre eigentlich default) http://leafletjs.com/reference-0.7.7.html#control-scale-position
    maxWidth:200, //http://leafletjs.com/reference-0.7.7.html#control-scale-maxwidth
    imperial : false} //http://leafletjs.com/reference-0.7.7.html#control-scale-imperial
).addTo(myMap);


console.log('stationen: ', stationen);

myMap.addLayer(awsGroup);

let geojson=L.geoJSON(stationen).addTo(myMap);
geojson.bindPopup(function(layer) {
    const props = layer.feature.properties;
    const popupText= `<h1>${props.name}</h1>
    <p>Temperatur: ${props.LT} °C</p>`;  //zwischen ${} ist Variable, sonst Text
    return popupText;
});

myMap.fitBounds(geojson.getBounds()); //regelt zoomstufe des layer