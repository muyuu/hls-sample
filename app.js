if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js').then(function(reg) {
  
	  if(reg.installing) {
		console.log('Service worker installing');
	  } else if(reg.waiting) {
		console.log('Service worker installed');
	  } else if(reg.active) {
		console.log('Service worker active');
	  }
  
	}).catch(function(error) {
	  console.log('Registration failed with ' + error);
	});

	navigator.serviceWorker.onmessage = function(messageEvent) {
		console.log(`received data: ${messageEvent.data.msg}`);
	  }
}

window.onload = () =>{
	const video = document.getElementById('video');
	const playlist = document.getElementById('playlist');
	const playlistBtn = document.getElementById('changePlaylist');
	const result = document.getElementById('result');

	const btn = document.getElementById('btn');
	btn.addEventListener('click', ()=>{
		fetch('./test.json')
			.then(response => response.json())
			.then(data => console.log(data));
	});
	
	
	// input playlist
	playlistBtn.addEventListener('click', (e)=> {
		const txt = playlist.value;
		video.setAttribute('src', txt);
		console.log(`change playlist to ${txt}`);
		video.load();
		video.play();
	});


	video.textTracks.addEventListener('addtrack', (addTrackEvent) => {
		const track = addTrackEvent.track;
		if (track === null || track.kind !== 'metadata') {
			return;
		}
		console.log(track);

		const item = document.createElement('li');
		item.innerText = 'fire addtrack event';
		result.appendChild(item);

		track.mode = 'hidden';
		track.addEventListener('cuechange', onCueChange);
		
		function onCueChange(cueChangeEvent) {
			const activeCue = cueChangeEvent.target.activeCues[0];
			if (!activeCue) {
			  return;
			}
			const data = activeCue.value.data.split('\t');
			console.log('cuechange', data);
			const item = document.createElement('li');
			item.innerText = data.join(', ');
			result.appendChild(item);
		}
	});
};


