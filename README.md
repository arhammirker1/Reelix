## Reelix - 3D Animation Services Platform Build By Arham Mirkar ----- in production.....
A modern, full-stack web application for showcasing and selling 3D animation services. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring a comprehensive admin dashboard for content management.
# 🌟 Features
Public-Facing Website

Dynamic Hero Section with video showcases
Pricing Tiers (Startup, Pro, Premium) with customizable packages
Interactive Order Flow with step-by-step package configuration
Geographic Currency Detection (USD/INR auto-detection)
YouTube Video Galleries for portfolio examples
Client Logo Marquee with infinite scroll
Responsive Design optimized for mobile and desktop
Glassmorphism UI with modern visual effects

Admin Dashboard

Content Management System

Edit hero section, features, and footer content
Manage pricing plans and features
Add/remove YouTube video examples
Configure order form flow and pricing


Real-time Preview of changes
Activity Tracking with recent updates dashboard
Analytics Overview (placeholder for integration)
Multi-step Order Configuration

3D modeling add-ons
Render package options
Form flow customization


Secure Authentication with session management
Dark Theme optimized interface

Order System

Smart Package Selection with plan-specific features
3D Modeling Options (Simple, Medium, Complex)
Render Package Upsells (Basic, Standard, Premium)
WhatsApp Integration for order submission
Currency-Aware Pricing (USD/INR)
Mobile-Optimized Checkout flow

# 🚀 Tech Stack

Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Components: Radix UI + shadcn/ui
3D Graphics: OGL (WebGL library)
Animations: Framer Motion concepts
State Management: React Hooks + localStorage
Video Player: YouTube IFrame API
Forms: React Hook Form (in admin)

# 📦 Installation
bash# Clone the repository
git clone <repository-url>
cd reelix

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure
```
├── app/
│   ├── About/              # About page
│   ├── admin/              # Admin dashboard
│   │   ├── login/          # Admin login
│   │   ├── page.tsx        # Main dashboard
│   │   └── loading.tsx     # Loading state
│   ├── api/
│   │   └── geo/            # Geographic detection API
│   ├── checkout/           # Order flow
│   ├── faq/                # FAQ page
│   ├── revisions/          # Revision policy
│   ├── t&c/                # Terms & conditions
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── hero.tsx            # Hero section
│   ├── pricing.tsx         # Pricing cards
│   ├── features.tsx        # Features section
│   ├── site-header.tsx     # Navigation header
│   ├── appverse-footer.tsx # Footer
│   ├── plasma.tsx          # Background effects
│   ├── lazy-video.tsx      # Optimized video loading
│   └── youtube-grid.tsx    # Video gallery
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    ├── images/             # Static images
    └── icons/              # Favicon and icons
🔐 Admin Access
Default credentials:

Email: admin@theskitbit.com or Addy@theskitbit.com
Password: 1234

⚠️ Important: Change these credentials in production via the Settings page.
⚙️ Configuration
Admin Dashboard Storage
Content is stored in localStorage with key skitbit-content. Structure:
typescript{
  hero: { title, subtitle, buttonText },
  features: { title, subtitle },
  footer: { tagline, copyright },
  pricing: {
    startup: { price_usd, price_inr, features[], videos[] },
    pro: { price_usd, price_inr, features[], videos[] },
    premium: { price_usd, price_inr, features[], videos[] }
  },
  orderForm: {
    whatsappNumber,
    modelingOptions: {...},
    renderOptions: {...},
    formSteps: [...]
  }
}
Environment Variables
Create a .env.local file:
env# Optional: Custom analytics/tracking IDs are hardcoded in layout.tsx
# GTM_ID=GTM-XXXXXXXXX
# GA_ID=G-XXXXXXXXXX
🎨 Customization
Branding

Update logo in /public/icons/
Modify colors in tailwind.config.js
Edit content via Admin Dashboard

Pricing Plans

Login to /admin
Navigate to "Pricing" tab
Update prices, features, and video examples
Click "Save Changes"

Order Form

Configure in Admin → Orders
Set WhatsApp number for order submissions
Customize 3D modeling and render pricing
Enable/disable form steps

🌍 Deployment
Vercel (Recommended)
bash# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
Environment Setup

Geo-detection works automatically on Vercel via x-vercel-ip-country header
For other platforms, implement custom geo-detection in /app/api/geo/route.ts

📱 Features by Section
Homepage

Auto-playing video hero
Feature cards with hover effects
Animated logo marquee
Dynamic pricing cards
Video example dialogs

Checkout Flow

Package selection confirmation
3D model availability check (Pro plan only)
Optional 3D modeling add-on
Render package upsell
Order summary with WhatsApp submission

Admin Dashboard

📊 Home: Overview and recent activity
📝 Content: Edit website text
💰 Pricing: Manage plans and videos
📦 Orders: Configure order form
📈 Analytics: Performance metrics (placeholder)
⚙️ Settings: Account and preferences
❓ Help: Documentation and support

🔧 Development
Key Commands
bashnpm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
Adding Video Examples

Get YouTube video ID (e.g., from youtube.com/watch?v=VIDEO_ID)
Admin → Pricing → Select Plan
Paste video ID or full URL
Click Add (+) button
Save Changes

Modifying Order Flow

Admin → Orders → Form Flow
Enable/disable steps
Reorder using drag handles
Test using "Test Order Form" button

🛡️ Security Notes

Admin authentication uses client-side cookies
Not suitable for production without backend authentication
Implement proper authentication (NextAuth.js, Clerk, etc.)
Add API routes for content storage instead of localStorage
Sanitize user inputs
Implement rate limiting

📄 License
This project is proprietary software for Reelix International.
🤝 Support
For issues or questions:

Email: arhammirker1@gmail.com
Admin Help: Access via /admin → Help tab

🔄 Updates
Content changes via admin dashboard are:

Stored in browser localStorage
Reflected immediately on save
Persist across sessions
Not shared between devices (by design)

For production, implement:

Database storage (Prisma + PostgreSQL)
API routes for CRUD operations
Server-side rendering of dynamic content
CDN for video thumbnails


# Built by Arham Mirkar
