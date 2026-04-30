# Lønnstad Bygdeservice

Dette er nettsiden for Lønnstad Bygdeservice.

## Innhold

- Forside med hero-bilder fra GitHub
- Mine tjenester
- Bildekarusell med de nyeste bildene fra GitHub
- Kontaktskjema med EmailJS
- Presentasjon av Jostein Haugen
- Kart

## Filstruktur

```txt
lonnstad-bygdeservice/
├── index.html
├── package.json
├── README.md
├── bilder/
│   ├── README.md
│   ├── hero/
│   │   └── .gitkeep
│   └── galleri/
│       └── .gitkeep
├── public/
│   ├── logo.svg
│   └── icons/
│       ├── dumper-truck.svg
│       ├── excavator.svg
│       ├── tractor.svg
│       ├── tree.svg
│       ├── trucking-truck.svg
│       ├── wheat.svg
│       └── tools.svg
└── src/
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Slik legger du det opp på GitHub

1. Opprett et nytt repo som heter:

```txt
lonnstad-bygdeservice
```

2. Last opp alle filene og mappene i denne pakken.

3. Pass på at repoet er public dersom bildehentingen fra GitHub skal fungere uten innlogging.

4. Legg hero-bilder i:

```txt
bilder/hero
```

5. Legg galleri-/prosjektbilder i:

```txt
bilder/galleri
```

Nettsiden henter automatisk:

- de 3 nyeste bildene fra `bilder/hero`
- de 15 nyeste bildene fra `bilder/galleri`

## Lokal kjøring

Installer avhengigheter:

```bash
npm install
```

Start lokal forhåndsvisning:

```bash
npm run dev
```

Bygg siden:

```bash
npm run build
```

## GitHub Pages

For Vite/React må GitHub Pages vanligvis settes opp med GitHub Actions, Netlify eller Vercel. En enkel løsning er å koble repoet til Netlify/Vercel og la de bygge med:

```txt
Build command: npm run build
Publish directory: dist
```

## Viktige innstillinger i koden

I `src/App.jsx` ligger disse verdiene:

```js
const GITHUB_OWNER = "olejhau";
const GITHUB_REPO = "lonnstad-bygdeservice";
const GITHUB_BRANCH = "main";
```

Hvis repoet får et annet navn eller ligger på en annen bruker, må disse endres.

## Kontaktskjema

Kontaktskjemaet bruker EmailJS med disse verdiene i `src/App.jsx`:

```js
publicKey: "rMLcYfRxvLAxe13ur"
service: "service_r2q8u3s"
template: "template_zo1skyk"
```

Mottaker er satt til:

```txt
jotormh@online.no
```
