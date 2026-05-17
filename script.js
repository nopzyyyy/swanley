// ===== TYPING ANIMATION (short words only) =====
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const words = ['conversion.', 'speed.', 'control.', 'security.', 'freedom.'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const word = words[wordIdx];
    if (!deleting) {
      typedEl.textContent = word.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
      } else {
        setTimeout(typeLoop, 80);
      }
    } else {
      typedEl.textContent = word.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeLoop, 350);
      } else {
        setTimeout(typeLoop, 45);
      }
    }
  }
  setTimeout(typeLoop, 500);
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== MOBILE MENU =====
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-menu-close');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
  mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('active'));
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });
}

// ===== PASSWORD TOGGLE =====
document.querySelectorAll('.form-toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.closest('.form-input-wrapper').querySelector('input');
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'ri-eye-fill';
    } else {
      input.type = 'password';
      icon.className = 'ri-eye-off-fill';
    }
  });
});

// ===== PASSWORD STRENGTH =====
const pwInput = document.getElementById('register-password');
const pwFill = document.getElementById('pw-strength-fill');
const pwText = document.getElementById('pw-strength-text');

if (pwInput && pwFill && pwText) {
  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { width: '0%', color: 'var(--text-3)', text: '' },
      { width: '20%', color: '#ef4444', text: 'Very weak' },
      { width: '40%', color: '#f97316', text: 'Weak' },
      { width: '60%', color: '#eab308', text: 'Fair' },
      { width: '80%', color: '#22c55e', text: 'Strong' },
      { width: '100%', color: '#14b8a6', text: 'Very strong' },
    ];

    const level = val.length === 0 ? levels[0] : levels[Math.min(score, 5)];
    pwFill.style.width = level.width;
    pwFill.style.background = level.color;
    pwText.textContent = level.text;
    pwText.style.color = level.color;
  });
}

// ===== FORM SUBMISSIONS =====
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('login-submit');
  btn.textContent = 'Signing in...';
  btn.style.pointerEvents = 'none';
  setTimeout(() => { btn.textContent = 'Sign in'; btn.style.pointerEvents = ''; }, 2000);
});

document.getElementById('register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const pw = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;
  if (pw !== confirm) {
    document.getElementById('register-confirm').style.borderColor = '#ef4444';
    return;
  }
  const btn = document.getElementById('register-submit');
  btn.textContent = 'Creating account...';
  btn.style.pointerEvents = 'none';
  setTimeout(() => { btn.textContent = 'Create Account'; btn.style.pointerEvents = ''; }, 2000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TILT ON FEATURE CARDS (desktop only) =====
if (window.matchMedia('(min-width: 769px)').matches && !('ontouchstart' in window)) {
  document.querySelectorAll('.bento__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateZ(0) perspective(600px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
