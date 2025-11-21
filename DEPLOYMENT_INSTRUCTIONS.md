# GrokArabia Deployment Instructions

## ⚠️ IMPORTANT: Complete These Steps Before Deploying

###  1. Copy CSS File
```bash
# Option A: From hub (recommended)
# Use hub_files_tool to read style.css and copy the full content to css/style.css

# Option B: From AI Drive
cp /mnt/aidrive/GrokArabia/css/style.css css/

# The CSS file should be ~23KB (988 lines)
```

### 2. Copy JavaScript File
```bash
# Option A: From hub (recommended)
# Use hub_files_tool to read main.js and copy the full content to js/main.js

# Option B: From AI Drive
cp /mnt/aidrive/GrokArabia/js/main.js js/

# The JS file should be ~15KB (489 lines)
```

### 3. Add Hero Background Image
```bash
# Download from hub URL:
wget https://www.genspark.ai/api/files/s/1wIj3tm2 -O images/hero-bg.jpg

# Or copy from AI Drive:
cp /mnt/aidrive/GrokArabia/images/hero-bg.jpg images/

# The image should be a cyberpunk cityscape with neon green accents
```

### 4. Verify Files
```bash
ls -lh css/style.css js/main.js images/hero-bg.jpg
# All files should have non-zero sizes
```

### 5. Deploy to GitHub
```bash
git init
git add .
git commit -m "Initial commit: GrokArabia landing page"
git branch -M main  
git remote add origin https://github.com/velocity-venture/GrokArabia.git
git push -u origin main
```

### 6. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔧 Post-Deployment Configuration

1. **Update Stripe Links**: Replace payment URLs in index.html
2. **Add Custom Domain**: Configure in Vercel dashboard
3. **Set up Analytics**: Add Google Analytics if needed
4. **Test Payment Flow**: Verify Stripe integration works

## 📞 Need Help?

- Check README.md for detailed instructions
- Visit: https://github.com/velocity-venture/GrokArabia
