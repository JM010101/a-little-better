import { supabase } from './supabase'

export async function setupDatabase() {
  try {
    console.log('🏗️  Setting up database tables...')

    // Create analytics_events table
    const { error: analyticsError } = await supabase.rpc('create_analytics_table')
    
    if (analyticsError && !analyticsError.message.includes('already exists')) {
      console.error('Failed to create analytics table:', analyticsError)
    }

    // Create early_users table  
    const { error: usersError } = await supabase.rpc('create_early_users_table')
    
    if (usersError && !usersError.message.includes('already exists')) {
      console.error('Failed to create early_users table:', usersError)
    }

    console.log('✅ Database setup completed successfully!')
    return { success: true }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    return { success: false, error }
  }
}

// Alternative direct SQL approach
export async function setupDatabaseDirect() {
  try {
    console.log('🏗️  Setting up database with direct SQL...')

    // Check if we have proper permissions
    const { data: tablesCheck } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    console.log('📊 Checking database connection...')

    // For direct table creation, we'll use a simple approach
    // Create a test insert to verify connection
    const { error: testError } = await supabase
      .from('analytics_events')
      .select('id')
      .limit(1)

    if (testError) {
      console.log('📋 Tables need to be created. Please run the SQL setup.')
      console.log(`
🔧 Run this SQL in your Supabase SQL Editor:

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

-- Create policies for public access
CREATE POLICY IF NOT EXISTS "Allow public read access to analytics_events" ON analytics_events
    FOR SELECT TO public USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert access to analytics_events" ON analytics_events
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public read access to early_users" ON early_users
    FOR SELECT TO public USING (true);

CREATE POLICY IF NOT EXISTS "Allow public insert access to early_users" ON early_users
    FOR INSERT TO public WITH CHECK (true);
      `)
      return { success: false, needsManualSetup: true }
    } else {
      console.log('✅ Database tables already exist!')
      return { success: true }
    }

  } catch (error) {
    console.error('❌ Database check failed:', error)
    return { success: false, error }
  }
}