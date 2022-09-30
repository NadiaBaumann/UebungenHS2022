//Uebung02 von Nadia Baumann, G3


"use strict"

// Aufgabe 1:
var L = [];
for (var i=1; i<100; i=i+2) { 
    L.push(i);
}
console.log(L);



console.log("-------");



// Aufgabe 2:
function wuerfeln() {
    var zufallszahl = 6*Math.random();
    var augenzahl = Math.floor(zufallszahl)+1;
    return augenzahl;
}
console.log(wuerfeln());