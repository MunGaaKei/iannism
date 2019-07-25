;(function(win, doc, undefined){

    var disabled = false;

	doc.addEventListener('click', function( e ){
        var tar = e.target;
        if( tar.matches('[data-href]') && !disabled ){
            var room = doc.getElementById(tar.dataset.href);
            var curr = doc.querySelector('.room.active');
            curr.classList.remove('active');
            disabled = setTimeout(function(){
                curr.classList.remove('on');
                disabled = false;
            }, 300);
            room.classList.add('on');
            room.offsetWidth;
            room.classList.add('active');
        }
    }, true);

})(window, document);
