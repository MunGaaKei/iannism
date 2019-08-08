;(function(win, doc, undefined){

    var ispc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    var cantAnimate = false;

	doc.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('[data-href]') && !cantAnimate ){
            var room = doc.getElementById(tar.dataset.href);
            var curr = doc.querySelector('.room.active');
            curr.classList.remove('active');
            cantAnimate = setTimeout(function(){
                curr.classList.remove('on');
                cantAnimate = false;
            }, 300);
            room.classList.add('on');
            room.offsetWidth;
            room.classList.add('active');
        }
    }, false);

    var photograph = doc.querySelector('.photograph');
    var imgs = photograph.querySelectorAll('img');
    imgs[0].addEventListener('load', function(){
        var loading = photograph.firstElementChild;
        if( loading ){
            loading.style.opacity = 0;
            setTimeout(function(){
                loading.remove();
            }, 1000);
        }
    }, { once: true });
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
        var k = active.dataset.i - 0;
        
        if( e.deltaY > 0 ){
            k = k === imgs.length - 1? 0: k + 1;
        } else {
            k = k === 0? imgs.length - 1: k - 1;
        }

        active.classList.remove('zoom');
        active.classList.remove('display');
        imgs[k].parentNode.classList.add('display');
    }, 300));

    photograph.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('img') ){
            var li = tar.parentNode;
            li.classList.toggle('zoom');
        }
    }, true);

    /* 兼容移动事件处理 */
    var touched = false;
    var touchEl = null;
    function addEvent( el, evt, fn, options ){
        if( ispc ){
            el.addEventListener(evt, fn, options);
        } else {
            el.addEventListener('touchstart', function( e ){
                touched = true;
                touchEl = e.target;
            }, options);
            
            if( evt === 'mousewheel' ){
                el.addEventListener('touchmove', function( e ){
                    if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
                    e.preventDefault();
                    var touch = e.targetTouches[0];

                }, options);
            }

            el.addEventListener('touchend', function( e ){
                fn.call( el, e );
                touchEl = null;
            });
        }
    }

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
