/* ============================================
   IEEE NEMS 2027 - V2 主要 JavaScript
   導覽列、手風琴、滾動動效、計數器、倒數
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordions();
  initStickyHeader();
  initScrollAnimations();
  initCounters();
  initCountdown();
  highlightCurrentPage();
});

/* --- 導覽列互動 --- */
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('li:has(.submenu)').forEach(item => {
    item.querySelector(':scope > a').addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        item.classList.toggle('submenu-open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-bar')) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

/* --- Sticky Header 陰影效果 --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* --- 手風琴 --- */
function initAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (content && content.classList.contains('accordion-content')) {
        content.classList.toggle('open');
        const icon = btn.querySelector('.acc-icon');
        if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
      }
    });
  });
}

/* --- 滾動動畫（輕量版 AOS） --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 根據 data-aos-delay 延遲觸發
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.transitionDuration = (el.getAttribute('data-aos-duration') || '600') + 'ms';
    observer.observe(el);
  });
}

/* --- 數字跳動計數器 --- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count-to'));
  const duration = 2000;
  const start = performance.now();
  const suffix = el.getAttribute('data-count-suffix') || '';

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutQuart 緩動函數
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + suffix;
  }

  requestAnimationFrame(update);
}

/* --- 倒數計時器 --- */
function initCountdown() {
  const container = document.getElementById('countdown');
  if (!container) return;

  const targetDate = container.getAttribute('data-target-date');
  if (!targetDate) return;

  function update() {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) {
      container.innerHTML = '<span style="font-size:1.2rem;font-weight:600;">The conference has started!</span>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const items = container.querySelectorAll('.count-number');
    if (items.length === 4) {
      items[0].textContent = days;
      items[1].textContent = String(hours).padStart(2, '0');
      items[2].textContent = String(mins).padStart(2, '0');
      items[3].textContent = String(secs).padStart(2, '0');
    }
  }

  update();
  setInterval(update, 1000);
}

/* --- 頁面高亮 --- */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.closest('li').classList.add('active');
      const parentLi = link.closest('.submenu')?.closest('li');
      if (parentLi) parentLi.classList.add('active');
    }
  });
}
