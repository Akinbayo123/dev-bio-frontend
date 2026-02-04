# Environment Configuration Guide

## Required Environment Variable

The DevBio frontend requires one environment variable to connect to your backend API:

### `NEXT_PUBLIC_API_URL`

This is a **public** Next.js environment variable that tells the frontend where your backend API is located.

## How to Set It

### Option 1: Local Development (.env.local)

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

This assumes your backend is running locally on port 8000.

### Option 2: Different Backend URL

If your backend is running on a different host or port, adjust accordingly:

```bash
# Remote server
NEXT_PUBLIC_API_URL=https://api.example.com/api

# Different local port
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Option 3: Vercel Deployment

When deploying to Vercel, set the environment variable in your Vercel project:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your production backend URL (e.g., `https://api.yoursite.com/api`)
4. Select which environments it applies to (Production, Preview, Development)

## Expected Backend API Structure

Your backend API should be structured like this:

```
Base URL: http://localhost:8000
API Endpoints: http://localhost:8000/api/...
```

So if `NEXT_PUBLIC_API_URL=http://localhost:8000/api`, the frontend will call:
- `http://localhost:8000/api/auth/github/redirect`
- `http://localhost:8000/api/auth/me`
- `http://localhost:8000/api/profile`
- etc.

## Verifying Your Configuration

1. **If API URL is not set:** You'll see a red banner saying "Backend API Not Configured" with instructions
2. **If API URL is incorrect:** You'll see a red banner saying "Failed to reach backend API" with the URL that was attempted
3. **If API URL is correct:** The login button will be enabled and functional

## Common Issues

### ❌ "Backend API Not Configured"
**Solution:** Set the `NEXT_PUBLIC_API_URL` environment variable

### ❌ "Failed to reach backend API at http://localhost:8000/api"
**Solution:** 
- Make sure your backend is running on the correct port
- Check the backend URL in your environment variable
- Verify CORS is enabled on your backend (allow requests from your frontend URL)
- Check the backend logs for errors

### ❌ Button says "Configure API First"
**Solution:** Reload the page after setting `NEXT_PUBLIC_API_URL` in `.env.local`

## API Endpoints Required

Make sure your backend provides these endpoints:

- `GET /auth/github/redirect` - Returns OAuth URL
- `POST /auth/logout` - Logout endpoint
- `GET /auth/me` - Get current authenticated user
- `GET /profile` - Get user profile
- `PATCH /profile` - Update user profile
- `GET /profiles/{username}` - Get public profile
- `POST /profile/refresh-github-stats` - Trigger stats refresh

All endpoints should return JSON responses and support Bearer token authentication in the `Authorization` header for protected routes.

## Development vs Production

| Environment | Setting | Example |
|---|---|---|
| Local Dev | `.env.local` | `http://localhost:8000/api` |
| Vercel | Project Env Vars | `https://api.yoursite.com/api` |
| Production | Environment Variable | `https://api.yoursite.com/api` |

## Next Steps

1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Ensure your backend is running
3. Reload the frontend in your browser
4. Click "Continue with GitHub" to test the connection
