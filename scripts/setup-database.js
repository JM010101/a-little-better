const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.log('Please add:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupTables() {
  console.log('🏗️  Setting up A Little Better database...')
  
  try {
    // Test connection first
    const { error: connectionTest } = await supabase
      .from('analytics_events')
      .select('id')
      .limit(1)

    if (connectionTest) {
      console.log('📋 Creating database tables...')
      console.log('')
      console.log('⚠️  Please run this SQL in your Supabase SQL Editor:')
      console.log('')
      console.log(`
-- Analytics events tracking table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    page_path VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Early user interest capture table  
CREATE TABLE IF NOT EXISTS early_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_early_users_email ON early_users(email);
CREATE INDEX IF NOT EXISTS idx_early_users_created_at ON early_users(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (drop existing ones first if they exist)
DROP POLICY IF EXISTS "Allow public read access to analytics_events" ON analytics_events;
DROP POLICY IF EXISTS "Allow public insert access to analytics_events" ON analytics_events;
DROP POLICY IF EXISTS "Allow public read access to early_users" ON early_users;
DROP POLICY IF EXISTS "Allow public insert access to early_users" ON early_users;

CREATE POLICY "Allow public read access to analytics_events" ON analytics_events
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert access to analytics_events" ON analytics_events
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public read access to early_users" ON early_users
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert access to early_users" ON early_users
    FOR INSERT TO public WITH CHECK (true);
      `)
      console.log('')
      console.log('Then run: npm run setup')
    } else {
      console.log('✅ Database tables already exist!')
      console.log('🎉 Your A Little Better MVP is ready to launch!')
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupTables()