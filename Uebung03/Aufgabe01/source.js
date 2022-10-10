//Uebung03 von Nadia Baumann, G3


// Aufgabe 1:
function start(){

    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var col = "rgb(" + r + "," + g + "," + b + ")";

    var text = document.querySelector("#text");
    text.style["color"] = col;
    text.style["font-size"] = "100px";

    var output = document.querySelector("#output").value;
    document.getElementById("text").innerHTML = output;

}


    