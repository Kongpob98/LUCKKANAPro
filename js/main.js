// Main JavaScript Application
// Entry point for the application

class LuckkanaStarApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('🌟 Luckkana Star initialized');
        this.setupCTAButton();
        this.setupNavigation();
        this.handleResize();
    }

    setupCTAButton() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            // Remove the click event listener since it's now a link
            
            // Add subtle pulse animation on hover
            ctaButton.addEventListener('mouseenter', function() {
                this.style.animation = 'buttonPulse 0.5s ease';
            });

            ctaButton.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        }
    }

    setupNavigation() {
        // Active link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', this.updateActiveNavOnScroll.bind(this));
    }

    updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY;
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Logic to update active nav based on scroll position
        // This is a simple implementation - you can enhance it based on sections
        if (scrollPosition < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                console.log('Window resized');
                // Add any resize-specific logic here
            }, 250);
        });
    }
}

// CSS animations for button
const style = document.createElement('style');
style.textContent = `
    @keyframes buttonPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LuckkanaStarApp();
});

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuckkanaStarApp;
}
