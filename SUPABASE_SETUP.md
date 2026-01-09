# Supabase Email Confirmation Setup

## Issue: Email confirmation redirects to homepage instead of callback

If clicking the confirmation email button redirects to `http://localhost:3000/?code=...` instead of `/auth/callback`, you need to configure Supabase redirect URLs.

## Solution 1: Configure Environment Variable (Required)

Set the production URL in your environment variables:

**In `.env.local` (for local development):**
```bash
NEXT_PUBLIC_APP_URL=https://a-little-better.com
```

**In Vercel/Production:**
Add `NEXT_PUBLIC_APP_URL=https://a-little-better.com` to your environment variables.

This ensures email confirmation links always redirect to your production domain, not localhost.

## Solution 2: Configure Supabase Dashboard (Also Required)

1. **Go to Supabase Dashboard**
   - Navigate to: `Authentication` → `URL Configuration`

2. **Set Site URL**
   - **Production**: `https://a-little-better.com`

3. **Add Redirect URLs**
   Add these URLs to the "Redirect URLs" list:
   ```
   https://a-little-better.com/auth/callback
   https://a-little-better.com/*
   ```

4. **Save Changes**

## Solution 2: Code-Level Fix (Already Implemented)

The homepage (`src/app/page.tsx`) now automatically detects the `code` parameter and redirects to `/auth/callback`. This works as a fallback, but configuring Supabase properly (Solution 1) is recommended.

## How It Works

1. User clicks confirmation link in email
2. Supabase redirects to your site with `?code=...` parameter
3. Homepage detects the code and redirects to `/auth/callback`
4. Callback page exchanges code for session
5. User is redirected to dashboard

## Testing

1. Sign up a new user
2. Check email for confirmation link
3. Click the confirmation button
4. Should redirect to `/dashboard` after verification

## Troubleshooting

### Still redirecting to homepage?
- Check Supabase dashboard URL configuration
- Verify redirect URLs are added correctly
- Clear browser cache and cookies
- Check browser console for errors

### Session not persisting?
- Check that cookies are enabled
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly
- Check middleware is running correctly

