# Troubleshooting Authentication Issues

## "Authentication failed" Error After Email Confirmation

If you see "Authentication failed" when clicking the email confirmation link, here are the most common causes and solutions:

### 1. Redirect URL Mismatch (Most Common)

**Problem:** Supabase requires the redirect URL in the email to exactly match what's configured in the dashboard.

**Solution:**
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Check "Redirect URLs" list
3. Ensure these URLs are added:
   ```
   https://a-little-better.com/auth/callback
   https://a-little-better.com/*
   ```
4. Make sure `NEXT_PUBLIC_APP_URL=https://a-little-better.com` is set in your environment variables

### 2. Code Already Used or Expired

**Problem:** Confirmation codes can only be used once and expire after a certain time.

**Solution:**
- Request a new confirmation email
- Or sign up again with the same email

### 3. Domain Mismatch

**Problem:** The email was generated with a different domain (e.g., localhost) than your production domain.

**Solution:**
- Make sure `NEXT_PUBLIC_APP_URL` is set to your production domain
- Sign up a new user after setting the environment variable
- Old confirmation emails won't work - need new ones

### 4. Check Server Logs

Check your server logs (Vercel logs or console) for the actual error message:
```
Auth callback error: [error details]
```

Common error messages:
- `"Invalid redirect URL"` → Redirect URL not in Supabase allowed list
- `"Token has expired"` → Code expired, need new email
- `"Invalid token"` → Code already used or invalid

### 5. Verify Environment Variables

Make sure these are set correctly:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=https://a-little-better.com
```

### 6. Test Steps

1. **Clear browser cookies** for your domain
2. **Sign up a new user** (or use a different email)
3. **Check the confirmation email** - verify the link goes to `https://a-little-better.com/auth/callback?...`
4. **Click the link** - should redirect to dashboard

### 7. Still Not Working?

1. Check Supabase Dashboard → Authentication → Users
   - Is the user created?
   - What's the email confirmation status?

2. Check Supabase Dashboard → Authentication → Email Templates
   - Is the redirect URL in the template correct?
   - Template should use: `{{ .ConfirmationURL }}`

3. Verify the callback route is accessible:
   - Visit: `https://a-little-better.com/auth/callback` (should show loading spinner)

4. Check browser console for errors
5. Check network tab for failed requests

## Quick Fix Checklist

- [ ] `NEXT_PUBLIC_APP_URL` is set to production domain
- [ ] Supabase redirect URLs include `https://a-little-better.com/auth/callback`
- [ ] Supabase Site URL is set to `https://a-little-better.com`
- [ ] Using a fresh confirmation email (not an old one)
- [ ] Browser cookies are enabled
- [ ] No ad blockers interfering

