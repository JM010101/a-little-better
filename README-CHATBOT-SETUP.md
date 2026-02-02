# AI Chatbot Setup Instructions

## Environment Variables

To enable the AI-powered chatbot, you need to add the following environment variables to your `.env.local` file (for local development) and to your Vercel project settings (for production):

### Required Variables

```
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
```

### How to Get Cloudflare Credentials

1. **Get Account ID:**
   - Log in to your Cloudflare dashboard
   - Your Account ID can be found in the URL or in the right sidebar of your dashboard
   - It's a string of alphanumeric characters

2. **Create API Token:**
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template or create a custom token with:
     - Permissions: `Account` → `Cloudflare Workers AI` → `Read`
     - Account Resources: Include your account
   - Copy the token (you won't be able to see it again)

### Adding to Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add both `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`
4. Make sure to add them for all environments (Production, Preview, Development)
5. Redeploy your application

### Testing

After adding the environment variables:
1. Restart your development server (`npm run dev`)
2. Open the chatbot on your site
3. Ask a question like "What services do you offer?" or "Tell me about your team"
4. The chatbot should respond with AI-generated answers based on your company information

## Troubleshooting

- **"AI service is not configured"**: Check that both environment variables are set correctly
- **"Connection error"**: Verify your API token has the correct permissions
- **Slow responses**: Cloudflare Workers AI may take a few seconds to respond, this is normal
- **Unexpected responses**: Check the system prompt in `lib/chatbot-knowledge.ts` and adjust as needed

## Model Information

The chatbot uses Cloudflare Workers AI with the `llama-3.1-8b-instruct-fast` model, which provides:
- Fast response times
- Good understanding of context
- Free tier available (check Cloudflare's current pricing)
