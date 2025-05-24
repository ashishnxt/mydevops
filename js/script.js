// Add this JavaScript to handle smooth animations
document.addEventListener('DOMContentLoaded', function() {
    // Handle initial load animations
    const initialAnimElements = document.querySelectorAll('.grid-wrapper .tall, .grid-wrapper .box, .grid-wrapper .big, .grid-wrapper .wide2');
    
    // Add small timeout to ensure elements animate after page load
    setTimeout(() => {
        initialAnimElements.forEach(element => {
            element.classList.add('show-initial');
        });
    }, 100);

    // Intersection Observer for scroll animations (existing ones)
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only add visible class to elements that don't have initial load animation
                const isInitialAnimElement = entry.target.classList.contains('tall') || 
                                          entry.target.classList.contains('box') || 
                                          entry.target.classList.contains('big') ||
                                          entry.target.classList.contains('wide2');
                
                if (!isInitialAnimElement) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, options);

    // Observe only elements that don't have initial load animation
    document.querySelectorAll('.grid-wrapper > div:not(.tall):not(.box):not(.big):not(.wide2)').forEach(item => {
        observer.observe(item);
    });
});
  


//----------------------------------------------------slider------------------------------------------

// ---------------------------------------------------silder------------------------------------------------------- 


document.querySelectorAll('.slider-container').forEach((sliderContainer) => {
  const track = sliderContainer.querySelector('.slider-track');
  const slides = sliderContainer.querySelectorAll('.slide');
  const prevBtn = sliderContainer.querySelector('.prev');
  const nextBtn = sliderContainer.querySelector('.next');
  const dotsContainer = sliderContainer.querySelector('.dots-container');
  let currentIndex = 0;
  
  // Touch/swipe variables
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isDragging = false;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
    updateDots();
  }

  function goToPrev() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlider();
  }

  function goToNext() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }

  // Original button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrev);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNext);
  }

  // Click navigation for large screens
  function addClickNavigation() {
    if (window.innerWidth > 768) {
      sliderContainer.addEventListener('click', handleSliderClick);
      sliderContainer.addEventListener('mouseenter', handleMouseEnter);
      sliderContainer.addEventListener('mouseleave', handleMouseLeave);
      sliderContainer.addEventListener('mousemove', handleMouseMove);
    } else {
      sliderContainer.removeEventListener('click', handleSliderClick);
      sliderContainer.removeEventListener('mouseenter', handleMouseEnter);
      sliderContainer.removeEventListener('mouseleave', handleMouseLeave);
      sliderContainer.removeEventListener('mousemove', handleMouseMove);
    }
  }

  function handleSliderClick(e) {
    // Don't trigger if clicking on dots
    if (e.target.classList.contains('dot')) {
      return;
    }
    
    const rect = sliderContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    // Left half - go to previous slide
    if (clickX < containerWidth / 2) {
      goToPrev();
    } 
    // Right half - go to next slide
    else {
      goToNext();
    }
  }

  function handleMouseEnter() {
    // Add a class to show we're hovering over the slider
    sliderContainer.classList.add('slider-hover');
  }

  function handleMouseLeave() {
    // Remove hover class and reset cursor
    sliderContainer.classList.remove('slider-hover');
    sliderContainer.style.cursor = 'default';
  }

  function handleMouseMove(e) {
    // Only apply custom cursor when mouse is within slider bounds
    const rect = sliderContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    
    // Check if mouse is within slider bounds
    if (mouseX >= 0 && mouseX <= containerWidth && mouseY >= 0 && mouseY <= containerHeight) {
      // Don't change cursor if hovering over dots
      if (e.target.classList.contains('dot')) {
        sliderContainer.style.cursor = 'pointer';
        return;
      }
      
      // Set appropriate cursor based on position
      if (mouseX < containerWidth / 2) {
        // Left side - previous cursor
        sliderContainer.style.cursor = `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDZMOSAxMkwxNSAxOCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K') 12 12, pointer`;
      } else {
        // Right side - next cursor
        sliderContainer.style.cursor = `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgNkwxNSAxMkw5IDE4IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=') 12 12, pointer`;
      }
    } else {
      // Mouse is outside slider bounds
      sliderContainer.style.cursor = 'default';
    }
  }

  // Touch/swipe navigation for mobile
  function addTouchNavigation() {
    if (window.innerWidth <= 768) {
      sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      sliderContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    } else {
      sliderContainer.removeEventListener('touchstart', handleTouchStart);
      sliderContainer.removeEventListener('touchmove', handleTouchMove);
      sliderContainer.removeEventListener('touchend', handleTouchEnd);
    }
  }

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = false;
  }

  function handleTouchMove(e) {
    if (!touchStartX) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    
    const diffX = Math.abs(touchCurrentX - touchStartX);
    const diffY = Math.abs(touchCurrentY - touchStartY);
    
    // If horizontal swipe is more significant than vertical, prevent default scrolling
    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
      isDragging = true;
    }
  }

  function handleTouchEnd(e) {
    if (!touchStartX || !isDragging) return;
    
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    const minSwipeDistance = 50;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > diffY && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe left - go to next slide
        goToNext();
      } else {
        // Swipe right - go to previous slide
        goToPrev();
      }
    }
    
    // Reset touch values
    touchStartX = 0;
    touchEndX = 0;
    touchStartY = 0;
    touchEndY = 0;
    isDragging = false;
  }

  // Initialize navigation based on screen size
  function initializeNavigation() {
    addClickNavigation();
    addTouchNavigation();
  }
  
  // Re-check on window resize
  function handleResize() {
    addClickNavigation();
    addTouchNavigation();
  }

  // Initialize navigation
  initializeNavigation();
  window.addEventListener('resize', handleResize);

  createDots();
});
//----------------------------------------------------Testimonials------------------------------------------
const testimonials = [
    {
        text: "Stefan has consistently helped us to move the needle over the past 2 years at Ellucian: his design skills and s mature ",
        author: "Lacey Gerard"
    },
    {
        text: "Stefan's creativity and technical expertise were crucial in launching our new product. He is a true team player, and .",
        author: "Alex Johnson"
    },
    {
        text: "Working with Stefan has been an absolute pleasure. His ability to blend design and functionality is unmatched, making him.",
        author: "Megan Smith"
    }
];

let currentIndex = 0;

function updateTestimonial() {
    const textElement = document.getElementById("testimonialText");
    const authorElement = document.getElementById("testimonialAuthor");

    textElement.classList.remove("active");
    authorElement.classList.remove("active");

    setTimeout(() => {
        textElement.textContent = testimonials[currentIndex].text;
        authorElement.textContent = testimonials[currentIndex].author;

        textElement.classList.add("active");
        authorElement.classList.add("active");
    }, 500);
}

function prevTestimonial() {
    currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
    updateTestimonial();
}

function nextTestimonial() {
    currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
    updateTestimonial();
}