# DevBio Frontend - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Set Environment Variable

The frontend needs your backend API URL. Add this to your `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**For production**, replace with your actual backend URL (e.g., `https://api.devbio.com/api`)

### Step 2: Install & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 3: Test It Out

1. **Landing Page** - Click "Continue with GitHub"
2. **OAuth Flow** - You'll be redirected to GitHub, then back to dashboard
3. **Dashboard** - View your profile and GitHub stats
4. **Public Profile** - Visit `http://localhost:3000/your-github-username`

## 🔑 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `http://localhost:8000/api` |

## 📝 File Locations

| File/Folder | Purpose |
|-------------|---------|
| `/app/page.tsx` | Landing page |
| `/app/dashboard/page.tsx` | Authenticated dashboard |
| `/app/[username]/page.tsx` | Public profile pages |
| `/lib/api.ts` | API client (all endpoints) |
| `/lib/auth-context.tsx` | Auth state & token management |
| `/components/` | Reusable UI components |

## 🔗 Page Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Landing page with GitHub login |
| `/dashboard` | Protected | User's dashboard & profile editing |
| `/:username` | Public | Public developer profile view |

## 🌐 API Endpoints Consumed

The frontend calls these backend endpoints:

```
GET  /auth/github/redirect           → OAuth redirect URL
GET  /auth/me                        → Current user info
POST /auth/logout                    → Logout user
GET  /profile                        → User's full profile
PATCH /profile                       → Update profile
GET  /profiles/{username}            → Public profile
POST /profile/refresh-github-stats   → Queue stats refresh
```

## ✅ Verification Checklist

Before deploying, verify:

- [ ] `NEXT_PUBLIC_API_URL` is set correctly
- [ ] Backend API is running and accessible
- [ ] GitHub OAuth app is configured in backend
- [ ] Landing page loads without errors
- [ ] GitHub OAuth login flow works
- [ ] Dashboard loads with user data
- [ ] Public profile page works
- [ ] Profile editing saves changes
- [ ] Refresh stats button works

## 🛠️ Troubleshooting

### "Cannot connect to API"
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend server is running
- Check browser DevTools → Network tab for failed requests

### "Unauthenticated" error
- Token may have expired
- Log out and log in again
- Check localStorage has `auth_token` after login

### OAuth redirects to wrong URL
- Verify `NEXT_PUBLIC_API_URL` matches your setup
- Check GitHub OAuth callback URL in backend config

### Profile shows 404
- GitHub username must exist and be public in backend
- Wait for initial GitHub stats sync to complete

## 📦 What's Included

✅ **Authentication** - GitHub OAuth flow  
✅ **Pages** - Landing, Dashboard, Public Profiles  
✅ **Components** - Header, Stats, Cards, Grid  
✅ **Styling** - Tailwind CSS, Dark-first design  
✅ **Animations** - Framer Motion transitions  
✅ **Icons** - Lucide SVG icons  
✅ **Forms** - Profile editing with validation  
✅ **Toasts** - Sonner notifications  
✅ **Responsive** - Mobile, tablet, desktop  

## 🎯 Next Steps

1. **Customize Design** - Edit Tailwind colors in globals.css
2. **Add More Pages** - Create additional pages in `/app`
3. **Deploy** - Push to Vercel or your hosting platform
4. **Monitor** - Set up analytics and error tracking

## 📚 Full Documentation

- See `/SETUP.md` for detailed setup instructions
- See `/IMPLEMENTATION.md` for architecture overview
- See `response.ts` for full API documentation

---

**Questions?** Check the browser console and backend logs for error messages.
