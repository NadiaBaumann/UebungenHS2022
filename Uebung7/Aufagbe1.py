#Uebung 7, Aufgabe 1:
#von Nadia Baumann, G3

import uvicorn
from fastapi import FastAPI

app = FastAPI()

#CSV-File Aufbau:
#Ortschaftsname;PLZ;Zusatzziffer;Gemeindename;BFS-Nr;Kantonskürzel;E;N;Sprache

d = {}
file = open("/Users/nadiabaumann/Desktop/FHNW/07 Unterrichtsmaterial /2022_3Semester/3050 Webtechnologien/Kapitel07/PLZO_CSV_LV95/PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
    data = line.strip().split(";") 
    ortschaft = data[0]
    plz = data[1]
    zusatzziffer = data[2]
    gemeinde = data[3]
    bfs = data[4]
    kanton = data[5]
    east = data[6]
    north = data[7]
    sprache = data[8]
    d[gemeinde] = {
            "Ortschaft": ortschaft, 
            "Postleitzahl": plz,
            "Zusatzziffer": zusatzziffer,
            "BFS": bfs,
            "Kanton": kanton,
            "Ost": east,
            "Nord": north,
            "Sprache": sprache}


file.close()

@app.get("/gemeinde")
async def gemeinde(gemeinde: str):
    if gemeinde in d:
        return d[gemeinde]
    else:
        return {"error": "Gemeinde not found"}


uvicorn.run(app, host="127.0.0.1", port=8001)



#Eingabe-Beispiel:
#http://127.0.0.1:8001/gemeinde?gemeinde=Muttenz

#Augabe:
#{"Ortschaft":"Muttenz","Postleitzahl":"4132","Zusatzziffer":"0","BFS":"2770","Kanton":"BL","Ost":"2616256.8110000007","Nord":"1263384.3759999983","Sprache":"de"}