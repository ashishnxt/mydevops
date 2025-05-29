
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'entering');
        if (index === currentSlide) {
            slide.classList.add('active');
            // Add entering class after a small delay for animation
            setTimeout(() => {
                slide.classList.add('entering');
            }, 10);
        }
    });

    // Update navigation arrows
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    prevBtn.classList.toggle('disabled', currentSlide === 0);
    nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
}

function nextTestimonial() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function previousTestimonial() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

// Initialize
updateSlide();

// Auto-slide functionality (optional)
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextTestimonial();
        } else {
            currentSlide = 0;
            updateSlide();
        }
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pause auto-slide on hover
const container = document.querySelector('.testimonials-container');
container.addEventListener('mouseenter', stopAutoSlide);
container.addEventListener('mouseleave', startAutoSlide);

// Start auto-slide
startAutoSlide();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next slide
            nextTestimonial();
        } else {
            // Swiped right - previous slide
            previousTestimonial();
        }
    }
}
