# 🏛️ Temple Data Validation Guide

## Overview
The Temple Validator is a comprehensive admin tool for reviewing and correcting temple data. It allows you to validate images, edit details, and maintain data quality for all 400 temples.

## Accessing the Validator

Navigate to: **`/validator`** in your app

Example: `http://localhost:5173/validator` (local) or `https://your-app.vercel.app/validator` (production)

## Features

### 📊 Dashboard Stats
- **Total Temples**: All temples in database
- **Verified**: Temples you've reviewed and approved
- **Needs Review**: Temples awaiting validation
- **No Image**: Temples missing images

### 🔍 Filter Options
- **All**: Show all temples
- **Unverified**: Show only temples that haven't been verified yet
- **No Image**: Show only temples without images (priority review)

### ✅ Quick Verify
If temple data looks correct:
1. Review the image and details
2. Click **"✓ Verify & Next"**
3. Automatically moves to next temple

### ✏️ Edit Mode
When you need to fix temple data:
1. Click **"✏️ Edit Temple Data"**
2. Modify any field:
   - **Image URL**: Paste a new image URL (use Unsplash, Wikipedia Commons, or your own CDN)
   - **Name**: Correct temple name
   - **Deity**: Select from dropdown (Shiva, Vishnu, Murugan, etc.)
   - **Description**: Update description
   - **Address**: Correct address
   - **Rating**: Adjust rating (0-5)
3. Click **"💾 Save & Mark Verified"**

### 🖼️ Finding Better Images

#### Option 1: Manual Image URL (Recommended)
1. Search Google Images for the temple name
2. Find a high-quality image
3. Right-click → "Copy image address"
4. Paste into the "Image URL" field

**Recommended Image Sources:**
- **Unsplash**: `https://images.unsplash.com/photo-...`
- **Wikipedia Commons**: `https://upload.wikimedia.org/...`
- **Your own CDN/storage**: Upload images to your server

#### Option 2: Google Places Photos (Limited)
- Click **"🔍 Find More Photos"** (may not work due to CORS)
- If it works, select from multiple photos
- If it fails, use manual URL method instead

### 📥 Export Validated Data

After reviewing temples:
1. Click **"📥 Export X Verified"** button
2. Downloads a `.txt` file with TypeScript code
3. Copy the content
4. Replace the `temples` array in `src/data.ts`
5. Build and deploy

## Workflow Recommendations

### Quick Validation (Fast Pass)
1. Set filter to **"Unverified"**
2. Review each temple quickly
3. If everything looks good → **Verify & Next**
4. If something's wrong → **Edit**

### Priority: Fix Missing Images
1. Set filter to **"No Image"**
2. For each temple:
   - Search Google Images for the temple
   - Copy a good image URL
   - Click **Edit**
   - Paste image URL
   - Save & Mark Verified

### Deity Correction
Common issues:
- Generic "Hindu" → Identify specific deity from name
- Wrong deity → Update from dropdown

### Quality Control Tips
- **Names**: Should be complete and properly spelled
- **Images**: Should clearly show the temple exterior or gopuram
- **Deity**: Should match the primary deity of the temple
- **Rating**: 4.0-5.0 is typical for well-maintained temples

## Data Persistence

All validation data is saved in **browser localStorage**:
- Your progress is saved automatically
- You can close and resume anytime
- Verified status persists across sessions
- **Warning**: Clearing browser data will reset validation progress

## Backup Your Work

Export validated data regularly:
1. Every 50-100 temples verified
2. Before closing the browser
3. After completing a validation session

## Integration with Codebase

### Automated Integration (Future)
Currently manual - planned features:
- Direct database updates
- Automated image hosting
- Batch verification API

### Manual Integration (Current)
1. Complete validation in `/validator`
2. Export verified temples
3. Replace `temples` array in `src/data.ts`
4. Commit to git
5. Push to deploy

## Performance Tips

- Use keyboard navigation (if added)
- Work in batches of 50-100 temples
- Filter by "No Image" for fastest impact
- Verify quickly, edit only when necessary

## Troubleshooting

### Images not loading
- Check if image URL is valid
- Try loading URL directly in browser
- Use HTTPS URLs only
- Replace with Unsplash fallback

### "Find More Photos" not working
- This is due to CORS restrictions
- Use manual image URL method instead
- Future: Backend proxy will fix this

### Progress lost
- Check browser localStorage isn't cleared
- Export regularly as backup
- Future: Cloud sync will prevent this

## Best Practices

1. **Verify in order** - Use filters to prioritize
2. **Be consistent** - Use same naming conventions
3. **Quality over speed** - Ensure accuracy
4. **Document changes** - Keep notes of major corrections
5. **Export frequently** - Don't lose progress

## Example Workflow

```
Session Start:
1. Open /validator
2. Set filter to "No Image" (e.g., 50 temples)
3. For each temple:
   - Google search "[temple name] Chennai"
   - Find good image
   - Edit → Paste URL → Save
4. Export verified temples (50 now fixed)
5. Switch to "Unverified" filter
6. Quick verify next 100 temples
7. Export again (150 total verified)
8. Take break, resume later

Session End:
9. Export final batch
10. Update data.ts
11. Deploy
```

## Future Enhancements

- [ ] Backend API integration
- [ ] Automated image hosting
- [ ] Bulk edit operations
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts
- [ ] Cloud sync for validation progress
- [ ] AI-assisted image validation
- [ ] Community validation (crowdsourced)

---

**Need Help?**
Contact support or check the documentation for updates.
