if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.debug('Service worker registered', registration);
    })
    .catch(err => console.error('Service worker registration failed ', err))
} else {
  console.error('Service worker not supported');
}