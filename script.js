const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress span');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');

const updateScroll = () => {
  header?.classList.toggle('is-stuck', window.scrollY > 80);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
};

const closeMenu = () => {
  menu?.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  header?.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

menuToggle?.addEventListener('click', () => {
  const opening = !menu?.classList.contains('is-open');
  menu?.classList.toggle('is-open', opening);
  menuToggle.classList.toggle('is-open', opening);
  header?.classList.toggle('menu-open', opening);
  menuToggle.setAttribute('aria-expanded', String(opening));
  menu?.setAttribute('aria-hidden', String(!opening));
  document.body.style.overflow = opening ? 'hidden' : '';
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

document.querySelectorAll('[data-program]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.program;
    document.querySelectorAll('[data-program]').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-panel]').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.panel === selected));
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = !item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('is-open');
      faq.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    if (open) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
