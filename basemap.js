
let myMap = L.map('mapdiv'); //erstellt variable myMap mit dem Link zur Leafletbibliothek und erstellt neue Karte mit Bezug auf id der basemap.html
//let myLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); //erstellt neue Variable myLayer, aus Leafleat Bibliothek Layer; z=zoomlevel 

let myLayers = {
    
    osm : L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ),
    geolandbasemap :  L.tileLayer(
        'https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //damit für {s} alle Kartenlayer genommen werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Einfügen der Datenquelle (Basemat.at will Link!)
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //damit für {s} alle Kartenlayer genommen werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Einfügen der Datenquelle (Basemat.at will Link!)
        }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //damit für {s} alle Kartenlayer genommen werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Einfügen der Datenquelle (Basemat.at will Link!)
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //damit für {s} alle Kartenlayer genommen werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Einfügen der Datenquelle (Basemat.at will Link!)
        }
),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //damit für {s} alle Kartenlayer genommen werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Einfügen der Datenquelle (Basemat.at will Link!)
        }
),
    
};




myMap.addLayer(myLayers.bmapgrau); //Fügt den Layer in die Karte
myMap.setView([47.267,11.383],11);//Setzt standort/zenturm der karte und zoomlevel (11) fest
