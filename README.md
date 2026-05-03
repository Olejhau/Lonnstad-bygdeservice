# Lønnstad Bygdeservice

Dette repoet inneholder nettsiden til **Lønnstad Bygdeservice**.

Nettsiden er satt opp som en enkel statisk nettside for GitHub Pages. Den bruker vanlig HTML, CSS og JavaScript, uten React, Vite eller annen bygging.

## Innhold på nettsiden

- Forside med hero-bilder
- Tjenesteoversikt
- Bildegalleri
- Kontaktskjema via EmailJS
- Om Lønnstad Bygdeservice
- Kart med adresse
- Kontaktinformasjon

## Filstruktur

```txt
lonnstad-bygdeservice/
├── index.html
├── style.css
├── script.js
├── .nojekyll
├── README.md
└── bilder/
    ├── lonnstad.svg
    ├── hero/
    │   └── legg hero-bilder her
    ├── galleri/
    │   └── legg galleri-/arbeidsbilder her
    └── icons/
        ├── dumper-truck-svgrepo-com.svg
        ├── excavator-svgrepo-com.svg
        ├── tractor-svgrepo-com.svg
        ├── tree-svgrepo-com.svg
        ├── trucking-truck-svgrepo-com.svg
        ├── wheat-svgrepo-com.svg
        └── wrench-screwdriver-tool-options-svgrepo-com.svg
```

## Hva de viktigste filene gjør

### `index.html`

Hovedfilen for nettsiden. Denne inneholder selve HTML-strukturen for forsiden, tjenester, kontakt, om-seksjon, kart og footer.

### `style.css`

Egne CSS-regler for navigasjon, skjema, bildekarusell og små justeringer.

Siden bruker også Tailwind via CDN i `index.html`, så det trengs ingen lokal Tailwind-installasjon.

### `script.js`

JavaScript for:

- å hente bilder fra GitHub
- å vise hero-bilder
- å vise bildegalleri
- å fylle inn tjenestelisten
- å sende kontaktskjema via EmailJS

### `.nojekyll`

Forteller GitHub Pages at siden skal publiseres som rene statiske filer, uten Jekyll-behandling.

## Bilder

Hero-bilder legges her:

```txt
bilder/hero
```

Galleri-/arbeidsbilder legges her:

```txt
bilder/galleri
```

Nettsiden henter automatisk:

- de 3 nyeste bildene fra `bilder/hero`
- de 15 nyeste bildene fra `bilder/galleri`

Bilder kan være i formatene:

```txt
jpg, jpeg, png, webp, gif, svg
```

## GitHub Pages-oppsett

Gå til repoet på GitHub og gjør dette:

1. Gå til **Settings**
2. Velg **Pages** i menyen
3. Under **Build and deployment**, velg:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
4. Trykk **Save**

Etter kort tid vil GitHub Pages vise en publiseringsadresse.

## Lokal forhåndsvisning

Siden kan åpnes direkte ved å dobbeltklikke på:

```txt
index.html
```

For mest riktig test anbefales det å bruke en enkel lokal server, for eksempel med VS Code-utvidelsen **Live Server**.

Det trengs ikke:

```txt
npm install
npm run dev
npm run build
```

## Kontaktskjema

Kontaktskjemaet bruker EmailJS.

Verdiene ligger i `script.js`:

```js
emailjs.init({ publicKey: "rMLcYfRxvLAxe13ur" });
emailjs.sendForm("service_r2q8u3s", "template_zo1skyk", contactForm);
```

Mottaker i skjemaet er satt til:

```txt
jotormh@online.no
```

## Viktige innstillinger i `script.js`

Disse verdiene styrer hvor nettsiden henter bilder fra:

```js
const GITHUB_OWNER = "olejhau";
const GITHUB_REPO = "lonnstad-bygdeservice";
const GITHUB_BRANCH = "main";
const HERO_IMAGE_FOLDER = "bilder/hero";
const GALLERY_IMAGE_FOLDER = "bilder/galleri";
```

Hvis repoet bytter navn eller flyttes til en annen GitHub-bruker, må disse oppdateres.

## Vedlikehold

For å oppdatere nettsiden:

1. Endre tekst i `index.html`
2. Endre utseende i `style.css`
3. Endre funksjoner i `script.js`
4. Last opp nye bilder i `bilder/hero` eller `bilder/galleri`

Når endringene er lagret på `main`, publiseres de automatisk via GitHub Pages.

## Teknologi

Nettsiden bruker:

- HTML
- CSS
- JavaScript
- Tailwind CDN
- EmailJS
- GitHub Pages

Det er ikke lenger React/Vite-oppsett i repoet.
