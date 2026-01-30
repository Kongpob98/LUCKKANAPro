// Footer Component
(function() {
    const footerHTML = `
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-scroll-wrapper">
                    <p class="footer-text footer-text-scroll">
                        <i class="fas fa-sparkles"></i>
                        Unlock a new dimension of astrology with AI-powered precision. 
                        Deep, insightful, and tailored to your life's rhythm. 
                        Let the stars guide you to a better future.
                        <i class="fas fa-moon"></i>
                    </p>
                    <p class="footer-text footer-text-scroll" aria-hidden="true">
                        <i class="fas fa-sparkles"></i>
                        Unlock a new dimension of astrology with AI-powered precision. 
                        Deep, insightful, and tailored to your life's rhythm. 
                        Let the stars guide you to a better future.
                        <i class="fas fa-moon"></i>
                    </p>
                </div>
            </div>
        </div>
    `;

    const footerStyles = `
        <style>
            .home-container .footer-container {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 100;
                background-color: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(5px);
                overflow: hidden;
            }

            .detail-section ~ .footer-container {
                display: none;
            }

            .footer-content {
                padding: 8px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .footer-scroll-wrapper {
                display: flex;
                gap: 0;
                animation: scrollText 30s linear infinite;
                will-change: transform;
            }

            .footer-scroll-wrapper:hover {
                animation-play-state: paused;
            }

            .footer-text {
                font-family: 'General Sans', sans-serif;
                font-size: 20px;
                font-weight: 600;
                color: white;
                margin: 0;
                white-space: nowrap;
                padding: 0 40px;
                flex-shrink: 0;
            }

            .footer-text i {
                margin: 0 8px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 18px;
            }

            @keyframes scrollText {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }

            @media (max-width: 1024px) {
                .footer-text {
                    font-size: 24px;
                }

                .footer-text i {
                    font-size: 20px;
                }

                .footer-scroll-wrapper {
                    animation-duration: 20s;
                }
            }

            @media (max-width: 768px) {
                .footer-content {
                    padding: 15px 0;
                }

                .footer-text {
                    font-size: 16px;
                    padding: 0 20px;
                }

                .footer-text i {
                    font-size: 14px;
                    margin: 0 5px;
                }

                .footer-scroll-wrapper {
                    animation-duration: 15s;
                }
            }
        </style>
    `;

    // Insert footer into page
    document.addEventListener('DOMContentLoaded', function() {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = footerStyles + footerHTML;
        }
    });
})();
