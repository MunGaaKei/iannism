// HOME PAGE INIT
;(function(){

})();

// BLOG MENU INIT
(function(){
  var menu = document.getElementById('menu'),
      input = document.querySelector('#blog input'),
      btn = input.nextElementSibling,
      blogs = menus.blogs.concat(),
      blogsPerPage = 5,
      l = blogs.length,
      pageNav = document.querySelector('#blog .page-nav'),
      keyword = document.getElementById('keyword');

  printMenus(1);
  keyword.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() != 'a') return false;
    blogs = menus.blogs.concat();
    printMenus(1);
    this.innerHTML = '<i>: )</i>';
  });

  pageNav.addEventListener('click', function(e){
    var target = e.target;
    if(target.classList[0] != 'page' || target.classList[1] == 'page-o' ) return false;
    printMenus(parseInt(target.innerHTML));
  });

  menu.addEventListener('click', function(e){
    var target = e.target;
    if(target.classList[0] == 'tag') {
      searchBlog(target.innerHTML, true);
      printMenus(1);
    }
  });

  input.addEventListener('keydown', function(e){ if(e.which == 13) return btn.click(); });
  btn.addEventListener('click', function(){
    searchBlog(input.value.trim());
    printMenus(1);
  });

  function printMenus(p){
    var num = blogsPerPage,
        html = '';
    l = blogs.length;
    if(!l) {
      menu.innerHTML = '<p class="none">没有找到相关结果 : (</p>';
      pageNav.innerHTML = '<i class="iconfont icon-more"></i>';
      return false;
    }
    pages = Math.ceil(l/num);
    l -= (p-1) * num;
    while( num-- && l-- ){ html += formatMenu(blogs[l]); }
    pageNav.innerHTML = showPage(p, pages);
    menu.innerHTML = html;
  }

  function searchBlog(k, isTag){
    if(!k) return false;
    var blog, rest = [];
    l = menus.blogs.length;
    blogs = [];
    k = k.toLowerCase();
    while(l--){
      blog = menus.blogs[l];
      searchArray(blog.tag, k)?blogs.unshift(blog):rest.unshift(blog);
    }
    if (!isTag) {
      l = rest.length;
      while(l--){
        blog = rest[l];
        if(blog.title.toLowerCase().indexOf(k) >= 0) blogs.push(blog);
      }
    }
    keyword.innerHTML = '<b>' + k + '</b> <a href="javascript:;">取消条件</a>';
    return blogs;
  }

  function searchArray(array, k){
    var l = array.length;
    if(!l) return false;
    while(l--){ if(array[l].toLowerCase() == k) return true; }
    return false;
  }

  function formatMenu(o){
    var tag = o.tag,
        tags = (function(){
          var html = '',
              i = tag.length;
          while(i--){ html += '<a href="javascript:void(0);" class="tag">'+ tag[i] +'</a>'; }
          return html;
        })(),
        html = '<li class="item-b"><a href="' + o.path + '" target="_blank"><b>' + o.title
             + '</b></a><div class="info"><i class="iconfont icon-rili"></i>' + o.time + ' · <i class="iconfont icon-tag"></i>' + tags
             + '</div><i class="iconfont icon-summaryread"></i>' + o.abstract + '</li>';
    return html;
  }
})();

// PHOTOGRAPHY INIT
(function(){
  var photos = menus.photos.concat(),
      l = photos.length,
      h = window.innerHeight,
      c = document.getElementById('photography'),
      html = '';

  window.addEventListener('resize',function(){ h = window.innerHeight; });
  while(l--){html += formatUl(photos[l]);}
  c.querySelector('.c-body').innerHTML = html;

  var uls = c.querySelectorAll('ul'),
      rest = l = photos.length;
  c.addEventListener('mousewheel', initUl);
  c.addEventListener('DOMMouseScroll', initUl);
  c.addEventListener('touchmove', initUl);
  document.getElementById('init-c').addEventListener('click', initUl);

  c.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG' && e.target.dataset.src){
      var display = document.getElementById('display'),
          target = e.target;
      display.style.top = c.scrollTop + window.innerHeight/2 + 'px';
      display.style.width = target.naturalWidth + 'px';
      display.style.display = 'block';
      display.querySelector('img').setAttribute('src', target.dataset.src);
    }
  });
  document.getElementById('display').addEventListener('click', function(){this.style.display = 'none';});

  function initUl(){
    if(!rest){c.removeEventListener('mousewheel', initUl); return;}
    var i = 0;
    for(i; i< l; i++){
      if(!uls[i].dataset.wait) continue;
      if(uls[i].offsetTop < h + c.scrollTop + 50){ loadUl(uls[i]); rest--; delete uls[i].dataset.wait; }
    }
  }
  function loadUl(ul){
    var imgs = ul.querySelectorAll('img'),
        imgsLen = imgs.length;
    while(imgsLen--){
      imgs[imgsLen].setAttribute('src', imgs[imgsLen].dataset.src);
      imgs[imgsLen].onload = function(){
        this.style.transform = 'scale(1)';
        this.style.opacity = 1;
      }
    }
  }
  function formatUl(ul){
    var html = '<ul data-wait="on">',
        ulLen = ul.length;
    while(ulLen--){html += '<li><img data-src="image/'+ ul[ulLen] +'"></li>';}
    return html += '</ul>';
  }
})();


// PUBLIC METHODS
function showPage(p, totalpage, siblings){
  var i, pre, next,
      siblingNum = siblings? siblings: 3,
      page = '<a class="page page-o">'+p+'</a>';
  for (i= 1; i< siblingNum; i++){
      pre = p - i;
      next = p + i;
      if(p-i > 1){ page = '<a class="page">' + pre + '</a>' + page; }
      if(p+i < totalpage){ page += '<a class="page">' + next + '</a>'; }
  }
  if(p - siblingNum > 1){ page = '<a class="page">1</a> - - ' + page; }
  if(p - siblingNum-2 < 0 && p != 1){ page = '<a class="page">1</a>' + page; }
  if(p + siblingNum < totalpage){ page += ' - - <a class="page">' + totalpage + '</a>'; }
  if(p + siblingNum >= totalpage && p != totalpage){ page += '<a class="page">' + totalpage + '</a>'; }
  return page;
}
