// Typewriter effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}



// Header navigation functionality
function initHeader() {
  const navBtns = document.querySelectorAll('.nav-btn');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-section');

      // Remove active class from all buttons
      navBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      // Smooth scroll to the target section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Initialize typewriter on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize header
  initHeader();

  const heroTitle = document.querySelector('.hero-content h1');
  const originalText = heroTitle.textContent;
  heroTitle.classList.add('typewriter');
  typeWriter(heroTitle, originalText);

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  const isLight = savedTheme === 'light';
  themeToggle.checked = isLight;
  document.body.classList.toggle('light-theme', isLight);
  
  themeToggle.addEventListener('change', () => {
    const isLight = themeToggle.checked;
    document.body.classList.toggle('light-theme', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Hide loading screen after 3 seconds
  setTimeout(() => {
    const loading = document.querySelector('.loading');
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
      // Animate progress bars after loading screen disappears
      animateProgressBars();
    }, 500);
  }, 3000);
});





// Animate progress bars
function animateProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach(fill => {
    const level = parseInt(fill.getAttribute('data-level'));
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.transition = 'width 2s ease-in-out';
      fill.style.width = level + '%';
    }, 100);
  });
}

// CTA button scroll to about
document.querySelector('.cta-btn').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({
    behavior: 'smooth'
  });
});

// Initialize EmailJS
emailjs.init('OK4G4QOOd1EUK8mJh');

// Form submission with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // EmailJS IDs
  const serviceID = 'service_wh6q2s1';
  const templateID = 'template_1ne1yxm';

  emailjs.sendForm(serviceID, templateID, this)
    .then(function() {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset();
    }, function(error) {
      alert('Failed to send message: ' + JSON.stringify(error));
    });
});

// Particle animation
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDelay = Math.random() * 6 + 's';
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

setInterval(createParticle, 300);

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-item, .project-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  // Add shimmer effect to cards on hover
  document.querySelectorAll('.card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('shimmer');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('shimmer');
    });
  });

  // Add interactive project details on hover
  document.querySelectorAll('.project-card').forEach(card => {
    const originalText = card.innerHTML;
    card.addEventListener('mouseenter', () => {
      card.innerHTML = '<h3>Project Details</h3><p>Hover to see more details about this project. Technologies used: HTML, CSS, JavaScript. Click to view live demo.</p>';
      card.style.cursor = 'pointer';
    });
    card.addEventListener('mouseleave', () => {
      card.innerHTML = originalText;
    });
    card.addEventListener('click', () => {
      alert('Redirecting to project demo...');
    });
  });
});
