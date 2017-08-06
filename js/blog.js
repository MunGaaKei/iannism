;(function(){
	var d = document,
			header = d.getElementById('header');
	if("ontouchstart" in d){
		header.style.position = 'absolute';
		header.style.right = '0';
	} else {
	  d.addEventListener('mousewheel', function(e){if(e.wheelDeltaY > 0){header.classList.remove('hide');} else {header.classList.add('hide');}});
		d.addEventListener('DOMMouseScroll', function(e){if(e.detail < 0){header.classList.remove('hide');} else {header.classList.add('hide');}});
	}

})();
