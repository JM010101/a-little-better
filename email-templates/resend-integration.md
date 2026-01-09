# Resend Integration Guide

Resend offers better email templates, deliverability, and analytics - all for free (up to 3,000 emails/month).

## Setup Steps

### 1. Sign Up for Resend
- Go to [resend.com](https://resend.com)
- Sign up for free account (3,000 emails/month free)
- Verify your domain (optional but recommended)

### 2. Get API Key
- Go to API Keys section
- Create a new API key
- Copy the key (starts with `re_`)

### 3. Install Resend SDK
```bash
npm install resend
```

### 4. Add Environment Variable
Add to `.env.local`:
```bash
RESEND_API_KEY=re_your_api_key_here
```

### 5. Create Email Service
Create `src/lib/email.ts` with Resend integration

### 6. Update Signup Route
Modify `src/app/api/auth/signup/route.ts` to send custom email via Resend

## Benefits of Resend
- ✅ Beautiful email templates
- ✅ Better deliverability rates
- ✅ Email analytics
- ✅ React Email support
- ✅ Free tier: 3,000 emails/month
- ✅ No credit card required

## Cost Comparison
- **Supabase**: Free (basic templates)
- **Resend**: Free up to 3,000/month, then $20/month for 50,000 emails

