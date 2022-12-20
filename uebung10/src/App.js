import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid  from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";

/* durch https://vm5.sourcelab.ch/geodeticline/line/ aufrufen
wurde mit filezilla hochgeladen*/

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const[startlng, setStartlong] = useState(-81.5157535);
  const[startlat, setStartlat] = useState(27.6648274);
  const[endlng, setEndlong] = useState(8.54161);
  const[endlat, setEndlat] = useState(47.37693);
  const[pts, setPunkte] = useState(100);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);

  function do_download() {

    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${startlat}&startlng=${startlng}&endlat=${endlat}&endlng=${endlng}&pts=${pts}`;
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h1>Geodetic Line</h1>

      <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField label="startlat" variant="outlined" defaultValue={startlat} onChange={(event)=>{setStartlat(event.target.value)}}/>
        <TextField label="startlong" variant="outlined" defaultValue={startlng} onChange={(event)=>{setStartlong(event.target.value)}}/>
      </Grid>
      <Grid item xs={12}>
        <TextField label="endlat" variant="outlined" defaultValue={endlat} onChange={(event)=>{setEndlat(event.target.value)}}/>
        <TextField label="endlong" variant="outlined" defaultValue={endlng} onChange={(event)=>{setEndlong(event.target.value)}}/>
      </Grid>
      <Grid item xs={12}>
        <TextField label="punkte" variant="outlined" defaultValue={pts} onChange={(event)=>{setPunkte(event.target.value)}}/>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => {do_download()}}>Linienberechnung</Button>
        <Button variant='contained' onClick={() => {setData(null)}}>New Path</Button>
      </Grid>
      </Grid>

   
      {loading && <>
                     <div>API Aufruf, bitte warten!</div><br/>
                  </>
      }

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
                  <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
                  <GeoJSON data={data} style={{ weight: 8, opacity: '30%', color: 'red'}}/>

                  </MapContainer>
                </>}
  
      </>
  );
}

export default App;