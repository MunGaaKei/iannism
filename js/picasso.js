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
        lazyload( this.querySelectorAll('img') );
    });
    photograhp.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('img') ){
            e.stopPropagation();
            var iw = win.innerWidth;
            if( iw > 860 ) {
                var frame = doc.getElementById('f');
                var framer = frame.querySelector('.framer img');
                framer.setAttribute('src', tar.getAttribute('src'));
                close( this );
                open( frame );
            } else {
                var li = tar.parentNode;
                if( li.classList.toggle('expand') ){
                    var ht = tar.offsetHeight;
                    li.style.cssText = 'height:'+ ht +'px';
                } else {
                    li.removeAttribute('style');
                }
                
            }
        } else {
            close( this );
            open( doc.getElementById('h') );
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
        cantAnimate = setTimeout(function(){
            el.classList.remove('on');
            el.dispatchEvent(evts.close);
            cantAnimate = false;
        }, 300);
    }

    function open( el ){
        el.dispatchEvent(evts.open);
        el.classList.add('on');
        el.offsetWidth;
        el.classList.add('active');
    }

    function lazyload( imgs ){
        var l = imgs.length;
        var i = 0;
        var img;
        for(; i < l; i++){
            img = imgs[i];
            img.setAttribute('src', img.dataset.src);
            img.addEventListener('load', function(){
                this.classList.remove('waiting');
            }, { once: true });
        }
    }

})(window, document);
