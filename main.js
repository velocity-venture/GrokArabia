// ===========================
// GrokArabia - Main JavaScript
// ===========================

// Configuration
const CONFIG = {
    stripePublishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY', // Replace with your Stripe publishable key
};

// Global state
let stripe = null;
let elements = null;
let currentLanguage = 'ar'; // Default to Arabic

// ===========================
// Language Toggle
// ===========================
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get selected language
            const lang = btn.getAttribute('data-lang');
            currentLanguage = lang;
            
            // Toggle language classes on body
            if (lang === 'en') {
                document.body.classList.add('lang-en');
            } else {
                document.body.classList.remove('lang-en');
            }
            
            // Update form select options based on language
            updateSelectLanguage('industry', lang);
            updateSelectLanguage('plan', lang);
        });
    });
}

function updateSelectLanguage(selectId, lang) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    // Update all option texts based on data attributes
    Array.from(select.options).forEach(option => {
        const arText = option.getAttribute('data-ar');
        const enText = option.getAttribute('data-en');
        
        if (arText && enText) {
            option.textContent = lang === 'ar' ? arText : enText;
        }
    });
}

// ===========================
// Smooth Scrolling
// ===========================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and pricing cards
    document.querySelectorAll('.feature-card, .pricing-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===========================
// Stripe Payment Integration
// ===========================
async function initStripePayment() {
    // Initialize Stripe
    // Note: Replace CONFIG.stripePublishableKey with your actual Stripe publishable key
    try {
        stripe = Stripe(CONFIG.stripePublishableKey);
    } catch (error) {
        console.error('Stripe initialization error:', error);
        showPaymentMessage('Stripe configuration needed. Please add your Stripe publishable key.', 'error');
        return;
    }
    
    // Note: In production, you'll need to:
    // 1. Create a payment intent on your backend
    // 2. Return the client secret
    // 3. Use that client secret to initialize the Payment Element
    
    // For now, we'll set up the form submission handler
    const form = document.getElementById('signupForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitButton');
    const messageElement = document.getElementById('payment-message');
    
    // Validate form
    const formData = {
        companyName: document.getElementById('companyName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        industry: document.getElementById('industry').value,
        plan: document.getElementById('plan') ? document.getElementById('plan').value : 'monthly'
    };
    
    // Basic validation
    if (!formData.companyName || !formData.email || !formData.phone || !formData.industry) {
        showPaymentMessage(
            currentLanguage === 'ar' ? 
            'الرجاء ملء جميع الحقول المطلوبة' : 
            'Please fill in all required fields',
            'error'
        );
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showPaymentMessage(
            currentLanguage === 'ar' ? 
            'الرجاء إدخال بريد إلكتروني صحيح' : 
            'Please enter a valid email address',
            'error'
        );
        return;
    }
    
    // Disable submit button
    submitButton.disabled = true;
    const originalHTML = submitButton.innerHTML;
    submitButton.innerHTML = currentLanguage === 'ar' ? 
        '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...' : 
        '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        // In production, you would:
        // 1. Send form data to your backend
        // 2. Create a Stripe payment intent based on selected plan
        // 3. Confirm the payment
        // 4. Handle the response
        
        // For demo purposes, we'll simulate a successful submission
        await simulatePaymentProcessing(formData);
        
        // Show success message
        showPaymentMessage(
            currentLanguage === 'ar' ? 
            '✓ تم التسجيل بنجاح! سنتواصل معك قريباً.' : 
            '✓ Registration successful! We\'ll contact you soon.',
            'success'
        );
        
        // Reset form
        document.getElementById('signupForm').reset();
        
    } catch (error) {
        console.error('Payment error:', error);
        showPaymentMessage(
            currentLanguage === 'ar' ? 
            'حدث خطأ أثناء المعالجة. الرجاء المحاولة مرة أخرى.' : 
            'An error occurred during processing. Please try again.',
            'error'
        );
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalHTML;
    }
}

// Simulate payment processing (replace with actual Stripe integration)
function simulatePaymentProcessing(formData) {
    return new Promise((resolve) => {
        // Log form data to console for demo purposes
        console.log('Processing registration for:', formData);
        
        // Simulate API call delay
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
}

function showPaymentMessage(message, type) {
    const messageElement = document.getElementById('payment-message');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = `payment-message ${type}`;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// ===========================
// Performance Optimizations
// ===========================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// Analytics & Tracking
// ===========================
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    // Integrate with Google Analytics, Facebook Pixel, etc.
    console.log('Track Event:', eventName, eventData);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track interactions
function initAnalytics() {
    // Track pricing card clicks
    document.querySelectorAll('.pricing-button').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            trackEvent('pricing_click', {
                plan_index: index,
                language: currentLanguage
            });
        });
    });
    
    // Track form submission
    const form = document.getElementById('signupForm');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('form_submit', {
                language: currentLanguage
            });
        });
    }
    
    // Track feature card interactions
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            trackEvent('feature_click', {
                feature_index: index,
                language: currentLanguage
            });
        });
    });
}

// ===========================
// Initialize Everything
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 GrokArabia - Initializing...');
    
    // Initialize all features
    initLanguageToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initStripePayment();
    lazyLoadImages();
    initAnalytics();
    
    // Set default language display for select elements
    updateSelectLanguage('industry', currentLanguage);
    updateSelectLanguage('plan', currentLanguage);
    
    console.log('✓ All features initialized successfully');
});

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Add any resize-specific logic here
    console.log('Window resized');
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// ===========================
// IMPORTANT: Stripe Integration Setup
// ===========================
/*
TO COMPLETE STRIPE INTEGRATION:

1. Sign up for Stripe at https://stripe.com
2. Get your publishable key from the Stripe Dashboard
3. Replace CONFIG.stripePublishableKey with your actual key

4. Set up a backend endpoint to create payment intents:
   - POST /create-payment-intent
   - Should return { clientSecret: "..." }

5. Update the handleFormSubmit function to:
   a) Call your backend to create a payment intent
   b) Use the clientSecret to confirm the payment with Stripe
   c) Handle payment confirmation

Example backend (Node.js/Express):
```javascript
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
});
```

Example frontend integration:
```javascript
const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 9900, currency: 'usd' })
});
const { clientSecret } = await response.json();

const { error } = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
        return_url: 'https://yoursite.com/success',
    },
});
```

For full documentation, visit:
https://stripe.com/docs/payments/accept-a-payment
*/
