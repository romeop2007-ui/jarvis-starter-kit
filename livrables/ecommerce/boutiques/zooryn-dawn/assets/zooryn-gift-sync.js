/*
  Gère le retrait des oreillers offerts liés à un pack de matelas.

  Cliquer sur la corbeille d'une ligne Matelas retire, en une seule requête
  atomique, cette ligne ET le nombre d'oreillers offerts qui lui correspondait
  (recalculé sur les packs restants, pour gérer le cas où plusieurs packs
  différents sont dans le panier). Puis on recharge la page pour repartir sur
  un état toujours fiable.

  Pas de correction en tâche de fond / débounce ici : ce système s'est révélé
  source de bugs difficiles à reproduire (requêtes qui se chevauchent). On
  préfère une action explicite et déterministe au clic.
*/
(function () {
  var MATELAS_HANDLE = 'matelas-pneumatique-compact-ultraleger-zooryn-pro';
  var GIFT_HANDLE = 'oreiller-gonflable-zooryn-copie';
  var GIFT_PER_PACK = { 'Pack Solo': 0, 'Pack 2': 2, 'Pack 4': 4 };

  function handleFromUrl(url) {
    var m = url && url.match(/\/products\/([^/?]+)/);
    return m ? m[1] : null;
  }

  function packNameFromItem(item) {
    if (item.variant_options && item.variant_options[0]) return item.variant_options[0];
    if (item.variant_title) return item.variant_title.split(' / ')[0];
    return null;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.zooryn-remove-pack');
    if (!btn || btn.disabled) return;
    e.preventDefault();
    btn.disabled = true;

    var matelasKey = btn.getAttribute('data-line-key');

    fetch('/cart.js', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        var expected = 0;
        var giftKey = null;

        cart.items.forEach(function (item) {
          var handle = handleFromUrl(item.url);
          if (handle === GIFT_HANDLE) {
            giftKey = item.key;
          } else if (handle === MATELAS_HANDLE && item.key !== matelasKey) {
            var pack = packNameFromItem(item);
            expected += (GIFT_PER_PACK[pack] || 0) * item.quantity;
          }
        });

        var updates = {};
        updates[matelasKey] = 0;
        if (giftKey) updates[giftKey] = expected;

        return fetch('/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates: updates }),
          cache: 'no-store',
        });
      })
      .then(function () {
        window.location.reload();
      })
      .catch(function (err) {
        console.error(err);
        btn.disabled = false;
      });
  });
})();
