(function(){
  document.getElementById('nighttoggle').addEventListener('click', function(){
    var body = document.querySelector('body');
    body.classList = body.classList.length? '': 'night';
  });
})();
