# Troubleshooting Guide

## Common Errors and Solutions

### Error: "Failed to get OAuth URL: Failed to fetch"

**Cause:** The API endpoint is not reachable or not configured.

**Solutions:**

1. **Check if API URL is set:**
   ```bash
   # Check your .env.local file
   cat .env.local
   ```
   Should show: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

2. **Verify backend is running:**
   ```bash
   # Try to reach your backend
   curl http://localhost:8000/api/auth/github/redirect
   ```
   Should NOT return "Connection refused"

3. **Check for CORS issues:**
   - If you see errors in browser console about CORS, your backend needs to allow requests from your frontend URL
   - Configure CORS on your backend to accept requests from `http://localhost:3000`

4. **Verify API URL format:**
   - ✅ Correct: `http://localhost:8000/api` (no trailing slash after /api)
   - ❌ Incorrect: `http://localhost:8000/api/` (trailing slash)
   - ❌ Incorrect: `http://localhost:8000` (missing /api)

### Error: "Backend API Not Configured"

**Cause:** Environment variable is not set.

**Solution:**
1. Create `.env.local` in the root directory
2. Add: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
3. Restart your development server: `npm run dev`

### Error: "Failed to reach backend API at http://localhost:8000/api"

**Cause:** The API endpoint exists in config but the backend isn't responding.

**Solutions:**

1. **Check backend is running:**
   ```bash
   # Backend should be running on the port you specified
   # Default port is usually 8000
   curl http://localhost:8000/api/auth/github/redirect
   ```

2. **Check port number:**
   - Verify your backend is actually listening on port 8000
   - If it's on a different port, update `.env.local`

3. **Check network connectivity:**
   - Frontend and backend should be on same network
   - If backend is on a different machine, use its IP or domain

### Login Button is Disabled

**Cause:** API is not configured or there's an error.

**Solution:** Check the red error banner on the page for details. Usually means API URL is not set.

### Got OAuth redirect, but login doesn't work

**Cause:** Token handling issue after OAuth callback.

**Solutions:**

1. Check browser console for errors (F12 → Console)
2. Check that backend returned a `token` parameter in the redirect URL
3. Verify the token is being stored correctly:
   ```javascript
   // Check localStorage in browser console
   localStorage.getItem('devbio_token')
   ```

### Profile page shows "User not found"

**Cause:** Either the username doesn't exist or the API endpoint returned an error.

**Solutions:**

1. Check the URL - make sure username is correct
2. Try accessing via the dashboard to ensure profile exists
3. Check backend logs for any errors

### Dashboard shows loading infinitely

**Cause:** API call is hanging or not responding.

**Solutions:**

1. Check network tab in browser (F12 → Network)
2. Look for failed requests - check their error messages
3. Verify API URL is correct in environment variables
4. Check if backend is running

### Changes to .env.local not taking effect

**Cause:** Development server needs restart for env var changes.

**Solution:**
1. Stop your dev server (Ctrl+C)
2. Update `.env.local`
3. Restart: `npm run dev`

### TypeScript errors about API types

**Cause:** Generated types might be out of sync.

**Solution:**
```bash
# Clear build cache and rebuild
rm -rf .next
npm run dev
```

## Browser Console Debugging

Open browser DevTools (F12) and check the Console tab for detailed error messages.

### Check if token is stored:
```javascript
localStorage.getItem('devbio_token')
```

### Check API configuration:
```javascript
// This will be in the compiled code, check network requests in Network tab
```

### Check error details:
```javascript
// Look for "Failed to get OAuth URL:" messages
```

## Network Debugging

Use the Network tab in DevTools (F12 → Network) to:

1. Click "Continue with GitHub" button
2. Watch for failed requests
3. Click on failed request to see:
   - Status code
   - Response body
   - Headers

Common response codes:
- `200` - Success
- `404` - Endpoint not found
- `500` - Backend error (check backend logs)
- `0` or `Failed` - Network unreachable (backend not running)

## Backend Logs

Check your backend logs for errors when the frontend tries to call the API:

```bash
# If backend is running in terminal, you'll see logs there
# Look for errors or warnings related to /auth/github/redirect endpoint
```

## Testing API Manually

Test your API endpoints manually to isolate issues:

```bash
# Test OAuth redirect endpoint
curl http://localhost:8000/api/auth/github/redirect

# Should return JSON like:
# {"url": "https://github.com/login/oauth/authorize?..."}
```

## Still Having Issues?

1. **Check all error messages** - They now include helpful details
2. **Review ENV_SETUP.md** - Specific environment setup instructions
3. **Verify API format** - Make sure base URL is correct
4. **Check backend** - Is it running and responding?
5. **Check logs** - Browser console and backend logs often show the actual issue

If you need more help, provide:
- Your `.env.local` file (redact sensitive values)
- Browser console error messages
- Backend API error logs
- The exact URL you're trying to reach
