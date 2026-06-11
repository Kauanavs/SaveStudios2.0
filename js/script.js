/* ============================================
   SAVE STUDIOS — Scripts Premium v2
   Interações sofisticadas e performance otimizada
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================================
       1. CURSOR GLOW - Luz premium que segue mouse
       =========================================== */

    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursorGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }

        requestAnimationFrame(animateCursorGlow);
    }

    animateCursorGlow();


    /* ===========================================
       2. HERO PARTICLES - Partículas animadas
       =========================================== */

    const heroParticles = document.getElementById('heroParticles');

    if (heroParticles) {
        const PARTICLE_COUNT = 40;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (1.5 + Math.random() * 2.5) + 'px';
            particle.style.height = particle.style.width;
            heroParticles.appendChild(particle);
        }
    }


    /* ===========================================
       3. NAVBAR - Scroll effect & Mobile toggle
       =========================================== */

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    /* ===========================================
       4. SCROLL REVEAL - Animações ao scroll
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
        rootMargin: '0px 0px -80px 0px'
    });

    fadeUpElements.forEach((el) => {
        const parent = el.parentElement;
        const siblings = parent ? parent.querySelectorAll(':scope > .fade-up') : [];

        if (siblings.length > 1) {
            const siblingIndex = Array.from(siblings).indexOf(el);
            el.dataset.delay = siblingIndex * 120;
        }

        revealObserver.observe(el);
    });


    /* ===========================================
       5. COUNTER ANIMATION - Contadores animados
       =========================================== */

    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
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
       6. TESTIMONIALS SLIDER - Carrossel
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
            const gap = 28;
            const cardWidth = cards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

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

        let autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 6000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 6000);
        });

        window.addEventListener('resize', updateSlider);
    }


    /* ===========================================
       7. SMOOTH SCROLL - Links âncora suaves
       =========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 30;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ===========================================
       8. FORM - Envio via WhatsApp
       =========================================== */

    const ctaForm = document.getElementById('ctaForm');
    const WHATSAPP_NUMBER = '551499173-8703';

    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const serviceSelect = document.getElementById('formService');
            const service = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
            const message = document.getElementById('formMessage').value.trim();

            let whatsappMessage = `🎬 *Nova mensagem via Save Studios*\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            whatsappMessage += `*E-mail:* ${email}\n`;
            if (phone) whatsappMessage += `*WhatsApp:* ${phone}\n`;
            whatsappMessage += `*Serviço:* ${service}\n`;
            if (message) whatsappMessage += `\n*Mensagem:*\n${message}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            const submitBtn = document.getElementById('formSubmit');
            submitBtn.querySelector('span').textContent = 'Abrindo WhatsApp...';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

            setTimeout(() => {
                window.open(whatsappURL, '_blank');

                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = 'Enviar Mensagem';
                    submitBtn.style.background = '';
                    ctaForm.reset();
                }, 2500);
            }, 600);
        });
    }


    /* ===========================================
       9. PARALLAX - Efeitos ao scroll
       =========================================== */

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                const heroGradient = document.querySelector('.hero-gradient');
                if (heroGradient) {
                    heroGradient.style.transform = `translateY(${scrolled * 0.35}px)`;
                }

                const ctaGlow1 = document.querySelector('.cta-glow-1');
                const ctaGlow2 = document.querySelector('.cta-glow-2');
                if (ctaGlow1 && ctaGlow2) {
                    const ctaSection = document.querySelector('.cta-section');
                    if (ctaSection) {
                        const ctaRect = ctaSection.getBoundingClientRect();
                        const ctaProgress = 1 - (ctaRect.top / window.innerHeight);
                        if (ctaProgress > 0 && ctaProgress < 2) {
                            ctaGlow1.style.transform = `translate(${ctaProgress * 40}px, ${ctaProgress * -30}px)`;
                            ctaGlow2.style.transform = `translate(${ctaProgress * -40}px, ${ctaProgress * 30}px)`;
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
       10. SERVICE CARDS - Efeito 3D sofisticado
       =========================================== */

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `translateY(-10px) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    /* ===========================================
       11. PORTFOLIO - Lightbox & Hover Play
       =========================================== */

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('videoLightbox');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxClose = document.getElementById('lightboxClose');

    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');

        item.addEventListener('mouseenter', () => {
            if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 1;
            }
        });

        item.addEventListener('click', (e) => {
            if (e.target.closest('.lightbox-modal')) return;

            const videoSrc = item.getAttribute('data-video');
            if (videoSrc && lightbox && lightboxVideo) {
                lightboxVideo.src = videoSrc;
                lightboxVideo.load();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox && lightboxVideo) {
            lightbox.classList.remove('active');
            lightboxVideo.pause();
            lightboxVideo.src = '';
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    if ('ontouchstart' in window) {
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
       12. ACTIVE LINK - Tracking do link ativo
       =========================================== */

    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 150;

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
       13. PAGE LOAD - Fade in suave
       =========================================== */

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';

        setTimeout(() => {
            fadeUpElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });
        }, 150);
    });

});

// WHATSAPP BUTTON
const whatsappBtn = document.getElementById('whatsappBtn');

if (whatsappBtn) {
    window.addEventListener('scroll', () => {
        whatsappBtn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
}
