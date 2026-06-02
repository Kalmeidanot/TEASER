/* ---------- Tema ---------- */
  const root = document.documentElement;
  const btn = document.getElementById('themeBtn');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun  = document.getElementById('iconSun');

  const dayGroups   = document.querySelectorAll('.sky-day, .m-back-day, .m-front-day, .trees-day, .ground-day');
  const nightGroups = document.querySelectorAll('.sky-night, .m-back-night, .m-front-night, .trees-night, .ground-night');

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    iconMoon.style.display = mode === 'dark' ? 'none' : '';
    iconSun.style.display  = mode === 'dark' ? '' : 'none';
    dayGroups.forEach(g   => g.style.display = mode === 'dark' ? 'none' : '');
    nightGroups.forEach(g => g.style.display = mode === 'dark' ? '' : 'none');
  }

  const themeImages = {
    light: 'Images/background/ny-lightmode.png',
    dark: 'Images/background/ny-darkmode.png'
  };
  const preloadedThemes = new Set([root.getAttribute('data-theme') || 'light']);

  function preloadThemeImage(mode, done) {
    if (preloadedThemes.has(mode)) {
      done();
      return;
    }

    const img = new Image();
    img.onload = img.onerror = () => {
      preloadedThemes.add(mode);
      done();
    };
    img.src = themeImages[mode];
  }

  const stored = localStorage.getItem('pd-theme');
  applyTheme(stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');

  let isSwitchingTheme = false;
  btn.addEventListener('click', () => {
    if (isSwitchingTheme) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pd-theme', next);
    isSwitchingTheme = true;
    preloadThemeImage(next, () => {
      applyTheme(next);
      isSwitchingTheme = false;
    });
  });

  /* ---------- Språk ---------- */
  const LS_LANG = 'pokedecks_teaser_language';

  const translations = {
    no: {
      status_pill:        '<span class="dot"></span> Kommer 2026',
      s1_kicker:          'Kommer snart',
      s1_headline:        'PokeDecks åpner snart',
      s1_lede:            'En ny norsk markedsplass for Pokémon kort, laget for samlere som vil kjøpe, selge og følge auksjoner på en ryddigere måte.<br><br>Meld deg på listen og få beskjed når PokeDecks åpner.',
      s1_btn:             'Få launch varsel',
      s1_note:            'E-postpåmelding gir deg kun launch varsel. Giveaway påmelding skjer inne på PokeDecks når giveaway boden er aktiv.',
      spam:               'Ingen spam. Vi lover.',
      ok_msg:             '<strong>Takk! Du hører fra oss.</strong>',
      scroll_cue:         'BLA NED',
      notice_label:       'Viktig',
      s2_kicker:          'Launchuke',
      s2_headline:        'Ny giveaway bod hver dag kl. 18',
      s2_lede:            'Når PokeDecks åpner, legger vi ut en ny giveaway bod på markedsplassen hver dag kl. 18 gjennom launchuken. Alle giveaways trekkes samlet 14 dager etter første giveaway dag.<br><br>Giveaway bodene ligger inne på PokeDecks som egne boder. Du går inn på boden, ser premien og trykker “Delta” for å melde deg på.',
      s2_notice:          'E-postpåmelding på denne siden betyr at du får beskjed når PokeDecks åpner. Du er ikke automatisk påmeldt giveaway. For å delta må du melde deg på den aktuelle giveaway boden inne på PokeDecks.',
      s2_cta:             'Varsle meg når launchuken starter',
      s4_kicker:          'Markedsplassen',
      s4_headline:        'Bygget for Pokémon samlere i Norge',
      s4_lede:            'PokeDecks er en norsk markedsplass for Pokémon kort og samlere.<br><br>I stedet for at markedsplassen fylles med én annonse per kort, bygger vi rundt salgsboder. En selger kan samle flere produkter i én bod, og kjøpere kan bla gjennom utvalget på en ryddigere måte.',
      s4_card1:           'Kjøp og salg av Pokémon kort',
      s4_card2:           'Salgsboder med flere produkter samlet',
      s4_card3:           'Fastpris, auksjoner og andre salgstyper',
      s4_card4:           'Tydelig tilstand, bilder og pris',
      s4_card5:           'Tryggere flyt mellom kjøper og selger',
      s4_cta:             'Hold meg oppdatert',
      s5_kicker:          'For kjøpere og selgere',
      s5_headline:        'Én ryddigere flyt for begge sider av handelen',
      s5_lede:            'PokeDecks skal gjøre det enklere å finne interessante kort, presentere egne produkter og holde oversikt over kjøp, salg og forespørsler.',
      s5_buyers_title:    'For kjøpere',
      s5_buyers_copy:     'Bla gjennom salgsboder, se bilder og tilstand, følg auksjoner og send kjøpsforespørsel når du finner noe interessant.',
      s5_buyers_card1:    'Se flere produkter samlet i én salgsbod',
      s5_buyers_card2:    'Følg auksjoner og budhistorikk',
      s5_buyers_card3:    'Send kjøpsforespørsel',
      s5_buyers_card4:    'Handle med norske samlere',
      s5_sellers_title:   'For selgere',
      s5_sellers_copy:    'Samle kort og produkter i en salgsbod, velg fastpris eller auksjon, og godkjenn forespørsler før kontaktinfo deles.',
      s5_sellers_card1:   'Lag salgsbod med bilder og beskrivelser',
      s5_sellers_card2:   'Selg til fastpris',
      s5_sellers_card3:   'Bruk auksjon når det passer',
      s5_sellers_card4:   'Godkjenn forespørsler før kontaktinfo deles',
      s5_cta:             'Få launch varsel',
      s6_kicker:          'Auksjon',
      s6_headline:        'Følg budrunder direkte på PokeDecks',
      s6_lede:            'Auksjoner gjør det mulig å legge ut kort og produkter med startpris, sluttid og tydelig budhistorikk.<br><br>Målet er at både kjøper og selger skal ha en ryddig oversikt over hva som skjer, hvem som leder og når auksjonen avsluttes.',
      s6_card1:           'Startpris og sluttid',
      s6_card2:           'Budhistorikk',
      s6_card3:           'Tydelig nedtelling',
      s6_card4:           'Mulighet for minstepris',
      s6_card5:           'Antisnipe for mer rettferdige avslutninger',
      s6_cta:             'Varsle meg ved launch',
      s7_kicker:          'Bli med fra starten',
      s7_headline:        'Få beskjed når PokeDecks åpner',
      s7_lede:            'PokeDecks bygges for norske Pokémon samlere, og vi ønsker å få med de første brukerne tidlig.<br><br>Ved å melde deg på listen får du beskjed når vi åpner, og du kan være blant de første som tester markedsplassen, salgsboder og launch giveaways.<br><br>I launchuken legger vi ut en ny giveaway bod på markedsplassen hver dag kl. 18.',
      s7_btn:             'Få launch varsel',
      s7_note:            'Dette er kun påmelding til launch varsel. For å delta i giveaway må du melde deg på giveaway boden inne på PokeDecks når den er aktiv.',
      s7_micro:           'Vi sender kun viktig informasjon om lanseringen. Ingen vanlig nyhetsbrev eller spam.',
      s8_kicker:          'Trygghet',
      s8_headline:        'Spørsmål, personvern og kontakt',
      s8_q1:              'Er jeg påmeldt giveaway når jeg legger igjen e-post?',
      s8_a1:              'Nei. E-postpåmelding gir deg 1 til 3 launch varsel. For å delta i giveaway må du gå inn på PokeDecks og melde deg på den aktuelle giveaway boden når den er aktiv.',
      s8_q2:              'Når legges giveawayene ut?',
      s8_a2:              'I launchuken legger vi ut en ny giveaway bod hver dag kl. 18.',
      s8_q3:              'Må jeg ha bruker for å delta?',
      s8_a3:              'Ja. For å delta må du være innlogget på PokeDecks. Innlogging skjer med Vipps når dette er klart.',
      s8_q4:              'Hva er en giveaway bod?',
      s8_a4:              'En giveaway bod er en egen bod på PokeDecks der du kan se premien og melde deg på trekningen. Den ligner på en vanlig salgsbod, men du kjøper ikke produktet. Du trykker “Delta” for å være med.',
      s8_trust1:          'Vi bruker e-postadressen din til å sende deg informasjon om lanseringen av PokeDecks.',
      s8_trust2:          'Vi sender ikke vanlig nyhetsbrev uten samtykke, og du kan be oss slette e-postadressen din.',
      s8_contact:         'Har du spørsmål? Kontakt oss på',
      s8_disclaimer:      'Giveaways er ikke sponset, administrert eller knyttet til Meta, Instagram, Facebook, Nintendo eller The Pokémon Company.',
      consent:            'Jeg samtykker til at PokeDecks kan lagre e-postadressen min for å sende meg informasjon om lanseringen. <a href="#" data-modal="modal-privacy">Les personvernreglene.</a>',
      consent_err:        'Du må samtykke for å melde deg på.',
      submit_err:         'Noe gikk galt. Prøv igjen om litt, eller kontakt oss på <a href="mailto:hei@pokedecks.no">hei@pokedecks.no</a>.',
      footer_terms:       'Vilkår',
      footer_privacy:     'Personvern',
      footer_cookies:     'Informasjonskapsler',
      footer_contact:     'Kontakt',
      modal_privacy_title:'Personvern',
      modal_terms_title:  'Vilkår',
      modal_cookies_title:'Informasjonskapsler',
      modal_contact_title:'Kontakt',
      email_ph:           'din@epost.no',
      referral_label:     'Henvisningskode, hvis du har',
      referral_ph:        'valgfritt',
      aria_theme:         'Bytt tema',
      aria_close:         'Lukk',
      aria_scroll:        'Bla ned',
    },
    en: {
      status_pill:        '<span class="dot"></span> Coming 2026',
      s1_kicker:          'Kommer snart',
      s1_headline:        'PokeDecks åpner snart',
      s1_lede:            'En ny norsk markedsplass for Pokémon kort, laget for samlere som vil kjøpe, selge og følge auksjoner på en ryddigere måte.<br><br>Meld deg på listen og få beskjed når PokeDecks åpner.',
      s1_btn:             'Få launch varsel',
      s1_note:            'E-postpåmelding gir deg kun launch varsel. Giveaway påmelding skjer inne på PokeDecks når giveaway boden er aktiv.',
      spam:               'No spam. We promise.',
      ok_msg:             '<strong>Thanks! You will hear from us.</strong>',
      scroll_cue:         'SCROLL DOWN',
      notice_label:       'Viktig',
      s2_kicker:          'Launchuke',
      s2_headline:        'Ny giveaway bod hver dag kl. 18',
      s2_lede:            'Når PokeDecks åpner, legger vi ut en ny giveaway bod på markedsplassen hver dag kl. 18 gjennom launchuken. Alle giveaways trekkes samlet 14 dager etter første giveaway dag.<br><br>Giveaway bodene ligger inne på PokeDecks som egne boder. Du går inn på boden, ser premien og trykker “Delta” for å melde deg på.',
      s2_notice:          'E-postpåmelding på denne siden betyr at du får beskjed når PokeDecks åpner. Du er ikke automatisk påmeldt giveaway. For å delta må du melde deg på den aktuelle giveaway boden inne på PokeDecks.',
      s2_cta:             'Varsle meg når launchuken starter',
      s4_kicker:          'Markedsplassen',
      s4_headline:        'Bygget for Pokémon samlere i Norge',
      s4_lede:            'PokeDecks er en norsk markedsplass for Pokémon kort og samlere.<br><br>I stedet for at markedsplassen fylles med én annonse per kort, bygger vi rundt salgsboder. En selger kan samle flere produkter i én bod, og kjøpere kan bla gjennom utvalget på en ryddigere måte.',
      s4_card1:           'Kjøp og salg av Pokémon kort',
      s4_card2:           'Salgsboder med flere produkter samlet',
      s4_card3:           'Fastpris, auksjoner og andre salgstyper',
      s4_card4:           'Tydelig tilstand, bilder og pris',
      s4_card5:           'Tryggere flyt mellom kjøper og selger',
      s4_cta:             'Hold meg oppdatert',
      s5_kicker:          'For kjøpere og selgere',
      s5_headline:        'Én ryddigere flyt for begge sider av handelen',
      s5_lede:            'PokeDecks skal gjøre det enklere å finne interessante kort, presentere egne produkter og holde oversikt over kjøp, salg og forespørsler.',
      s5_buyers_title:    'For kjøpere',
      s5_buyers_copy:     'Bla gjennom salgsboder, se bilder og tilstand, følg auksjoner og send kjøpsforespørsel når du finner noe interessant.',
      s5_buyers_card1:    'Se flere produkter samlet i én salgsbod',
      s5_buyers_card2:    'Følg auksjoner og budhistorikk',
      s5_buyers_card3:    'Send kjøpsforespørsel',
      s5_buyers_card4:    'Handle med norske samlere',
      s5_sellers_title:   'For selgere',
      s5_sellers_copy:    'Samle kort og produkter i en salgsbod, velg fastpris eller auksjon, og godkjenn forespørsler før kontaktinfo deles.',
      s5_sellers_card1:   'Lag salgsbod med bilder og beskrivelser',
      s5_sellers_card2:   'Selg til fastpris',
      s5_sellers_card3:   'Bruk auksjon når det passer',
      s5_sellers_card4:   'Godkjenn forespørsler før kontaktinfo deles',
      s5_cta:             'Få launch varsel',
      s6_kicker:          'Auksjon',
      s6_headline:        'Følg budrunder direkte på PokeDecks',
      s6_lede:            'Auksjoner gjør det mulig å legge ut kort og produkter med startpris, sluttid og tydelig budhistorikk.<br><br>Målet er at både kjøper og selger skal ha en ryddig oversikt over hva som skjer, hvem som leder og når auksjonen avsluttes.',
      s6_card1:           'Startpris og sluttid',
      s6_card2:           'Budhistorikk',
      s6_card3:           'Tydelig nedtelling',
      s6_card4:           'Mulighet for minstepris',
      s6_card5:           'Antisnipe for mer rettferdige avslutninger',
      s6_cta:             'Varsle meg ved launch',
      s7_kicker:          'Bli med fra starten',
      s7_headline:        'Få beskjed når PokeDecks åpner',
      s7_lede:            'PokeDecks bygges for norske Pokémon samlere, og vi ønsker å få med de første brukerne tidlig.<br><br>Ved å melde deg på listen får du beskjed når vi åpner, og du kan være blant de første som tester markedsplassen, salgsboder og launch giveaways.<br><br>I launchuken legger vi ut en ny giveaway bod på markedsplassen hver dag kl. 18.',
      s7_btn:             'Få launch varsel',
      s7_note:            'Dette er kun påmelding til launch varsel. For å delta i giveaway må du melde deg på giveaway boden inne på PokeDecks når den er aktiv.',
      s7_micro:           'Vi sender kun viktig informasjon om lanseringen. Ingen vanlig nyhetsbrev eller spam.',
      s8_kicker:          'Trygghet',
      s8_headline:        'Spørsmål, personvern og kontakt',
      s8_q1:              'Er jeg påmeldt giveaway når jeg legger igjen e-post?',
      s8_a1:              'Nei. E-postpåmelding gir deg 1 til 3 launch varsel. For å delta i giveaway må du gå inn på PokeDecks og melde deg på den aktuelle giveaway boden når den er aktiv.',
      s8_q2:              'Når legges giveawayene ut?',
      s8_a2:              'I launchuken legger vi ut en ny giveaway bod hver dag kl. 18.',
      s8_q3:              'Må jeg ha bruker for å delta?',
      s8_a3:              'Ja. For å delta må du være innlogget på PokeDecks. Innlogging skjer med Vipps når dette er klart.',
      s8_q4:              'Hva er en giveaway bod?',
      s8_a4:              'En giveaway bod er en egen bod på PokeDecks der du kan se premien og melde deg på trekningen. Den ligner på en vanlig salgsbod, men du kjøper ikke produktet. Du trykker “Delta” for å være med.',
      s8_trust1:          'Vi bruker e-postadressen din til å sende deg informasjon om lanseringen av PokeDecks.',
      s8_trust2:          'Vi sender ikke vanlig nyhetsbrev uten samtykke, og du kan be oss slette e-postadressen din.',
      s8_contact:         'Har du spørsmål? Kontakt oss på',
      s8_disclaimer:      'Giveaways er ikke sponset, administrert eller knyttet til Meta, Instagram, Facebook, Nintendo eller The Pokémon Company.',
      consent:            'I consent to PokeDecks storing my email address to send me information about the launch. <a href="#" data-modal="modal-privacy">Read the privacy policy.</a>',
      consent_err:        'You must consent to sign up.',
      submit_err:         'Something went wrong. Try again shortly, or contact us at <a href="mailto:hei@pokedecks.no">hei@pokedecks.no</a>.',
      footer_terms:       'Terms',
      footer_privacy:     'Privacy',
      footer_cookies:     'Cookies',
      footer_contact:     'Contact',
      modal_privacy_title:'Privacy',
      modal_terms_title:  'Terms',
      modal_cookies_title:'Cookies',
      modal_contact_title:'Contact',
      email_ph:           'your@email.com',
      referral_label:     'Referral code, if you have one',
      referral_ph:        'optional',
      aria_theme:         'Toggle theme',
      aria_close:         'Close',
      aria_scroll:        'Scroll down',
    }
  };

  function applyLang(lang) {
    const t = translations[lang];
    root.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'nb');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    document.querySelectorAll('input[name=language]').forEach(el => {
      el.value = lang;
    });
  }

  const storedLang = (function() {
    try { return localStorage.getItem(LS_LANG) || 'no'; } catch(_) { return 'no'; }
  })();
  applyLang(storedLang);

  document.getElementById('langBtn').addEventListener('click', () => {
    const next = root.getAttribute('data-lang') === 'no' ? 'en' : 'no';
    try { localStorage.setItem(LS_LANG, next); } catch(_) {}
    applyLang(next);
  });

  /* ---------- E-postskjema ---------- */
  const allForms  = document.querySelectorAll('[data-form]');
  const allGroups = document.querySelectorAll('[data-signup-group]');
  const allOk     = document.querySelectorAll('[data-ok]');
  const allMicro  = document.querySelectorAll('[data-micro]');

  const LS_DONE  = 'pokedecks_teaser_signup_completed';
  const LS_EMAIL = 'pokedecks_teaser_signup_email';
  const LS_REFERRAL = 'pokedecks_teaser_referral_code';

  function sanitizeReferralCode(value) {
    return String(value || '').trim().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40);
  }

  function setReferralFields(value) {
    document.querySelectorAll('input[name=referral_code]').forEach(input => {
      input.value = value;
    });
  }

  function storeReferralCode(value) {
    try {
      if (value) {
        localStorage.setItem(LS_REFERRAL, value);
      } else {
        localStorage.removeItem(LS_REFERRAL);
      }
    } catch (_) {}
  }

  (function initReferralCode() {
    let code = '';
    let hasRefParam = false;

    try {
      const params = new URLSearchParams(window.location.search);
      hasRefParam = params.has('ref');
      if (hasRefParam) {
        code = sanitizeReferralCode(params.get('ref'));
        storeReferralCode(code);
      } else {
        code = sanitizeReferralCode(localStorage.getItem(LS_REFERRAL));
      }
    } catch (_) {}

    setReferralFields(code);
  })();

  function hideElement(el, animate) {
    if (!animate) { el.classList.add('is-hidden'); return; }
    el.classList.add('is-fading-out');
    el.addEventListener('transitionend', () => el.classList.add('is-hidden'), { once: true });
  }

  function markSubscribed(email, animate = true) {
    allOk.forEach(o => o.classList.add('is-on'));
    allGroups.forEach(g => hideElement(g, animate));
    allMicro.forEach(m => hideElement(m, animate));
    if (animate) {
      setTimeout(() => {
        allOk.forEach(o => {
          o.classList.add('is-leaving');
          o.classList.remove('is-on');
        });
      }, 5000);
    }
  }

  allForms.forEach(form => {
    const emailInput = form.querySelector('input[name=email]');
    const referralInput = form.querySelector('input[name=referral_code]');
    const submitBtn  = form.querySelector('button[type=submit]');
    const group      = form.closest('[data-signup-group]');
    const check      = group?.querySelector('.consent-check');
    const checkErr   = group?.querySelector('.consent-err');
    const submitErr  = group?.querySelector('[data-submit-err]');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Sjekk honeypot — bots fyller dette feltet, ekte brukere ikke
      if (form.querySelector('[name=bot-field]')?.value) return;

      // Valider e-post
      const v = emailInput.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        emailInput.focus();
        emailInput.style.outline = '2px solid #B9382A';
        emailInput.style.outlineOffset = '-2px';
        emailInput.setAttribute('aria-invalid', 'true');
        setTimeout(() => {
          emailInput.style.outline = '';
          emailInput.style.outlineOffset = '';
        }, 1400);
        return;
      }
      emailInput.removeAttribute('aria-invalid');

      // Valider samtykke
      if (check && !check.checked) {
        checkErr?.classList.add('is-on');
        check.focus();
        return;
      }
      if (checkErr) checkErr.classList.remove('is-on');
      if (submitErr) submitErr.classList.remove('is-on');

      // Loading-state
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = root.getAttribute('data-lang') === 'en' ? 'Sending&hellip;' : 'Sender&hellip;';

      // Fyll skjulte felt rett før sending
      form.querySelector('[name=submitted_at]').value = new Date().toISOString();
      form.querySelector('[name=consent]').value = 'yes';
      if (referralInput) {
        const referralCode = sanitizeReferralCode(referralInput.value);
        referralInput.value = referralCode;
        storeReferralCode(referralCode);
      }

      // Send til Netlify Forms
      const body = new URLSearchParams(new FormData(form)).toString();

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Lagre lokalt slik at skjemaet forblir skjult ved refresh
        try {
          localStorage.setItem(LS_DONE, '1');
          localStorage.setItem(LS_EMAIL, v);
        } catch (_) {}

        markSubscribed(v, true);

      } catch (_) {
        // Gjenopprett knapp og vis feilmelding — brukeren kan prøve igjen
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        if (submitErr) submitErr.classList.add('is-on');
      }
    });

    check?.addEventListener('change', () => {
      if (check.checked) checkErr?.classList.remove('is-on');
    });

    referralInput?.addEventListener('change', () => {
      const referralCode = sanitizeReferralCode(referralInput.value);
      setReferralFields(referralCode);
      storeReferralCode(referralCode);
    });
  });

  // Gjenopprett tilstand ved sideopplasting — skjul skjema, men vis ikke grønn boks på nytt
  try {
    if (localStorage.getItem(LS_DONE) === '1') {
      allGroups.forEach(g => hideElement(g, false));
      allMicro.forEach(m => hideElement(m, false));
    }
  } catch (_) {}

  /* ---------- Scroll-cue ---------- */
  const stage = document.getElementById('stage');
  const cue   = document.querySelector('.scroll-cue');

  function scrollToFinalSignup(behavior = 'smooth') {
    const signup = document.getElementById('signup');
    if (!stage || !signup) return false;

    const stageRect = stage.getBoundingClientRect();
    const signupRect = signup.getBoundingClientRect();
    const targetTop = stage.scrollTop + signupRect.top - stageRect.top - 24;
    stage.classList.add('is-free-scroll');
    stage.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    });
    window.setTimeout(() => {
      stage.classList.remove('is-free-scroll');
    }, behavior === 'smooth' ? 900 : 120);
    return true;
  }

  document.querySelectorAll('[data-scroll-to-signup]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      if (scrollToFinalSignup('smooth')) {
        try {
          history.replaceState(null, '', '#signup');
        } catch (_) {}
      }
    });
  });

  if (window.location.hash === '#signup') {
    requestAnimationFrame(() => scrollToFinalSignup('auto'));
  }

  stage.addEventListener('scroll', () => {
    if (!cue) return;
    const nearEnd = stage.scrollTop >= (stage.scrollHeight - stage.clientHeight) * 0.8;
    cue.style.opacity       = nearEnd ? '0' : '';
    cue.style.pointerEvents = nearEnd ? 'none' : '';
  }, { passive: true });

  /* ---------- Modaler ---------- */
  // Åpne modal via data-modal attributt
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal]');
    if (!trigger) return;
    e.preventDefault();

    const targetId = trigger.dataset.modal;
    const dialog = document.getElementById(targetId);
    if (!dialog) return;

    // Hvis en annen modal er åpen, lukk den først
    document.querySelectorAll('dialog.modal[open]').forEach(d => {
      if (d !== dialog) d.close();
    });

    dialog.showModal();
    dialog.querySelector('.modal-close')?.focus();
  });

  // Lukk-knapp inne i modal
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close-modal]')) {
      e.target.closest('dialog')?.close();
    }
  });

  // Lukk ved klikk på backdrop
  document.querySelectorAll('dialog.modal').forEach(dialog => {
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom;
      if (outside) dialog.close();
    });

    // Nested modal-lenker (f.eks. fra vilkår til personvern)
    dialog.addEventListener('click', e => {
      const nestedTrigger = e.target.closest('[data-modal]');
      if (!nestedTrigger) return;
      e.preventDefault();
      dialog.close();
      const next = document.getElementById(nestedTrigger.dataset.modal);
      next?.showModal();
    });
  });
