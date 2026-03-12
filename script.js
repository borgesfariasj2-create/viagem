// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
    
    // Carousel for Ondas Praia Resort
    const carouselContainer = document.querySelector('.resort-carousel');
    if (carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        const dots = carouselContainer.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        const slideInterval = 3000; // 3 seconds
        
        function showSlide(index) {
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            dots.forEach(function(dot) {
                dot.classList.remove('active');
            });
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto slide
        let slideTimer = setInterval(nextSlide, slideInterval);
        
        // Dot click handlers
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                clearInterval(slideTimer);
                currentSlide = index;
                showSlide(currentSlide);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });
        
        // Pause on hover
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(slideTimer);
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }
});

// Scroll to top button
        window.addEventListener('scroll', function() {
            const scrollTop = document.querySelector('.scroll-top');
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.benefit-card, .resort-card, .promo-card, .park-card, .point-card, .payment-card, .eligibility-card').forEach(el => {
            observer.observe(el);
        });

        // Header background change on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.pageYOffset > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Avião animado - aparece após 2 segundos e repete a cada 25 segundos
        window.addEventListener('load', function() {
            setTimeout(function() {
                const airplane = document.getElementById('airplane');
                if (airplane) {
                    airplane.style.opacity = '1';
                }
            }, 2000);
        });

        // Loop da animação do avião
        setInterval(function() {
            const airplane = document.getElementById('airplane');
            if (airplane) {
                airplane.style.animation = 'none';
                airplane.offsetHeight; // Trigger reflow
                airplane.style.animation = 'flyAcross 20s linear infinite';
            }
        }, 25000);

        // Contador animado - mais lento e smooth
        const counters = document.querySelectorAll('.counter');
        const counterSpeed = 4000;

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = counterSpeed;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(target * easeOut);

                    counter.innerText = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                requestAnimationFrame(updateCount);
            });
        };

        // Iniciar animação quando a seçãoAbout for visível
        const aboutSection = document.querySelector('.about');
        const counterObserverOptions = {
            threshold: 0.3
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, counterObserverOptions);

        if (aboutSection) {
            counterObserver.observe(aboutSection);
        }
