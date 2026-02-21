#!/usr/bin/env node

/**
 * Automated Testing Script for Temple Finder App
 * This script automates the complete user journey from search to temple details
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class TempleFinderAutomation {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async init() {
    console.log('🚀 Starting Temple Finder Automation...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
  }

  async navigateToApp() {
    console.log('📍 Navigating to Temple Finder App...');
    await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Wait for the app to load
    await this.page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 }).catch(() => {
      console.log('⚠️  App loaded indicator not found, continuing...');
    });
    
    console.log('✅ App loaded successfully');
  }

  async testSearchFlow() {
    console.log('\n🔍 Testing Search Flow...');
    
    const searchTests = [
      {
        name: 'Basic Temple Search',
        query: 'Meenakshi',
        type: 'basic'
      },
      {
        name: 'Deity Search',
        query: 'Shiva temples',
        type: 'basic'
      },
      {
        name: 'Location Search',
        query: 'Tamil Nadu',
        type: 'basic'
      },
      {
        name: 'AI Search',
        query: 'Famous temples in South India',
        type: 'ai'
      }
    ];

    for (const test of searchTests) {
      console.log(`\n  Testing: ${test.name}`);
      await this.performSearch(test.query, test.type);
      await this.page.waitForTimeout(2000); // Wait between searches
    }
  }

  async performSearch(query, type = 'basic') {
    try {
      // Navigate to search page
      await this.page.goto('http://localhost:3000/search', { waitUntil: 'networkidle2' });
      
      // Wait for search input
      await this.page.waitForSelector('input[placeholder*="Search temples"]', { timeout: 5000 });
      
      // Clear and type search query
      await this.page.click('input[placeholder*="Search temples"]');
      await this.page.keyboard.down('Control');
      await this.page.keyboard.press('KeyA');
      await this.page.keyboard.up('Control');
      await this.page.type('input[placeholder*="Search temples"]', query);
      
      // If AI search, switch to AI mode
      if (type === 'ai') {
        try {
          await this.page.click('button:has-text("AI Search")');
          await this.page.waitForTimeout(1000);
        } catch (e) {
          console.log('    ⚠️  AI Search button not found, using basic search');
        }
      }
      
      // Press Enter to search
      await this.page.keyboard.press('Enter');
      
      // Wait for results
      await this.page.waitForSelector('.space-y-4', { timeout: 10000 });
      
      // Get search results
      const results = await this.page.evaluate(() => {
        const resultElements = document.querySelectorAll('[class*="space-y-4"] > div');
        return Array.from(resultElements).map(el => {
          const nameEl = el.querySelector('h3');
          const deityEl = el.querySelector('p');
          return {
            name: nameEl ? nameEl.textContent : 'Unknown',
            deity: deityEl ? deityEl.textContent : 'Unknown'
          };
        });
      });
      
      console.log(`    ✅ Found ${results.length} results for "${query}"`);
      
      if (results.length > 0) {
        console.log(`    📋 First result: ${results[0].name} (${results[0].deity})`);
        
        // Test clicking on first result
        await this.testTempleDetails(results[0].name);
      }
      
      this.results.push({
        query,
        type,
        resultCount: results.length,
        success: true
      });
      
    } catch (error) {
      console.log(`    ❌ Search failed for "${query}": ${error.message}`);
      this.results.push({
        query,
        type,
        resultCount: 0,
        success: false,
        error: error.message
      });
    }
  }

  async testTempleDetails(templeName) {
    console.log(`    🏛️  Testing temple details for: ${templeName}`);
    
    try {
      // Click on the first temple result
      await this.page.click('h3');
      await this.page.waitForTimeout(2000);
      
      // Wait for temple details page to load
      await this.page.waitForSelector('h1', { timeout: 10000 });
      
      // Get temple details
      const templeDetails = await this.page.evaluate(() => {
        const nameEl = document.querySelector('h1');
        const deityEl = document.querySelector('p.text-xl');
        const ratingEl = document.querySelector('[class*="text-yellow-500"]');
        
        return {
          name: nameEl ? nameEl.textContent : 'Unknown',
          deity: deityEl ? deityEl.textContent : 'Unknown',
          rating: ratingEl ? ratingEl.textContent : 'Unknown'
        };
      });
      
      console.log(`      ✅ Temple details loaded: ${templeDetails.name}`);
      console.log(`      📊 Deity: ${templeDetails.deity}, Rating: ${templeDetails.rating}`);
      
      // Test tabs
      await this.testTempleTabs();
      
      // Test favorite functionality
      await this.testFavoriteToggle();
      
      // Go back to search
      await this.page.click('button:has-text("Back")');
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      console.log(`      ❌ Temple details test failed: ${error.message}`);
    }
  }

  async testTempleTabs() {
    console.log('      📑 Testing temple tabs...');
    
    const tabs = ['Overview', 'Timings', 'Reviews'];
    
    for (const tab of tabs) {
      try {
        await this.page.click(`button:has-text("${tab}")`);
        await this.page.waitForTimeout(1000);
        console.log(`        ✅ ${tab} tab clicked`);
      } catch (error) {
        console.log(`        ⚠️  ${tab} tab not found or clickable`);
      }
    }
  }

  async testFavoriteToggle() {
    console.log('      ❤️  Testing favorite toggle...');
    
    try {
      // Look for heart icon button
      const heartButton = await this.page.$('button:has(svg)');
      if (heartButton) {
        await heartButton.click();
        await this.page.waitForTimeout(1000);
        console.log('        ✅ Favorite toggle clicked');
        
        // Click again to toggle back
        await heartButton.click();
        await this.page.waitForTimeout(1000);
        console.log('        ✅ Favorite toggle reverted');
      } else {
        console.log('        ⚠️  Favorite button not found');
      }
    } catch (error) {
      console.log(`        ⚠️  Favorite toggle test failed: ${error.message}`);
    }
  }

  async testCategories() {
    console.log('\n📂 Testing Categories...');
    
    try {
      await this.page.goto('http://localhost:3000/categories', { waitUntil: 'networkidle2' });
      await this.page.waitForSelector('h2', { timeout: 5000 });
      
      // Get category count
      const categoryCount = await this.page.evaluate(() => {
        const categoryElements = document.querySelectorAll('[class*="grid"] > div');
        return categoryElements.length;
      });
      
      console.log(`  ✅ Found ${categoryCount} categories`);
      
      // Click on first category
      const firstCategory = await this.page.$('[class*="grid"] > div:first-child');
      if (firstCategory) {
        await firstCategory.click();
        await this.page.waitForTimeout(2000);
        console.log('  ✅ Category clicked, navigated to temple list');
      }
      
    } catch (error) {
      console.log(`  ❌ Categories test failed: ${error.message}`);
    }
  }

  async testAuthentication() {
    console.log('\n🔐 Testing Authentication...');
    
    try {
      await this.page.goto('http://localhost:3000/auth', { waitUntil: 'networkidle2' });
      
      // Test login form
      const loginButton = await this.page.$('button:has-text("Login")');
      if (loginButton) {
        console.log('  ✅ Login form found');
        
        // Try to fill login form (won't actually submit)
        const emailInput = await this.page.$('input[type="email"]');
        const passwordInput = await this.page.$('input[type="password"]');
        
        if (emailInput && passwordInput) {
          await emailInput.type('test@example.com');
          await passwordInput.type('testpassword');
          console.log('  ✅ Login form filled');
        }
      }
      
      // Test registration form
      const registerTab = await this.page.$('button:has-text("Register")');
      if (registerTab) {
        await registerTab.click();
        await this.page.waitForTimeout(1000);
        console.log('  ✅ Registration tab clicked');
      }
      
    } catch (error) {
      console.log(`  ❌ Authentication test failed: ${error.message}`);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating Test Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      successfulTests: this.results.filter(r => r.success).length,
      failedTests: this.results.filter(r => !r.success).length,
      results: this.results
    };
    
    // Save report to file
    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📋 Test Report Summary:`);
    console.log(`   Total Tests: ${report.totalTests}`);
    console.log(`   Successful: ${report.successfulTests}`);
    console.log(`   Failed: ${report.failedTests}`);
    console.log(`   Success Rate: ${((report.successfulTests / report.totalTests) * 100).toFixed(1)}%`);
    console.log(`   Report saved to: ${reportPath}`);
    
    return report;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.init();
      await this.navigateToApp();
      await this.testSearchFlow();
      await this.testCategories();
      await this.testAuthentication();
      
      const report = await this.generateReport();
      
      console.log('\n🎉 Automation completed successfully!');
      return report;
      
    } catch (error) {
      console.error('\n❌ Automation failed:', error.message);
      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Run the automation if this script is executed directly
if (require.main === module) {
  const automation = new TempleFinderAutomation();
  automation.run().catch(console.error);
}

module.exports = TempleFinderAutomation;
