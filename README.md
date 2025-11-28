# DSFA Tool - Datenschutz-Folgenabschätzung nach Art. 22 DSG

Ein modernes Online-Tool zur Durchführung von Datenschutz-Folgenabschätzungen (DSFA) gemäss Art. 22 des schweizerischen Datenschutzgesetzes (DSG).

## Features

- ✅ **Interaktives Formular** für die Eingabe von Sachverhalten
- ✅ **Automatische Risikobeurteilung** basierend auf Art. 22 DSG
- ✅ **Mehrsprachigkeit** (Deutsch/Englisch)
- ✅ **Passwortschutz** für geschützten Zugriff
- ✅ **PDF-Export** mit jsPDF für professionelle Dokumentation
- ✅ **JSON Export/Import** für Backup und Weitergabe
- ✅ **LocalStorage** für gespeicherte Beurteilungen mit Historie
- ✅ **Rechtstexte-Integration** (Art. 22 DSG direkt im Tool)
- ✅ **Moderne UI** mit Tailwind CSS
- ✅ **Responsive Design** für alle Geräte
- 🔄 **OpenAI API Integration** (optional) für KI-gestützte Empfehlungen

## Technologie-Stack

- **Next.js 14** - React Framework
- **TypeScript** - Typsichere Entwicklung
- **Tailwind CSS** - Modernes Styling
- **React Hook Form** - Formular-Handling
- **jsPDF** - PDF-Generierung
- **LocalStorage** - Client-seitige Datenspeicherung

## Installation

1. Dependencies installieren:
```bash
npm install
```

2. Entwicklungsserver starten:
```bash
npm run dev
```

3. Im Browser öffnen: [http://localhost:3000](http://localhost:3000)

## Konfiguration

### Passwortschutz

Das Standard-Passwort ist `dsfa2025`. Um ein eigenes Passwort zu setzen, erstellen Sie eine `.env.local` Datei:

```env
NEXT_PUBLIC_PASSWORD=ihr-passwort
```

### OpenAI API Integration (Optional)

Für KI-gestützte, erweiterte Empfehlungen können Sie die OpenAI API integrieren:

```env
NEXT_PUBLIC_OPENAI_API_KEY=ihr-openai-api-key
```

Die Integration ist in `lib/openai.ts` implementiert und kann in der RiskAssessment-Komponente verwendet werden.

## Projektstruktur

```
├── app/
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Hauptseite
│   └── globals.css         # Globale Styles
├── components/
│   ├── DSFAForm.tsx        # Formular-Komponente
│   ├── RiskAssessment.tsx  # Risikobeurteilungs-Anzeige
│   ├── PasswordProtection.tsx # Passwortschutz
│   ├── LanguageProvider.tsx   # Sprach-Provider
│   ├── LanguageSwitcher.tsx  # Sprach-Umschalter
│   ├── LegalText.tsx        # Rechtstexte-Komponente
│   ├── AssessmentHistory.tsx # Historie gespeicherter Beurteilungen
│   └── JSONImport.tsx       # JSON Import-Komponente
├── lib/
│   ├── dsfa.ts             # DSFA-Logik und Risikobewertung
│   ├── pdfExport.ts        # PDF-Export-Funktionalität
│   ├── storage.ts          # LocalStorage-Management
│   └── openai.ts           # OpenAI API Integration (optional)
└── package.json
```

## DSFA-Logik

Die Risikobewertung basiert auf folgenden Kriterien gemäss Art. 22 DSG:

- Verarbeitung besonders schützenswerter Personendaten
- Grossflächige Verarbeitung von Personendaten
- Automatisierte Entscheidungsfindung
- Datenübermittlung in Drittstaaten
- Systematische Überwachung
- Technische und organisatorische Massnahmen

## Deployment

### Vercel (Empfohlen)

1. Projekt auf GitHub pushen
2. Auf [Vercel](https://vercel.com) importieren
3. Environment Variable `NEXT_PUBLIC_PASSWORD` setzen (optional)
4. Deployen

### Andere Plattformen

```bash
npm run build
npm start
```

## Neue Features im Detail

### PDF-Export
- Professioneller PDF-Export mit jsPDF
- Enthält alle relevanten Informationen der Beurteilung
- Automatische Formatierung und Seitenumbrüche

### LocalStorage & Historie
- Automatische Speicherung aller Beurteilungen
- Historie-Funktion zum Laden früherer Beurteilungen
- Löschen einzelner Einträge möglich

### JSON Export/Import
- Export von Beurteilungen als JSON-Datei
- Import von gespeicherten Beurteilungen
- Nützlich für Backup und Weitergabe

### Rechtstexte
- Direkter Zugriff auf Art. 22 DSG im Tool
- Ausklappbare Komponente für schnellen Zugriff

### OpenAI Integration (Optional)
- KI-gestützte, zusätzliche Empfehlungen
- Erweiterte Risikobewertung basierend auf Projektkontext
- Aktivierung über Environment Variable

## API-Integrationen

Das Projekt unterstützt folgende API-Integrationen:

1. **jsPDF API** - Für PDF-Generierung (client-seitig)
2. **OpenAI API** - Für KI-gestützte Empfehlungen (optional)
3. **LocalStorage API** - Für Client-seitige Datenspeicherung

Für eine **MCP Server Integration** können Sie:
- Einen eigenen MCP Server erstellen, der die DSFA-Logik als Service bereitstellt
- Die OpenAI-Integration erweitern, um MCP-Protokoll zu nutzen
- Eine Backend-API erstellen, die als MCP Server fungiert

## Rechtsgrundlage

Dieses Tool basiert auf **Art. 22 DSG (Schweiz)** - Datenschutz-Folgenabschätzung.

## Lizenz

Dieses Projekt wurde für akademische Zwecke erstellt.

## Support

Bei Fragen oder Problemen öffnen Sie bitte ein Issue im Repository.

