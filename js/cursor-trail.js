// Cursor Trail Effect - Sparkling Stars
class CursorTrail {
    constructor() {
        this.container = document.querySelector('.cursor-trail-container');
        this.stars = [];
        this.maxStars = 50;
        this.lastTime = 0;
        this.throttleDelay = 30; // Create star every 30ms
        
        this.init();
    }

    init() {
        if (!this.container) return;

        document.addEventListener('mousemove', (e) => {
            this.createStar(e.clientX, e.clientY);
        });
    }

    createStar(x, y) {
        const currentTime = Date.now();
        
        // Throttle star creation
        if (currentTime - this.lastTime < this.throttleDelay) {
            return;
        }
        this.lastTime = currentTime;

        // Limit number of stars
        if (this.stars.length >= this.maxStars) {
            const oldStar = this.stars.shift();
            if (oldStar && oldStar.parentNode) {
                oldStar.parentNode.removeChild(oldStar);
            }
        }

        // Create star element
        const star = document.createElement('div');
        star.className = 'cursor-star';
        
        // Random offset for natural look
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        star.style.left = `${x + offsetX}px`;
        star.style.top = `${y + offsetY}px`;
        
        // Random size variation
        const size = 6 + Math.random() * 6;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random rotation
        star.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add to DOM
        this.container.appendChild(star);
        this.stars.push(star);

        // Remove after animation completes
        setTimeout(() => {
            if (star && star.parentNode) {
                star.parentNode.removeChild(star);
                const index = this.stars.indexOf(star);
                if (index > -1) {
                    this.stars.splice(index, 1);
                }
            }
        }, 800);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CursorTrail();
});
