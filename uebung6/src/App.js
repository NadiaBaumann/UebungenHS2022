import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const circleStyle = {color: "rosa"};

return (
  <MapContainer center={[47.5349, 7.6416]} zoom={15} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />

  <Marker position={[47.60145537, 8.182823992]}>
    <Popup>
      KKW Leibstadt<br/>Inbetriebnahme: 1984<br/>Reaktortyp: tor1
    </Popup>
  </Marker>
  <Marker position={[47.55201943, 8.228391684]}>
    <Popup>
      KKW Beznau 1 und 2<br/>Inbetriebnahme 1: 1969<br/>Inbetriebnahme 2: 1971<br/>Reaktortyp 1 und 2: tor2
    </Popup>
  </Marker>
  <Marker position={[47.36607556, 7.966750757]}>
    <Popup>
      KKW Gösgen<br/>Inbetriebnahme: 1979<br/>Reaktortyp: tor2
    </Popup>
  </Marker>
  <Marker position={[46.96887277, 7.268042402]}>
    <Popup>
      KKW Mühleberg<br/>Inbetriebnahme: 1972<br/>Stilllegung: 2019<br/>Reaktortyp: tor1
    </Popup>
  </Marker>

  <Circle center={[47.60145537, 8.182823992]} pathOptions= {circleStyle} radius = {50000}></Circle>
  <Circle center={[47.55201943, 8.228391684]} pathOptions= {circleStyle} radius = {50000}></Circle>
  <Circle center={[47.36607556, 7.966750757]} pathOptions= {circleStyle} radius = {50000}></Circle>
  <Circle center={[46.96887277, 7.268042402]} pathOptions= {circleStyle} radius = {50000}></Circle>

</MapContainer>
  );
}

export default App;
