/* HumanKey whitepaper i18n framework. Existing page/diagrams are not altered. */
(() => {
  'use strict';
  const supported = new Set(['en','es','pt','zh','fr','de','ms','ko']);
  const selected = new URLSearchParams(location.search).get('lang') || 'en';
  const picker = document.getElementById('languagePicker');
  if (!picker) return;
  // Drop legacy route links that currently 404. The query is a stable single-page URL.
  for (const option of picker.options) {
    const code = option.value === '/' ? 'en' : /^\/([a-z]{2})\/$/.exec(option.value)?.[1];
    if (code && supported.has(code)) option.value = code;
  }
  picker.value = supported.has(selected) ? selected : 'en';
  // Replace the earlier route-based picker handler by stopping propagation at capture phase.
  picker.addEventListener('change', (event) => {
    event.stopImmediatePropagation();
    const code = picker.value;
    if (!supported.has(code)) return;
    const url = new URL(location.href);
    if (code === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', code);
    location.assign(url.href);
  }, true);
  if (selected === 'en' || !supported.has(selected)) return;
  fetch(`/locales/${selected}.json`, {cache:'no-cache'})
    .then(response => { if(!response.ok) throw new Error('Dictionary missing'); return response.json(); })
    .then(dict => {
      if (dict.status !== 'complete') {
        console.warn(`HumanKey ${selected}: translation incomplete; keeping English.`);
        return;
      }
      const mapping = dict.translations || {};
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const updates=[];
      while(walker.nextNode()) {
        const node=walker.currentNode;
        if(node.parentElement?.closest('script,style,noscript,svg,code,pre')) continue;
        const value=node.nodeValue.trim();
        if(Object.prototype.hasOwnProperty.call(mapping,value)) updates.push([node,value]);
      }
      for(const [node,key] of updates) node.nodeValue=node.nodeValue.replace(key,mapping[key]);
      document.documentElement.lang=selected;
    })
    .catch(err => console.warn('HumanKey translation unavailable:',err));
})();
