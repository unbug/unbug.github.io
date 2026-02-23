const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchGoldPrice() {
  try {
    // Use a public API for gold prices
    const data = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=usd,eur,cny');
    const prices = JSON.parse(data);
    return prices;
  } catch (e) {
    return null;
  }
}

async function fetchAINews() {
  try {
    // Fetch from multiple sources
    const sources = [
      { url: 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10', name: 'Space & Tech' },
    ];
    
    const allNews = [];
    for (const source of sources) {
      try {
        const data = await fetch(source.url);
        const result = JSON.parse(data);
        if (result.results) {
          result.results.forEach(article => {
            allNews.push({
              title: article.title,
              url: article.url,
              source: article.news_site || source.name,
              date: article.published_at
            });
          });
        }
      } catch (e) {
        // Skip this source
      }
    }
    return allNews;
  } catch (e) {
    return [];
  }
}

async function main() {
  console.log('=' .repeat(60));
  console.log('📊 市场 & 科技资讯摘要');
  console.log('=' .repeat(60));
  console.log();
  
  // Gold Price
  console.log('🥇 黄金价格');
  console.log('-'.repeat(40));
  const gold = await fetchGoldPrice();
  if (gold && gold.gold) {
    console.log(`USD: $${gold.gold.usd}`);
    console.log(`EUR: €${gold.gold.eur}`);
    console.log(`CNY: ¥${gold.gold.cny}`);
  } else {
    console.log('(暂时无法获取黄金价格数据)');
  }
  console.log();
  
  // AI & Tech News
  console.log('🤖 AI & 科技新闻');
  console.log('-'.repeat(40));
  const news = await fetchAINews();
  if (news.length > 0) {
    news.slice(0, 8).forEach((item, i) => {
      const date = new Date(item.date).toLocaleDateString('zh-CN');
      console.log(`${i+1}. ${item.title}`);
      console.log(`   来源: ${item.source} | ${date}`);
      console.log(`   链接: ${item.url}`);
      console.log();
    });
  } else {
    console.log('(暂时无法获取新闻数据)');
  }
  
  console.log('=' .repeat(60));
  console.log('生成时间:', new Date().toLocaleString('zh-CN'));
  console.log('=' .repeat(60));
}

main();
