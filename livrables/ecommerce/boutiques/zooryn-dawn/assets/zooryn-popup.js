(function () {
  var root = document.getElementById('zpop-root');
  if (!root) return;

  var overlay = document.getElementById('zpop-overlay');
  var modal = document.getElementById('zpop-modal');
  var closeBtn = document.getElementById('zpop-close');
  var declineBtn = document.getElementById('zpop-decline');
  var urgencyBar = document.getElementById('zpop-urgency');
  var stepForm = document.getElementById('zpop-step-form');
  var stepSuccess = document.getElementById('zpop-step-success');
  var submitBtn = document.getElementById('zpop-submit');
  var btnText = submitBtn ? submitBtn.querySelector('.zpop__btn-text') : null;
  var btnSpinner = submitBtn ? submitBtn.querySelector('.zpop__btn-spinner') : null;
  var copyBtn = document.getElementById('zpop-copy');
  var codeText = document.getElementById('zpop-code-text');

  var delay = parseInt(root.getAttribute('data-delay'), 10) || 2000;

  function openModal() {
    overlay.hidden = false;
    modal.hidden = false;
    try {
      sessionStorage.setItem('zpop_shown', '1');
    } catch (e) {}
  }

  function closeModal() {
    overlay.hidden = true;
    modal.hidden = true;
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      if (submitBtn.disabled) return;
      submitBtn.disabled = true;
      if (btnText) btnText.hidden = true;
      if (btnSpinner) btnSpinner.hidden = false;

      setTimeout(function () {
        if (stepForm) stepForm.hidden = true;
        if (stepSuccess) stepSuccess.hidden = false;
      }, 5000);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  if (declineBtn) declineBtn.addEventListener('click', closeModal);

  if (copyBtn && codeText) {
    copyBtn.addEventListener('click', function () {
      var code = codeText.textContent.trim();
      var original = copyBtn.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          copyBtn.textContent = 'Copié !';
          setTimeout(function () {
            copyBtn.textContent = original;
          }, 1800);
        });
      }
    });
  }

  if (urgencyBar) urgencyBar.hidden = false;

  var shownThisSession = false;
  try {
    shownThisSession = sessionStorage.getItem('zpop_shown') === '1';
  } catch (e) {}

  if (shownThisSession) return;

  setTimeout(openModal, delay);
})();
