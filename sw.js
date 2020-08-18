self.addEventListener('install', function(event) {
	console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
	console.log('Service Worker activating.');  
});

self.addEventListener('fetch', function(event) {
	console.log('WORKER: Fetching', event.request);
	event.respondWith(
		fetch(event.request)
	);
});
