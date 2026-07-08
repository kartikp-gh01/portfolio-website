const words = [
  'Aspiring Software Developer',
  'Web Developer',
  'App Developer',
  'C++ Programmer',
  'Problem Solver'
];

const typing = document.getElementById('typing');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const progressBar = document.querySelector('.scroll-progress');
const loadingScreen = document.querySelector('.loading-screen');
const revealItems = document.querySelectorAll('.reveal');

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typing) return;

  const current = words[wordIndex];

  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);

    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typing.textContent = current.substring(0, charIndex--);

    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 95);
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function updateTheme() {
  const isLight = document.body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function applyStoredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }
  const icon = themeToggle.querySelector('i');
  icon.className = document.body.classList.contains('light') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle('visible', scrollTop > 500);
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.classList.add('visible');
    }
  });
}

function animateStats() {
  const counters = document.querySelectorAll('.stat-box h3');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    const duration = 1000;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = `${value}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}

function handleContactSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Thanks for reaching out! This front-end form is ready for your backend integration.';
  event.target.reset();
}

menuToggle?.addEventListener('click', toggleMenu);
navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navMenu.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

themeToggle?.addEventListener('click', updateTheme);
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  updateScrollProgress();
  revealOnScroll();
});
window.addEventListener('load', () => {
  setTimeout(() => loadingScreen?.classList.add('hidden'), 650);
  typeEffect();
  applyStoredTheme();
  updateScrollProgress();
  revealOnScroll();
  animateStats();
});
document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);