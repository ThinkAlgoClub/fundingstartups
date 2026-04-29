// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('active');
      
      // Animate hamburger to X
      const hamburger = navToggle.querySelector('.hamburger');
      if (!expanded) {
        hamburger.style.transform = 'rotate(45deg)';
        hamburger::before { transform: 'translateY(10px) rotate(90deg)'; }
        hamburger::after { transform: 'translateY(-10px) rotate(-90deg)'; }
      } else {
        hamburger.style.transform = 'rotate(0)';
      }
    });
    
    // Close menu when clicking a link (mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mainNav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  
  // Form validation enhancement
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const submitBtn = contactForm.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Let FormSubmit handle the rest; re-enable on error
      setTimeout(() => {
        if (!contactForm.classList.contains('hidden')) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }, 10000);
    });
  }
});