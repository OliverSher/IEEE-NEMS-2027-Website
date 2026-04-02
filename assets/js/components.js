/* ============================================
   IEEE NEMS 2027 - V2 共用元件
   Header / Footer / Page Banner / 語言系統
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const isSubpage = window.location.pathname.includes('/pages/');
  const prefix = isSubpage ? '../' : '';
  const pagePrefix = isSubpage ? '' : 'pages/';

  injectHeader(prefix, pagePrefix);
  injectFooter();
  initLanguageSystem();
});

/* --- Header --- */
function injectHeader(prefix, pagePrefix) {
  const headerEl = document.getElementById('site-header');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <div class="header-title-bar">
      <h1><a href="${prefix}index.html">IEEE-NEMS 2027</a></h1>
      <button class="lang-toggle" id="langToggle" title="Switch Language">
        <span class="lang-icon">🌐</span>
        <span id="langLabel">EN</span>
      </button>
    </div>
    <nav class="nav-bar">
      <div class="container">
        <button class="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu">
          <li><a href="${prefix}index.html" data-i18n="nav.home">Home</a></li>
          <li>
            <a href="#" data-i18n="nav.general">General Information</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}welcome.html" data-i18n="nav.welcome">Welcome Message</a></li>
              <li><a href="${pagePrefix}committees.html" data-i18n="nav.committees">Committees</a></li>
              <li><a href="${pagePrefix}scope.html" data-i18n="nav.scope">Conference Scope</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.program">Program</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}program.html" data-i18n="nav.program-glance">Program at a Glance</a></li>
              <li><a href="${pagePrefix}plenary-speakers.html" data-i18n="nav.plenary">Plenary Speakers</a></li>
              <li><a href="${pagePrefix}keynote-speakers.html" data-i18n="nav.keynote">Keynote Speakers</a></li>
              <li><a href="${pagePrefix}invited-sessions.html" data-i18n="nav.invited">Invited Sessions</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.authors">For Authors</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}call-for-papers.html" data-i18n="nav.cfp">Call for Papers</a></li>
              <li><a href="${pagePrefix}submission.html" data-i18n="nav.submission">Abstract Submission</a></li>
              <li><a href="${pagePrefix}presentation.html" data-i18n="nav.presentation">Presentation Guidelines</a></li>
            </ul>
          </li>
          <li><a href="${pagePrefix}awards.html" data-i18n="nav.awards">Conference Awards</a></li>
          <li><a href="${pagePrefix}registration.html" data-i18n="nav.registration">Registration</a></li>
          <li>
            <a href="#" data-i18n="nav.sponsorship">Sponsorship &amp; Exhibition</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}sponsorship.html" data-i18n="nav.sponsor-outline">Sponsorship Outline</a></li>
              <li><a href="${pagePrefix}sponsors-list.html" data-i18n="nav.sponsor-list">Sponsors &amp; Exhibitors</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.attendee">Attendee Info</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}venue.html" data-i18n="nav.venue">Venue</a></li>
              <li><a href="${pagePrefix}accommodation.html" data-i18n="nav.accommodation">Accommodation</a></li>
            </ul>
          </li>
          <li><a href="${pagePrefix}contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;
}

/* --- Footer --- */
function injectFooter() {
  const footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  footerEl.innerHTML = `
    <hr class="gradient-divider">
    <div class="footer-main">
      <div class="container">
        <div class="footer-content">
          <div class="footer-orgs">
            <span class="org-label" data-i18n="footer.organized">Organized by</span>
            <span style="font-weight:700; font-size:1.1rem;">IEEE</span>
            <span style="opacity:0.5;">|</span>
            <span style="font-weight:600; font-size:0.9rem;">IEEE Nanotechnology Council</span>
            <span style="opacity:0.5;">|</span>
            <span style="font-weight:600; font-size:0.9rem;">National Tsing Hua University</span>
          </div>
          <div class="footer-social">
            <span style="font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:1px;">Follow Us</span>
          </div>
        </div>
        <div class="footer-bottom">
          <span data-i18n="footer.copyright">Copyright © 2027 IEEE-NEMS 2027. All rights reserved.</span>
        </div>
      </div>
    </div>
  `;
}

/* --- 語言系統 --- */
function initLanguageSystem() {
  const savedLang = localStorage.getItem('nems2027-lang') || 'en';
  setLanguage(savedLang);

  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = localStorage.getItem('nems2027-lang') || 'en';
      setLanguage(current === 'en' ? 'zh' : 'en');
    });
  }
}

function setLanguage(lang) {
  localStorage.setItem('nems2027-lang', lang);

  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'en' ? 'EN' : '中';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      const text = TRANSLATIONS[key][lang];
      if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
}
