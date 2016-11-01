(function(){
  var cvs = document.getElementById('canvas'),
      ctx = cvs.getContext('2d'),
      w = cvs.width = window.innerWidth,
      h = cvs.height = window.innerHeight,
      o = [w/2, h/2],
      stars = [],
      maxStars = 50;

  function draw(star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 360);
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = star.a;
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
        stars[l].x = star.x + star.vx;
        stars[l].y = star.y + star.vy;
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
        radius = rand(1, 3);
    return {
      x: posX,
      y: posY,
      r: .6,
      a: Math.random() * .9,
      vx: (posX - o[0]) * .0005,
      vy: (posY - o[1]) * .0005,
      vr: Math.random(),
      time: rand(30, 100)
    }
  }

  window.addEventListener('resize',resizeCanvas);
  initStars();
  render();
  setInterval(run, 100);

})();
