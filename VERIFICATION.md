# DevBio Frontend - Verification Checklist

Use this checklist to verify that the frontend is properly configured and working.

## ✅ Installation Verification

- [ ] Dependencies installed: `npm install` completes without errors
- [ ] No peer dependency warnings
- [ ] All packages in package.json are latest versions compatible with Next.js 16

## ✅ Environment Configuration

- [ ] `.env.local` file created from `.env.example`
- [ ] `NEXT_PUBLIC_API_URL` is set to your backend API
- [ ] Environment variable is correctly formatted (with `/api` suffix)

**Test:**
```bash
echo "NEXT_PUBLIC_API_URL is: $NEXT_PUBLIC_API_URL"
```

## ✅ Development Server

- [ ] Development server starts: `npm run dev`
- [ ] No console errors on startup
- [ ] App accessible at `http://localhost:3000`
- [ ] Hot reload works (make a change, page updates)

**Test:**
```bash
npm run dev
# Open http://localhost:3000
# Edit /app/page.tsx and verify refresh
```

## ✅ Page Rendering

### Landing Page (`/`)
- [ ] Page loads without errors
- [ ] Hero section visible with DevBio title
- [ ] "Continue with GitHub" button present
- [ ] Features grid displays 4 cards
- [ ] Profile preview card visible
- [ ] CTA section at bottom
- [ ] Navigation header visible
- [ ] Footer visible
- [ ] Responsive on mobile/tablet/desktop

**Test:**
```
1. Visit http://localhost:3000
2. Verify all sections load
3. Check mobile view (DevTools)
```

### Dashboard (`/dashboard`)
- [ ] Redirects to `/` if not authenticated
- [ ] Protected route requires login
- [ ] Page structure is correct

**Test:**
```
1. Visit http://localhost:3000/dashboard
2. Should redirect to home or show login
```

### Public Profile (`/:username`)
- [ ] Can navigate to any profile: `http://localhost:3000/testuser`
- [ ] 404 error shown for non-existent user
- [ ] Skeleton loaders appear while loading

**Test:**
```
1. Visit http://localhost:3000/invalidusername
2. Should show "Developer profile not found"
```

## ✅ API Integration

### Test API Connectivity

```bash
# Test OAuth URL endpoint
curl http://localhost:8000/api/auth/github/redirect

# Test public profile endpoint
curl http://localhost:8000/api/profiles/testuser
```

- [ ] API responds without CORS errors
- [ ] Responses have correct format (from documentation)
- [ ] Error responses return appropriate status codes

### Test from Frontend

Open DevTools → Network tab and:

1. **Landing Page**
   - [ ] No API calls on initial load
   - [ ] Clicking "Continue with GitHub" calls `/auth/github/redirect`
   - [ ] Response contains valid `url` field

2. **Public Profile**
   - [ ] Profile page calls `/profiles/{username}` endpoint
   - [ ] Skeleton loaders appear while loading
   - [ ] Data renders when response received
   - [ ] 404 shows correct error message

## ✅ Authentication

### OAuth Flow

- [ ] OAuth button shows "Continue with GitHub"
- [ ] Button is clickable and not disabled
- [ ] Clicking button fetches OAuth URL from backend
- [ ] Browser redirects to GitHub authorization page
- [ ] After GitHub approval, redirected back to app

**Note:** Full OAuth flow requires GitHub app config in backend

### Token Management

- [ ] Token stored in localStorage as `auth_token`
- [ ] Token persists across page reloads
- [ ] Token cleared on logout
- [ ] Authenticated requests include `Authorization: Bearer {token}` header

**Test:**
```javascript
// In browser console
localStorage.getItem('auth_token')
```

## ✅ Component Rendering

### ProfileHeader Component
- [ ] Avatar displays with fallback
- [ ] Name and username shown
- [ ] Bio text displays
- [ ] Status badge visible with pulse animation
- [ ] Location icon and text visible
- [ ] Social media links appear (GitHub, Twitter, LinkedIn, Website)
- [ ] Links are clickable and open in new tab

### StatCard Component
- [ ] Cards display in grid layout
- [ ] Labels visible (Repositories, Stars, Followers, etc.)
- [ ] Values displayed correctly
- [ ] Icons render properly
- [ ] Hover effects work

### RepoCard Component
- [ ] Repository names displayed
- [ ] Stars count shows
- [ ] Language badge displays with color
- [ ] External link icon visible
- [ ] Card is clickable and opens GitHub link

### TechStackGrid Component
- [ ] Languages displayed in grid
- [ ] Colors match language types
- [ ] Usage counts shown
- [ ] Responsive grid layout (2-6 columns)

## ✅ Forms & Interactions

### Profile Edit Form
- [ ] Dialog/modal opens when "Edit Profile" clicked
- [ ] Form fields populate with current data
- [ ] Bio character counter works (max 500)
- [ ] Theme dropdown shows options
- [ ] Public/private checkbox toggles
- [ ] Save button submits form
- [ ] Success toast appears after save
- [ ] Form closes after successful save

**Test:**
```
1. Go to dashboard (when authenticated)
2. Click "Edit Profile"
3. Change bio text
4. Click "Save Changes"
5. Check for success toast
```

### Copy Profile URL
- [ ] "Copy Profile URL" button visible on dashboard
- [ ] Clicking copies URL to clipboard
- [ ] Button text changes to "Copied!" temporarily
- [ ] Toast notification shows "Profile URL copied!"

**Test:**
```
1. Go to dashboard
2. Click "Copy Profile URL"
3. Paste somewhere (Ctrl+V)
4. URL should be in format: http://localhost:3000/username
```

### Refresh Stats
- [ ] "Refresh Stats" button visible
- [ ] Button shows loading state when clicked
- [ ] Toast shows "GitHub stats refresh queued"
- [ ] Button returns to normal after request

## ✅ Error Handling

### 404 Errors
- [ ] Non-existent profile shows "Developer profile not found"
- [ ] Error message in alert box
- [ ] Page doesn't crash

**Test:**
```
Visit http://localhost:3000/this-user-does-not-exist
```

### 403 Errors
- [ ] Private profile shows "This profile is private"
- [ ] Error message in alert box
- [ ] Page doesn't crash

**Test:**
```
Visit private profile URL (if available)
```

### Network Errors
- [ ] API timeout shows error message
- [ ] Offline connection shows appropriate error
- [ ] Loading states eventually show error
- [ ] Page is still usable

**Test:**
```
1. Stop backend API server
2. Try to load profile
3. Should show error message
```

## ✅ Loading States

- [ ] Skeleton loaders appear while fetching data
- [ ] Skeleton loaders match content shape
- [ ] Skeleton loaders disappear when data loads
- [ ] No flash of unstyled content (FOUC)

**Test:**
```
1. Go to public profile page
2. Watch for skeleton loaders
3. Verify smooth transition to content
```

## ✅ Animations

- [ ] Page content fades in on load
- [ ] Items stagger in sequentially
- [ ] Card hover effects work smoothly
- [ ] Social links have hover scale effects
- [ ] Dialog opens with smooth transition
- [ ] No lag or jank during animations

**Test:**
```
1. Visit landing page
2. Watch hero section animate in
3. Hover over cards and buttons
4. Open edit profile dialog
```

## ✅ Responsive Design

### Mobile (320px)
- [ ] Header displays correctly
- [ ] Single column layout
- [ ] Touch targets are large enough (>44px)
- [ ] Buttons are readable
- [ ] No horizontal scroll

**Test:**
```
DevTools → Toggle device toolbar → Select Mobile
```

### Tablet (768px)
- [ ] Two column layouts
- [ ] Readable text
- [ ] Cards grid properly
- [ ] Navigation accessible

**Test:**
```
DevTools → Toggle device toolbar → Select iPad
```

### Desktop (1024px+)
- [ ] Three column+ layouts
- [ ] Full spacing utilized
- [ ] Hover effects visible
- [ ] Animations smooth

**Test:**
```
DevTools → Toggle device toolbar → Disable
```

## ✅ Browser Compatibility

- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Test:**
```
npm run build
npm run start
# Test in different browsers
```

## ✅ Production Build

- [ ] Build completes: `npm run build`
- [ ] No build errors or warnings
- [ ] Build output is reasonable size
- [ ] Production server starts: `npm run start`
- [ ] All features work in production mode

**Test:**
```bash
npm run build
npm run start
# Open http://localhost:3000
# Test all features
```

## ✅ Performance

- [ ] Page loads within 2 seconds
- [ ] Time to interactive within 3 seconds
- [ ] Smooth animations (60 FPS)
- [ ] No console errors
- [ ] No console warnings

**Test:**
```
DevTools → Lighthouse
Run report with "Performance" audits
```

## ✅ Console

- [ ] No errors in browser console
- [ ] No warnings in browser console
- [ ] Auth context logs are informative
- [ ] API errors logged appropriately

**Test:**
```
F12 → Console tab
Perform various actions
Check for clean console
```

## ✅ Accessibility

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Buttons accessible with Enter/Space
- [ ] Links underlined or have sufficient color contrast
- [ ] Images have alt text
- [ ] Form labels associated with inputs
- [ ] Error messages announced

**Test:**
```
1. Use Tab to navigate all buttons
2. Press Enter on buttons to activate
3. Check heading hierarchy (h1, h2, h3)
4. Use screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
```

## ✅ Data Validation

- [ ] Bio field limited to 500 characters
- [ ] Website URL must be valid format
- [ ] No script injection in forms
- [ ] Form submits only valid data
- [ ] Validation messages clear

**Test:**
```
1. Try to enter >500 chars in bio (should be blocked)
2. Try invalid URL in website field
3. Submit should fail with validation error
```

## 🎯 Final Verification Checklist

Before deployment:

- [ ] All above items checked ✅
- [ ] No console errors
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Backend API running and accessible
- [ ] GitHub OAuth working end-to-end
- [ ] All pages load and render correctly
- [ ] All API calls successful
- [ ] Forms submit and save data
- [ ] Error states display properly
- [ ] Mobile responsive works
- [ ] Animations smooth
- [ ] Performance acceptable
- [ ] Ready for deployment

## 📝 Verification Log

Use this section to document your verification:

```
Date: ___________
Tester: _________

Landing Page: _____ ✅/❌
Dashboard: _____ ✅/❌
Public Profile: _____ ✅/❌
API Integration: _____ ✅/❌
OAuth Flow: _____ ✅/❌
Forms: _____ ✅/❌
Errors: _____ ✅/❌
Responsive: _____ ✅/❌
Performance: _____ ✅/❌
Accessibility: _____ ✅/❌

Overall: _____ ✅ PASS / ❌ FAIL

Issues Found:
_________________
_________________
_________________
```

---

**All items checked? Great! Your DevBio frontend is ready for deployment. 🚀**
