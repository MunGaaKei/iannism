(function(){
  var cvs = document.getElementById('canvas'),
      ctx = cvs.getContext('2d'),
      w = cvs.width = window.innerWidth,
      h = cvs.height = window.innerHeight,
      o = [w/2, h/2],
      stars = [],
      maxStars = 99;

  function draw(star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 360);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = star.alpha;
    ctx.fill();
    ctx.closePath();
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
    ctx.clearRect(0, 0, w, h);
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

// home setting
(function(){
  var navs = document.querySelector('div.c'),
      nav = navs.querySelectorAll('a'),
      bg = document.querySelector('div.bg-nav'),
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


// blogs menu setting
(function(){
  var menu = document.getElementById('menu'),
      input = document.querySelector('#blog input'),
      btn = input.nextElementSibling,
      blogs = route.concat(),
      l = blogs.length,
      blogsPerPage = 10,
      pageNav = document.querySelector('#blog .page-nav'),
      html = '';

  while(l--){ html += formatMenu(route[l]); }
  menu.innerHTML = html;

  pageNav.addEventListener('click', function(e){
    var target = e.target;
    if(target.classList[0] != 'page' || target.classList[1] == 'page-o' ) return false;
    var page = parseInt(target.innerHTML);
    




  });

  input.addEventListener('keydown', function(e){
    switch (e.which) {
      case 13:
        return btn.click();
        break;
      default: break;

    }
  });
  btn.addEventListener('click', function(){ searchBlog(input.value.trim()); });

  function searchBlog(k, isTag){
    if(!k) return false;
    var blog, rest = [];
    l = route.length;
    blogs = [];

    while(l--){
      blog = route[l];
      searchArray(blog.tag, k)?blogs.unshift(blog):rest.unshift(blog);
    }

    if (!isTag) {
      l = rest.length;
      while(l--){
        blog = rest[l];
        if(blog.title.indexOf(k)) blogs.push(blog);
      }
    }
    return blogs;
  }

  function searchArray(array, k){
    var l = array.length;
    if(!l) return false;
    while(l--){ if(array[l] == k) return true; }
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
        html = '<li class="item"><i class="iconfont icon-tijiandingzhi"></i><a href="' + o.path + '"><b>' + o.title + '</b></a>'
             + '<div class="info"><i class="iconfont icon-rili"></i>' + o.time + ' · <i class="iconfont icon-tag"></i>' + tags +'</div>'
             + '<i class="iconfont icon-defaultjustified"></i>' + o.abstract;
    return html;
  }
})();
