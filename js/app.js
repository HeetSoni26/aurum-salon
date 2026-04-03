/* ===== AURUM — Main App (Animations, 3D Effects, Particles) ===== */

// ---- Services Data ----
const SERVICES = {
    hair: [
        { name: 'Precision Haircut', desc: 'Expert cut tailored to your style', price: 85, duration: '45 min' },
        { name: 'Luxury Blow Dry & Style', desc: 'Volume, smoothness, and shine', price: 65, duration: '30 min' },
        { name: 'Balayage', desc: 'Hand-painted sun-kissed highlights', price: 250, duration: '180 min' },
        { name: 'Full Color', desc: 'Complete color transformation', price: 180, duration: '120 min' },
        { name: 'Partial Highlights', desc: 'Dimensional face-framing highlights', price: 150, duration: '90 min' },
        { name: 'Full Highlights', desc: 'All-over lightening & dimension', price: 220, duration: '150 min' },
        { name: 'Ombré / Sombré', desc: 'Seamless root-to-tip gradient', price: 280, duration: '180 min' },
        { name: 'Keratin Smoothing', desc: 'Frizz-free silk for up to 6 months', price: 350, duration: '150 min' },
        { name: 'Brazilian Blowout', desc: 'Professional smoothing treatment', price: 300, duration: '120 min' },
        { name: 'Hair Extensions', desc: 'Premium hand-tied extensions', price: 500, duration: '240 min' },
        { name: 'Deep Conditioning', desc: 'Intensive moisture & repair', price: 75, duration: '30 min' },
        { name: 'Scalp Rejuvenation', desc: 'Detox & stimulating scalp therapy', price: 90, duration: '45 min' },
        { name: 'Toner & Gloss', desc: 'Shine-boosting color refresh', price: 60, duration: '30 min' }
    ],
    nails: [
        { name: 'Classic Manicure', desc: 'Shape, buff, cuticle care, polish', price: 40, duration: '30 min' },
        { name: 'Gel Manicure', desc: 'Long-lasting chip-free gel polish', price: 55, duration: '45 min' },
        { name: 'Classic Pedicure', desc: 'Relaxing foot care & polish', price: 50, duration: '40 min' },
        { name: 'Luxury Spa Pedicure', desc: 'Full treatment with mask & massage', price: 85, duration: '60 min' },
        { name: 'Acrylic Full Set', desc: 'Sculpted acrylic nail extensions', price: 75, duration: '75 min' },
        { name: 'Dip Powder Nails', desc: 'Durable dip powder application', price: 60, duration: '45 min' },
        { name: 'Chrome / Mirror Nails', desc: 'Ultra-reflective metallic finish', price: 80, duration: '60 min' },
        { name: 'Custom Nail Art', desc: 'Hand-painted bespoke designs', price: 10, duration: 'per nail' },
        { name: 'Gel Pedicure', desc: 'Gel polish pedicure with care', price: 65, duration: '50 min' },
        { name: 'Nail Repair', desc: 'Single nail fix or replacement', price: 15, duration: '15 min' }
    ],
    spa: [
        { name: 'Swedish Massage', desc: 'Classic relaxation full-body', price: 120, duration: '60 min' },
        { name: 'Deep Tissue Massage', desc: 'Targeted pressure for tension relief', price: 150, duration: '60 min' },
        { name: 'Hot Stone Massage', desc: 'Heated basalt stones for deep calm', price: 160, duration: '75 min' },
        { name: 'Aromatherapy Massage', desc: 'Essential oil infused relaxation', price: 140, duration: '60 min' },
        { name: 'Luxury Body Wrap', desc: 'Detox & hydrating cocoon treatment', price: 130, duration: '75 min' },
        { name: 'Body Scrub & Polish', desc: 'Exfoliating full-body glow', price: 100, duration: '45 min' },
        { name: 'Couples Massage', desc: 'Side-by-side relaxation for two', price: 280, duration: '60 min' },
        { name: 'Prenatal Massage', desc: 'Gentle massage for expecting mothers', price: 130, duration: '60 min' },
        { name: 'Reflexology', desc: 'Pressure point foot therapy', price: 90, duration: '45 min' },
        { name: 'Hydrotherapy Session', desc: 'Water-based therapeutic healing', price: 110, duration: '45 min' }
    ],
    skin: [
        { name: 'Classic Facial', desc: 'Deep cleanse, tone, moisturize', price: 90, duration: '60 min' },
        { name: 'HydraFacial', desc: 'Patented vortex cleansing & hydration', price: 200, duration: '60 min' },
        { name: 'Microdermabrasion', desc: 'Crystal exfoliation for renewal', price: 175, duration: '45 min' },
        { name: 'Chemical Peel', desc: 'Controlled exfoliation for clarity', price: 160, duration: '45 min' },
        { name: 'LED Light Therapy', desc: 'Collagen-boosting light treatment', price: 100, duration: '30 min' },
        { name: 'Microneedling', desc: 'Collagen induction therapy', price: 300, duration: '60 min' },
        { name: '24K Gold Facial', desc: 'Luxurious gold-infused radiance', price: 220, duration: '75 min' },
        { name: 'Oxygen Infusion Facial', desc: 'Pressurized O2 for instant glow', price: 150, duration: '60 min' },
        { name: 'Anti-Aging Facial', desc: 'Peptide & retinol rejuvenation', price: 180, duration: '75 min' },
        { name: 'Dermaplaning', desc: 'Gentle blade exfoliation & peach fuzz removal', price: 85, duration: '30 min' }
    ],
    makeup: [
        { name: 'Bridal Glamour', desc: 'Complete bridal beauty with trial', price: 350, duration: '120 min' },
        { name: 'Event / Party Makeup', desc: 'Stunning looks for any occasion', price: 150, duration: '60 min' },
        { name: 'Editorial Makeup', desc: 'High-fashion photoshoot looks', price: 250, duration: '90 min' },
        { name: 'Airbrush Makeup', desc: 'Flawless airbrushed perfection', price: 200, duration: '75 min' },
        { name: 'HD Makeup', desc: 'Camera-ready high-definition finish', price: 180, duration: '60 min' },
        { name: 'Makeup Lesson', desc: 'Personalized technique coaching', price: 120, duration: '60 min' },
        { name: 'Strip Lash Application', desc: 'Glamorous strip lash fitting', price: 30, duration: '15 min' },
        { name: 'Individual Lash Application', desc: 'Natural individual lash placement', price: 60, duration: '30 min' }
    ],
    brows: [
        { name: 'Brow Sculpting', desc: 'Precise shaping & grooming', price: 35, duration: '20 min' },
        { name: 'Brow Tinting', desc: 'Semi-permanent color enhancement', price: 25, duration: '15 min' },
        { name: 'Brow Lamination', desc: 'Fluffy brushed-up brow effect', price: 75, duration: '45 min' },
        { name: 'Lash Tinting', desc: 'Darker, defined lashes', price: 35, duration: '20 min' },
        { name: 'Lash Lift & Tint', desc: 'Curled & tinted natural lashes', price: 85, duration: '45 min' },
        { name: 'Classic Lash Extensions', desc: 'One-to-one natural lash extensions', price: 180, duration: '120 min' },
        { name: 'Volume Lash Extensions', desc: 'Full dramatic volume fans', price: 250, duration: '150 min' },
        { name: 'Microblading', desc: 'Semi-permanent hair-stroke brows', price: 450, duration: '180 min' },
        { name: 'Bikini Wax', desc: 'Clean bikini line removal', price: 50, duration: '20 min' },
        { name: 'Brazilian Wax', desc: 'Complete Brazilian hair removal', price: 70, duration: '30 min' },
        { name: 'Full Leg Wax', desc: 'Smooth legs hip to toe', price: 80, duration: '45 min' },
        { name: 'Full Body Wax', desc: 'Complete body hair removal', price: 250, duration: '120 min' }
    ]
};

const TAB_LABELS = { hair:'Hair Studio', nails:'Nail Atelier', spa:'Spa & Wellness', skin:'Skin Science', makeup:'Makeup Artistry', brows:'Brows, Lashes & Wax' };

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initParticles();
    initNavbar();
    renderServices('hair');
    initTabs();
    initGalleryLightbox();
    initCarousel();
    initGSAP();
    initTiltCards();
    initCounters();
});

// ---- Preloader ----
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('preloader').classList.add('done'), 1200);
    });
}

// ---- Custom Cursor ----
function initCursor() {
    const c = document.getElementById('cursor'), f = document.getElementById('cursorFollower');
    if (!c || !f || window.innerWidth < 768) return;
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; c.style.transform = `translate(${mx - 4}px, ${my - 4}px)`; });
    (function loop() { fx += (mx - fx) * 0.40; fy += (my - fy) * 0.40; f.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`; requestAnimationFrame(loop); })();
    document.querySelectorAll('a, button, .gallery-item, .service-card, .team-card, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => { f.style.width = '50px'; f.style.height = '50px'; f.style.opacity = '.2'; });
        el.addEventListener('mouseleave', () => { f.style.width = '36px'; f.style.height = '36px'; f.style.opacity = '.5'; });
    });
}

// ---- Gold Particles ----
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (4 + Math.random() * 8) + 's';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
        container.appendChild(p);
    }
}

// ---- Navbar ----
function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        highlightNav();
    });
}
function highlightNav() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
}

// ---- Services Rendering ----
function renderServices(cat) {
    const grid = document.getElementById('servicesGrid');
    const items = SERVICES[cat] || [];
    grid.innerHTML = items.map(s => `
        <div class="service-card tilt-element">
            <div class="service-name">${s.name}</div>
            <div class="service-desc">${s.desc}</div>
            <div class="service-bottom">
                <div><span class="service-price">$${s.price}${s.price === 10 ? '' : ''}</span><span class="service-duration"> · ${s.duration}</span></div>
                <button class="service-book-btn" onclick="quickBook('${s.name}', ${s.price}, '${cat}')">Book</button>
            </div>
        </div>
    `).join('');
    // re-init tilt for new cards
    initTiltCards();
}
function initTabs() {
    document.querySelectorAll('.service-tabs .tab').forEach(t => {
        t.addEventListener('click', () => {
            document.querySelectorAll('.service-tabs .tab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            renderServices(t.dataset.tab);
        });
    });
}
function quickBook(name, price, cat) {
    openBooking();
    // pre-select the service
    setTimeout(() => {
        const catBtns = document.querySelectorAll('.booking-tab');
        catBtns.forEach(b => {
            if (b.dataset.tab === cat) b.click();
        });
        setTimeout(() => {
            const items = document.querySelectorAll('.booking-service-item');
            items.forEach(it => {
                if (it.querySelector('.name').textContent === name && !it.classList.contains('selected')) it.click();
            });
        }, 100);
    }, 200);
}

// ---- Gallery Lightbox ----
function initGalleryLightbox() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            document.getElementById('lightboxImg').src = img.src;
            document.getElementById('lightbox').classList.add('active');
        });
    });
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// ---- Testimonial Carousel ----
let carouselIdx = 0, carouselTotal = 0;
function initCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    carouselTotal = cards.length;
    const dotsC = document.getElementById('carouselDots');
    for (let i = 0; i < carouselTotal; i++) {
        const d = document.createElement('div');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.onclick = () => goCarousel(i);
        dotsC.appendChild(d);
    }
}
function moveCarousel(dir) {
    carouselIdx = (carouselIdx + dir + carouselTotal) % carouselTotal;
    updateCarousel();
}
function goCarousel(i) { carouselIdx = i; updateCarousel(); }
function updateCarousel() {
    document.getElementById('testimonialTrack').style.transform = `translateX(-${carouselIdx * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === carouselIdx));
}

// ---- GSAP Scroll Animations ----
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    gsap.to('.hero-img', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Fade-up elements
    document.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
        gsap.from(el, {
            y: 60, opacity: 0, duration: 1, delay: parseFloat(el.dataset.delay || 0),
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });
    document.querySelectorAll('[data-animate="fade-down"]').forEach(el => {
        gsap.from(el, { y: -40, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    });
    document.querySelectorAll('[data-animate="slide-right"]').forEach(el => {
        gsap.from(el, { x: -80, opacity: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } });
    });
    document.querySelectorAll('[data-animate="slide-left"]').forEach(el => {
        gsap.from(el, { x: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } });
    });

    // Stagger
    document.querySelectorAll('[data-animate="stagger"]').forEach(parent => {
        gsap.from(parent.children, {
            y: 60, opacity: 0, duration: .8, stagger: .15, ease: 'power3.out',
            scrollTrigger: { trigger: parent, start: 'top 80%', toggleActions: 'play none none none' }
        });
    });

    // Section dividers — gold line
    document.querySelectorAll('.section').forEach(s => {
        gsap.from(s, { '--line-width': '0%', duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: s, start: 'top 90%' } });
    });
}

// ---- 3D Tilt Cards ----
function initTiltCards() {
    document.querySelectorAll('.tilt-element').forEach(el => {
        el.addEventListener('mousemove', e => {
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - .5) * 12;
            const y = ((e.clientY - r.top) / r.height - .5) * -12;
            el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
            el.style.transition = 'transform .5s ease';
            setTimeout(() => el.style.transition = '', 500);
        });
    });
}

// ---- Animated Counters ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target, target = +el.dataset.count;
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 30);
                obs.unobserve(el);
            }
        });
    }, { threshold: .5 });
    counters.forEach(c => obs.observe(c));
}

// ---- Contact Form ----
function handleContact(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you within 24 hours.');
    e.target.reset();
}

// ---- Toast ----
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

// ---- Mobile Nav Close on Link Click ----
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    });
});
