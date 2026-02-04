# 🚀 DevBio Frontend

A production-ready Next.js frontend for DevBio - a dynamic developer portfolio platform powered by GitHub.

## 📋 Overview

DevBio lets developers showcase their GitHub profiles with live statistics, contributions, pinned repositories, and activity feeds. Users sign in with GitHub OAuth and get an instant public, shareable developer portfolio.

**Live Demo:** Coming soon  
**Backend API:** [DevBio Backend API](link-to-backend)

## ✨ Features

✅ **GitHub OAuth Authentication** - Seamless GitHub login integration  
✅ **Public Developer Profiles** - Shareable profile URLs (`devbio.app/@username`)  
✅ **Live GitHub Statistics** - Real-time repos, stars, followers, contributions  
✅ **Tech Stack Visualization** - Programming language usage breakdown  
✅ **Pinned Repositories** - Showcase featured projects with language tags  
✅ **Recent Activity Feed** - Display latest GitHub commits and contributions  
✅ **Profile Customization** - Edit bio, status, location, website, social links  
✅ **Dark Mode First** - Beautiful dark-mode design with light mode support  
✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **Smooth Animations** - Framer Motion transitions throughout  
✅ **Error Handling** - Graceful 404/403 error states  
✅ **Skeleton Loading** - Placeholder states while data loads  

## 🛠️ Tech Stack

- **Next.js 16** (App Router) - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations
- **Sonner** - Toast notifications
- **Lucide React** - SVG icons

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- DevBio backend API running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/devbio-frontend.git
   cd devbio-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set NEXT_PUBLIC_API_URL
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Visit `http://localhost:3000`

## 🌐 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with GitHub OAuth |
| `/dashboard` | Protected | User dashboard and profile editor |
| `/:username` | Public | Public developer profile |

## 📡 API Integration

The frontend consumes a RESTful API with the following endpoints:

### Authentication
- `GET /auth/github/redirect` - Get GitHub OAuth URL
- `GET /auth/me` - Get authenticated user
- `POST /auth/logout` - Logout

### Profile
- `GET /profile` - Get user's full profile + stats
- `PATCH /profile` - Update profile settings
- `GET /profiles/:username` - Get public profile
- `POST /profile/refresh-github-stats` - Queue stats refresh

See `response.ts` for full API documentation.

## 🏗️ Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── dashboard/page.tsx       # User dashboard
│   ├── [username]/page.tsx      # Public profiles
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── profile-header.tsx       # Profile component
│   ├── stat-card.tsx            # Stats display
│   ├── repo-card.tsx            # Repository cards
│   ├── tech-stack-grid.tsx      # Tech visualization
│   ├── skeleton-loaders.tsx     # Loading states
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── api.ts                   # API client
│   ├── auth-context.tsx         # Auth state
│   └── utils.ts                 # Helpers
├── public/                      # Static assets
├── QUICKSTART.md               # Quick start guide
├── SETUP.md                    # Detailed setup
├── COMPONENTS_GUIDE.md         # Component docs
├── DEPLOYMENT.md               # Deployment guide
├── IMPLEMENTATION.md           # Architecture overview
└── README.md                   # This file
```

## 🔐 Authentication Flow

```
1. User clicks "Continue with GitHub"
   ↓
2. Frontend fetches OAuth URL from backend
   ↓
3. User redirected to GitHub authorization
   ↓
4. GitHub redirects back with authorization code
   ↓
5. Backend exchanges code for user data & token
   ↓
6. Frontend receives token via URL parameter
   ↓
7. Token stored in localStorage for persistence
   ↓
8. Authenticated API requests include Bearer token
```

## 🎨 Design System

### Colors
- **Background**: `#09090B` (zinc-950)
- **Surface**: `#18181B` (zinc-900)
- **Border**: `#27272A` (zinc-700)
- **Primary**: `#3B82F6` (blue-500)
- **Accent**: `#06B6D4` (cyan-500)
- **Text**: `#FAFAFA` (white)

### Typography
- **Headings**: Monospace (JetBrains Mono style)
- **Body**: System font stack
- **Code**: Monospace font

### Components
- Rounded corners: 8px
- Spacing: 4px grid
- Transitions: 200-300ms

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub and connect to Vercel
# Add NEXT_PUBLIC_API_URL environment variable
# Auto-deploys on push
```

### Docker
```bash
docker build -t devbio-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com/api devbio-frontend
```

### Traditional Server
```bash
npm run build
npm start
# Or use PM2 for process management
pm2 start npm --name devbio -- start
```

See `DEPLOYMENT.md` for detailed instructions.

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 3 steps
- **[SETUP.md](./SETUP.md)** - Detailed setup and architecture
- **[COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)** - Component API reference
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Architecture & design decisions

## 🐛 Troubleshooting

### OAuth not working?
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check GitHub OAuth app config in backend

### Profile not found?
- Ensure GitHub username is correct
- Check if profile is set to public

### API connection errors?
- Verify backend API is running
- Check network tab in DevTools
- Ensure CORS is configured correctly

See `SETUP.md` for more troubleshooting tips.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues and questions:
1. Check the [troubleshooting guide](./SETUP.md#troubleshooting)
2. Review [API documentation](./response.ts)
3. Check existing [GitHub issues](https://github.com/yourusername/devbio-frontend/issues)
4. Create a new issue with details

---

**Made with ❤️ by DevBio Team**

Follow us: [Twitter](https://twitter.com) • [GitHub](https://github.com)

For backend integration questions, see [DevBio Backend Repository](link-to-backend)
