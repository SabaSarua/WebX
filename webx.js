/* ============================= */
/* CURSOR GLOW */
/* ============================= */

const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

/* ============================= */
/* SCROLL REVEAL */
/* ============================= */

const revealTargets = document.querySelectorAll(
    '.hero-left, .hero-right, .brand, .service-card, .process-card, .portfolio-card, .price-card, .contact-info-card, .contact-form, .section-head, .cta-band, .page-hero'
);

revealTargets.forEach((el) => el.classList.add('hidden'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));

/* ============================= */
/* MOBILE MENU */
/* ============================= */

const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('mobile-open');
    });

    navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navList.classList.remove('mobile-open'));
    });
}

/* ============================= */
/* PORTFOLIO FILTER (portfolio.html) */
/* ============================= */

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length && portfolioCards.length) {
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioCards.forEach((card) => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
            });
        });
    });
}

/* ============================= */
/* CONTACT FORM (contact.html) */
/* ============================= */

const contactForm = document.querySelector('.contact-form form');
const formNote = document.querySelector('.form-note');
const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && formNote) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (contactForm.action.includes('YOUR_FORM_ID')) {
            formNote.style.color = '#f87171';
            formNote.textContent = 'ფორმა ჯერ არ არის დაკონფიგურირებული — ჩასვით Formspree-ს Form ID.';
            return;
        }

        formNote.style.color = '#60a5fa';
        formNote.textContent = 'იგზავნება...';
        if (submitBtn) submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                formNote.style.color = '#60a5fa';
                formNote.textContent = 'გმადლობთ! თქვენი შეტყობინება გაიგზავნა — მალე დაგიკავშირდებით.';
                contactForm.reset();
            } else {
                formNote.style.color = '#f87171';
                formNote.textContent = 'რაღაც შეცდომა მოხდა. სცადეთ ხელახლა ან დაგვირეკეთ პირდაპირ.';
            }
        } catch (err) {
            formNote.style.color = '#f87171';
            formNote.textContent = 'ინტერნეტთან კავშირის პრობლემაა. სცადეთ ხელახლა.';
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}