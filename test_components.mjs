// Test script using ES modules
import fs from 'fs';
import path from 'path';

console.log('Testing React application components...');

try {
  // Check if all React components exist
  const pages = [
    'HomePage.tsx', 'LoginPage.tsx', 'RegisterPage.tsx',
    'UniversitySearchPage.tsx', 'UniversityDetailPage.tsx',
    'MajorDetailPage.tsx', 'ApplicationPage.tsx',
    'QSRankingPage.tsx', 'CustomerServicePage.tsx', 'NotFoundPage.tsx'
  ];
  
  let allExist = true;
  pages.forEach(page => {
    const filePath = path.join('src', 'pages', page);
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Missing: ${filePath}`);
      allExist = false;
    } else {
      console.log(`✅ Found: ${filePath}`);
    }
  });
  
  console.log('\nChecking App.tsx...');
  if (fs.existsSync('src/App.tsx')) {
    console.log('✅ App.tsx exists');
  } else {
    console.log('❌ App.tsx missing');
    allExist = false;
  }
  
  console.log('\nSummary:', allExist ? 'All required files exist!' : 'Some files are missing.');
  
} catch (error) {
  console.error('Error during test:', error.message);
}