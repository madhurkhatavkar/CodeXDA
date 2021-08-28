if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/CodeXDA/sw.js')
      navigator.serviceWorker.ready.then(function(swRegistration) {
        return swRegistration.sync.register('myFirstSync');
      });
}