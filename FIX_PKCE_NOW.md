# URGENT: Fix PKCE Error - Step by Step

## The Problem
Supabase is using PKCE (Proof Key for Code Exchange) for email confirmations, but email links don't have the code verifier stored. This causes the error: **"both auth code and code verifier should be non-empty"**

## The Solution (Must Do This in Supabase Dashboard)

### Step 1: Open Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your project
3. Select your project: **a-little-better**

### Step 2: Navigate to Authentication Settings
1. Click **Authentication** in the left sidebar
2. Click **URL Configuration** (or **Providers** → scroll down)

### Step 3: Disable PKCE for Email Flows
Look for one of these options:

**Option A: PKCE Settings (if available)**
- Find **"Enable PKCE"** or **"PKCE Settings"**
- **Uncheck** or **Disable** PKCE for email confirmations
- Keep it enabled for OAuth if you want

**Option B: Email Provider Settings**
- Look for **"Email"** provider settings
- Find **"Use PKCE"** or **"PKCE Flow"**
- **Disable** it

**Option C: Advanced Settings**
- Look for **"Advanced"** or **"Security"** settings
- Find PKCE-related options
- Disable for email flows

### Step 4: Save Changes
- Click **Save** or **Update**
- Wait for changes to propagate (may take a few minutes)

### Step 5: Test
1. **Sign up a NEW user** (old confirmation emails won't work)
2. Click the confirmation link in the email
3. Should redirect to dashboard without errors

## Alternative: If You Can't Find PKCE Settings

Some Supabase projects don't have this option easily accessible. In that case:

1. **Contact Supabase Support** - Ask them to disable PKCE for email confirmations
2. **Use Magic Links Instead** - Magic links might work better (already implemented in your app)
3. **Check Supabase Version** - Older versions might not have PKCE enabled

## Why This Happens

- **PKCE** is a security feature for OAuth flows
- **Email confirmations** shouldn't use PKCE (no browser storage available)
- **Supabase** has PKCE enabled by default in some configurations
- **Must be disabled** in dashboard - cannot be done via code

## After Fixing

Once PKCE is disabled:
- ✅ Email confirmations will work
- ✅ Users can verify their email
- ✅ No more "code verifier" errors
- ✅ Seamless redirect to dashboard

## Still Having Issues?

1. Check Supabase documentation for your version
2. Look for "PKCE" in all Authentication settings
3. Try disabling PKCE globally (then re-enable for OAuth only)
4. Contact Supabase support with your project ID

