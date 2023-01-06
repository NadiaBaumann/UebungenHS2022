import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from "axios";
import "leaflet/dist/leaflet.css";

function App() {
  const E_MAX = 2833859;
  const E_MIN = 2485410;
  const N_MAX = 1295938;
  const N_MIN = 1075269;
  const [eastern, setEastern] = useState(2600000);
  const [northern, setNorthern] = useState(1200000);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const [easternErr, setEasternErr] = useState(false);
  const [northernErr, setNorthernErr] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);




  function transform() {
    const url = `http://geodesy.geo.admin.ch/reframe/lv95towgs84?easting=${eastern}&northing=${northern}`;
    setLoading(true);
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        console.log(data)
        setLat(data.coordinates[1]);
        setLong(data.coordinates[0]);
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
      <h1>Transformation der Landeskoordinaten LV95 in WGS84 Koordinaten</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>LV95</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField error={easternErr}
                helperText={easternErr ? `Koordinate liegt ausserhalb der Schweiz` : ' '}
                // helperText={easternErr ? `Koordinate muss innerhalb von ${E_MIN} - ${E_MAX} $` : ' '}
                defaultValue={eastern}
                onChange={
                  (event) => {
                    setEastern(event.target.value);
                    if (event.target.value < E_MIN || event.target.value > E_MAX) {
                      setEasternErr(true);
                    } else {
                      setEasternErr(false);
                    }
                  }
                }
                type="number" fullWidth label='Ost' variant='outlined'></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField error={northernErr} helperText={northernErr ? `Koordinate liegt ausserhalb der Schweiz` : ' '} defaultValue={northern}
                onChange={
                  (event) => {
                    setNorthern(event.target.value)
                    if (event.target.value < N_MIN || event.target.value > N_MAX) {
                      setNorthernErr(true);
                    } else {
                      setNorthernErr(false);
                    }
                  }
                }
                type="number" fullWidth label='Nord' variant='outlined'></TextField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2} justifyContent="center"
            alignItems="center">
            <Grid item xs={12}>
              <Button disabled={(easternErr || northernErr) ? true : false} variant="contained" onClick={() => transform()}>Konvertieren</Button>
            </Grid>
            <Grid item xs={12}>
              {loading && <>
                <div>API Aufruf, bitte warten!</div><br />
              </>
              }

              {error && <>
                <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br />
              </>}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>WGS84</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth disabled label='Lat' variant='outlined' helperText=" " InputLabelProps={{
                shrink: true,
              }} value={lat}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth disabled label='Long' variant='outlined' helperText=" " InputLabelProps={{
                shrink: true,
              }} value={long}></TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {lat && long && <>

        <Grid container>
          <Grid item xs={6}>

            <MapContainer center={[lat, long]} zoom={7.5} scrollWheelZoom={true}
              style={{ height: "600px", width: "100%" }} >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
              <Marker position={[lat, long]}>
                <Popup>
                  Transformierte Koordinaten<br />Dargestellt auf OSM
                </Popup>
              </Marker>
            </MapContainer>
          </Grid>
          <Grid item xs={6}>
            <MapContainer center={[lat, long]} zoom={7.5} scrollWheelZoom={true}
              style={{ height: "600px", width: "100%" }} >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution='&copy; stadiamaps'
              />
              <Marker position={[lat, long]}>
                <Popup>
                  Transformierte Koordinaten<br />Dargestellt auf Stadiamaps
                </Popup>
              </Marker>
            </MapContainer>
          </Grid>
        </Grid>
      </>
      }
    </>

  );


}

export default App;

