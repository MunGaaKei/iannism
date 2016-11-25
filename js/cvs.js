// canvas init
(function(){
  var cvs = document.getElementById('canvas'),
      ctx = cvs.getContext('2d'),
      w = cvs.width = window.innerWidth,
      h = cvs.height = window.innerHeight,
      o = [w/2, h/2],
      stars = [],
      maxStars = 119;

  function draw(star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 360);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = star.alpha;
    ctx.fill();
  }

  function initStars() {
    var l = maxStars;
    while(l--){ stars[l] = initOneStar(); }
  }

  function render() {
    var l = maxStars;
    while(l--){ draw(stars[l]); }
  }

  function run() {
    var l = maxStars;
    // ctx.clearRect(0, 0, w, h);
    cvs.width = w; // 部分浏览器不支持
    while(l--){
      if(stars[l].time === 0){
        stars[l] = initOneStar();
      } else {
        var star = stars[l];
        stars[l].time--;
        stars[l].x = (star.x + star.vx);
        stars[l].y = (star.y + star.vy);
        stars[l].r = star.r + star.vr * .01;
      }
    }
    render();
  }

  function resizeCanvas() {
    w = cvs.width = window.innerWidth;
    h = cvs.height = window.innerHeight;
    o = [w/2, h/2];
    ctx.clearRect(0, 0, w, h);
    render();
  }

  function rand(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  function initOneStar(){
    var posX = rand(0, w),
        posY = rand(0, h),
        dx = posX - o[0],
        dy = posY - o[1],
        star = {
          x: posX,
          y: posY,
          r: .6,
          alpha: Math.random(),
          vx: dx * .0004,
          vy: dy * .0004,
          vr: Math.random()/3,
          a: 0, // for shooting star
          time: rand(120, 360) // 20/1s
        };

    if( Math.abs(dx) < 100 && Math.abs(dy) < 60 ){
      // 靠近中心点 O
      // 应该重新设计算法
      // star.time = rand(20, 40);
      // star.vx = dx * .010;
      // star.vy = dy * .008;
      // star.vr = 24 / rand(5, 7);
      star.a = rand(1, 4) * Math.random();
    }
    return star;
  }

  window.addEventListener('resize',resizeCanvas);
  initStars();
  render();
  setInterval(run, 50);

})();

// home init
(function(){
  var navs = document.querySelector('nav.nav'),
      nav = navs.querySelectorAll('a'),
      bg = document.querySelector('div.whitesquare'),
      l = nav.length;
  while(l--){
    (function(){
      var i = l;
      nav[i].addEventListener('mouseover', function(){
        bg.style.top = 27 * i + 3 + 'px';
        bg.style.width = this.offsetWidth + 'px';
      });
    })();
  }
  navs.addEventListener('mouseleave', function(){ bg.style.width = 0; });
})();

// blogs menu init
(function(){
  var menu = document.getElementById('menu'),
      input = document.querySelector('#blog input'),
      btn = input.nextElementSibling,
      blogs = menus.concat(),
      blogsPerPage = 9,
      l = blogs.length,
      pageNav = document.querySelector('#blog .page-nav'),
      keyword = document.getElementById('keyword');

  printMenus(1);

  keyword.addEventListener('click', function(e){
    if(e.target.tagName.toLowerCase() != 'a') return false;
    blogs = menus.concat();
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
      menu.innerHTML = '<p class="none">没有找到相关结果 :(</p>';
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
    l = menus.length;
    blogs = [];
    k = k.toLowerCase();
    while(l--){
      blog = menus[l];
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
        html = '<li class="item-b"><i class="iconfont icon-tijiandingzhi"></i><a href="' + o.path + '"><b>' + o.title + '</b></a>'
             + '<div class="info"><i class="iconfont icon-rili"></i>' + o.time + ' · <i class="iconfont icon-tag"></i>' + tags +'</div>'
             + '<i class="iconfont icon-summaryread"></i>' + o.abstract + '</li>';
    return html;
  }

})();

// photography init
(function(){
  var d = document,
      a = d.querySelector('div.a'),
      c = d.getElementById('photography'),
      boxC = d.querySelector('div.box-c');

  d.getElementById('nav-c').addEventListener('click', function(){
    a.classList.add('hide');
    c.classList.remove('hide');
  });
  d.getElementById('nav-a').addEventListener('click', function(){
    a.classList.remove('hide');
    c.classList.add('hide');
  });






})();

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
