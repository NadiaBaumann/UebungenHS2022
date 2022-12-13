from pyproj import Transformer
from fastapi import FastAPI
import uvicorn

app = FastAPI()

wgs84 = "epsg:4326"
lv95 = "epsg:2056"

transformer1 = Transformer.from_crs("epsg:4326", "epsg:2056") # von WGS84 = espg:4326 zu LV95 Koordinaten
transformer2 = Transformer.from_crs("epsg:2056", "epsg:4326") # von LV95 = espg:2056 zu WGS84 Koordinaten

@app.get("/transform/wgs84lv95") 
async def transform(lat: float, lng: float):
    
    r1 = transformer1.transform(lat, lng)
    #print(r1) # zuerst Breite, dann Länge

    return {"LV95 Kooridnaten": {r1}}
    # http://127.0.0.1:8001/transform/wgs84lv95
    # https://vm5.sourcelab.ch/transform/wgs84lv95?lat=47.53499623050727&lng=7.641425857234456



@app.get("/transform/lv95wgs84") 
async def transform(Ost: float, Nord: float):
    
    r2 = transformer2.transform(Ost, Nord) 
    #print(r2)

    return {"WSG84 Koordinaten": {r2}}
    # http://127.0.0.1:8001/transform/lv95wgs84
    # https://vm5.sourcelab.ch/transform/lv95wgs84?Ost=2600000.000&Nord=1200000.000
    

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
