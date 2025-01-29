
## Interessante Takeaways

Motorrad wird meist nicht zurückgegeben von API, deshalb müssen alle Komponenten mit einem optionalen Wert umgeehen können.

Umrechnen der Meter/Sekunden in user-freundliche Strings war schwieriger als angenommen. 
Wir mussten mit einem breiten Spektrum an Zeitmassen umgehen, 
von wenigen Sekunden bis einigen Tagen, und immer sinnvoll runden.

Auch die Skalierung der Y-Achse des Diagramms war schwieriger als gedacht.
Einerseits mussten wir sinnvoll runden, aber auch verhindern, 
dass durch Rundungsfehler zwei identische Ticks angezeigt werden.
Schlussendlich war die einzige Lösung, die max. Anzahl Ticks zu verkleinern.

Unittests haben sich als nützliches Hilfsmittel erwiesen.
