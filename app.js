if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/CodeXDA/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

window.addEventListener('beforeinstallprompt', e => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
      // don't display install banner when installed
      return e.preventDefault();
  } else {
      const btn = document.querySelector('#install')
      btn.hidden = false;
      btn.onclick = _ => e.prompt();
      return e.preventDefault();
  }
});
