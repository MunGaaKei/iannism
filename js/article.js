;(function(doc){

    let io = new IntersectionObserver( entries => {
        let tar = entries[0].target;
        if( tar.classList.contains('img') ) return;
        tar.setAttribute('src', tar.dataset.src);
    });

    Array.from( doc.getElementsByClassName('img-wait') ).forEach( $div => {
        let $img = $div.lastElementChild;
        $img.addEventListener('load', () => {
            $img.className = 'img';
            $div.removeAttribute('class');
        }, { once: true });
        io.observe( $img );
    });

    doc.addEventListener('click', e => {
        let tar = e.target;
        while( tar !== doc.body ){

            if( tar.classList.contains('img') ){
                let $backdrop = doc.querySelector('.backdrop');
                $backdrop.innerHTML = `<img src="${tar.getAttribute('src')}">`;
                $backdrop.classList.add('active');
            } else if( tar.classList.contains('backdrop') ){
                tar.classList.remove('active');
            }

            tar = tar.parentNode;
        }
    });
    

})(document);