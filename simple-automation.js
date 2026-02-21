#!/usr/bin/env node

/**
 * Simple Automation Script for Temple Finder App
 * This script provides step-by-step instructions for manual testing
 * and can also run basic browser automation using the system's browser
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class SimpleTempleFinderAutomation {
  constructor() {
    this.results = [];
    this.baseUrl = 'http://localhost:3000';
  }

  async checkServerStatus() {
    console.log('🔍 Checking if Temple Finder server is running...');
    
    return new Promise((resolve) => {
      exec(`curl -s -o /dev/null -w "%{http_code}" ${this.baseUrl}`, (error, stdout) => {
        if (stdout.trim() === '200') {
          console.log('✅ Server is running at', this.baseUrl);
          resolve(true);
        } else {
          console.log('❌ Server is not running. Please start it first with:');
          console.log('   ./start-dev-server.sh');
          resolve(false);
        }
      });
    });
  }

  async openBrowser(url, description) {
    console.log(`\n🌐 Opening browser: ${description}`);
    console.log(`   URL: ${url}`);
    
    const platform = process.platform;
    let command;
    
    switch (platform) {
      case 'darwin': // macOS
        command = `open "${url}"`;
        break;
      case 'win32': // Windows
        command = `start "${url}"`;
        break;
      default: // Linux
        command = `xdg-open "${url}"`;
        break;
    }
    
    exec(command, (error) => {
      if (error) {
        console.log('   ⚠️  Could not open browser automatically. Please open manually:');
        console.log(`   ${url}`);
      } else {
        console.log('   ✅ Browser opened');
      }
    });
    
    // Wait for user interaction
    await this.waitForUserInput('Press Enter when you have completed testing this page...');
  }

  async waitForUserInput(message) {
    return new Promise((resolve) => {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question(`\n${message}\n`, () => {
        rl.close();
        resolve();
      });
    });
  }

  async runSearchTests() {
    console.log('\n🔍 === SEARCH FUNCTIONALITY TESTS ===');
    
    const searchTests = [
      {
        name: 'Basic Temple Search',
        url: `${this.baseUrl}/search?q=Meenakshi`,
        description: 'Search for "Meenakshi" temple'
      },
      {
        name: 'Deity Search',
        url: `${this.baseUrl}/search?q=Shiva`,
        description: 'Search for Shiva temples'
      },
      {
        name: 'Location Search',
        url: `${this.baseUrl}/search?q=Tamil+Nadu`,
        description: 'Search for temples in Tamil Nadu'
      },
      {
        name: 'AI Search',
        url: `${this.baseUrl}/search`,
        description: 'Test AI search functionality (try searching for "Famous temples in South India")'
      }
    ];

    for (const test of searchTests) {
      console.log(`\n📋 Test: ${test.name}`);
      await this.openBrowser(test.url, test.description);
      
      const result = await this.getTestResult(test.name);
      this.results.push({
        test: test.name,
        url: test.url,
        result: result,
        timestamp: new Date().toISOString()
      });
    }
  }

  async runTempleDetailsTests() {
    console.log('\n🏛️ === TEMPLE DETAILS TESTS ===');
    
    // Get a temple ID from the database or use a known one
    const templeTests = [
      {
        name: 'Temple Details Page',
        url: `${this.baseUrl}/temple/meenakshi-amman-temple`,
        description: 'View Meenakshi Amman Temple details'
      }
    ];

    for (const test of templeTests) {
      console.log(`\n📋 Test: ${test.name}`);
      await this.openBrowser(test.url, test.description);
      
      const result = await this.getTestResult(test.name);
      this.results.push({
        test: test.name,
        url: test.url,
        result: result,
        timestamp: new Date().toISOString()
      });
    }
  }

  async runCategoriesTests() {
    console.log('\n📂 === CATEGORIES TESTS ===');
    
    const categoryTests = [
      {
        name: 'Categories Page',
        url: `${this.baseUrl}/categories`,
        description: 'Browse temple categories'
      }
    ];

    for (const test of categoryTests) {
      console.log(`\n📋 Test: ${test.name}`);
      await this.openBrowser(test.url, test.description);
      
      const result = await this.getTestResult(test.name);
      this.results.push({
        test: test.name,
        url: test.url,
        result: result,
        timestamp: new Date().toISOString()
      });
    }
  }

  async runAuthenticationTests() {
    console.log('\n🔐 === AUTHENTICATION TESTS ===');
    
    const authTests = [
      {
        name: 'Authentication Page',
        url: `${this.baseUrl}/auth`,
        description: 'Test login and registration forms'
      }
    ];

    for (const test of authTests) {
      console.log(`\n📋 Test: ${test.name}`);
      await this.openBrowser(test.url, test.description);
      
      const result = await this.getTestResult(test.name);
      this.results.push({
        test: test.name,
        url: test.url,
        result: result,
        timestamp: new Date().toISOString()
      });
    }
  }

  async getTestResult(testName) {
    console.log('\n📊 Test Results:');
    console.log('   1. ✅ Pass - Everything worked correctly');
    console.log('   2. ⚠️  Partial - Some features worked, others had issues');
    console.log('   3. ❌ Fail - Major issues or page didn\'t load');
    console.log('   4. 🔄 Skip - Skip this test');
    
    return new Promise((resolve) => {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question('\nEnter your result (1-4): ', (answer) => {
        rl.close();
        
        const resultMap = {
          '1': 'Pass',
          '2': 'Partial',
          '3': 'Fail',
          '4': 'Skip'
        };
        
        resolve(resultMap[answer] || 'Unknown');
      });
    });
  }

  async generateReport() {
    console.log('\n📊 Generating Test Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      results: this.results,
      summary: {
        pass: this.results.filter(r => r.result === 'Pass').length,
        partial: this.results.filter(r => r.result === 'Partial').length,
        fail: this.results.filter(r => r.result === 'Fail').length,
        skip: this.results.filter(r => r.result === 'Skip').length
      }
    };
    
    // Save report to file
    const reportPath = path.join(__dirname, 'manual-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📋 Test Report Summary:`);
    console.log(`   Total Tests: ${report.totalTests}`);
    console.log(`   ✅ Pass: ${report.summary.pass}`);
    console.log(`   ⚠️  Partial: ${report.summary.partial}`);
    console.log(`   ❌ Fail: ${report.summary.fail}`);
    console.log(`   🔄 Skip: ${report.summary.skip}`);
    console.log(`   Report saved to: ${reportPath}`);
    
    return report;
  }

  async run() {
    console.log('🚀 Starting Simple Temple Finder Automation...');
    console.log('This script will guide you through testing the Temple Finder app manually.\n');
    
    const serverRunning = await this.checkServerStatus();
    if (!serverRunning) {
      return;
    }
    
    console.log('\n📋 Testing Checklist:');
    console.log('   • Search functionality');
    console.log('   • Temple details pages');
    console.log('   • Categories browsing');
    console.log('   • Authentication forms');
    console.log('   • Navigation flow');
    console.log('   • Favorites functionality');
    console.log('   • Reviews system');
    
    await this.waitForUserInput('Press Enter to start testing...');
    
    try {
      await this.runSearchTests();
      await this.runTempleDetailsTests();
      await this.runCategoriesTests();
      await this.runAuthenticationTests();
      
      const report = await this.generateReport();
      
      console.log('\n🎉 Testing completed!');
      console.log('\n💡 Tips for better automation:');
      console.log('   • Install Puppeteer: npm install puppeteer');
      console.log('   • Run full automation: node automated-testing.js');
      console.log('   • Check the test report for detailed results');
      
      return report;
      
    } catch (error) {
      console.error('\n❌ Testing failed:', error.message);
      throw error;
    }
  }
}

// Run the automation if this script is executed directly
if (require.main === module) {
  const automation = new SimpleTempleFinderAutomation();
  automation.run().catch(console.error);
}

module.exports = SimpleTempleFinderAutomation;
