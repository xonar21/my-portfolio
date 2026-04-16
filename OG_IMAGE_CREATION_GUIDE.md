# Open Graph Image Creation Guide

## Quick Reference

| Property | Specification |
|----------|---|
| **Filename** | `og-image.png` or `og-image.webp` |
| **Location** | `/public/og-image.png` |
| **Dimensions** | 1200px × 630px (16:9 aspect ratio) |
| **Format** | PNG or WebP (WebP = 40% smaller) |
| **File Size** | <100KB |
| **Color Space** | sRGB |

---

## Option 1: Figma (Recommended - No coding required)

### Step 1: Create New File
1. Go to [figma.com](https://figma.com)
2. Click **"New file"** → **"Design file"**
3. Rename to "Portfolio OG Image"

### Step 2: Set Canvas Size
1. Select the default Frame
2. Right-click → **"Delete"** (remove default artboard)
3. Click **"Create new"** → **"Frame"**
4. Enter name: **"OG Image"**
5. Set size:
   - **Width:** 1200px
   - **Height:** 630px
   - **Position:** 0, 0

### Step 3: Design the Layout

#### Background Layer
1. Select OG Image frame
2. Right-click → **"Add component"** → **"Rectangle"**
3. Set:
   - **Fill:** `#1a1a1a` (dark background) or `#ffffff` (light)
   - **Width:** 1200px
   - **Height:** 630px

#### Optional: Accent Stripe
1. Add another rectangle
2. **Width:** 1200px
3. **Height:** 8px
4. **Position:** x=0, y=100
5. **Fill:** Your brand color (e.g., `#00d4ff` for cyan)

#### Text Layer 1: Name
1. Add **Text** → Double-click to edit
2. Type: **"Jan Spinu"**
3. Set:
   - **Font:** Inter, Segoe UI, or Roboto
   - **Size:** 72px
   - **Weight:** Bold (700)
   - **Color:** `#ffffff` (if dark BG) or `#1a1a1a` (if light BG)
   - **Position:** x=100, y=200
   - **Max width:** 1000px

#### Text Layer 2: Title
1. Add new **Text**
2. Type: **"Senior Full-Stack Engineer"**
3. Set:
   - **Font:** Inter, Segoe UI, or Roboto
   - **Size:** 40px
   - **Weight:** Regular (400)
   - **Color:** `#00d4ff` (brand color) or `#888888` (gray)
   - **Position:** x=100, y=310

#### Text Layer 3: Tagline (Optional)
1. Add new **Text**
2. Type: **"LLM Integration · AI Agents · React · Go"**
3. Set:
   - **Font:** Inter, Segoe UI, or Roboto
   - **Size:** 20px
   - **Weight:** Regular (400)
   - **Color:** `#888888` (gray)
   - **Position:** x=100, y=380

#### Optional: Logo/Icon (top-right)
1. Add a **circle** or **shape**
2. **Size:** 80×80px
3. **Position:** x=1080, y=40
4. **Fill:** Transparent or brand color
5. Import your SVG logo or initials "JS"

### Step 4: Preview & Adjust

Use Figma's **Preview** feature to see the final result:
1. Click **Preview** (top-right)
2. Adjust text sizes and colors until satisfied

### Step 5: Export as PNG

1. Select the "OG Image" frame
2. Right-click → **"Export"**
3. Click **"+"** → Add export
4. Set:
   - **Format:** PNG
   - **Scale:** 1x (for 1200×630px)
5. Click **"Export OG Image"**
6. Save as `og-image.png`

### Step 6: Compress (Optional but Recommended)

To reduce file size from PNG to WebP (40% smaller):

1. **Online:** Use [TinyPNG.com](https://tinypng.com/)
   - Upload PNG
   - Download WebP version
   - Rename to `og-image.webp`

2. **CLI:** Use ImageMagick or ffmpeg
   ```bash
   # Convert PNG to WebP (80% quality)
   convert og-image.png -quality 80 og-image.webp
   
   # Or use ffmpeg
   ffmpeg -i og-image.png -c:v libwebp -quality 80 og-image.webp
   ```

### Step 7: Place in Project

1. Copy `og-image.png` (or `og-image.webp`)
2. Paste into `/public/` directory
3. Verify path: `/public/og-image.png`

---

## Option 2: Canva (Easiest for Beginners)

### Step 1: Create Design
1. Go to [canva.com](https://canva.com)
2. Search template: **"Open Graph Image"** or **"1200x630"**
3. Select a professional portfolio template

### Step 2: Customize
1. Edit text:
   - Change "Your Name" → **"Jan Spinu"**
   - Change "Your Title" → **"Senior Full-Stack Engineer"**
2. Change colors to match your brand
3. Add your photo (optional) in the designated area

### Step 3: Download
1. Click **"Download"** (top-right)
2. Select **"PNG"** (default)
3. Quality: **"Standard"** or **"Max"**
4. Click **"Download"**
5. Save as `og-image.png`

### Step 4: Place in Project
Copy to `/public/og-image.png`

---

## Option 3: Node.js Script (Automated)

If you want to generate OG images programmatically:

### Install Dependencies
```bash
npm install sharp
```

### Create `scripts/generate-og-image.mjs`
```javascript
import sharp from 'sharp';

const width = 1200;
const height = 630;
const backgroundColor = '#1a1a1a';
const textColor = '#ffffff';

// Create image with SVG text overlay
const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        text { font-family: 'Inter', sans-serif; }
      </style>
    </defs>
    
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
    
    <!-- Accent stripe -->
    <rect width="${width}" height="8" y="100" fill="#00d4ff"/>
    
    <!-- Name -->
    <text x="100" y="280" font-size="72" font-weight="700" fill="${textColor}">
      Jan Spinu
    </text>
    
    <!-- Title -->
    <text x="100" y="350" font-size="40" font-weight="400" fill="#00d4ff">
      Senior Full-Stack Engineer
    </text>
    
    <!-- Tagline -->
    <text x="100" y="420" font-size="20" fill="#888888">
      LLM Integration · AI Agents · React · Go
    </text>
  </svg>
`;

// Create and save image
sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png', (err) => {
    if (err) {
      console.error('Error creating OG image:', err);
    } else {
      console.log('✅ OG image created: public/og-image.png');
    }
  });
```

### Run Script
```bash
node scripts/generate-og-image.mjs
```

### Add to Build Process
Update `package.json`:
```json
{
  "scripts": {
    "prebuild": "node scripts/generate-og-image.mjs",
    "build": "astro build"
  }
}
```

Now OG image is generated automatically before each build!

---

## Option 4: Using an Online Tool (Quickest)

### Free Online Tools
1. **[OGImage.io](https://www.ogimage.io/)** - Upload template, customize text
2. **[Vercel OG Image Generation](https://vercel.com/docs/functions/og-image-generation)** - Dynamic OG images (advanced)
3. **[Bannerly](https://www.bannerly.com/)** - Drag-and-drop OG image creator
4. **[Previewgenerator.com](https://www.previewgenerator.com/)** - Simple text overlay

---

## Design Best Practices

### ✅ DO's

```
✅ Keep text in the CENTER (avoid edges that crop)
✅ Use SOLID BACKGROUND (no busy textures)
✅ Choose HIGH CONTRAST colors (white on dark, dark on light)
✅ Use SANS-SERIF fonts (Inter, Segoe UI, Roboto)
✅ Test on multiple platforms (LinkedIn, Twitter, Telegram)
✅ Aim for FILE SIZE <100KB (compress with TinyPNG)
✅ Include your NAME or BRAND (top priority)
✅ Keep TITLE CONCISE (2-3 words max)
```

### ❌ DON'Ts

```
❌ DON'T use serif fonts (too small on thumbnails)
❌ DON'T use busy backgrounds (patterns, photos, gradients)
❌ DON'T place text on edges (will be cropped)
❌ DON'T use low contrast (light gray on light white = invisible)
❌ DON'T use animated GIFs (social platforms show first frame only)
❌ DON'T make image >200KB (slow loading)
❌ DON'T use more than 3 colors (too busy)
❌ DON'T forget to test (verify on platforms before launch)
```

---

## Safe Zone Diagram

Different platforms crop the image differently. Keep critical text in the **center safe zone** (1050×580px):

```
┌────────────────────────────────────────────────────────────────┐
│                      1200px × 630px                            │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │         SAFE ZONE (1050×580px - centered)              │ │
│  │                                                          │ │
│  │              Jan Spinu (72px, Bold)                    │ │
│  │                                                          │ │
│  │    Senior Full-Stack Engineer (40px, Regular)           │ │
│  │                                                          │ │
│  │  LLM Integration · AI Agents (20px)                    │ │
│  │                                                          │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Margin: ~75px on top/bottom, ~150px on left/right
```

**Why This Matters:**
- LinkedIn crops to 1.91:1 ratio (may cut top/bottom)
- Twitter crops to safe area
- Slack shows square thumbnails (center-crops)
- Keeping text in center prevents accidental cropping

---

## Testing Your OG Image

### 1. Local Testing

After placing `og-image.png` in `/public/`:

```bash
npm run build
npm run preview
```

Visit http://localhost:4322/ and inspect:
```bash
# Check meta tag
grep 'og:image' dist/en/index.html
# Should show: <meta property="og:image" content="https://janspinu.com/og-image.png" />
```

### 2. Online Debuggers

Test on these platforms:

| Platform | Debugger URL | Expected Result |
|----------|--|--|
| **Facebook** | https://developers.facebook.com/tools/debug/ | Rich preview with image |
| **Twitter** | https://cards-dev.twitter.com/validator | Card appears with image |
| **LinkedIn** | Share link → preview shows | Image + title + description |
| **Telegram** | Send link to yourself | Preview card with image |

**Steps:**
1. Go to debugger URL
2. Paste your portfolio URL: `https://janspinu.com/en/`
3. Look for image preview
4. If image missing: clear cache (wait 24h or use force refresh)

### 3. Command Line Testing

Check if image is served correctly:

```bash
# Check HTTP response headers
curl -I https://janspinu.com/og-image.png
# Should return: 200 OK with Content-Type: image/png

# Check image dimensions
identify https://janspinu.com/og-image.png
# Should show: 1200x630 pixels
```

---

## Troubleshooting

### Issue: Image Not Showing

**Possible Causes:**
1. Filename mismatch (case-sensitive on Linux/Vercel)
   ```
   ❌ /public/OG-image.png (wrong case)
   ✅ /public/og-image.png (correct)
   ```

2. Image not in correct directory
   ```
   ❌ /src/public/og-image.png (wrong)
   ✅ /public/og-image.png (correct)
   ```

3. Image not committed to git
   ```bash
   git add public/og-image.png
   git commit -m "Add OG image"
   git push
   ```

4. SEO.astro not updated
   - Verify SEO.astro includes: `<meta property="og:image" content={ogImageUrl} />`

**Solution:**
```bash
# Verify file exists
ls -la public/og-image.png

# Verify file size
du -h public/og-image.png

# Verify it's in git
git ls-files | grep og-image
```

### Issue: Image Looks Blurry

**Cause:** Image dimensions are wrong or file is corrupted

**Solution:**
```bash
# Check image dimensions
identify public/og-image.png
# Should output: og-image.png PNG 1200x630 1200x630+0+0 8-bit sRGB

# Recreate image if wrong dimensions
# Use Figma export with exact 1200×630px
```

### Issue: File Size Too Large (>200KB)

**Solution:** Compress using TinyPNG or ImageMagick

```bash
# Using TinyPNG API
curl --user api:YOUR_TINYPNG_KEY \
  --data-binary @public/og-image.png \
  https://api.tinypng.com/output/png \
  --output public/og-image-compressed.png

# Using ImageMagick
convert og-image.png -strip -quality 85 og-image-compressed.png

# Using ffmpeg for WebP
ffmpeg -i og-image.png -c:v libwebp -quality 80 og-image.webp
```

---

## Final Verification Checklist

Before considering this complete:

- [ ] File exists: `/public/og-image.png`
- [ ] Dimensions: 1200×630px (verified with `identify`)
- [ ] File size: <100KB
- [ ] Format: PNG or WebP
- [ ] Text is readable (72px name, 40px title)
- [ ] Colors have high contrast
- [ ] Committed to git: `git add public/og-image.png`
- [ ] Deployed to Vercel
- [ ] Tested on Facebook Debugger ✓
- [ ] Tested on Twitter Card Validator ✓
- [ ] Tested on LinkedIn (shared link shows preview) ✓
- [ ] Tested on Telegram (forwarded link shows preview) ✓

---

## Need Help?

1. **Figma Tutorial:** https://www.youtube.com/watch?v=EhQLQhMXL5k (OG image design)
2. **OG Image Best Practices:** https://ogp.me/ (official spec)
3. **Social Sharing Guide:** https://www.search-engine-journal.com/open-graph/ (detailed guide)

---

**Remember:** A professional OG image can increase CTR by 5-8% when shared on social platforms!
