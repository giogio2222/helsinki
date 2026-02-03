// Sticky Navbar
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);

    // Back to top button
    const topBtn = document.querySelector('.top-btn');
    if (topBtn) {
        topBtn.classList.toggle('show', window.scrollY > 500);
    }
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Close mobile menu on click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
    });
});

// TOC Toggle functionality (for articles)
function setupTOC() {
    const tocHeader = document.querySelector('.toc-header');
    const tocContent = document.querySelector('.toc-content');
    if (tocHeader && tocContent) {
        tocHeader.addEventListener('click', () => {
            const isHidden = tocContent.style.display === 'none';
            tocContent.style.display = isHidden ? 'block' : 'none';
            const icon = tocHeader.querySelector('i');
            if (icon) {
                icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        });
    }
}

// Simple search functionality for blog
function setupSearch() {
    const searchBar = document.getElementById('search-bar');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            blogCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const description = card.querySelector('p').innerText.toLowerCase();
                if (title.includes(searchString) || description.includes(searchString)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// FAQ Accordion functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other instances if needed (optional)
                faqItems.forEach(i => i.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    setupTOC();
    setupSearch();
    setupFAQ();

    // Smooth scroll for TOC links
    document.querySelectorAll('.toc-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Animations on scroll (Simple implementation)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-me').forEach(el => {
    observer.observe(el);
});
