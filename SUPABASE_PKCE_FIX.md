# Fixing PKCE Error for Email Confirmations

## The Problem

When users click email confirmation links, they get: "both auth code and code verifier should be non-empty"

This happens because Supabase uses PKCE (Proof Key for Code Exchange) for security, but email links don't have the code verifier stored in browser storage.

## Solution: Disable PKCE for Email Confirmations in Supabase

### Step 1: Go to Supabase Dashboard

1. Navigate to: **Authentication** → **URL Configuration**
2. Scroll down to **PKCE Settings**
3. **Disable PKCE for email confirmations** (keep it enabled for OAuth if you want)

### Step 2: Alternative - Configure Email Template

If you can't disable PKCE globally, you can configure the email template to use a simpler flow:

1. Go to: **Authentication** → **Email Templates** → **Confirm signup**
2. Make sure the redirect URL uses the token parameter correctly
3. The template should redirect to: `{{ .ConfirmationURL }}`

### Step 3: Update Redirect URLs

Make sure these are in your **Redirect URLs** list:
```
https://a-little-better.com/auth/callback
https://a-little-better.com/auth/callback/*
```

## Why This Happens

- **OAuth flows**: Use PKCE (code + verifier stored in browser)
- **Email confirmations**: Should NOT use PKCE (no browser storage available)
- **Current setup**: PKCE is enabled for all flows, causing email confirmation to fail

## After Making Changes

1. **Test with a new signup** (old confirmation emails won't work)
2. **Clear browser cache** if needed
3. **Check server logs** for any remaining errors

## Code Changes Made

The code now handles both scenarios:
- If PKCE error occurs → redirects to client-side handler
- Client-side handler → can access browser storage if needed
- Token-based flow → handled through Supabase verify endpoint

But the **best fix** is disabling PKCE for email confirmations in Supabase dashboard.

