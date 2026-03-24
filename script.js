const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

// Smart Header Hide on Scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('navbar-hidden'); // Hide on scroll down
        navLinks.classList.remove('show');     // Close mobile menu if open
    } else {
        navbar.classList.remove('navbar-hidden'); // Show on scroll up
    }
    lastScrollY = window.scrollY;
});

// Toggle menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.home-section, .Products-section, .about-section, .gallery-section, .testimonials-section');

// Add reveal class to sections immediately
revealElements.forEach(sec => sec.classList.add('reveal'));

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => scrollObserver.observe(el));

// --- Dynamic Gallery Rendering ---
const galleryImages = [
    { src: "./image/Flycon T3.png", alt: "Flycon T3" },
    { src: "./image/Flycon Grove.png", alt: "Flycon Grove" },
    { src: "./image/Grove Lite.png", alt: "Grove Lite" },
    { src: "./image/Sway.png", alt: "Sway" },
    { src: "./image/TV.png", alt: "TV" },
    { src: "./image/Air Conditioner.png", alt: "Air Conditioner" },
    { src: "./image/Mixer.png", alt: "Mixer" },
    { src: "./image/Ceiling Fan.png", alt: "Ceiling Fan" }
];

const galleryContainer = document.getElementById('dynamic-gallery');

if (galleryContainer) {
    const galleryHtml = galleryImages.map(image => `
        <div class="gallery-item">
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
        </div>
    `).join('');
    galleryContainer.innerHTML = galleryHtml;
}
