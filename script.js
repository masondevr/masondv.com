document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  // Simple fade-in effect when scrolling
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
          }
      });
  });

  sections.forEach(section => {
      observer.observe(section);
  });

  // Contact button interaction
  const contactBtn = document.getElementById('contactBtn');
  contactBtn.addEventListener('click', function() {
      alert('Let’s connect! Send me an email at yourname@example.com.');
  });
});
