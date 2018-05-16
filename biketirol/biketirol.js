/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let myMap = L.map("map");
const bikeGroup = L.featureGroup().addTo(myMap);

//Grundkarten laden
let myLayers={

    osm: L.tileLayer( //http://leafletjs.com/reference-0.7.7.html#tilelayer
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {//http://leafletjs.com/reference-0.7.7.html#tilelayer-l.tilelayer
            subdomains: ['a', 'b', 'c'],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        }
    ),
    geolandbasemap: L.tileLayer(
        'https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"], //http://leafletjs.com/reference-0.7.7.html#tilelayer-subdomains
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //http://leafletjs.com/reference-0.7.7.html#tilelayer-attribution
        }
    ),
    gdi_summer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,    
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),
    gdi_winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,     
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),
    gdi_ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
            minZoom: 0,
            maxZoom: 18,     
            attribution: "Datenquelle: <a href = 'https://www.tirol.gv.at/statistik-budget/tiris/tiris-geodatendienste/impressum-elektronische-karte-tirol/'>Elektronische Karte Tirol</a>"
        }
    ),

    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),

};

myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-0.7.7.html#map-addlayer

myMap.addLayer(bikeGroup);

//MapControl
let myMapControl = L.control.layers({   //http://leafletjs.com/reference-0.7.7.html#control-layers
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "Elektronische Karte Tirol Sommer": myLayers.gdi_summer,
    "Elektronische Karte Tirol Winter": myLayers.gdi_winter,
    "Elektronische Karte Tirol Orthofoto": myLayers.gdi_ortho

}, {
        "basemap.at Overlay": myLayers.bmapoverlay,
        "Etappe 10: ": bikeGroup,   //feature Group dem Overlay-Layer hinzufügen
        //'Group: ': marker,
    }, {
        collapsed: true //http://leafletjs.com/reference-0.7.7.html#control-layers-collapsed

    }).addTo(myMap);

//myMap.addControl(myMapControl);  //http://leafletjs.com/reference-0.7.7.html#map-addcontrol

//Maßstabsleiste
let mayScale = L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
}).addTo(myMap);

const Coord = {
    start: [47.604851, 12.196159],
    finish: [47.668792, 12.404372],
};

const StartIcon = L.icon({
    iconUrl: 'images/start.png',
    iconAnchor: [30,20]
});

const FinishIcon = L.icon({
    iconUrl: 'images/finish.png',
    iconAnchor: [10,20]
});

const StartMarker = {
    title: "Kufstein",
    icon: StartIcon
};

const FinishMarker = {
    title: "Kössen",
    icon: FinishIcon
};

L.marker(Coord.start, StartMarker).bindPopup("<p><b>Start: Kufstein</b></p><a href='https://de.wikipedia.org/wiki/Kufstein'>mehr über Kufstein</a>").addTo(bikeGroup);
L.marker(Coord.finish, FinishMarker).bindPopup("<p><b>Ziel: Kössen</b></p><a href='https://de.wikipedia.org/wiki/K%C3%B6ssen'>mehr über Kössen</a>").addTo(bikeGroup);

//geojson

const geojson = L.geoJSON(etappe10data).addTo(bikeGroup);

geojson.bindPopup(function(layer){
    const props = layer.feature.properties;
    const popupText = `<h2>${props.name}</h2>
    <p>Kufstein - Kössen</p>`;
    return popupText;
});


//Zoomstufe
myMap.fitBounds(bikeGroup.getBounds());