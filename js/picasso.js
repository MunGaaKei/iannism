;(function(win, doc, undefined){

	var $header = doc.getElementById('header');

	$header.addEventListener('click', function(e){
		var tar = e.target,
			css = tar.classList;

		if(css.contains('nav')){
			var tab = doc.getElementById(tar.dataset.tab);
			if( css.toggle('on') ){
				var activeTab = doc.querySelector('.content.on'),
					activeNav = doc.querySelector('.nav.on');
				hideTab(activeTab);
				activeNav && activeNav.classList.remove('on');

				tab.style.display = 'block';
				tab.offsetWidth;
				tab.classList.add('on');
			} else {
				hideTab(tab);
			}
		}
	});

	function hideTab( tab ){
		if( !tab ) return false;
		tab.classList.remove('on');
		setTimeout(function(){
			tab.removeAttribute('style');
			tab = null;
		}, 300);
	}

})(window, document);
