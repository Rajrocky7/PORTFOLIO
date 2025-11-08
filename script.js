// script.js — show Home by default, smooth cross-fade with small delay, populate skills
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('nav a[data-target]'));
  const sections = Array.from(document.querySelectorAll('.section'));
  let activeSection = null;
  // This check allows the JS to work with both multipage and scrolling modes
  const isScrollingMode = document.body.classList.contains('scrolling-mode');

  // Skills list from resume info
  const SKILLS = [
    'Python (Basic)','SQL','Power BI','Excel','Word','PowerPoint',
    'Time management','Communication','Project management','Analytics','Problem solving'
  ];
  const skillsList = document.getElementById('skillsList');
  if (skillsList) {
    SKILLS.forEach(s => {
      const el = document.createElement('div');
      el.className = 'chip';
      el.textContent = s;
      skillsList.appendChild(el);
    });
  }

  // Show section with fade-out -> delay -> fade-in
  function showSectionById(id) {
    const newSection = document.getElementById(id);
    if (!newSection) return;
    if (activeSection === newSection) return;

    // Reset internal scroll position of the new section (important for multipage mode)
    newSection.scrollTop = 0;

    if (activeSection) {
      activeSection.classList.remove('active');
      
      // Delay to ensure the fade-out completes before fade-in
      setTimeout(() => {
          newSection.classList.add('active');
      }, 450); // Set delay equal to CSS transition time

    } else {
      newSection.classList.add('active');
    }

    activeSection = newSection;

    // set nav active
    navLinks.forEach(n => n.classList.toggle('active', n.dataset.target === id));
  }

  // Wire nav clicks
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSectionById(link.dataset.target);
    });
  });

  // Show Home on load
  showSectionById('home');

  // Contact form demo submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value || 'Friend';
      alert(`Thanks ${name}! (Demo) I'll contact you at the email provided.`);
      contactForm.reset();
    });
  }

  // Keyboard shortcuts 1..5 for sections
  document.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === '1') showSectionById('home');
    if (e.key === '2') showSectionById('about');
    if (e.key === '3') showSectionById('projects');
    if (e.key === '4') showSectionById('skills');
    if (e.key === '5') showSectionById('contact');
    // CORRECTED PATH using /PORTFOLIO/Files/
    if (e.key.toLowerCase() === 'r') window.open('/PORTFOLIO/Files/Kola_Rajesh_Resume.pdf', '_blank');
  });
});
