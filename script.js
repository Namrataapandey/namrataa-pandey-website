const texts = ["Aspiring Software Engineer", "Frontend Developer"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 30;
const delayBetweenTexts = 1000;

function typeWriter() {
  const typewriterElement = document.getElementById("typewriter");
  const currentText = texts[currentTextIndex];

  if (!isDeleting) {
    // Typing
    if (currentCharIndex < currentText.length) {
      typewriterElement.textContent += currentText[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Finished typing, wait before deleting
      isDeleting = true;
      setTimeout(typeWriter, delayBetweenTexts);
    }
  } else {
    // Deleting
    if (currentCharIndex > 0) {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(typeWriter, deletingSpeed);
    } else {
      // Finished deleting, move to next text
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setTimeout(typeWriter, 500);
    }
  }
}

// Mobile menu toggle
function initMenuToggle() {
  const menuIcon = document.querySelector("#menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (!menuIcon || !navLinks) return;

  menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-xmark");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
      navLinks.classList.remove("active");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-xmark");
    }
  });
}

// Scroll reveal animation for elements
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".home-container, .about-photo, .about-content, .about-box, .education-card, .skill-card, .experience-card, .contact-form, .section-title, .skill-heading"
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.transitionDelay = `${index * 0.002}s`;
    observer.observe(element);
  });
}

// Contact form submission
document.addEventListener("DOMContentLoaded", function() {
  typeWriter();
  initMenuToggle();
  initScrollReveal();

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const email = document.querySelector(".contact-form input[name='email']").value;
      const message = document.querySelector(".contact-form textarea[name='message']").value;
      
      if (email && message) {
        // Send email using Formspree (free service)
        fetch("https://formspree.io/f/xzzbqvkj", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            message: message
          })
        })
        .then(response => {
          if (response.ok) {
            alert("✓ Message sent successfully! Thank you for reaching out. Namrata will get back to you soon!");
            contactForm.reset();
          } else {
            throw new Error("Failed to send");
          }
        })
        .catch(error => {
          // Fallback to mailto if service is unavailable
          const mailtoLink = `mailto:isitnamrata@gmail.com?subject=Message from ${encodeURIComponent(email)}&body=${encodeURIComponent("From: " + email + "\n\nMessage:\n" + message)}`;
          window.location.href = mailtoLink;
        });
      } else {
        alert("Please fill in all fields");
      }
    });
  }
});
