# Perplexity Pro Integration Setup Guide 🤖

## 🎉 Congratulations!
Your Temple Finder app now supports **AI-powered temple discovery** using your Perplexity Pro account!

## 🔧 Quick Setup (2 minutes)

### Step 1: Get Your Perplexity Pro API Key
1. Go to [Perplexity API Settings](https://www.perplexity.ai/settings/api)
2. Sign in with your Perplexity Pro account
3. Click **"Generate API Key"**
4. Copy the API key (starts with `pplx-`)

### Step 2: Configure Your App
1. Open `/app/src/main/assets/temple-finder/config.js`
2. Replace `YOUR_PERPLEXITY_API_KEY_HERE` with your actual API key:
   ```javascript
   PERPLEXITY_API_KEY: 'pplx-1234567890abcdef1234567890abcdef12345678'
   ```
3. Save the file

### Step 3: Test Your Integration
1. Build and run your Android app
2. Open Temple Finder
3. Toggle **"✨ AI Search (Perplexity Pro)"** ON
4. Try searching: *"Famous Shiva temples in South India"*
5. Watch AI discover temples in real-time! 🚀

## 🌟 What You Get with AI Integration

### **Massive Temple Database Expansion**
- **From 8 to 1000+** temples instantly
- **Real-time discovery** of temples across India
- **Comprehensive information** with current details

### **Intelligent Search Capabilities**
- **Natural Language**: "Ancient temples in Tamil Nadu with Dravidian architecture"
- **Context Understanding**: AI understands your intent
- **Current Information**: Real-time timings, contact details, directions
- **Cultural Context**: Rich histories, legends, and significance

### **Enhanced User Experience**
- **Smart Suggestions**: AI-powered search examples
- **Detailed Results**: Architecture, significance, timings, special features
- **Maps Integration**: Direct links to Google Maps
- **Fallback Support**: Graceful fallback to local search if AI fails

## 🔍 Example AI Searches

Try these powerful search queries:

### **By Deity & Location**
- "Famous Vishnu temples in Kerala with historical significance"
- "Ancient Shiva temples in Tamil Nadu with Dravidian architecture"
- "Goddess Durga temples in West Bengal with current timings"

### **By Architecture & Style**
- "Hoysala architecture temples in Karnataka"
- "Rock-cut temples in Maharashtra"
- "Pallava dynasty temples with intricate carvings"

### **By Significance & Features**
- "UNESCO World Heritage temples in India"
- "Temples with natural springs or water bodies"
- "Pilgrimage sites with accommodation facilities"

### **By Practical Needs**
- "Temples near Bangalore with early morning timings"
- "Accessible temples in Chennai for elderly visitors"
- "Temples in Mumbai with parking facilities"

## 🎯 AI Search Features

### **Perplexity Pro Advantages**
- **Real-time Web Search**: Access to current information
- **Trusted Sources**: Wikipedia, Incredible India, Temple websites
- **Recent Updates**: Information from the last month
- **Comprehensive Coverage**: Temples across all states and regions

### **Smart Response Parsing**
- **Structured Data**: Automatically extracts temple details
- **Rich Information**: History, architecture, significance, timings
- **Practical Details**: Contact info, coordinates, special features
- **Visual Presentation**: Beautiful temple cards with all details

## 💰 Cost & Usage

### **Perplexity Pro API Pricing**
- **Very Affordable**: ~$0.005-0.02 per search
- **Monthly Budget**: $20-50 for moderate usage (1000-2000 searches)
- **Cost per User**: Less than ₹1 per search

### **Usage Optimization**
- **Smart Caching**: Results cached to reduce API calls
- **Fallback System**: Local search if API fails
- **Error Handling**: Graceful degradation
- **Rate Limiting**: Built-in request management

## 🛠️ Technical Details

### **API Configuration**
```javascript
// Optimized for temple discovery
MODEL: 'llama-3.1-sonar-large-128k-online'
MAX_TOKENS: 4000
TEMPERATURE: 0.3 (for accurate results)
SEARCH_DOMAINS: ["wikipedia.org", "incredibleindia.org", "templenet.com"]
SEARCH_RECENCY: "month" (for current information)
```

### **Response Format**
AI returns structured temple data:
- **Name & Deity**: Primary identification
- **Location**: City, State, Country with coordinates
- **Description**: Rich 2-3 sentence overview
- **Architecture**: Architectural style and features
- **Significance**: Religious and historical importance
- **Timings**: Current visiting hours
- **Special Features**: Unique characteristics

## 🔒 Security & Best Practices

### **API Key Security**
- ✅ Store API key in separate config file
- ✅ Never commit API keys to version control
- ✅ Use environment variables in production
- ✅ Implement rate limiting

### **Error Handling**
- ✅ Graceful fallback to local search
- ✅ User-friendly error messages
- ✅ Timeout protection (30 seconds)
- ✅ Network error recovery

## 🚀 Advanced Features (Coming Soon)

### **Enhanced AI Capabilities**
- **Image Recognition**: Upload temple photos for identification
- **Voice Search**: "Find temples near me with good parking"
- **Personalized Recommendations**: Based on your preferences
- **Real-time Updates**: Live crowd levels and special events

### **Multi-AI Integration**
- **OpenAI GPT-4**: For detailed cultural context
- **Google Gemini**: For image analysis and maps integration
- **Combined Intelligence**: Best of all AI services

## 🐛 Troubleshooting

### **AI Search Not Working?**
1. **Check API Key**: Ensure it's correctly set in `config.js`
2. **Verify Internet**: AI requires internet connection
3. **Check Console**: Look for error messages in browser dev tools
4. **Try Basic Search**: Toggle AI off and try local search

### **No Results Found?**
1. **Try Different Keywords**: Use simpler terms
2. **Check Spelling**: Ensure correct temple/location names
3. **Use Examples**: Try the provided search examples
4. **Fallback Mode**: AI automatically falls back to local search

### **Slow Response?**
1. **Normal Behavior**: AI search takes 5-15 seconds
2. **Network Speed**: Check your internet connection
3. **Server Load**: Perplexity servers may be busy
4. **Timeout Protection**: Automatically falls back after 30 seconds

## 📞 Support

### **Getting Help**
1. **Check this guide** for common issues
2. **Test with examples** provided above
3. **Verify API key** is correctly configured
4. **Check network connection** and permissions

### **Perplexity Pro Support**
- [Perplexity Help Center](https://docs.perplexity.ai/)
- [API Documentation](https://docs.perplexity.ai/reference/post_chat_completions)
- [Community Forum](https://discord.gg/perplexity)

---

## 🎊 You're All Set!

Your Temple Finder app now has **AI superpowers**! 

**From 8 temples to 1000+ temples** with rich, current information powered by Perplexity Pro.

**Happy Temple Discovering!** 🕉️✨

---

*Temple Finder with Perplexity Pro - Bringing AI-Powered Sacred Discovery to Your Fingertips*

