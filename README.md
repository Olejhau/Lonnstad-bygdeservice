# Lønnstad Bygdeservice – nettside

Dette er en statisk nettside for Lønnstad Bygdeservice.

## Filer

- `index.html` – forsiden
- `styles.css` – farger, layout og mobiltilpasning
- `script.js` – bildekarusell, mobilmeny og EmailJS-skjema
- `personvern.html` – enkel personvernerklæring
- `assets/lonnstad.svg` – logo
- `assets/hero/` – forsidebilder
- `assets/gallery/` – bilder av utført arbeid

## Bilder

Siden er klar for ekte bilder av utført arbeid.

Legg forsidebilder her:

- `assets/hero/hero-1.jpg`
- `assets/hero/hero-2.jpg`
- `assets/hero/hero-3.jpg`

Legg bilder til karusellen her:

- `assets/gallery/arbeid-1.jpg`
- `assets/gallery/arbeid-2.jpg`
- `assets/gallery/arbeid-3.jpg`
- `assets/gallery/arbeid-4.jpg`
- `assets/gallery/arbeid-5.jpg`
- `assets/gallery/arbeid-6.jpg`
- `assets/gallery/arbeid-7.jpg`

Du kan også endre filnavnene i `script.js` hvis bildene heter noe annet.

## Kontaktskjema

Skjemaet bruker EmailJS og sender til:

`jotormh@online.no`

Oppsettet ligger i `script.js`:

- Public key: `rMLcYfRxvLAxe13ur`
- Service ID: `service_r2q8u3s`
- Template ID: `template_zo1skyk`

EmailJS-template bør ha disse feltene:

- `to_email`
- `name`
- `email`
- `phone`
- `message`
- `consent`

## Kontaktinfo på siden

- Firma: Lønnstad Bygdeservice
- Eier/driver: Jostein Haugen
- Telefon: 970 10 163
- E-post: jotormh@online.no
- Adresse: Søre Jørstad veg 54, 2625 Fåberg
- Org.nr.: 934 594 770

## Før publisering

1. Legg inn ekte bilder i `assets/hero/` og `assets/gallery/`.
2. Test EmailJS-skjemaet med en ekte innsending.
3. Åpne siden på mobil og sjekk meny, bilder, skjema og kart.
4. Last opp alle filer til webhotellet/repoet.
