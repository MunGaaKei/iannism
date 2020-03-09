;(function(win, doc, undefined){

    var ispc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    var ttl = false;
    var evts = {
        open: new CustomEvent('open', { bubbles: true, cancelable: true }),
        close: new CustomEvent('close', { bubbles: true, cancelable: true })
    }

	doc.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('[data-href]') && !ttl ){
            close( doc.querySelector('.room.active') );
            open( doc.getElementById(tar.dataset.href) );
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
    photograhp.addEventListener('open', function(){
        initPhotos( this.querySelectorAll('img') );
    }, { once: true });
    photograhp.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('img') ){
            e.stopPropagation();
            var frame = doc.getElementById('f');
            var framer = frame.firstElementChild;
            framer.setAttribute('src', tar.getAttribute('src'));
            close( this );
            open( frame );
        }
    });


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

    function close( el ) {
        el.classList.remove('active');
        ttl = setTimeout(function(){
            el.classList.remove('on');
            el.dispatchEvent(evts.close);
            ttl = false;
        }, 300);
    }

    function open( el ){
        el.dispatchEvent(evts.open);
        el.classList.add('on');
        el.offsetWidth;
        el.classList.add('active');
    }

    function initPhotos( imgs ){
        var l = imgs.length;
        var i = 0;
        var img, li, n;
        for(; i < l; i++){
            img = imgs[i];
            li = img.parentNode;
            n = Math.random();
            li.style.cssText = 'transform:rotate('+ ((n > .5? 1: -1) * Math.random() * 36) + 'deg)';
            img.setAttribute('src', img.dataset.src);
            img.addEventListener('load', function(){
                this.classList.remove('waiting');
                this.removeAttribute('data-src');
            }, { once: true });
        }
    }

})(window, document);
