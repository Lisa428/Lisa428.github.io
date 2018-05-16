// Leaflet Karte initialisieren
let karte = L.map("divKarte");

// Gruppe für GeoJSON Layer definieren
let geojsonGruppe = L.featureGroup().addTo(karte);

// Grundkartenlayer definieren
const grundkartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
}

// Map control mit Grundkarten und GeoJSON Overlay definieren
let kartenAuswahl = L.control.layers({
    "Openstreetmap": grundkartenLayer.osm,
    "basemap.at Grundkarte": grundkartenLayer.geolandbasemap,
    "basemap.at grau": grundkartenLayer.bmapgrau,
    "basemap.at Orthofoto": grundkartenLayer.bmaporthofoto30cm,
}, {
    "GeoJSON Layer": geojsonGruppe,
});
karte.addControl(kartenAuswahl);

// Grundkarte "grau" laden
karte.addLayer(grundkartenLayer.bmapgrau)

// Maßstabsleiste metrisch hinzufügen
L.control.scale({
    maxWidth: 200,
    imperial: false,
}).addTo(karte);

// asynchrone Funktion zum Laden eines GeoJSON Layers
async function ladeGeojsonLayer(datenAttribute) {
    const response = await fetch(datenAttribute.json);
    const response_json = await response.json();

    if (datenAttribute.icon){
        console.log(datenAttribute.icon);
    }
    // GeoJSON Geometrien hinzufügen und auf Ausschnitt zoomen
    const geojsonObjekt = L.geoJSON(response_json,{
        onEachFeature: function(feature,layer) {  //für jeden Marker ein Popup zufügen
            //console.log(feature.properties);
            let popup ="";
            for(attribut in feature.properties){ //soweit in attribute hineingehen, dass benötigte Werte angezeigt werden
                //console.log(attribut,feature.properties[attribut])
                let wert=feature.properties[attribut]
                if (wert && wert.toString().startsWith('http:')) {  //weblink in Popup einbauen
                    popup +=`${attribut}: <a href="${wert}">Weblink</a><br/>`;
                } else 
                    popup +=`${attribut}: ${wert}<br/>`;
            }
            //console.log(popup)
            layer.bindPopup(popup, {  //popup anzeigen lassen
                maxWidth: 600,
            }); 

        },
        pointToLayer: function(geoJsonPoint, latlng) { //icon wird eingefügt
            if(datenAttribute.icon) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: datenAttribute.icon,
                        iconAnchor:[16,32],
                        popupAnchor: [0,-32],

                    })
                })
            }else {
                return L.marker(latlng);
            }
        }

        
    });
    geojsonGruppe.addLayer(geojsonObjekt);
    karte.fitBounds(geojsonGruppe.getBounds());
}

//alhpabetisch sortieren
wienDatensaetze.sort(function(a,b) {
    if (a.titel<b.titel) {
        return-1;
    }else if (a.titel>b.titel) {
        return 1
    }else {
        return 0;
    }
})

// den GeoJSON Layer für Grillplätze laden
ladeGeojsonLayer(wienDatensaetze[0]);

//pulldown-Menue erstellen und Icons vergeben
let layerAuswahl=document.getElementById("layerAuswahl");

for (i=0; i< wienDatensaetze.length; i++){
    layerAuswahl.innerHTML +=`<option value="${i}">${wienDatensaetze[i].titel}</option>`
    console.log(i,wienDatensaetze[i].titel);
}

//Event einbaun
layerAuswahl.onchange=function(evt){
    geojsonGruppe.clearLayers();
    let i =evt.target.value;
    ladeGeojsonLayer(wienDatensaetze[i]);
   
}

//Datensätze anzeigen
//console.log(wienDatensaetze)