#!/usr/bin/env node

/**
 * Supabase Setup Script for Temple Finder
 * This script helps set up Supabase integration
 */

const fs = require('fs');
const path = require('path');

console.log('🏛️  Temple Finder - Supabase Setup');
console.log('=====================================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Creating .env.local from env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local file');
    console.log('⚠️  Please update .env.local with your Supabase credentials\n');
  } else {
    console.log('❌ env.example file not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env.local file already exists');
}

// Check if Supabase credentials are configured
const envContent = fs.readFileSync(envPath, 'utf8');
const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL=') && !envContent.includes('your-project-id');
const hasSupabaseKey = envContent.includes('VITE_SUPABASE_ANON_KEY=') && !envContent.includes('your-anon-key');

if (!hasSupabaseUrl || !hasSupabaseKey) {
  console.log('⚠️  Supabase credentials not configured in .env.local');
  console.log('📝 Please update the following in .env.local:');
  console.log('   - VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   - VITE_SUPABASE_ANON_KEY=your-anon-key-here\n');
} else {
  console.log('✅ Supabase credentials are configured\n');
}

// Display next steps
console.log('📋 Next Steps:');
console.log('==============');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Get your Project URL and anon key from Settings → API');
console.log('3. Update .env.local with your credentials');
console.log('4. Run the database schema in Supabase SQL Editor:');
console.log('   - Copy contents of database/schema.sql');
console.log('   - Run in Supabase SQL Editor');
console.log('5. Seed initial data:');
console.log('   - Copy contents of database/seed_data.sql');
console.log('   - Run in Supabase SQL Editor');
console.log('6. Start your development server: npm run dev');
console.log('\n📖 For detailed instructions, see SUPABASE_SETUP.md');
console.log('\n🎉 Happy coding!');
