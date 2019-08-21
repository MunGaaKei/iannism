;(function(win, doc, undefined){

    var ispc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    var cantAnimate = false;
    var evts = {
        open: new CustomEvent('open', { bubbles: true, cancelable: true }),
        close: new CustomEvent('close', { bubbles: true, cancelable: true })
    }

	doc.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('[data-href]') && !cantAnimate ){
            var room = doc.getElementById(tar.dataset.href);
            var curr = doc.querySelector('.room.active');
            curr.classList.remove('active');
            cantAnimate = setTimeout(function(){
                curr.classList.remove('on');
                curr.dispatchEvent(evts.close);
                cantAnimate = false;
            }, 300);
            room.dispatchEvent(evts.open);
            room.classList.add('on');
            room.offsetWidth;
            room.classList.add('active');
        }
    }, false);

    var reading = doc.getElementById('r');
    var iframe = reading.querySelector('.iframe');
    iframe.addEventListener('load', function(){
        var loading  = reading.querySelector('.loading');
        if( loading ){
            loading.classList.add('fading');
            setTimeout(function(){ loading.remove(); }, 256);
        }
    });
    reading.addEventListener('close', function(){
        iframe.setAttribute('src', 'javascript:;');
        var loading = this.querySelector('.loading');
        if( !loading ){
            loading = doc.createElement('DIV');
            loading.className = 'loading';
            reading.appendChild( loading );
        }
    });

    var photograhp = doc.getElementById('p');
    photograhp.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('img') ){
            console.log(tar);
            // tar.complete;
        }
    }, true);

    /* 节流封装 */
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
