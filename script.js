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
    light: 'Images/background/jpeglightmodev5.jpg',
    dark: 'Images/background/darkmode-v2.png'
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
      s1_headline:        'En markedsplass for <em>samlere</em>.',
      s1_lede:            'Vi bygger en ryddig plattform for kjøp, salg og auksjonering av samlekort. Tydelig tilstand, priser og bud. Laget for samlere som vil se kortene framfor støyen.',
      s1_btn:             'Gi meg beskjed',
      spam:               'Ingen spam. Vi lover.',
      ok_msg:             '<strong>Takk! Du hører fra oss.</strong>',
      scroll_cue:         'BLA NED',
      s2_kicker_step:     '02 · HVORDAN DET FUNKER',
      s2_headline:        'Sett opp din egen <em>salgsbod</em>.',
      s2_lede:            'Som på en samler con, bare digitalt. Du bestemmer utvalget, kjøperen blar gjennom, og du godkjenner salget før det går videre.',
      s2_feat1_title:     '01 · Åpne boden',
      s2_feat1_desc:      'Du bestemmer hvor mange kort du tar inn. Sett gjerne på nedtelling for å eksponere boden din i forkant av åpning!',
      s2_feat2_title:     '02 · Kjøper blar',
      s2_feat2_desc:      'Kjøperen ser gjennom hele samlingen din, plukker kortene de vil ha og legger inn ordre.',
      s2_feat3_title:     '03 · Du godkjenner',
      s2_feat3_desc:      'Ingen salg går gjennom uten ditt grønne lys. Du har siste ord før kortet sendes.',
      s2_btn:             'Hold meg oppdatert',
      s3_kicker_step:     '03 · AUKSJON',
      s3_headline:        'Tradisjonelle auksjoner',
      s3_lede:            'Sett start, slutt, minstepris, minste budøkning, antisnipe og la budrunden gå sin gang. All historikk er åpen, så du vet alltid hvor budet står og hvem som har lagt det.',
      s3_feat1_title:     'Start &amp; slutt',
      s3_feat2_title:     'Minstepris',
      s3_feat3_title:     'Budhistorikk',
      s3_meta_opens:      'Åpner',
      s3_meta_closes:     'Lukker',
      s3_meta_active:     'Aktiv',
      s3_meta_minprice:   'Minstepris',
      s3_meta_minincrease:'Min. budøkning',
      s3_meta_current:    'Nåværende',
      s3_meta_prevbids:   '+ 14 tidligere bud',
      s3_btn:             'Vekk meg når auksjonen åpner',
      s4_kicker_step:     '04 · LANSERING',
      s4_headline:        'Kommer <em>i 2026</em>.',
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
      aria_theme:         'Bytt tema',
      aria_close:         'Lukk',
      aria_scroll:        'Bla ned',
    },
    en: {
      status_pill:        '<span class="dot"></span> Coming 2026',
      s1_headline:        'A marketplace for <em>collectors</em>.',
      s1_lede:            'We are building a cleaner place to buy, sell and auction trading cards, with clear condition details, prices and bids. Made for collectors who want to focus on the cards, rather than the noise.',
      s1_btn:             'Notify me',
      spam:               'No spam. We promise.',
      ok_msg:             '<strong>Thanks! You will hear from us.</strong>',
      scroll_cue:         'SCROLL DOWN',
      s2_kicker_step:     '02 · HOW IT WORKS',
      s2_headline:        'Set up your own booth.',
      s2_lede:            'Like a real convention, only digital. You choose the selection, buyers browse through it, and you approve the sale before it moves forward.',
      s2_feat1_title:     '01 · Open booth',
      s2_feat1_desc:      'You decide how many cards to include. Feel free to add a countdown to showcase your booth before it opens.',
      s2_feat2_title:     '02 · Browse cards',
      s2_feat2_desc:      'The buyer looks through your whole collection, picks the cards they want and places an order.',
      s2_feat3_title:     '03 · Approve sale',
      s2_feat3_desc:      'No sale goes through without your green light. You have the final say before the sale is completed.',
      s2_btn:             'Keep me updated',
      s3_kicker_step:     '03 · AUCTION',
      s3_headline:        'Traditional auctions',
      s3_lede:            'Set the start and end time, minimum price, minimum bid increase and anti snipe rules, then let the bidding begin. The full history is open, so you always know where the bid stands and who placed it.',
      s3_feat1_title:     'Start &amp; end',
      s3_feat2_title:     'Minimum price',
      s3_feat3_title:     'Bid history',
      s3_meta_opens:      'Opens',
      s3_meta_closes:     'Closes',
      s3_meta_active:     'Active',
      s3_meta_minprice:   'Min. price',
      s3_meta_minincrease:'Min. bid increase',
      s3_meta_current:    'Current',
      s3_meta_prevbids:   '+ 14 previous bids',
      s3_btn:             'Let me know when auctions open',
      s4_kicker_step:     '04 · LAUNCH',
      s4_headline:        'Coming <em>in 2026</em>.',
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
