document.documentElement.classList.add('js');

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  const closeNav = () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 760) {
      closeNav();
    }
  });
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const navDropdowns = document.querySelectorAll('.nav-dropdown');
if (navDropdowns.length > 0) {
  const closeAllDropdowns = () => {
    navDropdowns.forEach((dropdown) => {
      dropdown.open = false;
    });
  };

  document.addEventListener('click', (event) => {
    navDropdowns.forEach((dropdown) => {
      if (dropdown.open && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  navDropdowns.forEach((dropdown) => {
    dropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeAllDropdowns);
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}
