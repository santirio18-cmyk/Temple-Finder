/**
 * SAFE Batch Enrichment - Processes 20 temples at a time with validation
 * Run multiple times to enrich all temples
 */

const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;
const BATCH_SIZE = 20;  // Process 20 temples at a time
const START_TEMPLE = parseInt(process.argv[2] || '1');  // Start from temple N

if (!API_KEY) {
  console.error('❌ Error: VITE_GOOGLE_PLACES_API_KEY not found');
  process.exit(1);
}

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

async function fetchDetails(templeName, city) {
  const query = encodeURIComponent(`${templeName} temple ${city}`);
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  
  const searchResult = await httpsGet(searchUrl);
  if (!searchResult?.results?.[0]) return null;
  
  await delay(100);
  
  const placeId = searchResult.results[0].place_id;
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,opening_hours&key=${API_KEY}`;
  
  const detailsResult = await httpsGet(detailsUrl);
  await delay(100);
  
  return detailsResult?.result || null;
}

function parseTemples(content) {
  const temples = [];
  const lines = content.split('\n');
  
  let currentTemple = { lines: [], startIndex: -1, endIndex: -1 };
  let inTemple = false;
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Count braces to track nesting
    for (const char of line) {
      if (char === '{') braceDepth++;
      if (char === '}') braceDepth--;
    }
    
    // Start of temple (depth went from 0 to 1)
    if (!inTemple && line.trim().startsWith('{') && braceDepth === 1) {
      inTemple = true;
      currentTemple = { 
        lines: [line], 
        startIndex: i,
        endIndex: -1,
        name: '',
        city: '',
        hasOpeningHours: false,
        hasPhoneNumber: false
      };
      continue;
    }
    
    if (inTemple) {
      currentTemple.lines.push(line);
      
      // Extract metadata
      if (line.includes('name:')) {
        const match = line.match(/name:\s*['"]([^'"]+)['"]/);
        if (match) currentTemple.name = match[1];
      }
      if (line.includes('city:')) {
        const match = line.match(/city:\s*['"]([^'"]+)['"]/);
        if (match) currentTemple.city = match[1];
      }
      if (line.includes('openingHours:')) currentTemple.hasOpeningHours = true;
      if (line.includes('phoneNumber:')) currentTemple.hasPhoneNumber = true;
      
      // End of temple (depth back to 0, line has closing brace)
      if (braceDepth === 0 && line.trim().match(/^\},?$/)) {
        currentTemple.endIndex = i;
        temples.push(currentTemple);
        inTemple = false;
      }
    }
  }
  
  return { temples, lines };
}

async function enrichBatch() {
  const dataPath = './temple-finder/src/data.ts';
  const originalContent = fs.readFileSync(dataPath, 'utf8');
  const { temples, lines } = parseTemples(originalContent);
  
  console.log(`\n📊 Found ${temples.length} temples in data.ts`);
  console.log(`🎯 Processing batch: temples ${START_TEMPLE} to ${Math.min(START_TEMPLE + BATCH_SIZE - 1, temples.length)}\n`);
  
  const endTemple = Math.min(START_TEMPLE + BATCH_SIZE, temples.length + 1);
  let enrichedCount = 0;
  let skippedCount = 0;
  
  for (let idx = START_TEMPLE; idx < endTemple; idx++) {
    const temple = temples[idx - 1];  // 0-indexed
    
    if (!temple) continue;
    
    // Skip if already has both fields
    if (temple.hasOpeningHours && temple.hasPhoneNumber) {
      console.log(`⏭️  [${idx}/${temples.length}] ${temple.name} (already enriched)`);
      skippedCount++;
      continue;
    }
    
    console.log(`🔍 [${idx}/${temples.length}] ${temple.name}`);
    
    const details = await fetchDetails(temple.name, temple.city);
    
    if (!details) {
      console.log(`  ℹ️  No data found`);
      continue;
    }
    
    // Build new fields to add
    const fieldsToAdd = [];
    
    if (!temple.hasOpeningHours && details.opening_hours?.weekday_text) {
      const hours = details.opening_hours.weekday_text[0].replace(/^[^:]+:\s*/, '');
      fieldsToAdd.push(`    openingHours: '${hours.replace(/'/g, "\\'")}'`);
    }
    
    if (!temple.hasPhoneNumber && details.formatted_phone_number) {
      fieldsToAdd.push(`    phoneNumber: '${details.formatted_phone_number}'`);
    }
    
    if (fieldsToAdd.length === 0) {
      console.log(`  ℹ️  No new fields to add`);
      continue;
    }
    
    // Insert fields before the closing brace
    const insertLineIdx = temple.endIndex;
    for (let i = fieldsToAdd.length - 1; i >= 0; i--) {
      lines.splice(insertLineIdx, 0, fieldsToAdd[i] + ',');
    }
    
    // Update indices for remaining temples
    for (let i = idx; i < temples.length; i++) {
      temples[i].startIndex += fieldsToAdd.length;
      temples[i].endIndex += fieldsToAdd.length;
    }
    
    console.log(`  ✅ Added ${fieldsToAdd.length} field(s)`);
    enrichedCount++;
  }
  
  console.log(`\n📊 Batch Summary:`);
  console.log(`   ✅ Enriched: ${enrichedCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   📝 Processed: ${endTemple - START_TEMPLE}/${temples.length}\n`);
  
  if (enrichedCount === 0) {
    console.log('ℹ️  No changes made - not writing file');
    return;
  }
  
  // Write new content
  const newContent = lines.join('\n');
  
  // Backup
  fs.writeFileSync('./temple-finder/src/data.ts.backup', originalContent);
  console.log('💾 Backup created');
  
  // Write
  fs.writeFileSync(dataPath, newContent);
  console.log('✅ Data written');
  
  // Validate build
  console.log('\n🔍 Validating build...');
  try {
    execSync('cd temple-finder && npm run build', { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 60000
    });
    console.log('✅ Build successful!\n');
    
    console.log('🎯 Next step:');
    console.log(`   Run: node enrich-batch.js ${endTemple}`);
    console.log(`   To process temples ${endTemple}-${Math.min(endTemple + BATCH_SIZE - 1, temples.length)}\n`);
  } catch (error) {
    console.error('❌ Build failed! Restoring backup...');
    fs.writeFileSync(dataPath, originalContent);
    console.error('✅ Backup restored');
    console.error('\n⚠️  No changes saved due to build error');
    process.exit(1);
  }
}

enrichBatch().catch(console.error);
