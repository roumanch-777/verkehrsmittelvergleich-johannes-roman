# CAS Programmierarbeit: Verkehrsmittel-Vergleich 

Studenten:               Roman Leuenberger, Johannes Nussbaum 

Thematische Anbindung:   Jürg Nietlispach: Funktionale Programmierung 

Studiengang:             CAS Modern Software Engineering & Development 

## Aufgabenstellung 

Im Rahmen des CAS müssen wir eine Programmierarbeit durchführen. Aufwand ca. 40 Stunden. Die Arbeit besteht aus 2 Teilen: 

Code (muss lauffähig sein, aber eher prototyp-mässig) 

UML 

## Unsere Idee 
Eine einfache Webpage machen, welche für ein Startort-Zielort-Paar verschiedene Transportmittel anzeigt. Die verschiedenen Optionen können dann verglichen werden punkto Kilometer, Zeit, Kosten, Ökologischem Fussabdruck, etc. 

Man kann Startort und Zielort in 2 Textfeldern angeben und einen Button klicken. Dann senden die JS Scripts die API-Anfrage, deren Antwort wir für den User schön darstellen. 

Die Google Routes API ist öffentlich verfügbar (https://developers.google.com/maps/documentation/routes). Man muss einen Account erstellen und Kreditkartendaten hinterlegen. Die Karte wird aber erst belastet, sobald man eine bestimmte Anzahl Abfragen überschreitet. Man kann im Google Konto einstellen, dass man eine Warnnachricht bekommt, wenn es zu teuer wird. 

## Technische Umsetzung 
Ein GitHub Repo mit einem HTML-File, das man anklicken kann. Daneben ein paar Javascript/Typescript Dateien, welche die API-Anfragen machen.  

Programmierstil: Funktional. 
