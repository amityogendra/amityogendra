
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
  
  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill out all fields');
        return;
      }
      
      // Normally would send to server here
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Intersection Observer for animations
  function setupAnimations() {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    fadeUpElements.forEach(element => {
      observer.observe(element);
    });
  
    // Apply special animation for experience timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Add delay based on index
          setTimeout(() => {
            entry.target.classList.add('fade-up');
          }, idx * 150);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  
    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Text copy prevention
  function preventTextCopy() {
    // Apply no-copy class to common text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, a');
    textElements.forEach(element => {
      element.classList.add('no-copy');
    });

    // Disable context menu (right-click) which could be used to copy text
    document.addEventListener('contextmenu', (e) => {
      if (e.target instanceof HTMLElement) {
        const isInput = e.target.tagName === 'INPUT' || 
                        e.target.tagName === 'TEXTAREA' || 
                        e.target.isContentEditable;
        
        // Allow right-click on input elements but prevent it elsewhere
        if (!isInput) {
          e.preventDefault();
        }
      }
    });

    // Additional copy prevention
    document.addEventListener('copy', (e) => {
      // Only prevent copy if the selection isn't in an input or editable area
      if (document.activeElement instanceof HTMLElement) {
        const isInput = document.activeElement.tagName === 'INPUT' || 
                        document.activeElement.tagName === 'TEXTAREA' || 
                        document.activeElement.isContentEditable;
        
        if (!isInput) {
          e.preventDefault();
        }
      }
    });
  }
  
  // Initialize animations
  setupAnimations();
  
  // Apply text copy prevention
  preventTextCopy();
});
