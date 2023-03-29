self.addEventListener('install', e => {
  
  
  //activate worker on waiting
  self.skipWaiting();
  
  e.waitUntil
  console.log(e);
})