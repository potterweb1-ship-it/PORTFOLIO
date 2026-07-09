(function () {
  if (window.__wpLightbox) return;
  window.__wpLightbox = true;

  // Only small in-body images live inside <figure>; hero/cover images do not.
  var SELECTOR = 'figure img';

  var style = document.createElement('style');
  style.textContent =
    'figure img{cursor:zoom-in;transition:opacity .15s ease;}' +
    'figure img:hover{opacity:0.9;}' +
    '.wp-lb{position:fixed;inset:0;z-index:2147483000;display:none;flex-direction:column;' +
      'align-items:center;justify-content:center;padding:5vmin;box-sizing:border-box;' +
      'background:rgba(21,30,63,0.94);opacity:0;transition:opacity .22s ease;cursor:zoom-out;}' +
    '.wp-lb.wp-open{opacity:1;}' +
    '.wp-lb img{max-width:92vw;max-height:82vh;width:auto;height:auto;display:block;' +
      'border:12px solid #151E3F;background:#E8E1D4;box-shadow:0 30px 90px rgba(0,0,0,0.55);' +
      'transform:scale(0.97);transition:transform .22s ease;}' +
    '.wp-lb.wp-open img{transform:scale(1);}' +
    '.wp-lb figcaption,.wp-lb .wp-cap{margin-top:18px;max-width:80vw;text-align:center;' +
      "font-family:'Lato',sans-serif;font-size:12px;letter-spacing:0.08em;" +
      'text-transform:uppercase;color:#F4F1E9;}' +
    '.wp-lb-close{position:fixed;top:18px;right:26px;font:300 34px/1 Arial,sans-serif;' +
      'color:#F4F1E9;cursor:pointer;user-select:none;opacity:0.85;}' +
    '.wp-lb-close:hover{opacity:1;}';
  (document.head || document.documentElement).appendChild(style);

  var overlay, bigImg, capEl;
  function build() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'wp-lb';
    var close = document.createElement('div');
    close.className = 'wp-lb-close';
    close.setAttribute('aria-label', 'Close');
    close.textContent = '\u00D7';
    bigImg = document.createElement('img');
    capEl = document.createElement('div');
    capEl.className = 'wp-cap';
    overlay.appendChild(close);
    overlay.appendChild(bigImg);
    overlay.appendChild(capEl);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', hide);
  }

  function show(img) {
    build();
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt || '';
    var fig = img.closest ? img.closest('figure') : null;
    var cap = fig ? fig.querySelector('figcaption') : null;
    var text = cap ? cap.textContent.trim() : (img.alt || '');
    capEl.textContent = text;
    capEl.style.display = text ? 'block' : 'none';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { overlay.classList.add('wp-open'); });
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.remove('wp-open');
    document.body.style.overflow = '';
    setTimeout(function () { if (overlay) overlay.style.display = 'none'; }, 220);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (overlay && overlay.contains(t)) return; // clicks inside overlay -> close handler
    var img = t.closest(SELECTOR);
    if (img) { e.preventDefault(); show(img); }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) hide();
  });
})();
