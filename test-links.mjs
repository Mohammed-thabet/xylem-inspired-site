// Using built-in fetch (Node.js 18+)

const BASE_URL = 'http://localhost:3000';
const LANGUAGES = ['en', 'ar'];

const testCases = [
  // Home pages
  { path: '/:lang', name: 'Home page' },
  
  // Section pages
  { path: '/:lang/sections/intelligence', name: 'Intelligence section' },
  { path: '/:lang/sections/science-health', name: 'Science & Health section' },
  { path: '/:lang/sections/sustainability', name: 'Sustainability section' },
  { path: '/:lang/sections/treatment', name: 'Treatment section' },
  { path: '/:lang/sections/innovation', name: 'Innovation section' },
  { path: '/:lang/sections/education', name: 'Education section' },
  { path: '/:lang/sections/policy', name: 'Policy section' },
  { path: '/:lang/sections/community', name: 'Community section' },
  { path: '/:lang/sections/technology', name: 'Technology section' },
  { path: '/:lang/sections/resources', name: 'Resources section' },
  { path: '/:lang/sections/partnerships', name: 'Partnerships section' },
  { path: '/:lang/sections/marketplace', name: 'Marketplace section' },
  
  // Product pages
  { path: '/:lang/products', name: 'Products page' },
  { path: '/:lang/product/aquapro-pump-1000', name: 'Product detail' },
  
  // Blog pages
  { path: '/:lang/blog', name: 'Blog page' },
  { path: '/:lang/blog/water-quality-standards', name: 'Blog post detail' },
  
  // Article pages
  { path: '/:lang/article/water-cycle-basics', name: 'Article detail' },
  
  // Market pages
  { path: '/:lang/market/agriculture', name: 'Market detail' },
  
  // Other pages
  { path: '/:lang/search', name: 'Search page' },
  { path: '/:lang/contact', name: 'Contact page' },
];

async function testLink(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      redirect: 'follow',
      timeout: 5000,
    });
    
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

async function runTests() {
  console.log('\n🔗 Testing all navigation links...\n');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const results = [];
  
  for (const lang of LANGUAGES) {
    console.log(`\n📍 Testing ${lang.toUpperCase()} routes:\n`);
    
    for (const testCase of testCases) {
      const url = `${BASE_URL}${testCase.path.replace(':lang', lang)}`;
      totalTests++;
      
      const result = await testLink(url);
      
      if (result.ok) {
        passedTests++;
        console.log(`✅ ${testCase.name} (${lang})`);
        console.log(`   → ${result.status} ${result.statusText}`);
      } else {
        failedTests++;
        console.log(`❌ ${testCase.name} (${lang})`);
        console.log(`   → ${result.status || 'ERROR'} ${result.error || result.statusText}`);
      }
      
      results.push({
        language: lang,
        name: testCase.name,
        path: testCase.path,
        status: result.status,
        ok: result.ok,
      });
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:\n');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%\n`);
  
  if (failedTests > 0) {
    console.log('❌ Failed tests:');
    results.filter(r => !r.ok).forEach(r => {
      console.log(`  - ${r.name} (${r.language}): ${r.status || 'ERROR'}`);
    });
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  process.exit(failedTests > 0 ? 1 : 0);
}

// Wait a moment for server to be ready
setTimeout(runTests, 1000);
