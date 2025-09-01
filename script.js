// Professional MathMastery Online Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('MathMastery website loaded!');
    
    // Initialize all functionality
    setupButtons();
    setupForms();
    setupModals();
    setupMobileMenu();
    setupAnimations();
    setupThemeToggle();
});

// Setup all buttons
function setupButtons() {
    // Trial booking buttons
    const trialButtons = ['heroTrial', 'bookTrial', 'finalTrial'];
    trialButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Redirecting to WhatsApp for trial booking...', 'success');
                setTimeout(() => {
                    window.open('https://wa.me/+94786280177?text=Hi! I would like to book class for MathMastery Online.', '_blank');
                }, 1000);
            });
        }
    });

    // Download buttons
    const downloadButtons = ['downloadGrade10', 'downloadGrade11', 'downloadPapers'];
    downloadButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                downloadWithLoading(this, 'https://www.doenets.lk/pastpapers');
            });
        }
    });

    // Video buttons
    const videoButtons = ['introVideo', 'watchIntro'];
    videoButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Opening sample video...', 'info');
                setTimeout(() => {
                    window.open('video/video.mp4', '_blank');
                }, 1000);
            });
        }
    });

    // Enroll buttons
    document.querySelectorAll('a[onclick*="openEnroll"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const course = this.textContent.includes('Grade 10') ? 'Grade 10' : 'Grade 11';
            showNotification(`Redirecting to WhatsApp for ${course} enrollment...`, 'info');
            setTimeout(() => {
                window.open(`https://wa.me/+94786280177?text=Hi! I would like to enroll in the ${course} Mathematics course at MathMastery Online.`, '_blank');
            }, 1000);
        });
    });
}

// Setup forms
function setupForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Portal form
    const portalForm = document.getElementById('portalForm');
    if (portalForm) {
        portalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Login successful!', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    document.getElementById('portalModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 1500);
            }, 2000);
        });
    }
}

// Setup modals
function setupModals() {
    const openPortal = document.getElementById('openPortal');
    const closePortal = document.getElementById('closePortal');
    const portalModal = document.getElementById('portalModal');

    if (openPortal && closePortal && portalModal) {
        openPortal.addEventListener('click', function(e) {
            e.preventDefault();
            portalModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closePortal.addEventListener('click', function() {
            portalModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        portalModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create mobile toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        this.innerHTML = navLinks.classList.contains('mobile-open') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    nav.insertBefore(mobileToggle, navLinks);
}

// Setup animations
function setupAnimations() {
    // Smooth scrolling
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

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Fade in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .card, .feature').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in to main content
    document.querySelector('main').classList.add('fade-in-up');
}

// Download with loading state
function downloadWithLoading(button, url) {
    const originalText = button.innerHTML;
    
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.disabled = true;
    
    setTimeout(() => {
        window.open(url, '_blank');
        button.classList.remove('loading');
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('Download started successfully!', 'success');
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };
    return colors[type] || '#2563eb';
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add smooth transition class
        body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Update theme
        body.setAttribute('data-theme', newTheme);
        
        // Update icon with animation
        themeIcon.style.transform = 'rotate(180deg) scale(0.8)';
        
        setTimeout(() => {
            if (newTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Show notification
        const themeMessage = newTheme === 'dark' ? 'Dark mode activated' : 'Light mode activated';
        showNotification(themeMessage, 'info');
        
        // Remove transition class after animation
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
    
    // Add keyboard support
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

console.log('MathMastery website JavaScript loaded successfully!');
