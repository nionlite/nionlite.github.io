(() => {
  'use strict';
  const appleApps = Object.freeze({
    '6782427618': 'haulmargin', '6778767584': 'bywhen',
    '6764467007': 'plate-atlas', '6814047447': 'contractor', '6761875184': 'cub'
  });
  const androidApps = Object.freeze({
    'com.nionlite.plateatlas': 'plate-atlas',
    'com.NiONlite.bcurates.bcu_rates': 'cub',
    'com.nionlite.bywhen': 'bywhen'
  });
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    try {
      const url = new URL(link.href);
      if (url.protocol !== 'https:') return;
      let app;
      let store;
      if (url.hostname === 'apps.apple.com') {
        app = appleApps[url.pathname.match(/\/id(\d+)(?:\/|$)/)?.[1]];
        store = 'app-store';
      } else if (url.hostname === 'play.google.com' && url.pathname === '/store/apps/details') {
        app = androidApps[url.searchParams.get('id')];
        store = 'google-play';
      }
      if (!app) return;
      // A local integration hook only: no network, storage or analytics provider.
      window.dispatchEvent(new CustomEvent('nionlite:download-click', {
        detail: { app, store, placement: link.dataset.downloadPlacement || 'existing-link', page: location.pathname }
      }));
    } catch {
      // Measurement must never interrupt ordinary store navigation.
    }
  });
})();
