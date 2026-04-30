/* ============================================
   SAVE STUDIOS — Landing Page Scripts
   Interações, Animações & Funcionalidades

   Índice de Módulos:
   1. Cursor Glow
   2. Hero Particles
   3. Navbar (scroll, mobile toggle)
   4. Scroll Reveal (Intersection Observer)
   5. Counter Animation
   6. Testimonials Slider
   7. Smooth Scroll
   8. Form — Envio via WhatsApp
   9. Parallax Effects
   10. Service Cards (tilt effect)
   11. Portfolio (touch mobile)
   12. Active Link Tracking
   13. Preloader
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================================
       1. CURSOR GLOW — Luz que segue o mouse
       =========================================== */

    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursorGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }

        requestAnimationFrame(animateCursorGlow);
    }

    animateCursorGlow();


    /* ===========================================
       2. HERO PARTICLES — Partículas do hero
       =========================================== */

    const heroParticles = document.getElementById('heroParticles');

    if (heroParticles) {
        const PARTICLE_COUNT = 30;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';
            particle.style.width = (1 + Math.random() * 2) + 'px';
            particle.style.height = particle.style.width;
            heroParticles.appendChild(particle);
        }
    }


    /* ===========================================
       3. NAVBAR — Scroll effect & Mobile toggle
       =========================================== */

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll — adiciona classe quando rola a página
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Toggle — menu hamburger mobile
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Fecha o menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    /* ===========================================
       4. SCROLL REVEAL — Animação de entrada
       =========================================== */

    const fadeUpElements = document.querySelectorAll('.fade-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    // Aplica stagger delay em elementos irmãos
    fadeUpElements.forEach((el) => {
        const parent = el.parentElement;
        const siblings = parent ? parent.querySelectorAll(':scope > .fade-up') : [];

        if (siblings.length > 1) {
            const siblingIndex = Array.from(siblings).indexOf(el);
            el.dataset.delay = siblingIndex * 100;
        }

        revealObserver.observe(el);
    });


    /* ===========================================
       5. COUNTER ANIMATION — Contadores animados
       =========================================== */

    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    counter.textContent = Math.round(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));


    /* ===========================================
       6. TESTIMONIALS SLIDER — Carrossel
       =========================================== */

    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        let currentSlide = 0;
        const cards = track.querySelectorAll('.testimonial-card');
        const totalSlides = cards.length;
        const dots = dotsContainer.querySelectorAll('.dot');

        function updateSlider() {
            const gap = 24;
            const cardWidth = cards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Controles de navegação
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
            });
        });

        // Auto-play com pausa no hover
        let autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });

        // Recalcula ao redimensionar
        window.addEventListener('resize', updateSlider);
    }


    /* ===========================================
       7. SMOOTH SCROLL — Links âncora suaves
       =========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ===========================================
       8. FORM — Envio via WhatsApp
       =========================================== */

    const ctaForm = document.getElementById('ctaForm');
    const WHATSAPP_NUMBER = '5514991366745';

    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Coleta os dados do formulário
            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const serviceSelect = document.getElementById('formService');
            const service = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
            const message = document.getElementById('formMessage').value.trim();

            // Monta a mensagem formatada para WhatsApp
            let whatsappMessage = `🎬 *Nova mensagem via Save Studios*\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            whatsappMessage += `*E-mail:* ${email}\n`;
            if (phone) whatsappMessage += `*WhatsApp:* ${phone}\n`;
            whatsappMessage += `*Serviço:* ${service}\n`;
            if (message) whatsappMessage += `\n*Mensagem:*\n${message}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Feedback visual antes do redirecionamento
            const submitBtn = document.getElementById('formSubmit');
            submitBtn.querySelector('span').textContent = 'Abrindo WhatsApp...';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

            setTimeout(() => {
                window.open(whatsappURL, '_blank');

                // Reset do botão e formulário
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = 'Enviar Mensagem';
                    submitBtn.style.background = '';
                    ctaForm.reset();
                }, 2000);
            }, 500);
        });
    }


    /* ===========================================
       9. PARALLAX — Efeitos sutis no scroll
       =========================================== */

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Parallax no gradiente do hero
                const heroGradient = document.querySelector('.hero-gradient');
                if (heroGradient) {
                    heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Parallax nos glows do CTA
                const ctaGlow1 = document.querySelector('.cta-glow-1');
                const ctaGlow2 = document.querySelector('.cta-glow-2');
                if (ctaGlow1 && ctaGlow2) {
                    const ctaSection = document.querySelector('.cta-section');
                    if (ctaSection) {
                        const ctaRect = ctaSection.getBoundingClientRect();
                        const ctaProgress = 1 - (ctaRect.top / window.innerHeight);
                        if (ctaProgress > 0 && ctaProgress < 2) {
                            ctaGlow1.style.transform = `translate(${ctaProgress * 30}px, ${ctaProgress * -20}px)`;
                            ctaGlow2.style.transform = `translate(${ctaProgress * -30}px, ${ctaProgress * 20}px)`;
                        }
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });


    /* ===========================================
       10. SERVICE CARDS — Efeito tilt 3D no hover
       =========================================== */

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    /* ===========================================
       11. PORTFOLIO — Touch overlay (mobile)
       =========================================== */

    if ('ontouchstart' in window) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                portfolioItems.forEach(i => i.classList.remove('touch-active'));
                item.classList.add('touch-active');
            });
        });

        document.addEventListener('touchstart', (e) => {
            if (!e.target.closest('.portfolio-item')) {
                document.querySelectorAll('.portfolio-item').forEach(i => i.classList.remove('touch-active'));
            }
        });
    }


    /* ===========================================
       12. ACTIVE LINK — Tracking do link ativo
       =========================================== */

    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                    link.style.color = 'var(--color-text-primary)';
                } else {
                    link.classList.remove('active');
                    link.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });


    /* ===========================================
       13. PRELOADER — Fade in suave ao carregar
       =========================================== */

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';

        // Ativa fade-ups que já estão visíveis na viewport
        setTimeout(() => {
            fadeUpElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });
        }, 100);
    });

});
