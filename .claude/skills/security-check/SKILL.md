---
name: security-check
description: Prüft Sicherheit bei jeder Code-Änderung an dieser Website. Verwenden beim Schreiben, Reviewen oder Deployen von Code, beim Anbinden von Formularen/Backends, beim Einbetten von Drittanbietern (Buchung, Karten, Analytics) und vor jedem Commit/Push. Deckt Secrets, XSS, Abhängigkeiten, Formular-Sicherheit, HTTP-Header und DSGVO ab.
---

# Security-Check (Bauwelt Handwerk Website)

Vor Abschluss einer Änderung diese Punkte durchgehen. Nur abhaken, was tatsächlich geprüft wurde – bei Unsicherheit nachschauen, nicht raten.

## Immer prüfen
- **Keine Secrets im Repo:** Keine API-Keys, Tokens, Passwörter, Zugangsdaten in Code, Commits oder `astro.config`. Secrets gehören in GitHub Actions Secrets / Umgebungsvariablen, niemals ins Git.
- **Keine personenbezogenen Daten** versehentlich committen (echte Kundendaten, E-Mail-Verläufe).
- **Abhängigkeiten:** Nach `npm install` auf Warnungen achten. Regelmäßig `npm audit` (bzw. `npm audit fix`) laufen lassen; kritische Lücken vor Deploy schließen.

## Dynamische Inhalte (XSS)
- Astro escaped Ausdrücke `{...}` automatisch – **gut**.
- **`set:html` ist gefährlich:** nur mit vertrauenswürdigem/eigenem Inhalt verwenden, nie mit Nutzereingaben oder ungeprüften externen Daten. Aktuell nur für JSON-LD genutzt (ok).
- Content Collections (Markdown) stammen aus dem Repo → vertrauenswürdig. Kämen Inhalte je aus externen Quellen, vor Ausgabe säubern.

## Formulare & Backend (sobald angebunden)
- Eingaben **serverseitig validieren und säubern** (nicht nur im Browser). Clientseitige `required`-Checks sind nur UX.
- **Spam/Abuse:** Honeypot-Feld oder Captcha, Rate-Limiting beim Formular-Dienst.
- **Keine sensiblen Daten per GET/URL.** POST + HTTPS.
- Beim gewählten Dienst (z. B. Formspree/Web3Forms) prüfen: Wohin gehen die Daten? Auftragsverarbeitungsvertrag (AVV) vorhanden? Server-Standort?
- E-Mail-Adressen im Quelltext werden von Bots gesammelt – abwägen (mailto ist ok, aber bewusst).

## Drittanbieter-Einbettungen (Buchung, Karten, Analytics)
- Jede eingebettete Ressource (iframe, Skript) lädt fremden Code → **Vertrauen + Datenschutz prüfen**.
- Karten/Buchung erst **nach Einwilligung** laden (Consent), sonst Datenabfluss ohne Zustimmung.
- Externe Skripte möglichst mit `defer`, idealerweise self-hosted; Herkunft prüfen.

## Links & Header
- Externe Links mit `target="_blank"` **immer** `rel="noopener"` (verhindert `window.opener`-Zugriff). Aktuell erfüllt (WhatsApp-Links).
- Nur **HTTPS**-Ressourcen laden (kein Mixed Content).
- Später bei eigener Domain: Security-Header erwägen (CSP, X-Content-Type-Options, Referrer-Policy). Auf GitHub Pages nur begrenzt setzbar – bei eigenem Hosting umsetzen.

## DSGVO / Datenschutz
- Schriften **lokal** hosten (erfüllt) – keine externen Font-CDNs.
- Kein Tracking/Cookies ohne Consent. Wird Analytics/Karte/Buchung ergänzt → Consent-Banner + Datenschutzerklärung aktualisieren.
- Datenschutzerklärung ist ein **Entwurf** – vor Livegang juristisch prüfen lassen.

## Vor jedem Commit/Push
- `git status` / `git diff` sichten: nichts Vertrauliches, keine `.env`, keine Keys, keine großen Binärdumps.
- Build läuft fehlerfrei (`node node_modules/astro/astro.js build`).
