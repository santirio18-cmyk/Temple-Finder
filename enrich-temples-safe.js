/**
 * Safe enrichment script - properly handles commas and formatting
 */

const https = require('https');
const fs = require('fs');

const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

function httpsGet(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findPlaceAndFetchDetails(templeName, city) {
  const query = encodeURIComponent(`${templeName} temple ${city}`);
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  
  const searchResult = await httpsGet(searchUrl);
  if (!searchResult || !searchResult.results || searchResult.results.length === 0) {
    return null;
  }
  
  await delay(100);
  
  const placeId = searchResult.results[0].place_id;
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,opening_hours&key=${API_KEY}`;
  
  const detailsResult = await httpsGet(detailsUrl);
  if (!detailsResult || !detailsResult.result) {
    return null;
  }
  
  return detailsResult.result;
}

async function enrichAllTemples() {
  const dataPath = './temple-finder/src/data.ts';
  const dataContent = fs.readFileSync(dataPath, 'utf8');
  
  // Split file into lines for easier manipulation
  const lines = dataContent.split('\n');
  
  let templeCount = 0;
  let enrichedCount = 0;
  let currentTempleName = '';
  let currentCity = '';
  let insideTemple = false;
  let hasOpeningHours = false;
  let hasPhoneNumber = false;
  let templeStartLine = -1;
  
  // Process first 100 temples only (for safety - change to process all)
  const maxTemples = 100;
  
  for (let i = 0; i < lines.length && templeCount < maxTemples; i++) {
    const line = lines[i];
    
    // Detect temple object start
    if (line.trim() === '{' || line.match(/^\s*\{\s*$/)) {
      insideTemple = true;
      templeStartLine = i;
      currentTempleName = '';
      currentCity = '';
      hasOpeningHours = false;
      hasPhoneNumber = false;
      continue;
    }
    
    if (insideTemple) {
      // Extract temple name
      const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
      if (nameMatch) {
        currentTempleName = nameMatch[1];
      }
      
      // Extract city
      const cityMatch = line.match(/city:\s*['"]([^'"]+)['"]/);
      if (cityMatch) {
        currentCity = cityMatch[1];
      }
      
      // Check existing fields
      if (line.includes('openingHours:')) {
        hasOpeningHours = true;
      }
      if (line.includes('phoneNumber:')) {
        hasPhoneNumber = true;
      }
      
      // Detect temple object end
      if (line.match(/^\s*\},?\s*$/)) {
        insideTemple = false;
        templeCount++;
        
        // Skip if already enriched
        if (hasOpeningHours && hasPhoneNumber) {
          console.log(`⏭️  [${templeCount}] ${currentTempleName} (already enriched)`);
          continue;
        }
        
        if (!currentTempleName || !currentCity) {
          console.log(`⚠️  [${templeCount}] Skipping (missing name or city)`);
          continue;
        }
        
        console.log(`🔍 [${templeCount}] ${currentTempleName}`);
        
        // Fetch details
        const details = await findPlaceAndFetchDetails(currentTempleName, currentCity);
        await delay(100);
        
        if (!details) {
          console.log(`  ℹ️  No data found`);
          continue;
        }
        
        const fieldsToAdd = [];
        
        // Add opening hours
        if (!hasOpeningHours && details.opening_hours && details.opening_hours.weekday_text) {
          const hours = details.opening_hours.weekday_text[0].replace(/^[^:]+:\s*/, '');
          fieldsToAdd.push(`    openingHours: '${hours.replace(/'/g, "\\'")}'`);
        }
        
        // Add phone
        if (!hasPhoneNumber && details.formatted_phone_number) {
          fieldsToAdd.push(`    phoneNumber: '${details.formatted_phone_number}'`);
        }
        
        if (fieldsToAdd.length > 0) {
          // Insert fields before the closing brace
          const insertLine = i;  // Current line is "}," or "}"
          const hasComma = lines[insertLine].includes('},');
          
          // Insert new fields
          for (let j = fieldsToAdd.length - 1; j >= 0; j--) {
            lines.splice(insertLine, 0, fieldsToAdd[j] + ',');
          }
          
          // Update current line index
          i += fieldsToAdd.length;
          
          console.log(`  ✅ Added ${fieldsToAdd.length} field(s)`);
          enrichedCount++;
        }
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Enriched: ${enrichedCount}`);
  console.log(`   📝 Processed: ${templeCount} temples\n`);
  
  // Backup
  fs.writeFileSync('./temple-finder/src/data.ts.backup', dataContent);
  console.log(`💾 Backup created`);
  
  // Write
  fs.writeFileSync(dataPath, lines.join('\n'));
  console.log(`✅ Data written`);
}

enrichAllTemples().catch(console.error);
