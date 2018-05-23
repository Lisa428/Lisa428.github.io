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

let myMap = L.map("map", {
    fullscreenControl: true //fullscreen der Karte
});

let bikeGroup = L.featureGroup().addTo(myMap);
let overlayMarker= L.featureGroup().addTo(myMap);
let overlaySteigung= L.featureGroup().addTo(myMap);

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
        "Etappe 10 ": bikeGroup,   //feature Group dem Overlay-Layer hinzufügen
        'Steigungslinie ': overlaySteigung,
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

/*geojson  (brauchen wir nicht mehr wegen gpx)

const geojson = L.geoJSON(etappe10data).addTo(bikeGroup);

geojson.bindPopup(function(layer){
    const props = layer.feature.properties;
    const popupText = `<h2>${props.name}</h2>
    <p>Kufstein - Kössen</p>`;
    return popupText;
});


//Zoomstufe
myMap.fitBounds(bikeGroup.getBounds());*/


// Höhenprofil control hinzufügen

 let hoehenprofil = L.control.elevation({
    position: "topright",
  theme: "steelblue-theme", //default: lime-theme
  width: 600,
  height: 125,
  margins: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 50
  },
    collapsed: true,

}).addTo(myMap);
 


//gpx Track statt geojson

let gpxTrack = new L.GPX("data/etappe10.gpx", {
    async: true,
    })//.addTo(myMap);
    gpxTrack.on("loaded", function(evt){
        myMap.fitBounds(evt.target.getBounds());
        console.log('Länge des Trails: ',evt.target.get_distance().toFixed(0)) //Länge des Tracks ausgeben lassen
        console.log('Niedrigster Punkt: ',evt.target.get_elevation_min().toFixed(0)) 
        console.log('Höchster Punkt: ', evt.target.get_elevation_max().toFixed(0)) 
        console.log('Aufstieg: ',evt.target.get_elevation_gain().toFixed(0)) 
        console.log('Abstieg: ',evt.target.get_elevation_loss().toFixed(0)) 

        let gesamtlaenge=evt.target.get_distance().toFixed(0);
        document.getElementById('gesamtlaenge').innerHTML=gesamtlaenge;

        let lowpoint=evt.target.get_elevation_min().toFixed(0);
        document.getElementById('lowpoint').innerHTML=lowpoint;

        let highpoint=evt.target.get_elevation_max().toFixed(0);
        document.getElementById('highpoint').innerHTML=highpoint;

        let aufstieg=evt.target.get_elevation_gain().toFixed(0);
        document.getElementById('aufstieg').innerHTML=aufstieg;

        let abstieg=evt.target.get_elevation_loss().toFixed(0);
        document.getElementById('abstieg').innerHTML=abstieg;
    });

gpxTrack.on('addline', function(evt) {  //Höhenprofil entlang des gpsTracks
    hoehenprofil.addData(evt.line);
    //console.log(evt.line.getLatLngs()[0].meta.ele) //pfad um auf Höhen der gpx Punkte zuzugreifen
    
    //Segmente der Steigungslinie hinzufügen

    let gpxTrack = evt.line.getLatLngs();
    for (i=1; i<gpxTrack.length; i++){
        let p1=gpxTrack[i-1];
        let p2=gpxTrack[i]; 
        
        //Entfernung zwischen den Punkten berechnen
        let dist=myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
        );

        let delta=p2.meta.ele-p1.meta.ele; //Steigung zwischen den Punkten
        
        //Steigung in Prozent berechnen
        let proz=0
        if (dist>0) {
        let proz= (delta/dist *100.0).toFixed(1);  
        }

        //oder
        let proz2=(dist>0)?(delta/dist*100.0).toFixed(1):0;

        let farbe=
            proz2 > 10 ? '#cb181d':
            proz2 > 6 ? '#fb6a4a':
            proz2 > 2 ? '#fcae91':
            proz2 > 0 ? '#fdbe85':
            proz2 > -2 ? '#d9f0a3':
            proz2 > -6 ? '#c2e699':
            proz2 > -10 ? '#78c679':
                        '#238443'
       

                        

        let segment = L.polyline(
           [ [p1.lat,p1.lng],
            [p2.lat,p2.lng]],
            {
                color: farbe
            }).addTo(overlaySteigung)

    }
});
   


