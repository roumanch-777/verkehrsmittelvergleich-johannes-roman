# Lessons Learned

## Einleitende Gedanken

Wir hatten zuvor beide keine Erfahrung in Webentwicklung, 
deshalb benötigten wir anfangs viel Zeit, um uns vertraut zu machen 
mit den Basics von Javascript, Typescript, Node, React, JSX/TSX und CSS.

## Asynchrone Callbacks (Johannes)

Besonders schwierig fand ich das Konzept der asynchronen Callbacks. 
Ich komme aus der Python CLI Programmierung, wo eine Funktion die andere aufruft und wartet, bis sie zurückkehrt.
Deshalb wollte ich die Formatierung der API responses zuerst auch so implementieren, doch es hat nicht funktioniert.
Es hat lange gedauert, bis ich verstanden habe, dass ich folgendes React-spezifische Pattern anwenden muss:

```typescript
// App.tsx
const [travelData, setTravelData] = useState();
getTravelData(from, to, setTravelData);
return <ComparisonTable travelData={travelData} />;

// googleMapsAPI.ts
async function getTravelData(
    from: string,
    to: string, 
    setTravelData: (data) => void,
): Promise<void> {
    // make API calls to obtain `drive`, `bicycle`, ...)
    setTravelData({ drive, bicycle, walk, twoWheeler, transit });
}
```

Dieses Pattern ist sehr ungewohnt für mich, aber ich finde es interessant.

## Optionale Werte (Johannes)

Die Google Routes API gibt nicht immer für jedes Verkehrsmittel eine Antwort.
Beispielsweise für das Motorrad wird fast nie etwas zurückgegeben.
Deshalb müssen alle Komponenten mit einem optionalen Wert umgehen können.

## Formatierung und Rundung der Rohdaten (Johannes)

Als überraschend komplex hat sich die Umrechnung der Rohdaten herausgestellt.
Die Distanzen und Zeiten werden in Metern/Sekunden zurückgegeben,
also mussten wir z.B. 19990s umrechnen zu 5h 33min 10s, und dann runden auf 5h 35min.

Wir mussten mit einem breiten Spektrum an Zeitmassen umgehen, 
von wenigen Sekunden bis zu einigen Tagen, und immer sinnvoll runden.

Bei den Tabellenwerten sind die Folgen einer ungünstigen Rundung vernachlässigbar,
aber nicht so bei der Skalierung der Y-Achse des Balkendiagramms.
Wir mussten verhindern, dass durch Rundungsfehler zwei identische Ticks angezeigt werden.
Wenn beispielsweise eine Reise zu Fuss 960m weit ist, und mit dem Auto 1030 m,
dann muss verhindert werden, dass zwei separate Ticks "1000m" und "1km" angezeigt werden.

Unittests haben sich als nützliches Hilfsmittel erwiesen,
und ebenso die Reduzierung der maximalen Anzahl Ticks.

## Unittests mit Jest (Johannes)

Ich habe viel Erfahrung mit Unit Tests in Python,
doch die Herangehensweise in Typescript ist anders als gewohnt. 
Mir gefällt die Ähnlichkeit zur natürlichen Sprache,
wie z.B. in untenstehendem Beispiel: 
"describe the function ... : It should do ...: expect function(argument) to be expected return value"

```typescript
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("computeDurationAxis", () => {
    it("should round with 0.5 day precision for values {x | x >= 1d}", () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1d");
    });
});
```

## Schlussgedanke (Johannes)

Einerseits finde ich es ein wenig schade, dass unser Produkt nun eher dürftig ausgefallen ist, 
andererseits war es für mich eine sehr wertvolle Erfahrung, bei der ich sehr viel gelernt habe.
