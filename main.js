/* ===================================================
   RESUL MUT — PORTFOLIO  main.js
   =================================================== */

// ── AOS (Animate On Scroll) ────────────────────────
AOS.init({ once: true, offset: 60, duration: 700 });

// ── Typewriter ─────────────────────────────────────
const roles = ['Web Developer', 'Python Geliştirici', 'IoT Meraklısı', 'Problem Çözücü'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
    const cur = roles[roleIdx];
    typeEl.textContent = deleting
        ? cur.substring(0, charIdx - 1)
        : cur.substring(0, charIdx + 1);
    deleting ? charIdx-- : charIdx++;

    if (!deleting && charIdx === cur.length) {
        setTimeout(() => { deleting = true; }, 1800);
    } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
    }
    setTimeout(type, deleting ? 55 : 100);
}
type();

// ── Theme Toggle ───────────────────────────────────
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('rm-theme');
if (savedTheme === 'light') applyLight();

themeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('rm-theme', 'dark');
    } else {
        applyLight();
    }
});
function applyLight() {
    document.body.classList.add('light');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('rm-theme', 'light');
}

// ── Mobile Menu ────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.innerHTML = open
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ── Active Nav Link on Scroll ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
}, { passive: true });

// ── Skill Bar Animations ───────────────────────────
const fills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%';
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.25 });
fills.forEach(f => skillObs.observe(f));

// ── Contact Form ───────────────────────────────────
const form = document.getElementById('iletisimFormu');
const durumu = document.getElementById('formDurumu');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    durumu.textContent = '';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });
        if (res.ok) {
            durumu.textContent = '✅ Harika! Mesajınız bana ulaştı.';
            durumu.style.color = '#4ADE80';
            form.reset();
        } else {
            throw new Error();
        }
    } catch {
        durumu.textContent = '❌ Bir sorun oluştu. Lütfen tekrar deneyin.';
        durumu.style.color = '#F87171';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Mesaj Gönder';
    }
});

// ── Navbar hide/show on scroll ─────────────────────
let lastY = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80 && y > lastY) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastY = y;
}, { passive: true });