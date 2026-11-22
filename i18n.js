
/* HumanKey white paper: single-page translations */
(() => {
  'use strict';

  const languages = ['en','es','pt','zh','fr','de','ms','ko'];
  const supported = new Set(languages);

  const normalize = (value) => {
    const code = String(value || 'en')
      .toLowerCase()
      .replace('_', '-');
    const primary = code.split('-')[0];
    return supported.has(primary) ? primary : 'en';
  };

  const params = new URLSearchParams(window.location.search);
  const selected = normalize(params.get('lang'));
  const picker = document.getElementById('languagePicker');

  const urlFor = (code) => {
    const url = new URL(window.location.href);
    url.pathname = '/';
    if (code === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', code);
    url.hash = '';
    return url.pathname + url.search;
  };

  if (picker) {
    for (const option of picker.options) {
      const raw = option.value;
      const fromRoute = /^\/([a-z]{2})\/$/.exec(raw)?.[1];
      const code = raw === '/' ? 'en' : (fromRoute || raw);
      if (supported.has(code)) option.value = code;
    }

    picker.value = selected;

    picker.addEventListener('change', (event) => {
      event.stopImmediatePropagation();
      const code = normalize(picker.value);
      window.location.assign(urlFor(code));
    }, true);
  }

  const suggestionGo = document.getElementById(
    'languageSuggestionGo'
  );

  if (suggestionGo) {
    suggestionGo.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const browserCode = normalize(
        navigator.languages?.[0] || navigator.language
      );
      window.location.assign(urlFor(browserCode));
    }, true);
  }

  document.querySelectorAll(
    'link[rel="alternate"][hreflang]'
  ).forEach((link) => {
    const lang = link.getAttribute('hreflang');
    if (lang === 'x-default') {
      link.href = new URL(urlFor('en'), location.origin).href;
    } else if (supported.has(lang)) {
      link.href = new URL(urlFor(lang), location.origin).href;
    }
  });

  if (selected === 'en') {
    document.documentElement.lang = 'en';
    return;
  }

  fetch(`/locales/${selected}.json`, {cache:'no-cache'})
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Translation HTTP ${response.status}`
        );
      }
      return response.json();
    })
    .then((dict) => {
      if (
        !dict ||
        dict.status !== 'complete' ||
        !dict.translations ||
        typeof dict.translations !== 'object'
      ) {
        throw new Error(
          'Translation dictionary missing or incomplete'
        );
      }

      const mapping = dict.translations;
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      const updates = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;

        if (node.parentElement?.closest(
          'script,style,noscript,svg,code,pre,textarea'
        )) continue;

        const original = node.nodeValue;
        const trimmed = original.trim();

        if (!Object.prototype.hasOwnProperty.call(
          mapping, trimmed
        )) continue;

        const translated = mapping[trimmed];

        if (typeof translated !== 'string') continue;

        updates.push([
          node,
          original.replace(trimmed, translated)
        ]);
      }

      for (const [node, translated] of updates) {
        node.nodeValue = translated;
      }

      document.documentElement.lang = selected;
    })
    .catch((error) => {
      console.error(
        `[HumanKey i18n] Could not load ${selected}:`,
        error
      );
      if (picker) picker.value = 'en';
    });
})();
