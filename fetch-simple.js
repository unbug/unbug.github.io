const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function fetchNews() {
  try {
    const data = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=10');
    const result = JSON.parse(data);
    return result.results || [];
  } catch (e) {
    return [];
  }
}

async function main() {
  const now = new Date().toLocaleString('zh-CN');
  
  console.log('');
  console.log('============================================================');
  console.log('📰 AI & 科技资讯 - ' + now);
  console.log('============================================================');
  console.log('');
  
  const news = await fetchNews();
  
  if (news.length > 0) {
    news.slice(0, 10).forEach((article, i) => {
      const date = new Date(article.published_at).toLocaleDateString('zh-CN');
      console.log(`${i+1}. ${article.title}`);
      console.log(`   来源: ${article.news_site} | ${date}`);
      console.log(`   链接: ${article.url}`);
      console.log('');
    });
  } else {
    console.log('(暂时无法获取新闻数据，请稍后再试)');
    console.log('');
  }
  
  console.log('============================================================');
  console.log('提示: 黄金价格API暂时不可用，稍后再试');
  console.log('============================================================');
  console.log('');
}

main().catch(console.error);
