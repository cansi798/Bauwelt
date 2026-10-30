// Weiß/Creme-Wechsel der Abschnitte (Sicherheitsnetz, siehe BaseLayout.astro). Eigene Datei wegen CSP (Sicherheitsbericht N1).
(function () {
  var m = document.getElementById("main");
  if (!m) return;
  function run(parent) {
    var prev = "dunkel";
    for (var c = parent.firstElementChild; c; c = c.nextElementSibling) {
      if (c.hidden) continue;
      if (c.matches("section.section:not(.section--dark)")) {
        var farbe = prev === "weiss" ? "creme" : "weiss";
        if (c.classList.contains("section--sand") !== (farbe === "creme")) falsch++;
        c.classList.toggle("section--sand", farbe === "creme");
        prev = farbe;
      } else if (c.matches("div") && c.querySelector(":scope > section.section")) {
        run(c);
        prev = "dunkel";
      } else {
        prev = c.classList.contains("phero") ? "weiss" : "dunkel";
      }
    }
  }
  var falsch = 0;
  run(m);
  if (falsch) console.warn("Weiß/Creme-Wechsel: " + falsch + " Abschnitt(e) im HTML anders gefärbt – Klasse section--sand auf der Seite anpassen");
})();
    
