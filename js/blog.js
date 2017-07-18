(function(){
	var d = document;
	if("ontouchstart" in d){
		var header = d.getElementById('header');
		header.style.position = 'absolute';
		header.style.right = 0;
	} else {
	  	d.addEventListener('mousewheel', function(e){if(e.wheelDeltaY > 0){d.getElementById('header').classList.remove('hide');} else {d.getElementById('header').classList.add('hide');}});
		d.addEventListener('DOMMouseScroll', function(e){if(e.detail < 0){d.getElementById('header').classList.remove('hide');} else {d.getElementById('header').classList.add('hide');}});
	}
  	
})();