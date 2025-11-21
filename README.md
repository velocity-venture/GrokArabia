# GrokArabia Landing Page

**GrokArabia** - The first 100% Saudi Arabic AI agent marketplace for businesses in Saudi Arabia and the GCC region.

![GrokArabia](https://img.shields.io/badge/AI-Saudi%20Arabia-00ff88?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended - 2 minutes)

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/velocity-venture/GrokArabia.git
   cd GrokArabia
   ```

2. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Done!** Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel Dashboard (No CLI needed)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 3: Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

## 📁 Project Structure

```
GrokArabia/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles (Riyadh-night theme with electric green)
├── js/
│   └── main.js         # JavaScript functionality
├── images/
│   └── hero-bg.jpg     # Hero background image
├── .gitignore          # Git ignore rules
├── vercel.json         # Vercel configuration
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deployment workflow
```

## 🎨 Features

- ✅ **Bilingual** (Arabic/English) with seamless toggle
- ✅ **3-Tier Pricing** (Monthly $99, Annual $699, Lifetime $1,997)
- ✅ **Responsive Design** - Works on all devices
- ✅ **Saudi Vision 2030** aligned
- ✅ **Stripe Payment Integration** ready
- ✅ **Riyadh-night gradient** with electric green (#00ff41) glow
- ✅ **No fake scarcity** - Only lifetime plan shows "Limited 100 spots"

## ⚙️ Configuration

### Update Stripe Payment Link

Replace the Stripe link in `index.html` (line 57 and in pricing section buttons):

```html
<a href="https://buy.stripe.com/YOUR_PAYMENT_LINK">
```

### Update Contact Information

Edit `index.html` footer section (lines 419-421):

```html
<li><i class="fas fa-envelope"></i> your-email@grokarabia.com</li>
<li><i class="fas fa-phone"></i> +966 XX XXX XXXX</li>
```

### Add Demo Video

Replace the placeholder in `index.html` (lines 234-237):

```html
<video controls playsinline webkit-playsinline>
    <source src="your-video-url.mp4" type="video/mp4">
</video>
```

## 🔧 Customization

### Colors (in `css/style.css`)

```css
:root {
    --primary-green: #00ff41;    /* Electric green */
    --primary-dark: #0a0e27;     /* Riyadh night */
    --accent-gold: #ffd700;       /* Saudi gold */
}
```

### Pricing

Update pricing in the HTML (search for "pricing-card" sections).

## 🚀 Deployment Commands

### GitHub

```bash
git init
git add .
git commit -m "Initial commit: GrokArabia landing page"
git remote add origin https://github.com/velocity-venture/GrokArabia.git
git push -u origin main
```

### Vercel CLI

```bash
vercel --prod
```

### Custom Domain

In Vercel/Netlify dashboard:
1. Go to Settings → Domains
2. Add your custom domain (e.g., grokarabia.com)
3. Update DNS records as instructed

## 📝 Important Notes

### Disclaimer

The footer includes this disclaimer:

> **GrokArabia is an independent AI platform built on Poe/Claude • Not affiliated with xAI, Grok, Humain, or Elon Musk**

### Brand Changes Made

- ✅ "Grok Arabia" → "GrokArabia" (one word)
- ✅ Removed all xAI/Humain/500MW references
- ✅ Changed tagline to "أول وكلاء ذكاء اصطناعي سعودي 100%"
- ✅ Removed fake countdown scarcity
- ✅ Added proper 3-tier pricing table
- ✅ Added disclaimer footer

## 🔐 Security Headers

Configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📊 Analytics (Optional)

To add Google Analytics, insert before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Image Not Loading

If `hero-bg.jpg` doesn't load:
1. Ensure the file is in `images/` folder
2. Check file path in `css/style.css` line 75
3. Upload the hero-bg.jpg from the hub to your repo

### Stripe Integration

1. Get Stripe publishable key from dashboard
2. Update `js/main.js` line 7:
   ```javascript
   stripePublishableKey: 'pk_live_YOUR_KEY_HERE'
   ```
3. Set up webhook for payment confirmation

## 📞 Support

- **Email**: info@grokarabia.com
- **GitHub Issues**: [Create an issue](https://github.com/velocity-venture/GrokArabia/issues)

## 📄 License

© 2025 GrokArabia. All Rights Reserved.

---

**Built with ❤️ for Saudi Arabia's Vision 2030**
