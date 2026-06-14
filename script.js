// ===== Tail & Whisker Pet Care — Site Interactions =====

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  initActiveNavHighlight();
});

/**
 * Toggle the mobile navigation menu open/closed.
 */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu after a link is tapped (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Handle the "Book an appointment" form submission.
 */
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const pet = document.getElementById('pet')?.value.trim();

    if (!name || !pet) {
      alert('Please fill in your name and your pet\'s name.');
      return;
    }

    alert(`Thanks, ${name}! We've received your request for ${pet} and will be in touch shortly.`);
    form.reset();
  });
}

/**
 * Highlight the nav link matching the section currently in view.
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}
