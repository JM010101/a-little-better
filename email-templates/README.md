# Email Templates for A Little Better

## Supabase Email Template Setup

### How to Use This Template

1. **Go to Supabase Dashboard**
   - Navigate to: `Authentication` → `Email Templates`
   - Select: `Confirm signup`

2. **Copy the HTML Template**
   - Open `confirm-signup.html` in this folder
   - Copy the entire HTML content

3. **Paste in Supabase**
   - In the Supabase email template editor, switch to HTML mode
   - Paste the template
   - Supabase uses Go template syntax:
     - `{{ .ConfirmationURL }}` - The confirmation link
     - `{{ .SiteURL }}` - Your site URL
     - `{{ .Email }}` - User's email address

4. **Customize**
   - Update colors to match your brand
   - Modify text content
   - Add your logo URL if desired

### Template Variables Available

- `{{ .ConfirmationURL }}` - Link to confirm email
- `{{ .SiteURL }}` - Your application URL
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - Confirmation token (if needed)
- `{{ .TokenHash }}` - Hashed token
- `{{ .RedirectTo }}` - Redirect URL after confirmation

### Preview

The template includes:
- ✅ Modern, professional design
- ✅ Responsive layout
- ✅ Brand colors (blue/purple gradient)
- ✅ Clear call-to-action button
- ✅ Alternative text link
- ✅ Footer with unsubscribe option

## Alternative: Using Resend (Better Deliverability)

If you want even better email templates and deliverability, consider using Resend:

1. **Sign up for Resend** (free tier: 3,000 emails/month)
2. **Get API key** from Resend dashboard
3. **Update your signup route** to use Resend instead of Supabase emails

See `resend-integration.md` for setup instructions.

