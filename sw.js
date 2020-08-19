self.addEventListener('install', function(event) {
	console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
	console.log('Service Worker activating.');  
});

self.addEventListener('fetch', function(event) {
	console.log('WORKER: Fetching', event.request);

	const url = event.request.url;

	event.waitUntil(async function() {
		if (!event.clientId) return;

		const client = await clients.get(event.clientId);

		if (!client) return;

		if (url.match(/.+\.(json|m3u8|ts)/) === null) {
			return;
		}

		client.postMessage({
			msg: `intercept ${url}`,
		});
		
	}());
});
