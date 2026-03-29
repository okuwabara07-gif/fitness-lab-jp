const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_ID = process.env.AMAZON_TRACKING_ID || '';
const RAKUTEN_ID = process.env.RAKUTEN_AFFILIATE_ID || '';

const KEYWORDS = [
  {kw:"\u7b4b\u30c8\u30ec \u521d\u5fc3\u8005 \u30e1\u30cb\u30e5\u30fc \u81ea\u5b85",genre:"training"},
  {kw:"\u30d7\u30ed\u30c6\u30a4\u30f3 \u304a\u3059\u3059\u3081 \u52b9\u679c",genre:"supplement"},
  {kw:"\u7b4b\u8089\u75db \u65e9\u304f\u6cbb\u3059 \u65b9\u6cd5",genre:"recovery"},
  {kw:"\u30c0\u30f3\u30d9\u30eb \u9078\u3073\u65b9 \u521d\u5fc3\u8005",genre:"equipment"},
  {kw:"\u8179\u7b4b \u5272\u308b \u65b9\u6cd5 \u671f\u9593",genre:"training"},
  {kw:"\u30b9\u30af\u30ef\u30c3\u30c8 \u6b63\u3057\u3044\u30d5\u30a9\u30fc\u30e0",genre:"training"},
  {kw:"\u30d0\u30eb\u30af\u30a2\u30c3\u30d7 \u98df\u4e8b \u30e1\u30cb\u30e5\u30fc",genre:"diet"},
  {kw:"\u7b4b\u30c8\u30ec \u6709\u9178\u7d20\u904b\u52d5 \u9806\u756a",genre:"training"},
  {kw:"\u30af\u30ec\u30a2\u30c1\u30f3 \u52b9\u679c \u98f2\u307f\u65b9",genre:"supplement"},
  {kw:"\u30db\u30fc\u30e0\u30b8\u30e0 \u4f5c\u308a\u65b9 \u8cbb\u7528",genre:"equipment"}
];

const SYS = `あなたは筋トレ・フィットネス専門ライターです。読者目線で分かりやすく、SEOに強い記事を書きます。見出しはH2/H3を使ってください。文字数2000字以上。Markdown形式で出力。記事内でおすすめ商品を紹介する箇所には[AMAZON:商品名]と[RAKUTEN:商品名]を合計5箇所挿入してください。`;

function insertLinks(text) {
  text = text.replace(/\[AMAZON:([^\]]+)\]/g, (_, p) => {
    return `[🛒 ${p}をAmazonでチェック](https://www.amazon.co.jp/s?k=${encodeURIComponent(p)}&tag=${AMAZON_ID})`;
  });
  text = text.replace(/\[RAKUTEN:([^\]]+)\]/g, (_, p) => {
    return `[🛍 ${p}を楽天でチェック](https://search.rakuten.co.jp/search/mall/${encodeURIComponent(p)}/?rafcid=${RAKUTEN_ID})`;
  });
  return text;
}

function toSlug(kw) {
  return kw.replace(/[\s\u3000]+/g, '-').replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF-]/g, '') + '-' + Date.now();
}

async function generateArticle(kw, genre) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: SYS,
      messages: [{ role: 'user', content: `ジャンル：${genre}\nキーワード：「${kw}」\n\nSEO記事をMarkdownで書いてください。` }],
    }),
  });
  const data = await res.json();
  return data.content?.map(c => c.text || '').join('') || '';
}

async function main() {
  const contentDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

  const targets = KEYWORDS.sort(() => Math.random() - 0.5).slice(0, 5);

  for (const { kw, genre } of targets) {
    console.log(`生成中: ${kw}`);
    try {
      let text = await generateArticle(kw, genre);
      text = insertLinks(text);
      const slug = toSlug(kw);
      const content = `---\ntitle: "${kw}"\ndate: "${new Date().toISOString().split('T')[0]}"\ngenre: "${genre}"\ntags: [${genre}]\n---\n\n${text}\n`;
      fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), content);
      console.log(`完了: ${slug}.mdx`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`エラー: ${kw}`, e.message);
    }
  }
  console.log('全記事生成完了！');
}

main();
