;(function(win, doc, undefined){

	var $header = doc.getElementById('header');

	$header.addEventListener('click', function(e){
		var tar = e.target,
			css = tar.classList;
		if(css.contains('ian')){
			$header.classList.remove('roof');
			return;
		}
		if(css.contains('nav')){
			$header.classList.add('roof');
			return;
		}
	});

})(window, document);
