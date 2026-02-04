# DevBio Frontend - Deployment Guide

## Vercel (Recommended)

Vercel is the optimal platform for Next.js applications.

### Step 1: Prepare Your Code

1. Create a GitHub repository if you haven't already
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DevBio frontend"
   git remote add origin https://github.com/YOUR_USERNAME/devbio-frontend.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your repository
5. Accept the default settings
6. Click "Deploy"

### Step 3: Configure Environment Variables

1. In your Vercel project dashboard, go to **Settings → Environment Variables**
2. Add the following variable:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-api.com/api
   ```
3. Redeploy by going to **Deployments → Select Latest → Redeploy**

### Step 4: Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Self-Hosted Deployment

### Option A: Docker

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://api.example.com/api

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t devbio-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com/api devbio-frontend
```

### Option B: Traditional Server (Ubuntu/Debian)

1. **Install Node.js 18+:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Setup:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/devbio-frontend.git
   cd devbio-frontend
   npm install
   npm run build
   ```

3. **Create `.env.local`:**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```

4. **Run with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name devbio -- start
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx (Reverse Proxy):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option C: Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project → GitHub repository
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy automatically

### Option D: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variable: `NEXT_PUBLIC_API_URL`

---

## Environment Variables for Deployment

| Variable | Environment | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | All | `https://api.yourdomain.com/api` |

**Important:** This is a `NEXT_PUBLIC_*` variable, which means it's included in the client bundle and visible in the browser. Never put secrets here.

---

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Backend API URL is correct
- [ ] Backend API is running and accessible
- [ ] GitHub OAuth app credentials are in backend
- [ ] SSL/HTTPS enabled for production
- [ ] Domain name configured
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors in production build
- [ ] Tested OAuth flow
- [ ] Tested public profile pages
- [ ] Tested dashboard functionality

---

## Production Build Testing

Before deploying, test the production build locally:

```bash
npm run build
npm run start
```

Then visit `http://localhost:3000` and test:
- Landing page loads
- OAuth login works
- Dashboard displays correctly
- Public profiles work
- All animations smooth

---

## Monitoring & Logging

### Vercel

- Built-in analytics available in dashboard
- View logs in Deployments → Logs

### Self-Hosted

1. **Application Logs:**
   ```bash
   pm2 logs devbio
   ```

2. **Setup Error Tracking (Sentry):**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Nginx Access Logs:**
   ```bash
   tail -f /var/log/nginx/access.log
   ```

---

## Performance Optimization

### Image Optimization
Already optimized - using GitHub's CDN for avatars

### Caching
- Static pages cached at CDN
- User data cached in browser for session
- Backend stats cached with refresh button

### Code Size
- Minimal dependencies (Framer Motion, shadcn/ui)
- Tree-shaking enabled in Next.js
- Production bundle ~200KB

---

## Troubleshooting Deployment

### Build Fails
```bash
npm run build --verbose
```
Check for TypeScript errors or missing dependencies.

### OAuth Not Working
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend OAuth configuration
- Test API endpoint directly: `curl https://your-api.com/api/auth/github/redirect`

### API Connection Timeout
- Check CORS headers from backend
- Verify API endpoint is publicly accessible
- Check firewall/security groups

### Profile Data Not Loading
- Check browser DevTools → Network tab
- Verify token is present in localStorage
- Check backend logs for errors

---

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Select previous deployment
3. Click "Redeploy"

### Self-Hosted
```bash
cd devbio-frontend
git checkout <previous-commit>
npm install
npm run build
pm2 restart devbio
```

---

## Performance Monitoring

### Metrics to Track
- Page load time (target: <2s)
- Time to interactive (target: <3s)
- API response time
- OAuth success rate
- Error rate

### Tools
- **Vercel Analytics** - Built-in for Vercel deployments
- **Google Analytics** - Add to layout.tsx
- **Sentry** - Error tracking
- **New Relic** - APM monitoring

---

## Security Considerations

1. **HTTPS Only** - Always use HTTPS in production
2. **CSP Headers** - Configure Content Security Policy
3. **CORS** - Backend should only accept requests from your domain
4. **Token Security** - Tokens stored in localStorage (accessible to XSS)
   - Consider httpOnly cookies if possible
   - Implement CSP to mitigate XSS
5. **Rate Limiting** - Backend should rate limit OAuth and profile endpoints

### Recommended Security Headers

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

---

## Cost Estimates

### Vercel
- **Free tier**: Sufficient for small projects (<150GB bandwidth/month)
- **Pro tier**: $20/month - recommended for production

### Self-Hosted (Ubuntu/Digitalocean)
- **Basic droplet**: $6-12/month (1GB RAM, 25GB SSD)
- **Performance**: $18-24/month (2GB RAM, 60GB SSD)

---

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Support

For deployment issues:
1. Check Vercel/server logs
2. Verify environment variables
3. Test backend API connectivity
4. Check browser DevTools for errors
5. Review CORS and API configuration
