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

    var blog = doc.getElementById('b');
    var iframe = blog.querySelector('.iframe');
    iframe.addEventListener('load', function(){
        console.log('iframe loaded');
        
    });
    blog.addEventListener('close', function(){
        // stop load iframe
        var loading = this.querySelector('.loading');
        if( !loading ){
            
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

})(window, document);
