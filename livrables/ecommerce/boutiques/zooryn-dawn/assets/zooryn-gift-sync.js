/*
  Synchronise automatiquement la quantité d'oreillers offerts (gratuits) avec le
  nombre de packs Matelas Pack 2 / Pack 4 réellement présents dans le panier.

  Anti-rebond : des clics rapides sur +/- déclenchent plusieurs requêtes réseau
  séparées qui peuvent revenir dans le désordre. On attend donc que les clics
  se calment (silence de DEBOUNCE_MS) avant de relire le panier et de corriger
  une seule fois, sur l'état le plus frais possible (jamais de cache).
*/
(function () {
  var MATELAS_HANDLE = 'matelas-pneumatique-compact-ultraleger-zooryn-pro';
  var GIFT_HANDLE = 'oreiller-gonflable-zooryn-copie';
  var GIFT_PER_PACK = { 'Pack Solo': 0, 'Pack 2': 2, 'Pack 4': 4 };
  var DEBOUNCE_MS = 700;

  var giftVariantId = null;
  var syncing = false;
  var debounceTimer = null;

  function handleFromUrl(url) {
    var m = url && url.match(/\/products\/([^/?]+)/);
    return m ? m[1] : null;
  }

  function packNameFromItem(item) {
    if (item.variant_options && item.variant_options[0]) return item.variant_options[0];
    if (item.variant_title) return item.variant_title.split(' / ')[0];
    return null;
  }

  function getGiftVariantId() {
    if (giftVariantId) return Promise.resolve(giftVariantId);
    return fetch('/products/' + GIFT_HANDLE + '.js', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (p) {
        giftVariantId = p.variants[0].id;
        return giftVariantId;
      });
  }

  function computeExpected(cart) {
    var expected = 0;
    var giftLine = null;
    cart.items.forEach(function (item) {
      var handle = handleFromUrl(item.url);
      if (handle === GIFT_HANDLE) {
        giftLine = item;
      } else if (handle === MATELAS_HANDLE) {
        var pack = packNameFromItem(item);
        expected += (GIFT_PER_PACK[pack] || 0) * item.quantity;
      }
    });
    return { expected: expected, giftLine: giftLine };
  }

  function checkOk(response) {
    if (!response.ok) {
      throw new Error('zooryn-gift-sync: requête panier en échec (' + response.status + ')');
    }
    return response.json();
  }

  function changeByKey(key, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity }),
      cache: 'no-store',
    }).then(checkOk);
  }

  function applyCorrection(expected, giftLine) {
    if (giftLine) {
      // Une ligne avec des propriétés (notre "Cadeau: ...") se cible par sa clé
      // de ligne (item.key), pas par l'id de variante brut, sinon Shopify ne
      // trouve pas la ligne et la requête ne fait rien (échec silencieux).
      return changeByKey(giftLine.key, expected);
    }
    if (expected === 0) return Promise.resolve();
    return getGiftVariantId().then(function (vid) {
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: vid, quantity: expected, properties: { Cadeau: 'Offert avec votre pack' } }],
        }),
        cache: 'no-store',
      }).then(checkOk);
    });
  }

  function runSyncOnce() {
    if (syncing) {
      scheduleSync();
      return;
    }
    syncing = true;

    fetch('/cart.js', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        var r = computeExpected(cart);
        var current = r.giftLine ? r.giftLine.quantity : 0;
        if (current === r.expected) return false;
        return applyCorrection(r.expected, r.giftLine).then(function () {
          return true;
        });
      })
      .then(function (changed) {
        syncing = false;
        if (changed && window.publish && window.PUB_SUB_EVENTS) {
          window.publish(window.PUB_SUB_EVENTS.cartUpdate, { source: 'gift-sync' });
        }
      })
      .catch(function (err) {
        syncing = false;
        console.error(err);
      });
  }

  function scheduleSync() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSyncOnce, DEBOUNCE_MS);
  }

  function whenPubSubReady(cb) {
    if (window.subscribe && window.PUB_SUB_EVENTS) {
      cb();
    } else {
      setTimeout(function () {
        whenPubSubReady(cb);
      }, 50);
    }
  }

  document.addEventListener('DOMContentLoaded', runSyncOnce);

  whenPubSubReady(function () {
    window.subscribe(window.PUB_SUB_EVENTS.cartUpdate, function (evt) {
      if (evt && evt.source === 'gift-sync') return;
      scheduleSync();
    });
  });
})();
