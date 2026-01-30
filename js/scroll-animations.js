// Scroll-triggered animations for About section and Menu section
class ScrollAnimations {
    constructor() {
        this.aboutSection = document.querySelector('.about-section');
        this.menuSection = document.querySelector('.menu-section');
        this.menuCards = document.querySelectorAll('.menu-card');
        this.isAboutAnimated = false;
        this.menuCardsAnimated = new Set();
        
        this.init();
    }

    init() {
        // Check if sections are in view on scroll
        window.addEventListener('scroll', () => {
            if (this.aboutSection) {
                this.checkAboutSection();
            }
            if (this.menuSection) {
                this.checkMenuSection();
            }
            if (this.menuCards.length > 0) {
                this.checkMenuCards();
            }
        });

        // Initial check
        if (this.aboutSection) {
            this.checkAboutSection();
        }
        if (this.menuSection) {
            this.checkMenuSection();
        }
        if (this.menuCards.length > 0) {
            this.checkMenuCards();
        }
    }

    checkAboutSection() {
        if (this.isAboutAnimated) return;

        const rect = this.aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Trigger when section is 20% visible
        if (rect.top < windowHeight * 0.8) {
            this.isAboutAnimated = true;
            this.aboutSection.classList.add('visible');
        }
    }

    checkMenuSection() {
        const rect = this.menuSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show background when section enters viewport
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            this.menuSection.classList.add('visible');
        }
        // Hide background when section leaves viewport
        else if (rect.bottom < 0 || rect.top > windowHeight) {
            this.menuSection.classList.remove('visible');
        }
    }

    checkMenuCards() {
        const windowHeight = window.innerHeight;
        
        this.menuCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            
            // Show when card enters viewport (80% visible)
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                card.classList.add('visible');
                this.menuCardsAnimated.add(card);
            }
            // Hide when card leaves viewport completely
            else if (rect.bottom < 0 || rect.top > windowHeight) {
                card.classList.remove('visible');
                this.menuCardsAnimated.delete(card);
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
