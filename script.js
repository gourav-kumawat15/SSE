const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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
