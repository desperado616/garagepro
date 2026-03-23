// Mobile menu toggle
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burgerBtn.contains(e.target)) {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
}

// FAQ Accordion
const faqButtons = document.querySelectorAll('.faq__question');
if (faqButtons.length > 0) {
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            const wasExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all FAQ items
            document.querySelectorAll('.faq__item').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.faq__question').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Product Image Gallery
const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.querySelector('.product-images__main img');

if (thumbs.length > 0 && mainImage) {
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const newSrc = thumb.querySelector('img').src;
            const newAlt = thumb.querySelector('img').alt;
            mainImage.src = newSrc;
            mainImage.alt = newAlt;
        });
    });
}

// Feature toggles
const featureToggles = document.querySelectorAll('.feature-toggle');
if (featureToggles.length > 0) {
    featureToggles.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            const wasExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.classList.toggle('active');
            button.setAttribute('aria-expanded', !wasExpanded);
            
            if (isActive) {
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Payment form validation
const paymentForm = document.querySelector('.payment__form');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = paymentForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.style.borderColor = '';
                field.setAttribute('aria-invalid', 'false');
            }
        });
        
        if (isValid) {
            // Show success message (in real app, this would submit to server)
            alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
            paymentForm.reset();
        } else {
            alert('Пожалуйста, заполните все обязательные поля');
        }
    });
}

// Add to cart functionality (placeholder)
const addToCartButtons = document.querySelectorAll('.btn--primary');
addToCartButtons.forEach(button => {
    if (button.textContent.includes('КОРЗИНУ')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = '✓ ДОБАВЛЕНО';
            button.style.background = 'var(--success)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Lazy loading images fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}