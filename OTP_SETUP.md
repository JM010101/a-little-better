# 6-Digit OTP Email Verification Setup

## Overview

The signup flow now uses 6-digit OTP codes instead of email confirmation links. Users receive a code in their email and enter it on the verification page.

## How It Works

1. **User signs up** → Account created, OTP code sent to email
2. **User redirected** → To `/verify-email?email=...` page
3. **User enters code** → 6-digit code from email
4. **Code verified** → Session created, user redirected to dashboard

## Supabase Configuration Required

For this to work, you need to configure Supabase to send OTP codes instead of magic links:

### Option 1: Configure Email Template (Recommended)

1. Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
2. Find the **"Confirm signup"** template
3. Update the template to send a 6-digit OTP code instead of a confirmation link
4. The template should include: `{{ .Token }}` which contains the 6-digit code

### Option 2: Use Admin API (Advanced)

If you have Admin API access, you can use it to send OTP codes directly:

```typescript
// This requires SUPABASE_SERVICE_ROLE_KEY
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'signup',
  email: email,
  options: {
    redirectTo: undefined,
  },
})
```

## Current Implementation

The code currently:
1. Creates user with `signUp()` (may send confirmation email)
2. Sends OTP with `signInWithOtp()` (sends OTP if configured)

**Note:** If Supabase is configured to send magic links by default, users will receive a link. To force OTP codes, configure the email template in Supabase Dashboard.

## Files Changed

- `src/app/api/auth/signup/route.ts` - Updated to send OTP
- `src/app/api/auth/verify-otp/route.ts` - New route to verify OTP codes
- `src/app/api/auth/resend-otp/route.ts` - New route to resend OTP codes
- `src/components/auth/verify-email-form.tsx` - New component for code input
- `src/app/verify-email/page.tsx` - New verification page
- `src/components/auth/signup-form.tsx` - Updated to redirect to verification page

## Testing

1. Sign up a new user
2. Check email for 6-digit code (or magic link if not configured)
3. Enter code on verification page
4. Should redirect to dashboard after successful verification

## Troubleshooting

**Issue:** User receives magic link instead of OTP code
**Solution:** Configure Supabase email template to send OTP codes

**Issue:** OTP code doesn't work
**Solution:** Check that `type: 'signup'` is used in verify-otp route

**Issue:** Code expires too quickly
**Solution:** OTP codes expire after a few minutes. User can click "Resend" to get a new code.

