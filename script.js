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

// --- Vanilla Tilt Initialization ---
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".Products-card, .gallery-item, .testimonial-card"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
    });
}

// --- Mouse Tracking Glow Effect ---
document.querySelectorAll('.Products-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// --- Typing Animation ---
const phrases = [
    "Electrify Your World ⚡",
    "Ride into the Future 🛵",
    "Upgrade Your Home 🏡"
];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const typingTextElement = document.getElementById('typing-text');

function type() {
    if (!typingTextElement) return;
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        typingTextElement.innerText = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingTextElement.innerText = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing new phrase
    }

    setTimeout(type, typingSpeed);
}

if (typingTextElement) {
    type();
}

// --- Custom Cursor ---
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Use animation for a remarkably smooth trail effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects
    document.querySelectorAll("a, button, .Products-card, .gallery-item").forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("hovering");
        });
    });
}

// --- Subtle Parallax Scrolling ---
const homeLeft = document.querySelector('.home-left');
const homeRight = document.querySelector('.home-right');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 1000) {
        if (homeLeft) homeLeft.style.transform = `translateY(${scrollY * 0.15}px)`;
        if (homeRight) homeRight.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// --- Theme Toggle (Light/Dark Mode) ---
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
}

// --- Dynamic Filter & Modal Integration ---
const productSections = document.querySelectorAll('.Products-section');
if (productSections.length >= 2) {
    const mainSection = productSections[0];
    const mainGrid = mainSection.querySelector('.Products-grid');
    const secondSection = productSections[1];
    const secondGrid = secondSection.querySelector('.Products-grid');

    const mainTitle = mainSection.querySelector('.section-title');
    if (mainTitle) mainTitle.innerText = "Our Products";

    const filterHTML = `
        <div class="filter-menu">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="scooters">Scooters & Bikes</button>
            <button class="filter-btn" data-filter="electronics">Home Appliances</button>
        </div>
    `;
    if (mainTitle) mainTitle.insertAdjacentHTML('afterend', filterHTML);

    Array.from(mainGrid.children).forEach(card => card.dataset.category = 'scooters');
    Array.from(secondGrid.children).forEach(card => {
        card.dataset.category = 'electronics';
        mainGrid.appendChild(card); // Merging grids
    });

    secondSection.remove(); // Drop the separated section

    // --- Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.Products-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            allCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'flex';
                    card.animate([
                        { opacity: 0, transform: 'scale(0.8)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], { duration: 400, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');

    if (modal && modalBody && closeModalBtn) {
        // We observe modal elements for cursor hover effects
        const outline = document.getElementById('cursor-outline');

        allCards.forEach(card => {
            // Override cursor to use custom cursor
            card.style.cursor = 'none'; 
            
            card.addEventListener('click', () => {
                const imgSrc = card.querySelector('img').src;
                const title = card.querySelector('h3').innerText;
                const specsHTML = card.querySelector('.specs-row').innerHTML;

                modalBody.innerHTML = `
                    <img src="${imgSrc}" alt="${title}">
                    <h3>${title}</h3>
                    <div class="specs-row">${specsHTML}</div>
                    <a href="#contact" class="modal-purchase-btn" id="modal-buy-btn">Inquire Now</a>
                `;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';

                // Ensure cursor hover works inside modal elements
                const newHoverEls = modalBody.querySelectorAll('a, button');
                newHoverEls.forEach(el => {
                    el.addEventListener('mouseenter', () => { if(outline) outline.classList.add('hovering'); });
                    el.addEventListener('mouseleave', () => { if(outline) outline.classList.remove('hovering'); });
                });
                
                // Close modal on Inquire click
                const buyBtn = document.getElementById('modal-buy-btn');
                if (buyBtn) {
                    buyBtn.addEventListener('click', () => {
                        modal.classList.remove('show');
                        document.body.style.overflow = '';
                    });
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Add hover effect to close btn
        closeModalBtn.addEventListener('mouseenter', () => { if(outline) outline.classList.add('hovering'); });
        closeModalBtn.addEventListener('mouseleave', () => { if(outline) outline.classList.remove('hovering'); });
    }
}
