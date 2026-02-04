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
