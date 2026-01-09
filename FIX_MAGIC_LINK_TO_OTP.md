# Fix: Magic Link Email → 6-Digit OTP Code

## The Problem

You're receiving a "Magic Link" email with a "Log In" button instead of a 6-digit OTP code. This is because Supabase's `signInWithOtp` sends magic links by default.

## The Solution

Configure the **"Magic link"** email template in Supabase to display the OTP code instead of the link.

## Step-by-Step Fix

### 1. Go to Magic Link Template

1. In Supabase Dashboard → **Authentication** → **Email** → **Templates** tab
2. Click on **"Magic link"** (NOT "Confirm sign up")

### 2. Update the Template

**Subject:**
```
Verify your email address
```

**Email Body (HTML):**
```html
<h2>Verify your email address</h2>
<p>Thank you for signing up! Please enter the following 6-digit code to verify your email:</p>

<div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
  <h1 style="font-size: 42px; letter-spacing: 12px; font-family: 'Courier New', monospace; color: #000; margin: 0;">
    {{ .Token }}
  </h1>
</div>

<p style="color: #666; font-size: 14px; margin-top: 20px;">
  This code will expire in 1 hour.
</p>

<p style="color: #999; font-size: 12px; margin-top: 30px;">
  If you didn't sign up for this account, you can safely ignore this email.
</p>
```

**Email Body (Plain Text):**
```
Verify your email address

Thank you for signing up! Please enter the following 6-digit code to verify your email:

{{ .Token }}

This code will expire in 1 hour.

If you didn't sign up for this account, you can safely ignore this email.
```

### 3. Critical Points

- ✅ Use `{{ .Token }}` - This displays the 6-digit OTP code
- ❌ Do NOT use `{{ .ConfirmationURL }}` - That's for magic links
- ✅ Save the template

### 4. How It Works

When you use `signInWithOtp()`:
- If template has `{{ .ConfirmationURL }}` → Sends magic link
- If template has `{{ .Token }}` → Sends 6-digit OTP code

Supabase automatically generates a 6-digit code when the template uses `{{ .Token }}`.

## Testing

After updating the template:

1. Sign up a new user
2. Check email - should receive 6-digit code (not magic link)
3. Enter code on verification page
4. Should verify successfully

## Alternative: Use Confirm Signup Template

If you prefer to use the "Confirm sign up" template instead:

1. Update "Confirm sign up" template with the same content above
2. Change the signup code to use `signUp` with email confirmation enabled
3. Update verify-otp route to use `type: 'signup'`

But using "Magic link" template is simpler since we're already using `signInWithOtp`.

