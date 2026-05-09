# PokeDecks Teaser — Handoff

Sist oppdatert: 2026-05-09
Branch: `master` — repo: https://github.com/Kalmeidanot/TEASER.git

---

## Hva er dette?

En teaser-landingsside for **PokeDecks** — norsk markedsplass for samlere av Pokémon-byttekort. Siden publiseres midlertidig på `pokedecks.no` og byttes ut med hovedprosjektet ved lansering (sommer 2026).

Siden er **ren HTML/CSS/JS** — ingen build-steg, ingen dependencies, ingen server å drifte.

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

**Merk:** Netlify Forms fungerer kun på den deployede siden. `fetch('/')` treffer ingenting lokalt — du vil se en feilmelding i UI etter submit. Alt annet (validering, samtykke, honeypot, loading-state, localStorage) kan testes lokalt som normalt.

---

## Filstruktur

```
/
├── index.html       # HTML, metadata, statiske Netlify Forms og minimal inline head-script
├── styles.css       # Layout, responsive regler, modaler, forms, språkvelger, light/dark styling og bakgrunner
├── script.js        # Språklogikk, theme toggle, form submit, localStorage, modaler og scroll cue
├── Images/          # Bakgrunnsbilder
├── .gitignore       # Ekskluderer .claude/, systemfiler og lokal designbackup
├── handoff.md       # Denne filen
└── Teaser v2.html   # Original designfil (ikke i Git, ignorert lokal backup)
```

---

## Hva er implementert

### Design og UX
- Fire scroll-snap slides: intro, salgsboder, auksjoner, lansering
- 16-bit pixel art bakgrunn (sky, fjell, trær, mark) — lyst og mørkt tema
- Liquid glass-panels med backdrop-filter
- Dag/natt-toggle med localStorage-persistering
- **Norsk/engelsk språkvelger** (`NO · EN`-pill i toppnav) med localStorage-persistering
- Mobilvennlig (breakpoints på 680px og 380px)

### E-postskjema og Netlify Forms
- Tre skjemaer (slide 1, 2 og 3) — deler tilstand, alle sender til samme Netlify-skjema
- Validering: e-postformat + samtykke-checkbox må være avkrysset
- Honeypot-felt (`bot-field`) for spam-blokkering — usynlig for ekte brukere
- Loading-state på knappen under sending (`Sender…`)
- Etter vellykket innsending: skjema fader ut (300ms), bekreftelse vises
- Ved serverfeil: knapp gjenopprettes, feilmelding vises, brukeren kan prøve igjen
- Ved sideopplasting: tilstand gjenopprettes fra localStorage uten animasjon

#### Netlify Forms-detaljer
- **Skjemanavn:** `pokedecks-interest`
- **Endpoint:** `POST /` med `Content-Type: application/x-www-form-urlencoded`
- **Felter som sendes:**

| Felt | Innhold |
|---|---|
| `email` | E-postadressen brukeren oppga |
| `source` | Hvilken slide: `intro`, `sales_booth` eller `auction` |
| `consent` | Alltid `yes` (skjema kan ikke sendes uten samtykke) |
| `language` | `no` eller `en` — valgt språk ved innsending |
| `submitted_at` | ISO 8601-tidsstempel satt av JavaScript ved innsending |
| `form-name` | `pokedecks-interest` (kreves av Netlify) |
| `bot-field` | Tom for ekte brukere — bots fyller dette og avvises stille |

#### Finne innsendinger i Netlify
1. Logg inn på [netlify.com](https://netlify.com)
2. Velg riktig site
3. Gå til **Forms** i toppmenyen
4. Velg **pokedecks-interest**
5. Innsendinger vises under **Verified submissions** — spam under **Spam submissions**
6. Du kan eksportere til CSV fra dashboardet

#### Sette opp e-postvarsling
**Forms → pokedecks-interest → Form notifications → Add notification → Email notification**
Legg inn e-postadressen du vil varsles på. Da får du en e-post for hver nye påmelding.

### Samtykke / GDPR
- Samtykke-checkbox ved hvert skjema med `for`/`id`-kobling
- Innsending blokkeres uten avkrysning
- `consent: yes` sendes eksplisitt til Netlify og logges med innsendingen
- Lenke til personvernmodal i samtykke-teksten

### Modaler (footer-lenker)
- **Personvern** — forklarer Netlify Forms, formål, rettigheter og localStorage
- **Vilkår** — kortfattet pre-lanseringstekst, fullstendige vilkår publiseres ved lansering
- **Informasjonskapsler** — forklarer at siden ikke bruker cookies, kun localStorage
- **Kontakt** — `hei@pokedecks.no`
- Alle modaler har norsk og engelsk innhold (vises basert på valgt språk)
- Lukkes med ✕-knapp, Escape-tast eller klikk utenfor

### Tilgjengelighet
- Semantisk HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`)
- `aria-label`, `aria-labelledby`, `aria-live`, `aria-invalid`
- `focus-visible`-stiler på alle interaktive elementer
- Tastaturnavigasjon fungerer

### localStorage-nøkler
| Nøkkel | Innhold |
|---|---|
| `pokedecks_teaser_signup_completed` | `"1"` når skjema er sendt inn |
| `pokedecks_teaser_signup_email` | E-postadressen som ble oppgitt |
| `pd-theme` | `"light"` eller `"dark"` |
| `pokedecks_teaser_language` | `"no"` eller `"en"` — valgt språk |

---

## TODO-liste

### P0 — Kritisk, blokkerer innsamling ✅ Ferdig

- [x] **Koble til backend for e-postlagring** — Netlify Forms, ferdig
- [x] **Oppdater personvernmodalen** — gjenspeiler nå Netlify Forms og er ærlig om dataflyt
- [x] **Deploy på Netlify** — siden er deployet og testet

### Gjennomgang før lansering

- [x] **Tekstgjennomgang** — modaltekster, bindestreker og copy oppdatert
- [ ] **Mobilvisning**
- [ ] **Desktop-estetikk**
- [ ] **Skjema/CTA**
- [x] **Footer og modaler** — norsk og engelsk innhold på plass
- [ ] **Test språkvelger på begge språk og etter refresh**
- [ ] **Siste test av Netlify Forms** — inkl. verifiser at `language`-feltet sendes
- [ ] **Domene**

### P1 — Bør gjøres før lansering

- [ ] **Bekreft at Netlify har oppdaget skjemaet**
  Gå til **Netlify → Forms** og sjekk at `pokedecks-interest` vises. Gjør en testinnsending og verifiser at den dukker opp under Verified submissions. Aktiver e-postvarsling.

- [ ] **DNS — pek pokedecks.no til Netlify**
  Legg til CNAME- eller A-record hos domeneregistrar. Netlify viser nøyaktig hvilke verdier som trengs under **Site settings → Domain management**.

- [ ] **Fullstendige brukervilkår**
  Vilkår-modalen har nå kortfattet pre-lanseringstekst på norsk og engelsk. Skriv inn faktisk innhold på begge språk før lansering — oppdater `lang-no` og `lang-en`-divene i `#modal-terms`.

- [ ] **Dedikert OG-bilde (1200×630)**
  Nåværende delingsbilde er bakgrunnsbildet (`jpeglightmodev5.jpg`) — kvadratisk format. Lag et dedikert bilde med logo, tagline og riktig format før bred deling på sosiale medier.

- [ ] **Favicon**
  Legg til `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` i `<head>` og en tilhørende fil. En enkel `PD`-bokstav på mørk bakgrunn passer designet.

- [ ] **Bekreft kontakt-e-postadressen**
  `hei@pokedecks.no` er brukt i kontaktmodalen og feilmeldinger. Bekreft at denne adressen er aktiv og lest jevnlig.

### P2 — Nice to have

- [ ] **Analytics**
  Ingen cookies nødvendig. Anbefalte alternativer:
  - [Plausible](https://plausible.io) — betalt, GDPR-vennlig, ingen cookies
  - [Umami](https://umami.is) — åpen kildekode, kan self-hostes gratis

  Når valgt: legg til script i `<head>` (linje ~9), og oppdater informasjonskapsler-modalen.

- [x] **Open Graph / sosiale meta-tagger** — lagt til
  `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card` m.fl. er på plass.
  Delingsbilde er `Images/background/jpeglightmodev5.jpg` (pixel art-landskap).
  Vurder å lage et dedikert 1200×630-bilde med logo og tekst før bred markedsføring.

- [ ] **Prefers-reduced-motion**
  ```css
  @media (prefers-reduced-motion: reduce) {
    .is-fading-out { transition: none; }
    .scroll-cue { animation: none; }
    .live-dot { animation: none; }
  }
  ```

- [ ] **Test i Safari / iOS**
  `backdrop-filter` og `<dialog>` oppfører seg litt annerledes i WebKit. Verdt en visuell sjekk på iPhone og iPad.

- [ ] **HTTPS / SSL**
  Netlify håndterer dette automatisk via Let's Encrypt. Bekreft at det er aktivt under **Site settings → Domain management**.

---

## Tekniske valg og begrunnelse

| Valg | Begrunnelse |
|---|---|
| Ren HTML/CSS/JS — ingen framework | KISS. Siden er statisk innhold. Ingen build-steg = ingenting som kan brekke. |
| Netlify Forms | Null serveroppsett. Gratis opp til 100 innsendinger/mnd. Fungerer ved å legge til `data-netlify="true"` på skjemaet — ingen API-nøkkel å beskytte. |
| `fetch` med `preventDefault` | Beholder UX-flyten (fade-out, bekreftelse, feilhåndtering) i stedet for å la Netlify navigere til en takkeside. |
| Honeypot-felt | Enkleste spamvern uten captcha. Netlify kjører også Akismet i bakgrunnen. |
| `source`-felt per skjema | Alle tre skjemaer sender til samme Netlify-skjemanavn. `source` lar deg se hvilken slide som konverterer best. |
| `language`-felt per skjema | Sender `no` eller `en` til Netlify slik at du kan se hvilket språk brukeren brukte ved påmelding. |
| `localStorage` for skjemastatus | Unngår at brukeren ser skjemaet på nytt etter refresh. Ingen cookies. |
| `data-i18n`-attributter for oversettelser | Alle synlige tekster merkes med nøkler. JS-objekt med `no`/`en` verdier — `applyLang()` setter `innerHTML`. Modaler bruker `lang-no`/`lang-en` CSS-klasser. |
| `<dialog>`-element for modaler | Native, tilgjengelig, håndterer focus-trap og Escape automatisk. |
| Scroll-snap med `scroll-snap-type: y mandatory` | Ryddig slide-for-slide-opplevelse uten JavaScript. |
| Ingen build-tool / bundler | Statisk HTML/CSS/JS = enkel deployment. Ingen npm, ingen Vite, ingen CI-avhengighet. |

---

## Kjente begrensninger

- Ingen server-side e-postvalidering — Netlify Forms lagrer det brukeren skriver inn.
- Netlify Forms gratis-tier: 100 innsendinger/mnd. Oppgrader på Netlify-dashboardet ved behov ($19/mnd for 1 000/mnd).
- `color-mix()` og `text-wrap: balance/pretty` krever relativt nye nettlesere (Chrome 111+, Firefox 113+, Safari 16.4+). Siden degrader pent i eldre versjoner.
- Netlify Forms kan ikke testes lokalt — submit-handleren vil kaste en feil og vise feilmeldingen i UI.

---

## Kontekst om prosjektet

- Teaser-siden er midlertidig på `pokedecks.no`. Domenet flyttes til hovedprosjektet etter lansering.
- Hovedprosjektet (selve markedsplassen) er under planlegging — dette repoet er uavhengig av det.
- Lansering planlagt sommer 2026.
