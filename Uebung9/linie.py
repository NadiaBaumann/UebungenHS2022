import pyproj
from fastapi import FastAPI
import uvicorn
app = FastAPI()

@app.get("/geodetic")
async def geodetic(startlong: float, startlat: float, endlong : float, endlat : float):
    #startlong = 0.0
    #startlat = 0.0
    #endlong= 1.0
    #endlat = 1.0
    g = pyproj.Geod(ellps='WGS84')

    lonlats = g.npts(startlong, startlat, endlong, endlat, 5)
    lonlats = [[startlong, startlat]] + [list(i) for i in lonlats] + [[endlong, endlat]] # add start and end point

    geojson = f"""{{
    "type": "Feature",
    "geometry": {{
        "type": "MultiPoint",
        "coordinates": {lonlats}
    }},
    "properties": {{
        "about": "Geodätische Linie"
    }}
}}
"""
    return {geojson}
    # http://127.0.0.1:8002/geodetic

if __name__ == "__main__": 
    uvicorn.run(app, host="127.0.0.1", port=8002)