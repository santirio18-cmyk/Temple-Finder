/**
 * Enhanced script to enrich all temples
 * Uses Text Search to find Place ID by temple name, then fetches details
 */

const https = require('https');
const fs = require('fs');

const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: VITE_GOOGLE_PLACES_API_KEY not found');
  process.exit(1);
}

// Read and parse temple data
const dataPath = './temple-finder/src/data.ts';
const dataContent = fs.readFileSync(dataPath, 'utf8');

const templesMatch = dataContent.match(/export const temples: Temple\[\] = \[([\s\S]*?)\n\]/);
if (!templesMatch) {
  console.error('❌ Could not find temples array');
  process.exit(1);
}

// Simple regex-based parsing
const templeObjects = [];
const templeRegex = /\{[\s\S]*?\n  \},?/g;
const matches = templesMatch[1].match(templeRegex);

matches.forEach((match) => {
  const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
  const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/);
  const cityMatch = match.match(/city:\s*['"]([^'"]+)['"]/);
  
  if (idMatch && nameMatch && cityMatch) {
    templeObjects.push({
      id: idMatch[1],
      name: nameMatch[1],
      city: cityMatch[1],
      rawText: match,
      hasOpeningHours: match.includes('openingHours:'),
      hasPhoneNumber: match.includes('phoneNumber:')
    });
  }
});

console.log(`📊 Found ${templeObjects.length} temples\n`);

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findPlaceId(templeName, city) {
  const query = encodeURIComponent(`${templeName} temple ${city}`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  
  const result = await httpsGet(url);
  if (result && result.results && result.results.length > 0) {
    return result.results[0].place_id;
  }
  return null;
}

async function fetchPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,opening_hours&key=${API_KEY}`;
  
  const result = await httpsGet(url);
  if (result && result.status === 'OK' && result.result) {
    return result.result;
  }
  return null;
}

async function enrichTemples() {
  const enrichedTemples = [];
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;
  
  // Process ALL temples
  const templesToProcess = templeObjects;
  
  for (let i = 0; i < templesToProcess.length; i++) {
    const temple = templesToProcess[i];
    
    // Skip if already has both fields
    if (temple.hasOpeningHours && temple.hasPhoneNumber) {
      console.log(`⏭️  [${i+1}/${templesToProcess.length}] Skipping ${temple.name} (already enriched)`);
      enrichedTemples.push(temple.rawText);
      skipCount++;
      continue;
    }
    
    console.log(`🔍 [${i+1}/${templesToProcess.length}] ${temple.name}`);
    
    // Find Place ID
    const placeId = await findPlaceId(temple.name, temple.city);
    await delay(100); // Rate limiting
    
    if (!placeId) {
      console.log(`  ⚠️  Could not find Place ID`);
      enrichedTemples.push(temple.rawText);
      failCount++;
      continue;
    }
    
    // Fetch details
    const details = await fetchPlaceDetails(placeId);
    await delay(100); // Rate limiting
    
    if (!details) {
      console.log(`  ⚠️  Could not fetch details`);
      enrichedTemples.push(temple.rawText);
      failCount++;
      continue;
    }
    
    let enrichedText = temple.rawText;
    let addedFields = [];
    
    // Add opening hours
    if (!temple.hasOpeningHours && details.opening_hours && details.opening_hours.weekday_text) {
      // Simplified hours format
      const weekdayHours = details.opening_hours.weekday_text;
      const hasVariation = new Set(weekdayHours).size > 1;
      
      let hoursText;
      if (hasVariation) {
        hoursText = weekdayHours[0].replace(/^[^:]+:\s*/, ''); // Use first day as sample
      } else {
        hoursText = weekdayHours[0].replace(/^[^:]+:\s*/, '');
      }
      
      const insertPos = enrichedText.lastIndexOf('}');
      enrichedText = enrichedText.slice(0, insertPos) + 
                    `    openingHours: '${hoursText.replace(/'/g, "\\'")}',\n  }`;
      addedFields.push('⏰hours');
    }
    
    // Add phone
    if (!temple.hasPhoneNumber && details.formatted_phone_number) {
      const insertPos = enrichedText.lastIndexOf('}');
      enrichedText = enrichedText.slice(0, insertPos) + 
                    `    phoneNumber: '${details.formatted_phone_number}',\n  }`;
      addedFields.push('📞phone');
    }
    
    if (addedFields.length > 0) {
      console.log(`  ✅ Added: ${addedFields.join(', ')}`);
      successCount++;
    } else {
      console.log(`  ℹ️  No new data available`);
    }
    
    enrichedTemples.push(enrichedText);
  }
  
  // Add remaining temples unchanged
  for (let i = templesToProcess.length; i < templeObjects.length; i++) {
    enrichedTemples.push(templeObjects[i].rawText);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Enriched: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ⚠️  Failed: ${failCount}`);
  console.log(`   📝 Processed: ${templesToProcess.length}/${templeObjects.length}\n`);
  
  return enrichedTemples;
}

// Run enrichment
enrichTemples().then((enrichedTemples) => {
  const header = dataContent.substring(0, dataContent.indexOf('export const temples: Temple[] = [') + 35);
  const footer = dataContent.substring(dataContent.indexOf('\n]', dataContent.indexOf('export const temples: Temple[] = [')));
  
  const newContent = header + '\n' + enrichedTemples.join('\n') + footer;
  
  // Backup
  fs.writeFileSync('./temple-finder/src/data.ts.backup', dataContent);
  console.log(`💾 Backup created`);
  
  // Write
  fs.writeFileSync(dataPath, newContent);
  console.log(`✅ Data written to ${dataPath}`);
  console.log(`\n🎉 Done! First 50 temples processed. Remove slice limit to process all 400.`);
}).catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
