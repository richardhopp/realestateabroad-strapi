const strapi = require('@strapi/strapi');

const realEstatePosts = [
  {
    title: "Where to Buy Real Estate Abroad: Top Countries in 2025",
    slug: "where-to-buy-real-estate-abroad-2025",
    content: `<h2>Top International Real Estate Markets for 2025</h2>
    <p>The global real estate market offers unprecedented opportunities for international investors. Whether you're seeking rental income, capital appreciation, or a second home, choosing the right market is crucial.</p>
    
    <h3>1. Dubai, United Arab Emirates</h3>
    <p>Dubai continues to attract international buyers with its tax-free income, world-class infrastructure, and golden visa programs. Property prices remain competitive compared to other global cities, with strong rental yields of 5-8% annually.</p>
    
    <h3>2. Portugal</h3>
    <p>Portugal's Golden Visa program and Non-Habitual Resident (NHR) tax regime make it extremely attractive for European property investment. Cities like Lisbon and Porto offer historic charm with modern amenities.</p>
    
    <h3>3. Spain</h3>
    <p>The Spanish property market has rebounded strongly, particularly in coastal areas and major cities. Barcelona, Madrid, and the Costa del Sol region offer excellent investment opportunities with strong tourism-driven rental markets.</p>`,
    excerpt: "Discover the best countries for international property investment in 2025, from Dubai's tax-free havens to Portugal's golden visa opportunities.",
    author_name: "Sarah Mitchell",
    category: "Market Analysis",
    reading_time: 8,
    meta_title: "Best Countries to Buy Real Estate Abroad in 2025",
    meta_description: "Discover the top international property investment destinations for 2025, including Dubai, Portugal, and Spain with expert market analysis.",
    keywords: ["real estate abroad", "international property", "Dubai real estate", "Portugal golden visa", "property investment 2025"],
    featured: true,
    type: "post",
    site_key: "realestateabroad",
    publishedAt: new Date("2025-01-15T10:00:00Z")
  },
  {
    title: "International Property Investment: Legal and Tax Considerations",
    slug: "international-property-legal-tax-guide",
    content: `<h2>Navigating International Property Laws and Taxes</h2>
    <p>Investing in international real estate requires careful consideration of legal and tax implications. Each country has unique regulations that can significantly impact your investment returns.</p>
    
    <h3>Understanding Ownership Structures</h3>
    <ul>
      <li><strong>Freehold:</strong> Full ownership rights, common in UK, USA, and Dubai freehold zones</li>
      <li><strong>Leasehold:</strong> Long-term lease rights, typical in Thailand and parts of UK</li>
      <li><strong>Company Ownership:</strong> Using a local company structure, required in some Asian markets</li>
    </ul>
    
    <h3>Tax Considerations</h3>
    <p>International property owners must navigate multiple tax obligations:</p>
    <ul>
      <li>Income tax on rental income (both local and home country)</li>
      <li>Capital gains tax on property sales</li>
      <li>Annual property taxes and wealth taxes</li>
      <li>Inheritance and estate taxes</li>
    </ul>`,
    excerpt: "Essential legal and tax information for buying property abroad, including ownership structures, tax treaties, and estate planning.",
    author_name: "Michael Chen",
    category: "Legal & Tax",
    reading_time: 10,
    meta_title: "International Property Investment: Legal & Tax Guide",
    meta_description: "Complete guide to legal and tax considerations for international property investment, including ownership structures and tax planning.",
    keywords: ["international property law", "property tax abroad", "overseas real estate tax", "foreign property investment"],
    featured: false,
    type: "post",
    site_key: "realestateabroad",
    publishedAt: new Date("2025-01-10T10:00:00Z")
  },
  {
    title: "Dubai Real Estate Market Analysis 2025",
    slug: "dubai-real-estate-market-2025",
    content: `<h2>Dubai Property Market Overview 2025</h2>
    <p>Dubai's real estate market continues to demonstrate remarkable resilience and growth, making it one of the most attractive destinations for international property investors.</p>
    
    <h3>Market Performance</h3>
    <p>Key market indicators for 2025:</p>
    <ul>
      <li>Average price per sq ft: AED 1,250 (USD 340)</li>
      <li>Annual price appreciation: 8-12%</li>
      <li>Rental yields: 5-8% (among highest globally)</li>
      <li>Transaction volume: Up 25% year-on-year</li>
    </ul>
    
    <h3>Investment Hotspots</h3>
    <p><strong>1. Dubai Marina & JBR:</strong> Premium waterfront living with strong rental demand</p>
    <p><strong>2. Downtown Dubai:</strong> Iconic location near Burj Khalifa with luxury amenities</p>
    <p><strong>3. Business Bay:</strong> Growing business district with competitive prices</p>`,
    excerpt: "In-depth analysis of Dubai's property market, including investment hotspots, rental yields, and future growth prospects.",
    author_name: "James Wilson",
    category: "Market Analysis",
    reading_time: 9,
    meta_title: "Dubai Real Estate Market Analysis & Investment Guide 2025",
    meta_description: "Complete analysis of Dubai's property market in 2025, including investment hotspots, rental yields, and growth prospects for international investors.",
    keywords: ["Dubai real estate", "Dubai property investment", "Dubai market analysis", "UAE property market", "Dubai rental yields"],
    featured: false,
    type: "post",
    site_key: "realestateabroad",
    publishedAt: new Date("2025-01-05T10:00:00Z")
  }
];

async function seedBlogData() {
  console.log('🌱 Starting blog data seeding...');
  
  try {
    // Start Strapi instance
    const app = await strapi.start();
    
    console.log('📊 Clearing existing blog posts...');
    await strapi.db.query('api::blog-post.blog-post').deleteMany({});
    
    console.log('📝 Creating blog posts...');
    
    for (const post of realEstatePosts) {
      try {
        const createdPost = await strapi.db.query('api::blog-post.blog-post').create({
          data: post
        });
        console.log(`✅ Created: "${createdPost.title}"`);
      } catch (error) {
        console.error(`❌ Failed to create post "${post.title}":`, error.message);
      }
    }
    
    console.log('🎉 Blog data seeding completed!');
    
    // Stop Strapi
    await app.stop();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder
seedBlogData();