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

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", typeWriter);
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});