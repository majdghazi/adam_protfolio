// ============================================
// Navbar : mobile + scroll effect
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(250, 250, 247, 0.98)';
        navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.04)';
    } else {
        navbar.style.background = 'rgba(250, 250, 247, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// Projects filter
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// Contact form (démo)
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const nameValue = formData.get('name');
        const name = typeof nameValue === 'string' ? nameValue : 'visiteur';

        alert(`Merci ${name} ! Votre message a bien été pris en compte (démo — formulaire non connecté à un backend).`);
        contactForm.reset();
    });
}

// ============================================
// Skill bars animation on scroll
// ============================================
const skillBars = document.querySelectorAll('.skill .bar > div');

if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = width; }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// Fade-up scroll animations
// ============================================
const fadeElements = document.querySelectorAll('.expertise-card, .featured-card, .tool, .project-card, .exp-card, .timeline-item, .contact-item-card');

fadeElements.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 80;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));
