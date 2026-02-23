const https = require('https');
const http = require('http');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  try {
    // Try to get some AI news from a simple source
    console.log('Fetching AI news...');
    // Using a public JSON API for news
    const news = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=5');
    console.log('\n=== AI/Space News ===');
    const articles = JSON.parse(news);
    articles.results.forEach((article, i) => {
      console.log(`${i+1}. ${article.title}`);
      console.log(`   ${article.url}`);
      console.log(`   ${article.news_site} - ${new Date(article.published_at).toLocaleDateString()}`);
      console.log();
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();
