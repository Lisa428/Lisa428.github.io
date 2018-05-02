let myMap = L.map('mapdiv');  //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 
let myStations = L.featureGroup();
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
    "Weather Stations": myStations,
},{
    collapsed: false 
    
});

myMap.addControl(myMapControl); 

L.control.scale( { 
    maxWidth:200, 
    imperial : false} 
).addTo(myMap);


//weather stations


const Gehrenspitze=[47.387131,11.133717];
const Hafelekar=[47.312079,11.383623];
const HoheMundeGipfel=[47.346295,11.080385];
const HoheMundeWindstation=[47.346612,11.083694];
const NassereithWannig=[47.387131,11.133717];
const NassereitherAlm=[47.344376,10.849554];
const Puitegg=[47.394844,11.152817];
const Rauthhütte=[47.345909,11.104943];
const RosshütteWindstation=[47.342025,11.227903];
const Seegrube=[47.3063819943737,11.3779335010812];
const Dalfazkamm=[47.448514,11.751511];
const Erfurterhütte=[47.441861,11.762127];


myMap.addLayer(myStations);

const markerOptions={
    title: 'Gehrenspitze',
    draggable: true
};

L.marker(Gehrenspitze,markerOptions).addTo(myStations);
L.marker(Hafelekar,markerOptions).addTo(myStations);
L.marker(HoheMundeGipfel,markerOptions).addTo(myStations);
L.marker(HoheMundeWindstation,markerOptions).addTo(myStations);
L.marker(NassereithWannig,markerOptions).addTo(myStations);
L.marker(NassereitherAlm,markerOptions).addTo(myStations);
L.marker(Puitegg,markerOptions).addTo(myStations);
L.marker(Rauthhütte,markerOptions).addTo(myStations);
L.marker(RosshütteWindstation,markerOptions).addTo(myStations);
L.marker(Seegrube,markerOptions).addTo(myStations);
L.marker(Dalfazkamm,markerOptions).addTo(myStations);
L.marker(Erfurterhütte,markerOptions).addTo(myStations);


let GehrenspitzeMarker=L.marker(Gehrenspitze).addTo(myStations);
GehrenspitzeMarker.bindPopup("<p>Gehrenspitze, 0.6°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Patscherkofel'/>");

let HafelekarMarker=L.marker(Hafelekar).addTo(myStations);
GehrenspitzeMarker.bindPopup("<p>Hafelekar, 1.6°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Patscherkofel'/>");

let HoheMundeGipfelMarker=L.marker(HoheMundeGipfel).addTo(myStations);
HoheMundeGipfelMarker.bindPopup("<p>Hohe Munde Gipfel, NoData am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' alt='Patscherkofel'/>");

let HoheMundeWindstationMarker=L.marker(HoheMundeWindstation).addTo(myStations);
HoheMundeWindstationMarker.bindPopup("<p>Hohe Munde Windstation, -4.1°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Patscherkofel'/>");

let NassereithWannigMarker=L.marker(NassereithWannig).addTo(myStations);
NassereithWannigMarker.bindPopup("<p>Nassereith Wannig, 1.2°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Patscherkofel'/>");

let NassereitherAlmMarker=L.marker(NassereitherAlm).addTo(myStations);
NassereitherAlmMarker.bindPopup("<p>Nassereither Alm, 4.0°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' alt='Patscherkofel'/>");

let PuiteggMarker=L.marker(Puitegg).addTo(myStations);
PuiteggMarker.bindPopup("<p>Puitegg, 5.3°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' alt='Patscherkofel'/>");

let RauthhütteMarker=L.marker(Rauthhütte).addTo(myStations);
RauthhütteMarker.bindPopup("<p>Rauthhütte, 11.7°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' alt='Patscherkofel'/>");

let RosshütteWindstationMarker=L.marker(RosshütteWindstation).addTo(myStations);
RosshütteWindstationMarker.bindPopup("<p>Rosshütte Windstation, 4.1°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png' alt='Patscherkofel'/>");

let SeegrubeMarker=L.marker(Seegrube).addTo(myStations);
SeegrubeMarker.bindPopup("<p>Seegrube, 3.1°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' alt='Patscherkofel'/>");

let DalfazkammMarker=L.marker(Dalfazkamm).addTo(myStations);
DalfazkammMarker.bindPopup("<p>Dalfazkamm, 0.4°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Patscherkofel'/>");

let ErfurterhütteMarker=L.marker(Erfurterhütte).addTo(myStations);
ErfurterhütteMarker.bindPopup("<p>Erfurterhütte, 2.4°C am 2018-04-26</p><img style='width:200px' src='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' alt='Patscherkofel'/>");

myMap.fitBounds(markerGroup.getBounds());



//möglich über for schleife:
