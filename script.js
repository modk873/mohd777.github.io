// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Image gallery functionality
    const showcasePhotos = document.querySelectorAll('.showcase-photo img');
    let currentModal = null;

    showcasePhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            // Create image
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            
            // Create caption
            const caption = document.createElement('div');
            caption.className = 'modal-caption';
            caption.textContent = this.alt;
            
            // Create close button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            
            // Assemble modal
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImg);
            modalContent.appendChild(caption);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Store current modal
            currentModal = modal;
            
            // Add close functionality
            closeBtn.onclick = function() {
                modal.remove();
                currentModal = null;
            };
            
            // Close modal when clicking outside
            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.remove();
                    currentModal = null;
                }
            };
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            currentModal.remove();
            currentModal = null;
        }
    });

    // Add hover effect to country cards
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        observer.observe(item);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .photo-modal {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }

        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            cursor: pointer;
        }

        .modal-caption {
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 1.2rem;
        }

        .feature-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .feature-item.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .showcase-photo {
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .showcase-photo:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 500);
});

// Add dynamic year to footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const year = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2025', year);
    }
}); 
