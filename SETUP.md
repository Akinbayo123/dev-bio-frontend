# DevBio Frontend Setup

## Prerequisites

- Node.js 18+ installed
- DevBio backend API running and accessible
- GitHub OAuth application configured

## Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Configure the environment variable:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
   
   Replace with your actual backend API URL:
   - **Local Development**: `http://localhost:8000/api`
   - **Production**: `https://api.yourdomain.com/api`

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Pages
- **`/`** - Landing page with GitHub OAuth login
- **`/dashboard`** - Authenticated dashboard (requires login)
- **`/[username]`** - Public profile page (publicly accessible)

### Key Components
- **`ProfileHeader`** - Displays user profile info with social links
- **`StatCard`** - Shows GitHub statistics cards
- **`RepoCard`** - Displays pinned repositories
- **`TechStackGrid`** - Shows programming language usage

### API Integration
- **`/lib/api.ts`** - Centralized API client with all endpoints
- **`/lib/auth-context.tsx`** - Authentication state management
- All API calls follow the documented REST API specification

## Authentication Flow

1. User clicks "Continue with GitHub" on landing page
2. Frontend fetches OAuth redirect URL from backend
3. User redirected to GitHub for authorization
4. Backend exchanges code for token and redirects to frontend
5. Frontend stores token in localStorage
6. Authenticated requests include `Authorization: Bearer {token}` header

## Features

✅ GitHub OAuth Authentication  
✅ Public Developer Profiles  
✅ GitHub Statistics Dashboard  
✅ Live GitHub Data Sync  
✅ Profile Customization  
✅ Responsive Design  
✅ Dark-mode First  
✅ Smooth Animations (Framer Motion)  

## API Endpoints Used

The frontend consumes these backend endpoints:

- `GET /auth/github/redirect` - Get OAuth URL
- `GET /auth/me` - Get authenticated user
- `POST /auth/logout` - Logout user
- `GET /profile` - Get authenticated user's full profile
- `PATCH /profile` - Update profile settings
- `GET /profiles/{username}` - Get public profile
- `POST /profile/refresh-github-stats` - Queue GitHub stats refresh

See `/response.ts` for full API documentation.

## Troubleshooting

### OAuth Login Not Working
- Ensure backend is running and accessible
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify GitHub OAuth application is configured in backend

### "Profile Not Found" Error
- Ensure the GitHub username exists and is configured publicly in backend
- Check if the profile is set to private (returns 403)

### Stats Not Updating
- Click "Refresh Stats" in dashboard to queue a sync
- Stats update asynchronously in the backend
- Wait 2-3 seconds and refresh the page

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Add environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy automatically

### Other Platforms

Follow standard Next.js deployment guides for your platform.

## Development

The frontend uses:
- **Next.js 16** (App Router)
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built components
- **Framer Motion** - Smooth animations
- **Sonner** - Toast notifications
- **Lucide Icons** - SVG icon library

## Support

For issues with the API integration, check:
1. Backend API documentation in `/response.ts`
2. Environment variables are set correctly
3. Backend API is running and accessible
4. Network requests in browser DevTools
