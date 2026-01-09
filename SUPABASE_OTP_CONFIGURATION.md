# How to Configure Supabase to Send 6-Digit OTP Codes

## Step-by-Step Instructions

### 1. Navigate to Email Templates

1. Go to your **Supabase Dashboard**
2. Click on **Authentication** in the left sidebar
3. Under **NOTIFICATIONS**, click on **Email**
4. Make sure you're on the **"Templates"** tab (not "SMTP Settings")

### 2. Edit the "Confirm sign up" Template

1. Find **"Confirm sign up"** in the list
2. Click on it to open the template editor

### 3. Update the Email Template

Replace the template content with the following to send a 6-digit OTP code:

**Subject:**
```
Confirm your email address
```

**Body (HTML):**
```html
<h2>Confirm your email address</h2>
<p>Thank you for signing up! Please enter the following code to verify your email address:</p>
<h1 style="font-size: 32px; letter-spacing: 8px; text-align: center; margin: 20px 0; font-family: monospace;">
  {{ .Token }}
</h1>
<p>This code will expire in 1 hour.</p>
<p>If you didn't sign up for this account, you can safely ignore this email.</p>
```

**Body (Plain Text):**
```
Confirm your email address

Thank you for signing up! Please enter the following code to verify your email address:

{{ .Token }}

This code will expire in 1 hour.

If you didn't sign up for this account, you can safely ignore this email.
```

### 4. Important Variables

- **`{{ .Token }}`** - This contains the 6-digit OTP code
- **`{{ .Email }}`** - User's email address (optional, for reference)
- **`{{ .SiteURL }}`** - Your site URL (optional)

### 5. Save the Template

1. Click **"Save"** or **"Update"** button
2. The template is now configured to send OTP codes

## Alternative: Using Magic Link Template

If Supabase doesn't support OTP codes directly in the signup template, you can:

1. **Use Magic Link Template Instead:**
   - Configure the "Magic link" template to send OTP codes
   - Update your signup API to use `signInWithOtp` with `type: 'magiclink'`
   - Then verify with `verifyOtp` using `type: 'magiclink'`

2. **Or Configure Both:**
   - Keep signup template for account creation
   - Use magic link template for OTP verification

## Testing

After configuring:

1. Sign up a new user
2. Check the email - you should receive a 6-digit code
3. Enter the code on the verification page
4. Should successfully verify and redirect to dashboard

## Troubleshooting

**Issue:** Still receiving magic links instead of codes
- **Solution:** Make sure `{{ .Token }}` is in the template (not `{{ .ConfirmationURL }}`)

**Issue:** Code format is wrong
- **Solution:** Supabase generates 6-digit codes automatically when using `signInWithOtp`

**Issue:** Template not saving
- **Solution:** Make sure you have proper permissions in Supabase Dashboard

## Note

Supabase's `signInWithOtp` automatically generates a 6-digit code when:
- The email template uses `{{ .Token }}` variable
- You call `signInWithOtp` API (which we're doing in the signup route)

The code will be sent as a 6-digit number in the email, and users can enter it on your verification page.

