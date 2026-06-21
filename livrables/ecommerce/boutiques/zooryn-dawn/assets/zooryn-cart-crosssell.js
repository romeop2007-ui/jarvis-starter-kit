document.addEventListener('click', function (event) {
  var btn = event.target.closest('[data-zcross-add]');
  if (!btn) return;

  var variantId = btn.getAttribute('data-variant-id');
  if (!variantId || btn.disabled) return;

  btn.disabled = true;
  var originalText = btn.textContent;
  btn.textContent = '...';

  var config = fetchConfig('javascript');
  config.body = JSON.stringify({ id: variantId, quantity: 1 });

  fetch(window.routes.cart_add_url, config)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.status) {
        btn.textContent = originalText;
        btn.disabled = false;
        return;
      }
      publish(PUB_SUB_EVENTS.cartUpdate, { source: 'crosssell' });
    })
    .catch(function () {
      btn.textContent = originalText;
      btn.disabled = false;
    });
});
