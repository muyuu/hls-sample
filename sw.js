self.addEventListener('install', function(event) {
	console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
	console.log('Service Worker activating.');  
});

self.addEventListener('fetch', function(event) {
	console.log('WORKER: Fetching', event.request);

	const url = event.request.url;
	const isTarget = url.includes('test.json');
	const targetUrl = url.replace('test.json', 'redirect.json');
	const target = isTarget ? targetUrl : url;

	event.respondWith(
		fetch(target)
	);
});
