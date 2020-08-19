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
}

window.onload = () =>{
	const btn = document.getElementById('btn');
	btn.addEventListener('click', ()=>{
		fetch('./test.json')
			.then(response => response.json())
			.then(data => console.log(data));
	});

	const btn2 = document.getElementById('btn2');
	btn2.addEventListener('click', ()=>{
		fetch('./test2.json')
			.then(response => response.json())
			.then(data => console.log(data));
	});
};
