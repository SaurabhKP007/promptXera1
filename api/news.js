// /api/news.js
export default async function handler(req, res) {
  const RSS_URL = encodeURIComponent('https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml');
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // ✅ Limit and sanitize the response
    const filtered = data.items?.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
    })) || [];

    res.status(200).json({ success: true, items: filtered });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).json({
      success: false,
      items: [
        { title: "AI Model Context Expands", link: "#", pubDate: new Date().toISOString(), description: "Latest models push new limits." },
        { title: "New RAG System Released", link: "#", pubDate: new Date().toISOString(), description: "Improved reasoning and retrieval." }
      ]
    });
  }
}
