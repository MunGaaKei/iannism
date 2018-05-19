;(function(win, doc, undefined){

    var mun = byClass('mun')[0],
        b = byClass('b')[0],
        p = byClass('p')[0],
        v = byClass('view')[0], view = byId('view'),
        ul = byId('blogs'),
        blogs = win.menus.blogs.concat(),
        pagenav = byId('pages'),
        l = blogs.length;

    byId('picasso').addEventListener('load', function(){
        this.style.opacity = 1;
    });

    printBlogs();
    byId('b').addEventListener('click', function(){
        out(p);
        on(b);
    });
    byId('xb').addEventListener('click', function(){ out(b); });

    pagenav.addEventListener('click', function(e){
        var tar = e.target;
        if(tar.classList[0] != 'page' || tar.classList[1] == 'page-o' ) return false;
        printBlogs(parseInt(tar.textContent));
    });

    byId('condition').addEventListener('keydown', function(e){ if(e.which == 13) return byId('search').click(); });
    byId('search').addEventListener('click', function(){
        var k = byId('condition').value;
        if(k.trim()) searchBlog(k);
    });
    ul.addEventListener('click', function(e){
        var tar = e.target;
        if(tar.classList[0] == 'tag') searchBlog(tar.textContent, true);
    });
    byId('keyword').addEventListener('click', function(){
        blogs = win.menus.blogs.concat();
        printBlogs();
        this.innerHTML = '<i>: )</i>';
    });

    function searchBlog( k, iTAG ){
        if(!k) return;
        var temp = win.menus.blogs.concat(),
            tags, j, found,
            i = 0, len = temp.length;

        blogs = [];
        for(; i< len; i++){
            found = false;
            tags = temp[i].tag;
            j = tags.length;
            while(!found && j--){
                if(tags[j].toLowerCase() == k.toLowerCase()){
                    blogs.push(temp[i]);
                    found = true;
                }
            }
            if(!found && !iTAG && temp[i].title.toLowerCase().indexOf(k.toLowerCase()) >= 0) blogs.push(temp[i]);
        }
        printBlogs();
        byId('keyword').innerHTML = '<a class="keyword">'+ k +'</a>';
    }

    function printBlogs( page ){
        page = page || 1;
        var num = 9, html = '',
            len = blogs.length,
            pages = Math.ceil(len/num);
        if( !len ) ul.innerHTML = '<li class="nores">无相关结果 : (</li>';
        len -= (page - 1) * num;
        while( num-- && len-- ){ html += formatLi(blogs[len]); }
        ul.innerHTML = html;
        pagenav.innerHTML = pagination(page, pages);
    }

    function formatLi( li ){
        var tags = li.tag,
            len = tags.length,
            html = '<li><a href="'+ li.path +'" class="title">'+ li.title +'</a>';
        tags = '';
        while( len-- ){
            tags += '<a class="tag">'+ li.tag[len] +'</a>';
        }
        html += '<p><time>'+ li.time +'</time>'+ tags +'</p><p>'+ li.abstract +'</p>';
        return html;
    }


    // 图集
    byId('p').addEventListener('click', function(){
        out(b);
        on(p);
    });
    byId('p').addEventListener('click', function(){
        initP();
        this.removeEventListener('click', arguments.callee);
    });
    byId('xp').addEventListener('click', function(){ out(p); });

    function initP(){
        let img, imgs = byId('content').querySelectorAll('img');
        l = imgs.length;
        for(let i = 0; i< l; i++){
            img = imgs[i];
            img.setAttribute('src', img.dataset.src);
            img.addEventListener('click', function(){
                on(v);
                view.setAttribute('src', this.getAttribute('src'));
            });
        }
        v.addEventListener('click', function(){ out(this); });
    }


    // PUBLIC METHODS
    function byId( id ){ return doc.getElementById(id); }
    function byClass( name ){ return doc.getElementsByClassName(name); }

    function out( section ){
        section.classList.add('out');
        setTimeout(function(){ section.style.display = 'none'; }, 300);
    }
    function on( section ){
        section.removeAttribute('style');
        section.offsetWidth;
        section.classList.remove('out');
    }

    function pagination(p, pages, siblings){
      var i, pre, next,
          sib = siblings? siblings: 3,
          page = '<a class="page page-o">'+p+'</a>';
      for (i= 1; i< sib; i++){
          pre = p - i;
          next = p + i;
          if(p-i > 1){ page = '<a class="page">' + pre + '</a>' + page; }
          if(p+i < pages){ page += '<a class="page">' + next + '</a>'; }
      }
      if(p - sib > 1){ page = '<a class="page">1</a> <i class="iconfont icon-more"></i> ' + page; }
      if(p - sib-2 < 0 && p != 1){ page = '<a class="page">1</a>' + page; }
      if(p + sib < pages){ page += ' <i class="iconfont icon-more"></i> <a class="page">' + pages + '</a>'; }
      if(p + sib >= pages && p != pages){ page += '<a class="page">' + pages + '</a>'; }
      return page;
    }

})(window, document);
