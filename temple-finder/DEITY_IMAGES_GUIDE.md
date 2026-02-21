# Guide: Adding Deity Images and Mantras

## ✅ What's Been Added

1. **Mantras** - Each deity now has a sacred mantra
2. **Image Support** - Deity categories now support images
3. **UI Updates** - Categories page and Home page display mantras and images

## 📸 Adding Deity Images

### Option 1: Use Local Images (Recommended)

1. Create an `images` folder in `temple-finder/public/`:
   ```bash
   mkdir -p temple-finder/public/images/deities
   ```

2. Add deity images with these names:
   - `shiva.jpg` or `shiva.png`
   - `vishnu.jpg` or `vishnu.png`
   - `ganpati.jpg` or `ganpati.png`
   - `murugan.jpg` or `murugan.png`
   - `devi.jpg` or `devi.png`
   - `rama.jpg` or `rama.png`
   - `krishna.jpg` or `krishna.png`
   - `hanuman.jpg` or `hanuman.png`
   - `saibaba.jpg` or `saibaba.png`
   - `durga.jpg` or `durga.png`

3. Update image paths in `mockDataService.ts`:
   ```typescript
   image: '/images/deities/shiva.jpg',
   ```

### Option 2: Use Online Images

Update the `image` field in `mockDataService.ts` with direct URLs:
```typescript
image: 'https://your-image-host.com/shiva.jpg',
```

### Option 3: Use CDN/Image Hosting

Popular options:
- **Cloudinary**: Free tier available
- **Imgur**: Simple image hosting
- **Unsplash**: Free stock photos (currently used as placeholder)

## 🕉️ Current Mantras Added

| Deity | Mantra |
|-------|--------|
| Shiva | ॐ नमः शिवाय |
| Vishnu | ॐ नमो भगवते वासुदेवाय |
| Ganpati | ॐ गं गणपतये नमः |
| Murugan | ॐ सरवण भव |
| Devi | ॐ दुं दुर्गायै नमः |
| Rama | श्री राम जय राम जय जय राम |
| Krishna | ॐ नमो भगवते वासुदेवाय |
| Hanuman | ॐ हं हनुमते नमः |
| Sai Baba | ॐ साई राम |
| Durga | ॐ दुं दुर्गायै नमः |

## 📝 How to Update Mantras

Edit `temple-finder/src/services/mockDataService.ts` and update the `mantra` field:

```typescript
{
  id: 'cat-1',
  name: 'Shiva',
  mantra: 'ॐ नमः शिवाय', // Update this
  image: '/images/deities/shiva.jpg', // Update this
  // ... rest of the fields
}
```

## 🎨 Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 400x400px or larger (square)
- **Aspect Ratio**: 1:1 (square) works best
- **File Size**: Keep under 200KB for fast loading

## 📱 Where Images Appear

1. **Categories Page** (`/categories`):
   - Large circular image (24x24 = 96px)
   - Mantra displayed in a highlighted box
   - Full deity information

2. **Home Page** (`/`):
   - Smaller circular image (16x16 = 64px)
   - Mantra shown on hover (tooltip)
   - Compact grid view

## 🔄 After Adding Images

1. **For Web App**: 
   - Images will appear immediately (hot reload)
   - Refresh the page to see changes

2. **For Android App**:
   - Rebuild: `./build-android.sh`
   - Images will be bundled with the app

## 💡 Tips

- Use high-quality, respectful images of deities
- Ensure images are properly licensed or free to use
- Test image loading with fallback to icon if image fails
- Consider using WebP format for better compression

## 🐛 Troubleshooting

If images don't load:
1. Check file paths are correct
2. Ensure images are in `public/` folder (for local images)
3. Check browser console for 404 errors
4. Verify image URLs are accessible (for online images)
5. The app will automatically fallback to the Om icon (🕉️) if image fails

## 📚 Resources for Deity Images

- **Free Images**: Unsplash, Pexels (search for "hindu deity")
- **Religious Images**: Temple websites, religious organizations
- **Create Your Own**: Use image editing tools to create consistent style

---

**Note**: Currently using placeholder images from Unsplash. Replace with actual deity images for production use.
