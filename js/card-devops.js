document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('.slider');
  
    sliders.forEach((slider) => {
      const products = slider.querySelectorAll('.product');
      const container = slider.querySelector('.products');
      const prevBtn = slider.querySelector('.prev');
      const nextBtn = slider.querySelector('.next');
      let currentIndex = 0;
  
      function updateSlider() {
        products.forEach(p => p.classList.remove('active'));
        const current = products[currentIndex];
        current.classList.add('active');
        container.style.height = current.offsetHeight + 'px';
      }
  
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        updateSlider();
      });
  
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % products.length;
        updateSlider();
      });
  
      // Ripple effect
      const rippleButtons = slider.querySelectorAll('[ripple]');
      rippleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
          const ripple = document.createElement('div');
          ripple.className = 'ripple';
          ripple.style.background = btn.getAttribute('ripple-color');
  
          const rect = btn.getBoundingClientRect();
          ripple.style.left = `${e.clientX - rect.left - 30}px`;
          ripple.style.top = `${e.clientY - rect.top - 30}px`;
  
          btn.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1900);
        });
      });
  
      updateSlider();
    });
  });



  
  function updateSlider() {
    products.forEach(p => p.classList.remove('active'));
    const current = products[currentIndex];
    current.classList.add('active');
    container.style.height = current.offsetHeight + 'px';
  
    // Update the tool name
    const toolName = current.getAttribute('data-name');
    const nameElement = slider.querySelector('.tool-name');
    if (nameElement) nameElement.textContent = toolName;
  }



  