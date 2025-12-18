# A Little Better - MVP Website

> A little better goes a long way.

## 🚀 Project Overview

A focused MVP website for A Little Better, a SaaS company dedicated to helping businesses transform through small, intentional improvements. Built with Next.js 15, Supabase, and comprehensive analytics.

## ✨ Features

### ✅ Completed MVP Features

- **🏠 Conversion-Focused Homepage** - Hero section with company motto and clear value proposition
- **🎨 ALB Branding** - Professional logo and consistent design system
- **📊 Analytics Tracking** - Supabase and Google Analytics integration
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🔍 SEO Optimized** - Meta tags, structured data, and performance optimization
- **⚡ Fast Performance** - Optimized for Core Web Vitals

### 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router, React, TypeScript
- **Styling**: Tailwind CSS with custom ALB branding
- **Database**: Supabase (PostgreSQL)
- **Analytics**: Supabase Analytics + Google Analytics
- **Deployment**: Vercel (optimized configuration)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Auto-generated sitemap
│   ├── robots.ts          # Search engine rules
│   └── api/               # API routes
│       ├── analytics/     # Analytics tracking
│       └── waitlist/      # Early user signup
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── sections/         # Homepage sections
│   ├── layout/           # Layout components
│   └── analytics/        # Analytics components
├── lib/                  # Utility libraries
│   ├── supabase.ts      # Supabase client
│   ├── analytics.ts     # Analytics utilities
│   ├── seo.ts           # SEO schemas
│   └── utils.ts         # General utilities
└── types/               # TypeScript definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Local Development

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Analytics (Optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   
   # App Settings
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Set up Supabase database:**
   Run these SQL commands in your Supabase SQL editor:
   ```sql
   -- Analytics events tracking
   CREATE TABLE analytics_events (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       event_type VARCHAR(50) NOT NULL,
       page_path VARCHAR(255) NOT NULL,
       user_agent TEXT,
       ip_address INET,
       metadata JSONB,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Early user interest capture
   CREATE TABLE early_users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email VARCHAR(255) UNIQUE NOT NULL,
       source VARCHAR(100),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Visit http://localhost:3000**

## 📊 Analytics Features

### Automatic Tracking
- **Page Views** - Every homepage visit
- **Scroll Depth** - 25%, 50%, 75% scroll milestones
- **Button Clicks** - All CTA button interactions
- **Form Submissions** - Waitlist signups

### Supabase Dashboard
- Real-time visitor analytics
- Conversion tracking
- User behavior insights

## 🎨 Design System

### Brand Colors
- **Primary**: Blue shades for main CTAs and branding
- **Secondary**: Gray shades for text and backgrounds  
- **Accent**: Yellow/Orange for highlights and emphasis

### Components
- **Button**: Multiple variants with hover effects
- **Input**: Accessible form components
- **Logo**: Scalable ALB logo component
- **Container**: Responsive layout container

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - ESLint code linting
- `npm run type-check` - TypeScript validation

## 🌐 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/a-little-better)

### Manual Deployment

1. **Connect repository to Vercel**
2. **Add environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GA_ID` (optional)
3. **Deploy automatically on every push**

### Environment Variables for Production

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://a-little-better.com
```

## 📈 Performance Optimizations

- **Image Optimization** - Next.js Image component with AVIF/WebP
- **Code Splitting** - Automatic route-based splitting
- **Font Optimization** - Google Fonts with display=swap
- **CSS Optimization** - Tailwind CSS with purging
- **Caching** - Static generation with ISR where appropriate

## 🔐 Security

- **Headers** - Security headers configured
- **Environment Variables** - Client/server separation
- **Input Validation** - API route validation
- **CORS** - Proper cross-origin configuration

## 📊 Analytics Schema

### analytics_events
- `id` - UUID primary key
- `event_type` - Type of event (page_view, click, scroll, form_submit)
- `page_path` - URL path where event occurred
- `user_agent` - Browser user agent string
- `ip_address` - Client IP address
- `metadata` - Additional event data (JSON)
- `created_at` - Timestamp

### early_users
- `id` - UUID primary key
- `email` - User email address (unique)
- `source` - Traffic source identifier
- `created_at` - Signup timestamp

## 🚀 Post-MVP Roadmap

The MVP architecture supports easy expansion:
- **Additional Pages** - About, Services, Pricing
- **User Authentication** - Supabase Auth integration
- **Blog System** - Content marketing platform
- **Customer Portal** - User dashboard and features
- **Payment Integration** - Stripe for subscriptions

## 📞 Support

- **Website**: [a-little-better.com](https://a-little-better.com)
- **Email**: hello@a-little-better.com

---

**Built with ❤️ by the A Little Better team**

*Making business improvement a little better, one step at a time.*