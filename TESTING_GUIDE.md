# 🧪 Temple Finder App - Testing & Automation Guide

## 🎯 Overview

This guide helps you test the complete user flow of your Temple Finder app, from search to temple details, favorites, and reviews. We've created automated testing scripts to make this process seamless.

## 🚀 Quick Start

### 1. Start Your App
```bash
./start-dev-server.sh
```
Your app should be running at: http://localhost:3000

### 2. Run Simple Automation (Recommended)
```bash
node simple-automation.js
```
This script will guide you through manual testing with step-by-step instructions.

### 3. Run Full Automation (Advanced)
```bash
npm install puppeteer
node automated-testing.js
```
This script runs fully automated browser tests.

## 📋 Testing Checklist

### ✅ Search Functionality
- [ ] **Basic Search**: Search for "Meenakshi", "Shiva", "Tamil Nadu"
- [ ] **AI Search**: Try "Famous temples in South India"
- [ ] **Enhanced Search**: Test location-based searches
- [ ] **Search Results**: Verify results show temple cards
- [ ] **Search Filters**: Test deity, rating, and crowd level filters

### ✅ Temple Details Flow
- [ ] **Click Temple**: Click on any temple from search results
- [ ] **Temple Info**: Verify name, deity, rating, location
- [ ] **Tabs Navigation**: Test Overview, Timings, Reviews tabs
- [ ] **Contact Info**: Check phone, website, address
- [ ] **Crowd Status**: Verify current occupancy display

### ✅ Favorites System
- [ ] **Add Favorite**: Click heart icon on temple
- [ ] **Remove Favorite**: Click heart icon again
- [ ] **Favorites Page**: Navigate to /favorites
- [ ] **Favorite List**: Verify temples appear in favorites

### ✅ Reviews System
- [ ] **View Reviews**: Check existing reviews
- [ ] **Add Review**: Submit a new review (if authenticated)
- [ ] **Rating Display**: Verify star ratings
- [ ] **Review Count**: Check review count updates

### ✅ Categories
- [ ] **Browse Categories**: Navigate to /categories
- [ ] **Category Cards**: Verify deity categories display
- [ ] **Temple Counts**: Check temple counts per category
- [ ] **Category Click**: Click category to see temples

### ✅ Authentication
- [ ] **Login Form**: Test email/password fields
- [ ] **Registration**: Test sign-up form
- [ ] **Form Validation**: Test required fields
- [ ] **Error Handling**: Test invalid credentials

### ✅ Navigation
- [ ] **Home Page**: Verify temple list loads
- [ ] **Search Page**: Test search functionality
- [ ] **Back Navigation**: Use browser back button
- [ ] **Mobile Responsive**: Test on different screen sizes

## 🔧 Manual Testing Scenarios

### Scenario 1: Complete User Journey
1. **Start**: Open http://localhost:3000
2. **Search**: Type "Golden Temple" in search
3. **Results**: Click on Golden Temple result
4. **Details**: Explore temple information
5. **Favorite**: Add temple to favorites
6. **Review**: Add a review (if logged in)
7. **Navigate**: Go back and try different search

### Scenario 2: Category Exploration
1. **Categories**: Go to /categories
2. **Browse**: Click on "Shiva" category
3. **Filter**: Use filters to narrow results
4. **Details**: Click on a temple
5. **Timings**: Check pooja timings tab
6. **Reviews**: Read existing reviews

### Scenario 3: AI Search Testing
1. **AI Search**: Switch to AI search mode
2. **Query**: Try "Ancient temples with Dravidian architecture"
3. **Results**: Verify AI-powered results
4. **Location**: Add location filter
5. **Enhanced**: Test enhanced search mode

## 🐛 Common Issues & Solutions

### Issue: Search Not Working
**Symptoms**: No results returned, loading forever
**Solutions**:
- Check Supabase connection in browser console
- Verify `.env.local` has correct Supabase credentials
- Check if temples exist in database

### Issue: Temple Details Not Loading
**Symptoms**: 404 error, blank page
**Solutions**:
- Verify temple ID exists in database
- Check browser console for errors
- Ensure temple has required fields

### Issue: Favorites Not Saving
**Symptoms**: Heart icon doesn't change, favorites don't persist
**Solutions**:
- Check if user is authenticated
- Verify Supabase RLS policies
- Check browser console for API errors

### Issue: AI Search Not Available
**Symptoms**: AI search button missing or not working
**Solutions**:
- Check if AI API keys are configured
- Verify `VITE_AI_ENABLED=true` in `.env.local`
- Check browser console for AI service errors

## 📊 Test Results Interpretation

### Automated Test Results
```json
{
  "totalTests": 10,
  "successfulTests": 8,
  "failedTests": 2,
  "successRate": "80.0%"
}
```

### Manual Test Results
- **✅ Pass**: Feature works perfectly
- **⚠️ Partial**: Some functionality works, minor issues
- **❌ Fail**: Major issues or feature broken
- **🔄 Skip**: Test not applicable or skipped

## 🚀 Performance Testing

### Load Testing
- **Search Speed**: Should return results in <2 seconds
- **Page Load**: Initial load should be <3 seconds
- **Navigation**: Page transitions should be <1 second

### Data Testing
- **Temple Count**: Verify all temples from database appear
- **Search Accuracy**: Results should match search criteria
- **Real-time Updates**: Crowd levels should update

## 🔄 Continuous Testing

### Daily Testing
```bash
# Quick smoke test
node simple-automation.js

# Check specific features
curl http://localhost:3000/api/health
```

### Before Deployment
```bash
# Full automated test suite
node automated-testing.js

# Manual regression testing
# Follow complete user journey scenarios
```

## 📱 Mobile Testing

### Responsive Design
- **iPhone SE**: 375x667
- **iPhone 12**: 390x844
- **iPad**: 768x1024
- **Desktop**: 1280x720

### Touch Interactions
- **Swipe**: Test category carousels
- **Tap**: Verify all buttons work
- **Pinch**: Test image zoom (if applicable)

## 🎯 Success Criteria

### ✅ App is Ready When:
- [ ] All search modes work (Basic, AI, Enhanced)
- [ ] Temple details load completely
- [ ] Favorites system works end-to-end
- [ ] Reviews can be added and viewed
- [ ] Categories show correct temple counts
- [ ] Authentication forms work
- [ ] Navigation is smooth
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Supabase integration working

### 🚀 Ready for Production When:
- [ ] All tests pass (>90% success rate)
- [ ] Performance meets criteria
- [ ] Mobile testing completed
- [ ] Error handling tested
- [ ] Data validation working
- [ ] Security measures in place

## 🆘 Getting Help

### Debug Mode
```bash
# Enable debug logging
export DEBUG=true
node simple-automation.js
```

### Check Logs
- **Browser Console**: F12 → Console tab
- **Network Tab**: Check API calls
- **Application Tab**: Check localStorage/sessionStorage

### Common Commands
```bash
# Check server status
curl http://localhost:3000

# Check Supabase connection
curl -H "apikey: YOUR_ANON_KEY" https://your-project.supabase.co/rest/v1/temples

# Restart server
./start-dev-server.sh
```

---

## 🎉 Happy Testing!

Your Temple Finder app is now ready for comprehensive testing. The automation scripts will help you verify that all features work correctly and provide a smooth user experience.

**Remember**: Testing is an ongoing process. Run these tests regularly as you add new features or make changes to ensure everything continues to work properly.
