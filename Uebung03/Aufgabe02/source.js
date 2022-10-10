//Uebung03 von Nadia Baumann, G3


// Aufgabe 2:
function datumzeit(){
    zeit();
    datum();
    changestyle();
}

function zeit(){
    var d = new Date();
    var ts = d.toTimeString();
    var b = document.getElementById("text1");
    b.innerHTML = "aktuelle Zeit:" + " " + ts;
    setInterval(zeit, 1000);
}


function datum(){
    var d = new Date();
    var ds = d.toDateString();
    var a = document.getElementById("text2");
    a.innerHTML = "aktuelles Datum:" + " " + ds;
    setInterval(datum, 1000);
}

function changestyle(){
    var a = document.getElementById("text2");
    a.style["font-size"] = "50px";
    a.style["text-align"] = "center";
    var b = document.getElementById("text1");
    b.style["font-size"] = "50px";
    b.style["text-align"] = "center";
}
 