// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Get references to the navbar and hamburger menu elements
    const nav = document.querySelector('.navbar');
    const burger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll Detection Function
    function handleScroll() {
        const scrollPosition = window.scrollY;

        // Toggle 'scrolled' class based on scroll position
        if (scrollPosition > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Hamburger Menu Toggle Function
    function toggleMobileMenu() {
        nav.classList.toggle('open');
    }

    // Close Mobile Menu Function
    function closeMobileMenu() {
        nav.classList.remove('open');
    }

    // Smooth Scrolling Function
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Calculate offset for fixed navbar
            const navbarHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Event Listeners

    // Scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hamburger menu click event
    if (burger) {
        burger.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Navigation link click events
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && nav.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && nav.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // Handle "Order Now" button
    const orderButton = document.querySelector('.hero .btn--primary');
    if (orderButton) {
        orderButton.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo('order');
        });
    }

    // Handle "View Menu" button
    const viewMenuButton = document.querySelector('.cart-info .btn--secondary');
    if (viewMenuButton) {
        viewMenuButton.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo('menu');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            closeMobileMenu();
        }

        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === burger) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Make hamburger accessible
    if (burger) {
        burger.setAttribute('tabindex', '0');
        burger.setAttribute('role', 'button');
        burger.setAttribute('aria-label', 'Toggle navigation menu');
        burger.setAttribute('aria-expanded', 'false');
    }

    // Initialize scroll state
    handleScroll();

    console.log('TastyBite Navigation initialized successfully!');

});
