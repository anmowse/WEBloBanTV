
localStorage.removeItem('thongtinsanpham');
      
      document.getElementById('content').classList.add('hidden');
    window.addEventListener('load', function() {
      setTimeout(function() {
        document.querySelector('.loader-wrapper').style.display = 'none';
        document.body.classList.remove('loading');
        document.getElementById('content').classList.remove('hidden');
        new WOW({
          boxClass: 'wow',
          offset: 150, 
          mobile: false
        }).init();
      }, 3000); 
    });
    
