document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Management Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerIcon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            hamburgerIcon.className = 'fas fa-times';
        } else {
            hamburgerIcon.className = 'fas fa-bars';
        }
    });

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerIcon.className = 'fas fa-bars';
        });
    });

    // 2. GSAP Core & ScrollTrigger
    // We wrap this in an 'if' check just in case the CDN loads slowly
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Standard structural reveals
        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach((element) => {
            gsap.fromTo(element, 
                { y: 30, opacity: 0 }, 
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%", // Triggers safely when element is 10% into the viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // BUGFIX: Bulletproof Service Cards Reveal
        const serviceCards = document.querySelectorAll('.animate-card');
        serviceCards.forEach((card, index) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 }, // Force start state
                {
                    y: 0, opacity: 1,  // Force end state
                    duration: 0.6,
                    delay: index * 0.15, // Recreates the stagger effect safely
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 95%", // Triggers almost immediately to ensure they show up
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Force ScrollTrigger to recalculate everything after layout loads
        // This stops cards from getting stuck if images load slowly
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    }
	
// 3. Initialize Swiper Image Gallery with Responsive Breakpoints
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.clinic-swiper', {
            // Default parameters (Mobile First)
            slidesPerView: 1,
            spaceBetween: 20, // 20px gap between slides
            
            loop: true,
            speed: 800,
            
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            grabCursor: true,

            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 768px (iPads / Tablets)
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px (Laptops / Desktops)
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

});
