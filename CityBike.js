
let myMap = L.map('mapdiv'); //http://leafletjs.com/reference-1.3.0.html#map-l-map
//let myLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 
const wienGroup = L.featureGroup();  //neue featureGroup erstellt
const markers = L.markerClusterGroup();  
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

myMap.addLayer(myLayers.bmapgrau); //http://leafletjs.com/reference-0.7.7.html#map-addlayer
myMap.setView([47.267,11.383],11);//http://leafletjs.com/reference-0.7.7.html#map-setview

let myMapControl = L.control.layers({   //http://leafletjs.com/reference-0.7.7.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    'Spots: ': wienGroup,   //feature Group dem Overlay-Layer hinzufügen
    'Group: ': markers,
},{
    collapsed: false //http://leafletjs.com/reference-0.7.7.html#control-layers-collapsed
    
});
myMap.addControl(myMapControl);  //http://leafletjs.com/reference-0.7.7.html#map-addcontrol



L.control.scale( { //http://leafletjs.com/reference-0.7.7.html#control-scale
    position: 'bottomleft', // (wäre eigentlich default) http://leafletjs.com/reference-0.7.7.html#control-scale-position
    maxWidth:200, //http://leafletjs.com/reference-0.7.7.html#control-scale-maxwidth
    imperial : false} //http://leafletjs.com/reference-0.7.7.html#control-scale-imperial
).addTo(myMap);


/*
console.log('Spots: ', spazierPunkte);

myMap.addLayer(wienGroup);

let geojson=L.geoJSON(spazierPunkte).addTo(myMap);

geojson.bindPopup(function(layer) {  //Layer definiert
    const props = layer.feature.properties; //greift hierarchisch auf unterordner zu
    const popupText= `<h1>${props.NAME}</h1> 
    <p>Kategorie: ${props.KATEGORIE} <br> Bemerkung: ${props.BEMERKUNG} </p>`;  //zwischen ${} ist Variable, sonst Text
    return popupText;
});*/

//myMap.fitBounds(wienGroup.getBounds()); //regelt zoomstufe des layer


//oder URL gleich aus dem Internet:
async function addGeojson(url) {
    console.log('Url wird geladen: ', url);
    const response = await fetch(url);
    console.log('Response: ', response);
    const cityBikedata = await response.json();
    console.log('Geojson: ', cityBikedata);
    const geojson= L.geoJSON(cityBikedata, {
        style: function(feature){   //Ändert Farbe der Linie zwischen den Spots
            return{color:"#ff0000"};
        },
        pointToLayer: function(geoJsonPoint, latlng){  //ändert das Icon auf footprint_green
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'cycling.png',
                    iconAnchor: [16,37]
                })
            });
        }
    });
    
    wienGroup.addLayer(geojson);
    
    geojson.bindPopup(function(layer) {  //Layer definiert
        const props = layer.feature.properties; //greift hierarchisch auf unterordner zu
        const popupText= `<h1>${props.STATION}</h1> 
        <p>${props.BEZIRK}. Bezirk </p>`;  //zwischen ${} ist Variable, sonst Text
        return popupText;
    });
    
    const hash = new L.Hash(myMap); //bindet leaflet.hash Popup in html ein (zeigt koordinaten in htmladresse an)
    
    myMap.addControl( new L.Control.Search({
        layer: wienGroup,
        propertyName: 'STATION'
        
    })); 
    
    
    
    //let markers = L.markerClusterGroup();
    markers.addLayer(geojson);
    myMap.addLayer(markers);
    
    myMap.fitBounds(wienGroup.getBounds()); //Zoomausschnitt festlegen, wichtig: in ASYNC funktion!
    
}

const url= 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json'
addGeojson(url);

myMap.addLayer(wienGroup);

