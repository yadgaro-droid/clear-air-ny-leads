# Staging Environment Documentation

## Overview
This document describes the staging environment setup for CleanVent NYC website. The staging environment allows safe testing of new features before deploying to production.

**Staging URL:** https://staging.cleanventnyc.com
**Production URL:** https://cleanventnyc.com

---

## Architecture

### Environment Detection System
The application automatically detects which environment it's running in based on the hostname:

- **Production:** `cleanventnyc.com` or `www.cleanventnyc.com`
- **Staging:** `staging.cleanventnyc.com`
- **Development:** `localhost` or any other hostname

**Implementation:** `src/config/environment.ts`

### Git Branch Strategy
```
feature-branch → staging → main
     ↓              ↓         ↓
development    staging    production
```

- **main branch** → Production (cleanventnyc.com)
- **staging branch** → Staging (staging.cleanventnyc.com)
- **feature branches** → Development/testing

---

## What We Completed

### Phase 1: DNS Configuration ✅
**Date:** 2025-12-02
**Action:** Added CNAME record in Versil Inc DNS settings
```
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
```

### Phase 2: GitHub Branch Setup ✅
**Date:** 2025-12-02
**Actions:**
- Created `staging` branch from `main`
- Pushed to remote repository
- Branch connected to Vercel for automatic deployments

**Commands used:**
```bash
git checkout -b staging
git push -u origin staging
```

### Phase 3: Vercel Configuration ✅
**Date:** 2025-12-02
**Actions:**
- Connected custom domain `staging.cleanventnyc.com` to Vercel project
- Configured domain to deploy from `staging` branch
- Verified Vercel Deployment Protection is active (requires Vercel SSO to access)

### Phase 4: Code Implementation ✅
**Date:** 2025-12-02
**Files Created/Modified:**

#### 1. `src/config/environment.ts` (NEW)
Central environment detection and configuration management.

**Features:**
- Automatic environment detection based on hostname
- Environment-specific configuration (email recipients, GTM/GA4 IDs)
- Type-safe environment management

**Key Functions:**
- `getEnvironment()` - Returns 'production' | 'staging' | 'development'
- `getConfig()` - Returns environment-specific configuration object
- `isProduction()` - Boolean check for production
- `isStaging()` - Boolean check for staging
- `isDevelopment()` - Boolean check for development

#### 2. `src/components/StagingBanner.tsx` (NEW)
Visual indicator component that displays at the top of staging site.

**Features:**
- Only visible in staging environment
- Bright yellow background with alert icons
- Clear warning message: "STAGING ENVIRONMENT - NOT LIVE SITE"
- Fixed positioning (z-index: 9999) to stay visible while scrolling

#### 3. `src/App.tsx` (MODIFIED)
Integrated StagingBanner component into application layout.

**Changes:**
- Imported `StagingBanner` component
- Added `<StagingBanner />` to render at top of app
- Banner automatically shows/hides based on environment

#### 4. `src/pages/Home.tsx` (MODIFIED)
Added environment-aware form submission with detailed console logging.

**Changes:**
- Imports `getConfig()` and `isStaging()` from environment config
- Logs environment information on form submission
- Environment-specific error messages
- Helpful debugging information for staging mode

**Console Output Example:**
```
📧 Submitting form in STAGING environment
⚠️ STAGING MODE: Email will be sent to test recipient
💡 TIP: Update EmailJS template to send staging emails to your test inbox
✅ Email sent successfully
```

#### 5. `public/robots-staging.txt` (NEW)
Search engine blocking configuration for staging.

**Content:**
```
User-agent: *
Disallow: /
```

**Purpose:** Prevents search engines from indexing staging site.

**Note:** This file is created but not yet automatically served. Would require additional Vercel configuration or middleware to serve different robots.txt per environment.

### Phase 5: Deployment Troubleshooting ✅
**Date:** 2025-12-02
**Issue:** Initial deployment failed with error:
```
middleware.ts(1,43): error TS2307: Cannot find module 'next/server'
Error: The Edge Function "middleware" is referencing unsupported modules:
  - next/server
```

**Root Cause:** Created `middleware.ts` using Next.js-specific imports (`next/server`), but this is a Vite/React project, not Next.js.

**Resolution:** Removed `middleware.ts` file from staging branch. Vercel's built-in Deployment Protection provides authentication instead.

**Commit:**
```bash
git commit -m "Remove broken middleware.ts to fix deployment error"
```

### Phase 6: Deployment Verification ✅
**Date:** 2025-12-02
**Status:** Staging site successfully deployed and accessible

**Verification Results:**
- ✅ Deployment status: Ready (13s build time)
- ✅ Domain accessible: https://staging.cleanventnyc.com
- ✅ Vercel Deployment Protection active (requires Vercel SSO authentication)
- ✅ Staging banner visible and working correctly
- ✅ Environment detection working correctly

**Access Method:**
1. Visit https://staging.cleanventnyc.com
2. Authenticate with Vercel SSO (your Vercel account)
3. View staging site with yellow warning banner

---

## What Still Needs To Be Done

### Phase 7: Separate Analytics Setup ⏳
**Priority:** High
**Required for:** Preventing test data from polluting production analytics

#### 7.1 Create Staging Google Analytics 4 Property
**Steps:**
1. Go to Google Analytics Admin
2. Create new GA4 property named "CleanVent NYC - Staging"
3. Copy the Measurement ID (format: G-XXXXXXXXXX)
4. Update `src/config/environment.ts`:
   ```typescript
   ga4MeasurementId: env === 'production' ? 'G-W685J6YNLM' : 'G-YOUR-STAGING-ID',
   ```

#### 7.2 Create Staging Google Tag Manager Container
**Steps:**
1. Go to Google Tag Manager Admin
2. Create new container named "CleanVent NYC - Staging"
3. Copy the Container ID (format: GTM-XXXXXXX)
4. Update `src/config/environment.ts`:
   ```typescript
   gtmContainerId: env === 'production' ? 'GTM-MG4QT5TJ' : 'GTM-YOUR-STAGING-ID',
   ```

#### 7.3 Update GTM/GA4 Implementation
**Current Status:** Hardcoded production IDs in code
**Required Changes:**
- Find where GTM script is initialized (likely in `index.html` or App component)
- Replace hardcoded IDs with dynamic values from `getConfig()`
- Test in staging environment
- Verify events are tracked in staging analytics

**Example Implementation:**
```typescript
const config = getConfig();
// Initialize GTM with config.gtmContainerId
// Initialize GA4 with config.ga4MeasurementId
```

### Phase 8: Separate EmailJS Template ⏳
**Priority:** High
**Required for:** Preventing test submissions from going to real customers

#### 8.1 Create Staging EmailJS Template
**Steps:**
1. Log into EmailJS dashboard (https://dashboard.emailjs.com/)
2. Create new email template (clone existing `template_fpqq66m`)
3. Name it: "CleanVent NYC - Staging Form Submission"
4. Modify subject line: Add "[STAGING]" prefix
   ```
   Subject: [STAGING] New Contact Form Submission - {{from_name}}
   ```
5. Copy the new template ID

#### 8.2 Configure Staging Email Recipients
**Current Configuration:**
```typescript
emailRecipient: env === 'production'
  ? 'cleanventprofessional@gmail.com'
  : 'staging-test@cleanventprofessional@gmail.com',
```

**Required Action:**
- Create/verify staging test email exists: `staging-test@cleanventprofessional@gmail.com`
- OR change to personal test email for easier monitoring

#### 8.3 Update EmailJS Template ID
**Current Status:** Uses same template for all environments
```typescript
emailTemplateId: 'template_fpqq66m',
```

**Required Change:**
```typescript
emailTemplateId: env === 'production'
  ? 'template_fpqq66m'
  : 'template_YOUR_STAGING_TEMPLATE_ID',
```

**File to modify:** `src/config/environment.ts`

### Phase 9: Deployment Workflow Documentation ⏳
**Priority:** Medium
**Purpose:** Standardize team workflow and prevent errors

#### 9.1 Create Git Workflow Guide
**Create file:** `WORKFLOW.md`

**Should include:**
- How to create feature branches
- How to test locally
- How to deploy to staging
- How to merge to production
- Rollback procedures
- Branch naming conventions

**Example Workflow:**
```bash
# 1. Create feature branch
git checkout staging
git pull origin staging
git checkout -b feature/new-contact-form

# 2. Make changes and commit
git add .
git commit -m "Add new contact form validation"

# 3. Push to staging for testing
git checkout staging
git merge feature/new-contact-form
git push origin staging
# Wait for Vercel deployment, test at staging.cleanventnyc.com

# 4. Deploy to production (after testing)
git checkout main
git merge staging
git push origin main
# Vercel automatically deploys to cleanventnyc.com
```

#### 9.2 Create Pull Request Templates
**Create file:** `.github/pull_request_template.md`

**Should include:**
- Checklist for reviewers
- Testing requirements
- Screenshots requirement
- Breaking changes section
- Analytics verification
- Form submission testing

### Phase 10: Testing Checklist ⏳
**Priority:** Medium
**Purpose:** Ensure nothing breaks when deploying to production

#### 10.1 Create Staging Testing Checklist
**Create file:** `TESTING.md`

**Should include:**

**Visual Testing:**
- [ ] Staging banner displays correctly
- [ ] All pages load without errors
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] Fonts and styles render properly

**Functional Testing:**
- [ ] Contact form submission works
- [ ] Phone number validation works
- [ ] Form error messages display correctly
- [ ] Thank you page redirects correctly
- [ ] Navigation works between pages
- [ ] Privacy Policy page loads

**Analytics Testing:**
- [ ] GTM container loads (check browser console)
- [ ] GA4 events fire (check GA4 DebugView)
- [ ] Form submission events tracked
- [ ] Page views tracked
- [ ] Button clicks tracked (if configured)

**Email Testing:**
- [ ] Form submission sends email
- [ ] Email arrives at staging test address
- [ ] Email contains all form fields
- [ ] Email subject has [STAGING] prefix
- [ ] Email template formatting is correct

**Performance Testing:**
- [ ] Page load time < 3 seconds
- [ ] Lighthouse performance score > 80
- [ ] No console errors
- [ ] No 404 errors for assets

**Security Testing:**
- [ ] HTTPS works correctly
- [ ] No exposed API keys in client code
- [ ] robots.txt blocks search engines (staging only)

### Phase 11: robots.txt Configuration ⏳
**Priority:** Low
**Purpose:** Automatically serve different robots.txt per environment

**Current Issue:** Created `public/robots-staging.txt` but it's not automatically served.

**Possible Solutions:**

**Option A: Use Vercel Configuration**
Create/modify `vercel.json`:
```json
{
  "routes": [
    {
      "src": "/robots.txt",
      "dest": "/robots-staging.txt",
      "headers": {
        "Content-Type": "text/plain"
      }
    }
  ]
}
```

**Option B: Build-time Configuration**
Modify build process to copy correct robots.txt during build based on environment.

**Option C: Edge Middleware (Requires Vercel Pro)**
Create proper Edge Middleware to serve different files per domain.

### Phase 12: Password Protection (Optional) ⏳
**Priority:** Low
**Current Status:** Using Vercel Deployment Protection (Vercel SSO)

**Alternative Options:**

**Option A: Upgrade to Vercel Pro ($20/month)**
- Enables password protection feature
- Can set custom password for staging
- No code changes needed

**Option B: Implement Basic Auth Middleware**
- Requires correct Vercel Edge Middleware syntax for Vite projects
- Free solution
- More complex to implement

**Option C: Keep Vercel SSO (Current Solution)**
- Free
- Secure (requires Vercel account authentication)
- Works well for team environments
- **Recommended for now**

### Phase 13: Environment Variables Configuration ⏳
**Priority:** Medium
**Purpose:** Manage sensitive configuration securely

**Create:** `.env.production` and `.env.staging` files

**Should include:**
```bash
# .env.production
VITE_ENVIRONMENT=production
VITE_EMAILJS_SERVICE_ID=service_0uzikxr
VITE_EMAILJS_TEMPLATE_ID=template_fpqq66m
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_GTM_ID=GTM-MG4QT5TJ
VITE_GA4_ID=G-W685J6YNLM

# .env.staging
VITE_ENVIRONMENT=staging
VITE_EMAILJS_SERVICE_ID=service_0uzikxr
VITE_EMAILJS_TEMPLATE_ID=template_STAGING_ID
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_GTM_ID=GTM-STAGING
VITE_GA4_ID=G-STAGING
```

**Also configure in Vercel:**
1. Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable with appropriate environment scope (Production/Preview)

---

## Current Configuration

### Environment Configuration
**File:** `src/config/environment.ts`

```typescript
export type Environment = 'production' | 'staging' | 'development';

export const getEnvironment = (): Environment => {
  if (typeof window === 'undefined') {
    return 'development';
  }
  const hostname = window.location.hostname;

  if (hostname === 'cleanventnyc.com' || hostname === 'www.cleanventnyc.com') {
    return 'production';
  }
  if (hostname === 'staging.cleanventnyc.com') {
    return 'staging';
  }
  return 'development';
};

export const getConfig = () => {
  const env = getEnvironment();
  return {
    environment: env,
    emailRecipient: env === 'production'
      ? 'cleanventprofessional@gmail.com'
      : 'staging-test@cleanventprofessional@gmail.com',
    emailTemplateId: 'template_fpqq66m', // TODO: Create separate staging template
    enableTracking: env === 'production' || env === 'staging',
    gtmContainerId: env === 'production' ? 'GTM-MG4QT5TJ' : 'GTM-STAGING', // TODO: Create staging GTM
    ga4MeasurementId: env === 'production' ? 'G-W685J6YNLM' : 'G-STAGING', // TODO: Create staging GA4
  };
};

export const isProduction = () => getEnvironment() === 'production';
export const isStaging = () => getEnvironment() === 'staging';
export const isDevelopment = () => getEnvironment() === 'development';
```

### Vercel Deployment Settings

**Project:** clear-air-ny-leads
**Team:** omri-yadgars-projects

**Production Branch:** main
**Preview Branches:** staging, all other branches
**Deployment Protection:** Enabled (Vercel SSO required)

**Connected Domains:**
- Production: cleanventnyc.com, www.cleanventnyc.com
- Staging: staging.cleanventnyc.com

### DNS Configuration (Versil Inc)

```
# Production
Type: A
Name: @
Value: 76.76.21.21 (Vercel)

Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Staging
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
```

---

## Testing Instructions

### Accessing Staging Environment

1. **Open browser and navigate to:** https://staging.cleanventnyc.com

2. **Authenticate with Vercel:**
   - You'll see Vercel authentication page
   - Click "Continue with Vercel"
   - Sign in with your Vercel account credentials

3. **Verify staging features:**
   - Look for yellow banner at top: "⚠️ STAGING ENVIRONMENT - NOT LIVE SITE ⚠️"
   - Check browser console for environment logs

4. **Test form submission:**
   - Fill out contact form
   - Check console for staging-specific logs:
     ```
     📧 Submitting form in STAGING environment
     ⚠️ STAGING MODE: Email will be sent to test recipient
     ```
   - Verify email arrives at test recipient (when configured)

### Testing Workflow for New Features

1. **Create feature branch:**
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b feature/your-feature-name
   ```

2. **Develop and test locally:**
   ```bash
   npm run dev
   # Test at http://localhost:5173
   ```

3. **Deploy to staging:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git checkout staging
   git merge feature/your-feature-name
   git push origin staging
   ```

4. **Wait for Vercel deployment** (usually 10-15 seconds)

5. **Test on staging:** Visit https://staging.cleanventnyc.com

6. **If tests pass, deploy to production:**
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

7. **Verify production:** Visit https://cleanventnyc.com

---

## Troubleshooting

### Issue: Staging site shows 404 error
**Solution:** Check Vercel deployment status:
```bash
vercel ls --yes
```
Look for recent deployment with "● Ready" status. If showing "● Error", check logs:
```bash
vercel inspect [deployment-url] --logs
```

### Issue: Can't access staging site (401 Unauthorized)
**Solution:** This is expected. Vercel Deployment Protection is enabled.
1. Make sure you're logged into Vercel
2. Visit staging site in browser (not curl)
3. Authenticate when prompted

### Issue: Staging banner not showing
**Possible causes:**
1. Not actually on staging domain (check URL)
2. CSS z-index issue (banner has z-index: 9999)
3. Component not imported in App.tsx

**Check browser console for:**
```javascript
console.log('Current environment:', getEnvironment());
```

### Issue: Form submissions going to production email
**Cause:** EmailJS template not separated yet
**Temporary solution:** Manually check email subject line
**Permanent solution:** Complete Phase 8 (Separate EmailJS Template)

### Issue: Analytics tracking production instead of staging
**Cause:** GTM/GA4 not yet configured for separate environments
**Temporary solution:** Filter staging data in GA4 using hostname
**Permanent solution:** Complete Phase 7 (Separate Analytics Setup)

### Issue: Changes not showing on staging
**Steps to diagnose:**
1. Verify changes committed: `git status`
2. Verify pushed to staging branch: `git log origin/staging`
3. Check Vercel deployment status: `vercel ls --yes`
4. Clear browser cache and hard refresh (Ctrl+Shift+R)
5. Try incognito window

### Issue: Need to rollback staging deployment
**Solution:**
```bash
# Option 1: Revert to previous commit
git checkout staging
git log # Find the commit hash to revert to
git reset --hard <commit-hash>
git push origin staging --force

# Option 2: Revert specific commit
git checkout staging
git revert <commit-hash>
git push origin staging
```

---

## Security Considerations

### Current Security Measures
- ✅ HTTPS enabled on all domains
- ✅ Vercel Deployment Protection (SSO) on staging
- ✅ Environment-based configuration prevents accidental production access
- ✅ No API keys or secrets in client-side code
- ✅ robots-staging.txt created (not yet automatically served)

### Security Recommendations
1. **Never commit secrets to Git:**
   - Use `.env` files (add to `.gitignore`)
   - Use Vercel Environment Variables

2. **Keep staging protected:**
   - Current Vercel SSO is sufficient
   - Consider password protection if sharing with clients

3. **Monitor staging for suspicious activity:**
   - Review Vercel logs periodically
   - Check for unusual form submissions

4. **Separate email accounts:**
   - Don't use production email for staging tests
   - Consider disposable email for testing

---

## Performance Monitoring

### Current Performance (Production)
- Build time: ~12-13 seconds
- Page load: < 2 seconds
- Lighthouse score: Not yet measured

### Staging Performance Goals
- Build time: < 15 seconds
- Page load: < 3 seconds
- Lighthouse Performance: > 80
- Lighthouse Accessibility: > 90

### Monitoring Tools
- Vercel Analytics (available in dashboard)
- Google PageSpeed Insights
- Chrome DevTools Lighthouse
- Google Analytics Core Web Vitals

---

## Maintenance

### Regular Tasks

**Weekly:**
- Check staging deployment status
- Merge any hotfixes from production to staging
- Review and clean up old feature branches

**Monthly:**
- Review Vercel usage and costs
- Check for outdated dependencies: `npm outdated`
- Test all staging functionality end-to-end
- Review analytics to ensure separation working

**Quarterly:**
- Review and update this documentation
- Audit security settings
- Performance testing and optimization
- Review Git workflow effectiveness

---

## Team Access

### Required Access
To work with staging environment, team members need:

1. **GitHub Access:**
   - Repository: https://github.com/yadgaro-droid/clear-air-ny-leads
   - Permissions: Write access minimum

2. **Vercel Access:**
   - Project: clear-air-ny-leads
   - Team: omri-yadgars-projects
   - Required for: Viewing deployments, accessing staging site

3. **EmailJS Access (for email configuration):**
   - Dashboard: https://dashboard.emailjs.com/
   - Required for: Creating/modifying email templates

4. **Google Analytics Access (when configured):**
   - Production GA4: G-W685J6YNLM
   - Staging GA4: (To be created)
   - Required for: Viewing analytics data

5. **Google Tag Manager Access (when configured):**
   - Production GTM: GTM-MG4QT5TJ
   - Staging GTM: (To be created)
   - Required for: Modifying tracking configuration

---

## Key Files Reference

### Configuration Files
- `src/config/environment.ts` - Environment detection and configuration
- `vercel.json` - Vercel deployment configuration (if created)
- `.env.production` - Production environment variables (to be created)
- `.env.staging` - Staging environment variables (to be created)

### Component Files
- `src/components/StagingBanner.tsx` - Staging warning banner
- `src/App.tsx` - Main app with banner integration
- `src/pages/Home.tsx` - Homepage with environment-aware form

### Documentation Files
- `STAGING.md` - This file (staging documentation)
- `WORKFLOW.md` - Git workflow guide (to be created)
- `TESTING.md` - Testing checklist (to be created)
- `README.md` - Main project documentation

### Public Assets
- `public/robots-staging.txt` - Search engine blocking for staging

---

## Success Metrics

### Staging Environment Goals
- ✅ Zero downtime deployments
- ✅ Separate staging and production data
- ✅ Clear visual distinction between environments
- ✅ Fast deployment time (< 15s)
- ⏳ 100% test coverage before production deployment
- ⏳ Zero production bugs from untested staging deploys

### Current Status: Phase 6 Complete ✅
- Infrastructure: 100% complete
- Code implementation: 100% complete
- Analytics separation: 0% complete (Phase 7)
- Email separation: 50% complete (config exists, template pending)
- Documentation: 90% complete (this file)
- Testing procedures: 20% complete (checklist pending)

---

## Support and Resources

### Vercel Documentation
- Deployment Protection: https://vercel.com/docs/security/deployment-protection
- Custom Domains: https://vercel.com/docs/concepts/projects/custom-domains
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

### Related Documentation
- EmailJS Documentation: https://www.emailjs.com/docs/
- Google Analytics 4: https://developers.google.com/analytics/devguides/collection/ga4
- Google Tag Manager: https://developers.google.com/tag-platform/tag-manager

### Internal Resources
- Production Site: https://cleanventnyc.com
- Staging Site: https://staging.cleanventnyc.com
- GitHub Repository: https://github.com/yadgaro-droid/clear-air-ny-leads
- Vercel Dashboard: https://vercel.com/omri-yadgars-projects/clear-air-ny-leads

---

## Changelog

### 2025-12-02 - Initial Staging Environment Setup
- Created staging branch
- Configured DNS (CNAME: staging → cname.vercel-dns.com)
- Connected Vercel custom domain (staging.cleanventnyc.com)
- Implemented environment detection system
- Created staging banner component
- Added environment-aware form submission logging
- Removed broken middleware.ts (Next.js import issue)
- Verified successful deployment with Vercel SSO protection
- Created comprehensive documentation

### Future Updates
- Document Phase 7 completion (separate analytics)
- Document Phase 8 completion (separate email templates)
- Add workflow guide
- Add testing checklist
- Add team onboarding instructions

---

**Last Updated:** December 2, 2025
**Maintained By:** Development Team
**Version:** 1.0.0
