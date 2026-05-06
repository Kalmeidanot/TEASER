# PokeDecks Teaser — Handoff

Sist oppdatert: 2026-05-06
Branch: `master` — repo: https://github.com/Kalmeidanot/TEASER.git

---

## Hva er dette?

En teaser-landingsside for **PokeDecks** — norsk markedsplass for samlere av Pokémon-byttekort. Siden publiseres midlertidig på `pokedecks.no` og byttes ut med hovedprosjektet ved lansering (sommer 2026).

Siden er **ren HTML/CSS/JS** — ingen build-steg, ingen dependencies, ingen backend ennå.

---

## Kjøring lokalt

Ingen installasjon nødvendig. To alternativer:

```bash
# Alternativ 1 — npx serve (anbefalt, korrekte MIME-typer)
npx serve .

# Alternativ 2 — Python
python -m http.server 8080
```

Åpne `http://localhost:8080` i nettleseren. Alternativt: dobbeltklikk på `index.html` direkte.

---

## Filstruktur

```
/
├── index.html       # Hele siden — HTML, CSS og JS i én fil
├── .gitignore       # Ekskluderer .claude/ og systemfiler
├── handoff.md       # Denne filen
└── Teaser v2.html   # Original designfil (ikke i Git, kun lokal backup)
```

---

## Hva er implementert

### Design og UX
- Fire scroll-snap slides: intro, salgsboder, auksjoner, lansering
- 16-bit pixel art bakgrunn (sky, fjell, trær, mark) — lyst og mørkt tema
- Liquid glass-panels med backdrop-filter
- Dag/natt-toggle med localStorage-persistering
- Mobilvennlig (breakpoints på 680px og 380px)

### E-postskjema
- Tre skjemaer (slide 1, 2 og 3) — deler tilstand
- Validering: e-postformat + samtykke-checkbox må være avkrysset
- Feilmeldinger med `aria-live` og fokusstyring
- Etter vellykket innsending: skjema fader ut (300ms), bekreftelse vises
- Ved sideopplasting: skjermstatus gjenopprettes fra localStorage uten animasjon
- **OBS: E-post lagres foreløpig KUN i localStorage på brukerens enhet — ingen server**

### Samtykke / GDPR
- Samtykke-checkbox ved hvert skjema med `for`/`id`-kobling
- Innsending blokkeres uten avkrysning
- Lenke til personvernmodal i samtykke-teksten

### Modaler (footer-lenker)
- **Personvern** — fullstendig tekst, ærlig om localStorage-status
- **Vilkår** — placeholder, klar for innhold
- **Informasjonskapsler** — forklarer localStorage vs. cookies
- **Kontakt** — e-postadresse (se TODO under)
- Lukkes med ✕-knapp, Escape-tast eller klikk utenfor

### Tilgjengelighet
- Semantisk HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`)
- `aria-label`, `aria-labelledby`, `aria-live`, `aria-invalid`
- `focus-visible`-stiler på alle interaktive elementer
- Tastaturnavigasjon fungerer

### localStorage-nøkler
| Nøkkel | Innhold |
|---|---|
| `pokedecks_teaser_signup_completed` | `"1"` når skjema er sendt |
| `pokedecks_teaser_signup_email` | E-postadressen som ble oppgitt |
| `pd-theme` | `"light"` eller `"dark"` |

---

## TODO-liste

### P0 — Må gjøres før e-post faktisk samles inn

- [ ] **Koble til backend for e-postlagring**
  Koden er klar med en tydelig TODO-kommentar på linje ~1129 i `index.html`.
  Tre realistiske alternativer — velg ett:

  | Alternativ | Kompleksitet | Kostnad | Anbefalt hvis |
  |---|---|---|---|
  | **Netlify Forms** | Lav | Gratis (100 innsendinger/mnd) | Siden deployes på Netlify |
  | **Formspree** | Lav | Gratis (50/mnd), $10/mnd for mer | Rask oppsett, ingen deploy-krav |
  | **Supabase** | Middels | Gratis tier holder lenge | Vil bruke Supabase til resten av prosjektet |

  Etter valg: fjern localStorage-blokken fra submit-handleren og bytt med `fetch`-kall. Husk å lagre tidspunkt og kilde-slide.

- [ ] **Oppdater kontakt-e-postadresse**
  Kontaktmodalen bruker `hei@pokedecks.no` som placeholder. Bytt til faktisk adresse.

- [ ] **Oppdater personvernmodalen**
  Når backend er valgt: oppdater "Lagring"-seksjonen med korrekte opplysninger om hvilken tjeneste som brukes, hvor data lagres (land/region) og oppbevaringstid. Gjelder linje ~986 i `index.html`.

### P1 — Bør gjøres før lansering

- [ ] **Deploy**
  Anbefalt: Netlify (gratis, kobler automatisk til GitHub-repoet).
  1. Logg inn på netlify.com
  2. "Add new site" → "Import from Git" → velg `Kalmeidanot/TEASER`
  3. Build command: ingen (tom). Publish directory: `.`
  4. Deploy.

- [ ] **DNS — pek pokedecks.no til deploy-tjenesten**
  Legg til CNAME- eller A-record hos domeneregistrar. Netlify/Vercel viser nøyaktig hvilke verdier som trengs etter deploy.

- [ ] **Fullstendige brukervilkår**
  Modal-teksten er en placeholder (linje ~1013). Skriv inn faktiske vilkår.

- [ ] **HTTPS / SSL**
  Netlify og Vercel håndterer dette automatisk via Let's Encrypt. Sjekk at det er aktivert.

- [ ] **Favicon**
  Legg til `<link rel="icon">` i `<head>` og en `favicon.ico` / `favicon.svg`.

### P2 — Nice to have

- [ ] **Analytics**
  Ingen cookies nødvendig. Anbefalte alternativer:
  - [Plausible](https://plausible.io) (betalt, GDPR-vennlig, ingen cookies)
  - [Umami](https://umami.is) (åpen kildekode, kan self-hostes gratis)
  Husk å oppdatere informasjonskapsler-modalen og legg til i `<head>` (linje ~9).

- [ ] **Open Graph / sosiale meta-tagger**
  Legg til `og:title`, `og:description`, `og:image` i `<head>` for bedre deling på sosiale medier.

- [ ] **Prefers-reduced-motion**
  Legg til media query som deaktiverer scroll-cue-animasjonen og fade-out for brukere som har bedt om redusert bevegelse:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .is-fading-out { transition: none; }
    .scroll-cue { animation: none; }
  }
  ```

- [ ] **Norsk språkstøtte for input**
  `autocomplete="email"` er satt. Vurder å legge til `lang="nb"` på `<html>` — allerede gjort.

- [ ] **Test i Safari / iOS**
  `backdrop-filter` og `dialog`-elementet oppfører seg litt annerledes i WebKit. Verdt en visuell sjekk.

---

## Tekniske valg og begrunnelse

| Valg | Begrunnelse |
|---|---|
| Ren HTML/CSS/JS — ingen framework | KISS. Siden er statisk innhold. Ingen build-steg = ingenting som kan brekke. |
| `<dialog>`-element for modaler | Native, tilgjengelig, håndterer focus-trap og Escape automatisk. |
| `localStorage` for skjemastatus | Unngår at brukeren ser skjemaet på nytt etter refresh. Ingen cookies. |
| Scroll-snap med `scroll-snap-type: y mandatory` | Ryddig slide-for-slide-opplevelse uten JavaScript. |
| Tre separate skjemaer, delt tilstand | Én registrering er nok uansett hvilken slide brukeren er på. |
| Ingen build-tool / bundler | Én fil = én deployment. Ingen npm, ingen Vite, ingen CI-avhengighet. |

---

## Kjente begrensninger

- E-post samles ikke inn på server ennå — dette er det viktigste gapet.
- Ingen server-side validering av e-post.
- `color-mix()` og `text-wrap: balance/pretty` krever relativt nye nettlesere (Chrome 111+, Firefox 113+, Safari 16.4+). Siden degrader pent i eldre versjoner.
- Kontaktadressen i modalene er placeholder.

---

## Kontekst om prosjektet

- Teaser-siden er midlertidig på `pokedecks.no`. Domenet flyttes til hovedprosjektet etter lansering.
- Hovedprosjektet (selve markedsplassen) er under planlegging — dette repoet er uavhengig av det.
- Lansering planlagt sommer 2026.
