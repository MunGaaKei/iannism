;(function(doc){

    let io = new IntersectionObserver( entries => {
        
        let tar = entries[0].target;

        if( tar.classList.contains('img') ) return;

        tar.setAttribute('src', tar.dataset.src);
        tar.parentNode.dataset.alt = tar.alt;
        
    });

    Array.from( doc.getElementsByClassName('img-wait') ).forEach( $div => {
        let $img = $div.firstElementChild;
        $img.addEventListener('load', () => {
            $img.className = 'img';
            $div.removeAttribute('class');
        }, { once: true });
        io.observe( $img );
    });
    

})(document);