;(function(win, doc, undefined){

    var animating = false;
	doc.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('[data-href]') && !animating ){
            var room = doc.getElementById(tar.dataset.href);
            var curr = doc.querySelector('.room.active');
            curr.classList.remove('active');
            animating = setTimeout(function(){
                curr.classList.remove('on');
                animating = false;
            }, 300);
            room.classList.add('on');
            room.offsetWidth;
            room.classList.add('active');
        }
    }, false);



    var photograph = doc.querySelector('.photograph');
    var imgs = photograph.querySelectorAll('img');

    doc.querySelector('[data-href="p"]').addEventListener('click', function(){
        var l = imgs.length;
        var i = 0;
        var img;
        for (; i < l; i++) {
            img = imgs[i];
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
        }
    }, { once: true });

    photograph.addEventListener('mousewheel', throttle(function( e ){
        var active = photograph.querySelector('.display');
        var cur = active.dataset.i - 0;
        var gallery = active.parentNode;
        
        if( e.deltaY > 0 ){
            cur = cur === imgs.length - 1? 0: cur + 1;
        } else {
            cur = cur === 0? imgs.length - 1: cur - 1;
        }

        // active.classList.remove('display');
        // imgs[cur].parentNode.classList.add('display');
    }, 300));

    photograph.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('img') ){
            var li = tar.parentNode;
            li.classList.toggle('zoom');
        }
    }, true);


    function throttle( fn, ms ){
    	var t;
		var f = true;
		ms || (ms = 250);

    	return function(){
			var args = arguments;
    		t && clearTimeout(t);
    		if( f ){
    			fn.apply(this, args);
    			f = false;
    			setTimeout(function(){ f = true; }, ms);
    		}
    	}
    }

})(window, document);
