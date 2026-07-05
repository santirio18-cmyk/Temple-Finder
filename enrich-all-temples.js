/**
 * Script to enrich all 400 temples with Google Places API details
 * Fetches: opening hours, phone number, and other available data
 */

const https = require('https');
const fs = require('fs');

const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: VITE_GOOGLE_PLACES_API_KEY not found in environment variables');
  process.exit(1);
}

// Read current temple data
const dataPath = './temple-finder/src/data.ts';
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract temples array
const templesMatch = dataContent.match(/export const temples: Temple\[\] = \[([\s\S]*?)\n\]/);
if (!templesMatch) {
  console.error('❌ Could not find temples array in data.ts');
  process.exit(1);
}

const templesStr = templesMatch[1];
const templeObjects = [];

// Parse temple objects (simple regex-based parsing)
const templeRegex = /\{[\s\S]*?\n  \},?/g;
const matches = templesStr.match(templeRegex);

if (!matches) {
  console.error('❌ Could not parse temple objects');
  process.exit(1);
}

console.log(`📊 Found ${matches.length} temples to process\n`);

// Parse each temple object
matches.forEach((match, idx) => {
  const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
  const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/);
  
  if (idMatch && nameMatch) {
    templeObjects.push({
      index: idx,
      id: idMatch[1],
      name: nameMatch[1],
      rawText: match
    });
  }
});

console.log(`✅ Parsed ${templeObjects.length} temples\n`);

// Function to fetch place details from Google Places API
function fetchPlaceDetails(placeId) {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,opening_hours,business_status&key=${API_KEY}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'OK' && json.result) {
            resolve(json.result);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (err) => {
      resolve(null);
    });
  });
}

// Function to add delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main enrichment function
async function enrichTemples() {
  const enrichedTemples = [];
  let successCount = 0;
  let skipCount = 0;
  
  for (let i = 0; i < templeObjects.length; i++) {
    const temple = templeObjects[i];
    
    // Only process temples with Google Place IDs (not numeric IDs)
    if (/^\d+$/.test(temple.id)) {
      console.log(`⏭️  [${i+1}/${templeObjects.length}] Skipping ${temple.name} (legacy ID: ${temple.id})`);
      enrichedTemples.push(temple.rawText);
      skipCount++;
      continue;
    }
    
    console.log(`🔍 [${i+1}/${templeObjects.length}] Fetching details for: ${temple.name}`);
    
    const details = await fetchPlaceDetails(temple.id);
    
    if (details) {
      let enrichedText = temple.rawText;
      
      // Add opening hours if available
      if (details.opening_hours && details.opening_hours.weekday_text) {
        const hoursText = details.opening_hours.weekday_text.join(', ');
        if (!enrichedText.includes('openingHours:')) {
          const insertPos = enrichedText.lastIndexOf('}');
          enrichedText = enrichedText.slice(0, insertPos) + 
                        `    openingHours: '${hoursText.replace(/'/g, "\\'")}',\n  }`;
          console.log(`  ✅ Added opening hours`);
        }
      }
      
      // Add phone number if available
      if (details.formatted_phone_number) {
        if (!enrichedText.includes('phoneNumber:')) {
          const insertPos = enrichedText.lastIndexOf('}');
          enrichedText = enrichedText.slice(0, insertPos) + 
                        `    phoneNumber: '${details.formatted_phone_number}',\n  }`;
          console.log(`  ✅ Added phone: ${details.formatted_phone_number}`);
        }
      }
      
      enrichedTemples.push(enrichedText);
      successCount++;
    } else {
      console.log(`  ⚠️  No additional details found`);
      enrichedTemples.push(temple.rawText);
    }
    
    // Rate limiting: wait 100ms between requests
    await delay(100);
  }
  
  console.log(`\n📊 Enrichment Summary:`);
  console.log(`   ✅ Enriched: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   📝 Total: ${templeObjects.length}\n`);
  
  return enrichedTemples;
}

// Run enrichment and save
enrichTemples().then((enrichedTemples) => {
  // Rebuild data.ts with enriched temples
  const header = dataContent.substring(0, dataContent.indexOf('export const temples: Temple[] = [') + 35);
  const footer = dataContent.substring(dataContent.indexOf('\n]', dataContent.indexOf('export const temples: Temple[] = [')));
  
  const newContent = header + '\n' + enrichedTemples.join('\n') + footer;
  
  // Create backup
  const backupPath = './temple-finder/src/data.ts.backup';
  fs.writeFileSync(backupPath, dataContent);
  console.log(`💾 Backup created: ${backupPath}`);
  
  // Write enriched data
  fs.writeFileSync(dataPath, newContent);
  console.log(`✅ Enriched data written to ${dataPath}`);
  console.log(`\n🎉 All done! Check your temple data for new opening hours and phone numbers.`);
}).catch((error) => {
  console.error('❌ Error during enrichment:', error);
  process.exit(1);
});
