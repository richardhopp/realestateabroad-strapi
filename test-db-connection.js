const { Client } = require('pg');

// Test PostgreSQL connection with the dedicated real estate database
async function testConnection() {
  console.log('🔧 Testing PostgreSQL connection for Real Estate CMS...\n');
  
  // Using the database ID provided by user: dpg-d2j1d3mmcj7s73eh3efg-a
  const connectionString = 'postgresql://cryptomevbot_db_user:tLKkIbPnwa7NbhLkUbal6SogrseP9y8H@dpg-d2j1d3mmcj7s73eh3efg-a.oregon-postgres.render.com/cryptomevbot_db';
  
  console.log('📍 Testing external connection...');
  console.log('📍 Database ID: dpg-d2j1d3mmcj7s73eh3efg-a\n');

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔗 Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!\n');
    
    // Test basic query
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL Version:', result.rows[0].version);
    
    // Check available schemas
    const schemas = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
    `);
    console.log('\n📂 Available schemas:');
    schemas.rows.forEach(row => console.log('  -', row.schema_name));
    
    // Check if Strapi tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      LIMIT 10
    `);
    console.log('\n📋 Tables in public schema:');
    if (tables.rows.length === 0) {
      console.log('  (No tables yet - database is ready for Strapi initialization)');
    } else {
      tables.rows.forEach(row => console.log('  -', row.table_name));
    }
    
    await client.end();
    console.log('\n✅ Database connection test successful!');
    console.log('   The database is ready for Strapi deployment.\n');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nDebug info:');
    console.error('  Error code:', error.code);
    console.error('  Error detail:', error.detail);
    console.error('  Full error:', error);
    
    // Try internal connection format for Render services
    console.log('\n🔧 Trying internal connection format...');
    const internalString = 'postgresql://cryptomevbot_db_user:tLKkIbPnwa7NbhLkUbal6SogrseP9y8H@dpg-d2j1d3mmcj7s73eh3efg-a/cryptomevbot_db';
    const internalClient = new Client({
      connectionString: internalString,
      ssl: false // Internal connections don't use SSL
    });
    
    try {
      await internalClient.connect();
      console.log('✅ Internal connection successful!');
      console.log('   Use internal URL format for Render deployment.');
      await internalClient.end();
    } catch (internalError) {
      console.log('❌ Internal connection also failed.');
      console.log('   This suggests the database may not be accessible from outside Render.');
    }
    
    process.exit(1);
  }
}

testConnection();