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
