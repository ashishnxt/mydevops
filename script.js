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
  


//----------------------------------------------------Testimonials------------------------------------------
