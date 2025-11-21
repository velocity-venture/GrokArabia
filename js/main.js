Showing lines 1-489 of 489 total lines
==================================================
     1	// ===========================
     2	// Grok Arabia - Main JavaScript
     3	// ===========================
     4	
     5	// Configuration
     6	const CONFIG = {
     7	    stripePublishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY', // Replace with your Stripe publishable key
     8	    initialSpots: 47,
     9	    countdownInterval: 120000, // 2 minutes in milliseconds
    10	};
    11	
    12	// Global state
    13	let spotCount = CONFIG.initialSpots;
    14	let stripe = null;
    15	let elements = null;
    16	let currentLanguage = 'ar'; // Default to Arabic
    17	
    18	// ===========================
    19	// Language Toggle
    20	// ===========================
    21	function initLanguageToggle() {
    22	    const langButtons = document.querySelectorAll('.lang-btn');
    23	    
    24	    langButtons.forEach(btn => {
    25	        btn.addEventListener('click', () => {
    26	            // Remove active class from all buttons
    27	            langButtons.forEach(b => b.classList.remove('active'));
    28	            
    29	            // Add active class to clicked button
    30	            btn.classList.add('active');
    31	            
    32	            // Get selected language
    33	            const lang = btn.getAttribute('data-lang');
    34	            currentLanguage = lang;
    35	            
    36	            // Toggle language classes on body
    37	            if (lang === 'en') {
    38	                document.body.classList.add('lang-en');
    39	            } else {
    40	                document.body.classList.remove('lang-en');
    41	            }
    42	            
    43	            // Update form select options based on language
    44	            updateFormLanguage(lang);
    45	        });
    46	    });
    47	}
    48	
    49	function updateFormLanguage(lang) {
    50	    const industrySelect = document.getElementById('industry');
    51	    if (!industrySelect) return;
    52	    
    53	    // Clear existing options except the first one
    54	    while (industrySelect.options.length > 1) {
    55	        industrySelect.remove(1);
    56	    }
    57	    
    58	    // Update placeholder option
    59	    industrySelect.options[0].text = lang === 'ar' ? 'اختر القطاع' : 'Select Industry';
    60	    
    61	    // Add options based on language
    62	    const industries = lang === 'ar' ? 
    63	        [
    64	            { value: 'ecommerce', text: 'التجارة الإلكترونية' },
    65	            { value: 'realestate', text: 'العقارات' },
    66	            { value: 'hr', text: 'الموارد البشرية' },
    67	            { value: 'oilgas', text: 'النفط والغاز' },
    68	            { value: 'finance', text: 'التمويل' },
    69	            { value: 'other', text: 'أخرى' }
    70	        ] : 
    71	        [
    72	            { value: 'ecommerce', text: 'E-Commerce' },
    73	            { value: 'realestate', text: 'Real Estate' },
    74	            { value: 'hr', text: 'HR & Recruitment' },
    75	            { value: 'oilgas', text: 'Oil & Gas' },
    76	            { value: 'finance', text: 'Finance' },
    77	            { value: 'other', text: 'Other' }
    78	        ];
    79	    
    80	    industries.forEach(industry => {
    81	        const option = document.createElement('option');
    82	        option.value = industry.value;
    83	        option.text = industry.text;
    84	        industrySelect.add(option);
    85	    });
    86	}
    87	
    88	// ===========================
    89	// Countdown Timer
    90	// ===========================
    91	function initCountdown() {
    92	    const countdownElement = document.getElementById('countdown');
    93	    
    94	    if (!countdownElement) return;
    95	    
    96	    // Decrease spot count periodically
    97	    setInterval(() => {
    98	        if (spotCount > 10) {
    99	            spotCount--;
   100	            countdownElement.textContent = spotCount;
   101	            
   102	            // Add animation
   103	            countdownElement.style.transform = 'scale(1.2)';
   104	            setTimeout(() => {
   105	                countdownElement.style.transform = 'scale(1)';
   106	            }, 300);
   107	        }
   108	    }, CONFIG.countdownInterval);
   109	}
   110	
   111	// ===========================
   112	// Smooth Scrolling
   113	// ===========================
   114	function initSmoothScrolling() {
   115	    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   116	        anchor.addEventListener('click', function (e) {
   117	            e.preventDefault();
   118	            const target = document.querySelector(this.getAttribute('href'));
   119	            if (target) {
   120	                target.scrollIntoView({
   121	                    behavior: 'smooth',
   122	                    block: 'start'
   123	                });
   124	            }
   125	        });
   126	    });
   127	    
   128	    // Scroll to signup when CTA button is clicked
   129	    const ctaButton = document.getElementById('ctaButton');
   130	    if (ctaButton) {
   131	        ctaButton.addEventListener('click', () => {
   132	            const signupSection = document.getElementById('signup');
   133	            if (signupSection) {
   134	                signupSection.scrollIntoView({
   135	                    behavior: 'smooth',
   136	                    block: 'start'
   137	                });
   138	            }
   139	        });
   140	    }
   141	}
   142	
   143	// ===========================
   144	// Scroll Animations
   145	// ===========================
   146	function initScrollAnimations() {
   147	    const observerOptions = {
   148	        threshold: 0.1,
   149	        rootMargin: '0px 0px -50px 0px'
   150	    };
   151	    
   152	    const observer = new IntersectionObserver((entries) => {
   153	        entries.forEach(entry => {
   154	            if (entry.isIntersecting) {
   155	                entry.target.style.opacity = '1';
   156	                entry.target.style.transform = 'translateY(0)';
   157	            }
   158	        });
   159	    }, observerOptions);
   160	    
   161	    // Observe feature cards
   162	    document.querySelectorAll('.feature-card').forEach((card, index) => {
   163	        card.style.opacity = '0';
   164	        card.style.transform = 'translateY(30px)';
   165	        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
   166	        observer.observe(card);
   167	    });
   168	}
   169	
   170	// ===========================
   171	// Stripe Payment Integration
   172	// ===========================
   173	async function initStripePayment() {
   174	    // Initialize Stripe
   175	    // Note: Replace CONFIG.stripePublishableKey with your actual Stripe publishable key
   176	    try {
   177	        stripe = Stripe(CONFIG.stripePublishableKey);
   178	    } catch (error) {
   179	        console.error('Stripe initialization error:', error);
   180	        showPaymentMessage('Stripe configuration needed. Please add your Stripe publishable key.', 'error');
   181	        return;
   182	    }
   183	    
   184	    // Note: In production, you'll need to:
   185	    // 1. Create a payment intent on your backend
   186	    // 2. Return the client secret
   187	    // 3. Use that client secret to initialize the Payment Element
   188	    
   189	    // For now, we'll set up the form submission handler
   190	    const form = document.getElementById('signupForm');
   191	    if (form) {
   192	        form.addEventListener('submit', handleFormSubmit);
   193	    }
   194	}
   195	
   196	async function handleFormSubmit(e) {
   197	    e.preventDefault();
   198	    
   199	    const submitButton = document.getElementById('submitButton');
   200	    const messageElement = document.getElementById('payment-message');
   201	    
   202	    // Validate form
   203	    const formData = {
   204	        companyName: document.getElementById('companyName').value.trim(),
   205	        email: document.getElementById('email').value.trim(),
   206	        phone: document.getElementById('phone').value.trim(),
   207	        industry: document.getElementById('industry').value
   208	    };
   209	    
   210	    // Basic validation
   211	    if (!formData.companyName || !formData.email || !formData.phone || !formData.industry) {
   212	        showPaymentMessage(
   213	            currentLanguage === 'ar' ? 
   214	            'الرجاء ملء جميع الحقول المطلوبة' : 
   215	            'Please fill in all required fields',
   216	            'error'
   217	        );
   218	        return;
   219	    }
   220	    
   221	    // Email validation
   222	    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   223	    if (!emailRegex.test(formData.email)) {
   224	        showPaymentMessage(
   225	            currentLanguage === 'ar' ? 
   226	            'الرجاء إدخال بريد إلكتروني صحيح' : 
   227	            'Please enter a valid email address',
   228	            'error'
   229	        );
   230	        return;
   231	    }
   232	    
   233	    // Disable submit button
   234	    submitButton.disabled = true;
   235	    submitButton.innerHTML = currentLanguage === 'ar' ? 
   236	        '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...' : 
   237	        '<i class="fas fa-spinner fa-spin"></i> Processing...';
   238	    
   239	    try {
   240	        // In production, you would:
   241	        // 1. Send form data to your backend
   242	        // 2. Create a Stripe payment intent
   243	        // 3. Confirm the payment
   244	        // 4. Handle the response
   245	        
   246	        // For demo purposes, we'll simulate a successful submission
   247	        await simulatePaymentProcessing(formData);
   248	        
   249	        // Show success message
   250	        showPaymentMessage(
   251	            currentLanguage === 'ar' ? 
   252	            '✓ تم التسجيل بنجاح! سنتواصل معك قريباً.' : 
   253	            '✓ Registration successful! We\'ll contact you soon.',
   254	            'success'
   255	        );
   256	        
   257	        // Reset form
   258	        document.getElementById('signupForm').reset();
   259	        
   260	        // Decrement spot count
   261	        if (spotCount > 10) {
   262	            spotCount--;
   263	            const countdownElement = document.getElementById('countdown');
   264	            if (countdownElement) {
   265	                countdownElement.textContent = spotCount;
   266	            }
   267	        }
   268	        
   269	    } catch (error) {
   270	        console.error('Payment error:', error);
   271	        showPaymentMessage(
   272	            currentLanguage === 'ar' ? 
   273	            'حدث خطأ أثناء المعالجة. الرجاء المحاولة مرة أخرى.' : 
   274	            'An error occurred during processing. Please try again.',
   275	            'error'
   276	        );
   277	    } finally {
   278	        // Re-enable submit button
   279	        submitButton.disabled = false;
   280	        submitButton.innerHTML = currentLanguage === 'ar' ? 
   281	            '<i class="fas fa-lock"></i> <span class="ar-text" dir="rtl">ادفع الآن وابدأ ($99)</span>' : 
   282	            '<i class="fas fa-lock"></i> <span class="en-text">Pay Now & Start ($99)</span>';
   283	    }
   284	}
   285	
   286	// Simulate payment processing (replace with actual Stripe integration)
   287	function simulatePaymentProcessing(formData) {
   288	    return new Promise((resolve) => {
   289	        // Log form data to console for demo purposes
   290	        console.log('Processing registration for:', formData);
   291	        
   292	        // Simulate API call delay
   293	        setTimeout(() => {
   294	            resolve({ success: true });
   295	        }, 2000);
   296	    });
   297	}
   298	
   299	function showPaymentMessage(message, type) {
   300	    const messageElement = document.getElementById('payment-message');
   301	    if (!messageElement) return;
   302	    
   303	    messageElement.textContent = message;
   304	    messageElement.className = `payment-message ${type}`;
   305	    messageElement.style.display = 'block';
   306	    
   307	    // Hide message after 5 seconds for success messages
   308	    if (type === 'success') {
   309	        setTimeout(() => {
   310	            messageElement.style.display = 'none';
   311	        }, 5000);
   312	    }
   313	}
   314	
   315	// ===========================
   316	// Performance Optimizations
   317	// ===========================
   318	function lazyLoadImages() {
   319	    const images = document.querySelectorAll('img[data-src]');
   320	    
   321	    const imageObserver = new IntersectionObserver((entries) => {
   322	        entries.forEach(entry => {
   323	            if (entry.isIntersecting) {
   324	                const img = entry.target;
   325	                img.src = img.dataset.src;
   326	                img.removeAttribute('data-src');
   327	                imageObserver.unobserve(img);
   328	            }
   329	        });
   330	    });
   331	    
   332	    images.forEach(img => imageObserver.observe(img));
   333	}
   334	
   335	// ===========================
   336	// Analytics & Tracking
   337	// ===========================
   338	function trackEvent(eventName, eventData) {
   339	    // Placeholder for analytics tracking
   340	    // Integrate with Google Analytics, Facebook Pixel, etc.
   341	    console.log('Track Event:', eventName, eventData);
   342	    
   343	    // Example: Google Analytics
   344	    // if (typeof gtag !== 'undefined') {
   345	    //     gtag('event', eventName, eventData);
   346	    // }
   347	}
   348	
   349	// Track CTA clicks
   350	function initAnalytics() {
   351	    // Track main CTA button clicks
   352	    const ctaButton = document.getElementById('ctaButton');
   353	    if (ctaButton) {
   354	        ctaButton.addEventListener('click', () => {
   355	            trackEvent('cta_click', {
   356	                location: 'hero',
   357	                language: currentLanguage
   358	            });
   359	        });
   360	    }
   361	    
   362	    // Track form submission
   363	    const form = document.getElementById('signupForm');
   364	    if (form) {
   365	        form.addEventListener('submit', () => {
   366	            trackEvent('form_submit', {
   367	                language: currentLanguage
   368	            });
   369	        });
   370	    }
   371	    
   372	    // Track feature card interactions
   373	    document.querySelectorAll('.feature-card').forEach((card, index) => {
   374	        card.addEventListener('click', () => {
   375	            trackEvent('feature_click', {
   376	                feature_index: index,
   377	                language: currentLanguage
   378	            });
   379	        });
   380	    });
   381	}
   382	
   383	// ===========================
   384	// Initialize Everything
   385	// ===========================
   386	document.addEventListener('DOMContentLoaded', () => {
   387	    console.log('🚀 Grok Arabia - Initializing...');
   388	    
   389	    // Initialize all features
   390	    initLanguageToggle();
   391	    initCountdown();
   392	    initSmoothScrolling();
   393	    initScrollAnimations();
   394	    initStripePayment();
   395	    lazyLoadImages();
   396	    initAnalytics();
   397	    
   398	    // Set default language display
   399	    updateFormLanguage(currentLanguage);
   400	    
   401	    console.log('✓ All features initialized successfully');
   402	});
   403	
   404	// ===========================
   405	// Utility Functions
   406	// ===========================
   407	
   408	// Debounce function for performance
   409	function debounce(func, wait) {
   410	    let timeout;
   411	    return function executedFunction(...args) {
   412	        const later = () => {
   413	            clearTimeout(timeout);
   414	            func(...args);
   415	        };
   416	        clearTimeout(timeout);
   417	        timeout = setTimeout(later, wait);
   418	    };
   419	}
   420	
   421	// Handle window resize
   422	window.addEventListener('resize', debounce(() => {
   423	    // Add any resize-specific logic here
   424	    console.log('Window resized');
   425	}, 250));
   426	
   427	// Handle page visibility change
   428	document.addEventListener('visibilitychange', () => {
   429	    if (document.hidden) {
   430	        console.log('Page hidden');
   431	    } else {
   432	        console.log('Page visible');
   433	    }
   434	});
   435	
   436	// ===========================
   437	// IMPORTANT: Stripe Integration Setup
   438	// ===========================
   439	/*
   440	TO COMPLETE STRIPE INTEGRATION:
   441	
   442	1. Sign up for Stripe at https://stripe.com
   443	2. Get your publishable key from the Stripe Dashboard
   444	3. Replace CONFIG.stripePublishableKey with your actual key
   445	
   446	4. Set up a backend endpoint to create payment intents:
   447	   - POST /create-payment-intent
   448	   - Should return { clientSecret: "..." }
   449	
   450	5. Update the handleFormSubmit function to:
   451	   a) Call your backend to create a payment intent
   452	   b) Use the clientSecret to confirm the payment with Stripe
   453	   c) Handle payment confirmation
   454	
   455	Example backend (Node.js/Express):
   456	```javascript
   457	app.post('/create-payment-intent', async (req, res) => {
   458	    const { amount, currency } = req.body;
   459	    
   460	    const paymentIntent = await stripe.paymentIntents.create({
   461	        amount: amount,
   462	        currency: currency,
   463	    });
   464	    
   465	    res.json({ clientSecret: paymentIntent.client_secret });
   466	});
   467	```
   468	
   469	Example frontend integration:
   470	```javascript
   471	const response = await fetch('/create-payment-intent', {
   472	    method: 'POST',
   473	    headers: { 'Content-Type': 'application/json' },
   474	    body: JSON.stringify({ amount: 9900, currency: 'usd' })
   475	});
   476	const { clientSecret } = await response.json();
   477	
   478	const { error } = await stripe.confirmPayment({
   479	    elements,
   480	    clientSecret,
   481	    confirmParams: {
   482	        return_url: 'https://yoursite.com/success',
   483	    },
   484	});
   485	```
   486	
   487	For full documentation, visit:
   488	https://stripe.com/docs/payments/accept-a-payment
   489	*/