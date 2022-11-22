import uvicorn
import sqlalchemy
import databases
from fastapi import FastAPI, Form, Request, Depends, status
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException

database = databases.Database('sqlite:///datenbank.db')
engine = sqlalchemy.create_engine('sqlite:///datenbank.db', 
            connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

metadata.create_all(engine)

app = FastAPI()
templates = Jinja2Templates(directory="Uebung8/templates/")

manager = LoginManager("jsk2e1urh3fkudjrtsrs371", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp"

DB = {"user1": {"name": "Hans Muster", 
                "email": "hanswurst@gmail.com",
                "passwort": "12345"},
      "user2" : {
                "name": "Alexandra Meier",
                "email": "ameier@gmx.net",
                "passwort": "pass"}
    }

# Funktion um User aus Datenbank zu laden ---------------------------------------------------

@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user


@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    if user["passwort"] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data = {"sub": username})
    global currentUser
    currentUser = username

    resp = RedirectResponse(url = "/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)

    return resp

# LOGIN -----------------------------------------------------------------------------------

@app.get("/login")
def login():
    file = open("Uebung8/templates/login.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)

# neue Nachricht --------------------------------------------------------------------------

@app.get("/new")
async def create_note(request: Request, user=Depends(manager)):
    return templates.TemplateResponse("new.html",context={"request": request})

@app.post("/new")
async def post_note(request: Request, titel=Form(), text=Form(), user = Depends(manager)):
    query = notes.insert().values(title=titel, text=text, user = currentUser)
    myid = await database.execute(query)
    return templates.TemplateResponse("new.html", context={"request": request})
    
@app.get("/notes")
async def read_notes():
    query = notes.select()
    return await database.fetch_all(query)

@app.on_event("startup")
async def startup():
    print("Verbinde Datenbank")
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Beende Datenbank Verbindung")
    await database.disconnect()


@app.get(f"""/users/Hans""" )
async def read_notes():
    query = notes.select().where(notes.c.user== "user1")
    return await database.fetch_all(query)

@app.get(f"""/users/Alexandra""" )
async def read_notes():
    query = notes.select().where(notes.c.user== "user2")
    return await database.fetch_all(query)


uvicorn.run(app, host="127.0.0.1", port=8000)



# Eingabe bzw. Ausgabe ----------------------------------------------------------------
"""
Beispiel:
http://127.0.0.1:8000/login :
Username: user1 (Hans Muster)
Password: 12345, dann Sign In Button drücken
http://127.0.0.1:8000/new :
Titel und Text Eingabe, dann Senden Button drücken
http://localhost:8000/users/Hans :
Ausgabe:
[{"id":1,"user":"user1","title":"jbkj","text":"t"},
{"id":2,"user":"user1","title":"khdj","text":"hdj"},
{"id":3,"user":"user1","title":"sf","text":"sgrg"},
{"id":4,"user":"user1","title":"skjfbkbsf","text":"mndfkajbfja"},
{"id":5,"user":"user1","title":"hjvkut","text":"jshvfj"}]
Alle Kurznachrichten von user1 = Hans werden als Liste von JSON Objekt angezeigt
"""
