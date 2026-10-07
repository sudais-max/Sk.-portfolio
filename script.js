// Mark that JavaScript is running (CSS uses this for fade-in)
document.documentElement.classList.add('js');

// ----- Navbar: background on scroll -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

// ----- Mobile menu -----
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

// ----- Fade-in on scroll -----
const fadeItems = document.querySelectorAll('.fade');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  fadeItems.forEach(el => observer.observe(el));
} else {
  fadeItems.forEach(el => el.classList.add('visible'));
}

// ----- Highlight current section in the menu -----
const navLinks = document.querySelectorAll('.nav-menu a:not(.btn)');
window.addEventListener('scroll', () => {
  let current = 'home';
  document.querySelectorAll('main section[id]').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// ----- Sample project links are placeholders -----
document.querySelectorAll('[data-demo]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('This is a sample project. Add your real project link in index.html.');
  });
});

// ----- Contact form validation (demo only, no backend) -----
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

function showError(id, msg) {
  const input = document.getElementById(id);
  document.getElementById(id + '-error').textContent = msg;
  input.parentElement.classList.toggle('invalid', Boolean(msg));
  input.setAttribute('aria-invalid', Boolean(msg));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.hidden = true;
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const message = form.elements['message'].value.trim();

  const nameMsg = name.length < 2 ? 'Please enter your name.' : '';
  const emailMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.';
  const messageMsg = message.length < 10 ? 'Please write at least 10 characters.' : '';
  showError('name', nameMsg); showError('email', emailMsg); showError('message', messageMsg);

  if (!nameMsg && !emailMsg && !messageMsg) { success.hidden = false; form.reset(); }
});
