const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function fetchHackerNews() {
  try {
    const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topIds = JSON.parse(data).slice(0, 30);
    const stories = [];
    
    for (const id of topIds) {
      try {
        const storyData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const story = JSON.parse(storyData);
        if (story && story.title && (story.title.toLowerCase().includes('ai') || 
                                     story.title.toLowerCase().includes('gpt') ||
                                     story.title.toLowerCase().includes('llm') ||
                                     story.title.toLowerCase().includes('model'))) {
          stories.push({
            title: story.title,
            url: story.url || `https://news.ycombinator.com/item?id=${id}`,
            source: 'Hacker News',
            date: new Date(story.time * 1000).toISOString(),
            score: story.score
          });
        }
      } catch (e) {
        continue;
      }
    }
    return stories;
  } catch (e) {
    return [];
  }
}

async function fetchTechCrunch() {
  try {
    const data = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=20');
    const result = JSON.parse(data);
    const stories = [];
    
    if (result.results) {
      result.results.forEach(article => {
        const title = article.title.toLowerCase();
        if (title.includes('ai') || title.includes('gpt') || title.includes('llm') || 
            title.includes('model') || title.includes('robot') || title.includes('machine learning')) {
          stories.push({
            title: article.title,
            url: article.url,
            source: article.news_site || 'Tech News',
            date: article.published_at
          });
        }
      });
    }
    return stories;
  } catch (e) {
    return [];
  }
}

async function main() {
  const now = new Date().toLocaleString('zh-CN');
  
  console.log('');
  console.log('╔' + '═'.repeat(58) + '╗');
  console.log('║' + ' '.repeat(15) + '🤖 AI 资讯汇总 🤖' + ' '.repeat(19) + '║');
  console.log('║' + ' '.repeat(15) + now + ' '.repeat(29 - now.length) + '║');
  console.log('╚' + '═'.repeat(58) + '╝');
  console.log('');
  
  const [hackerNews, techCrunch] = await Promise.all([
    fetchHackerNews(),
    fetchTechCrunch()
  ]);
  
  const allNews = [...hackerNews, ...techCrunch];
  
  if (allNews.length > 0) {
    allNews.slice(0, 10).forEach((item, i) => {
      const date = new Date(item.date).toLocaleDateString('zh-CN');
      console.log(`${i+1}. ${item.title}`);
      console.log(`   来源: ${item.source} | ${date}`);
      console.log(`   链接: ${item.url}`);
      if (item.score) {
        console.log(`   热度: ${item.score} points`);
      }
      console.log('');
    });
  } else {
    console.log('⚠️  暂时没有获取到最新的AI资讯，请稍后再试');
    console.log('');
  }
  
  console.log('═'.repeat(60));
  console.log('💡 提示：此脚本每3小时自动运行一次');
  console.log('═'.repeat(60));
  console.log('');
}

main().catch(console.error);
