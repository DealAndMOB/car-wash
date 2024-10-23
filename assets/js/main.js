document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con configuración optimizada
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        disable: 'mobile' // Deshabilitar en móviles para mejor rendimiento
    });

    // Navbar Scroll Effect con throttling para mejor performance
    let lastScrollTime = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (Date.now() - lastScrollTime > 16) { // Limitar a ~60fps
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScrollTime = Date.now();
        }
    });

    // Smooth Scroll mejorado con offset dinámico
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignorar enlaces vacíos
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carrusel de Testimonios con controles táctiles mejorados
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            touch: true,
            pause: 'hover',
            keyboard: true
        });

        // Pausar en hover para mejor experiencia de usuario
        testimonialCarousel.addEventListener('mouseenter', () => {
            carousel.pause();
        });

        testimonialCarousel.addEventListener('mouseleave', () => {
            carousel.cycle();
        });
    }

    // Galería con Lightbox mejorado
    const initLightbox = () => {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true,
            'fadeDuration': 200,
            'imageFadeDuration': 200,
            'showImageNumberLabel': false
        });
    };
    initLightbox();

    // Lazy Loading de imágenes optimizado
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback para navegadores antiguos
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // WhatsApp Button con efecto de aparición suave
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            whatsappButton.style.opacity = '0';
            whatsappButton.style.transform = 'scale(0.8)';
            
            scrollTimeout = setTimeout(() => {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Menú móvil mejorado
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            const isClickInside = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // Cerrar menú al hacer click en un enlace
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Validación de formularios si existen
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Observer para animaciones al hacer scroll
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// Evitar parpadeo de contenido al cargar la página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Remover preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => preloader.remove(), 300);
    }
});