# Landing Page Optimization - CleanVent NYC

**Last Updated:** 2026-01-17
**Project:** Air Duct Cleaning Service Landing Page
**Production URL:** https://cleanventnyc.com
**Staging URL:** https://staging.cleanventnyc.com (password protected)
**GitHub:** https://github.com/yadgaro-droid/clear-air-ny-leads

---

## 🎯 Project Overview

**Business:** CleanVent NYC - Air duct, dryer vent, and chimney cleaning services in New York City
**Tech Stack:** React + TypeScript + Vite + Tailwind + shadcn/ui
**Deployment:** Vercel (automatic deployment on push to main)
**Traffic:** 80%+ mobile users (mobile optimization is critical)

---

## 📊 Current Performance Status

**Mobile Performance:** 89/100 (Lighthouse)
**Desktop Performance:** 94/100 (Lighthouse)
**Form Status:** ✅ Working (fixed on 2026-01-17)

### Current Baseline Metrics (Mobile)
- LCP: 3.2s
- FCP: 2.6s
- TBT: 46ms
- CLS: 0.034

### Known Performance Bottlenecks (NOT YET FIXED)
1. **GTM (Google Tag Manager):** 290 KiB unused JavaScript
   - Already has aggressive lazy loading (3s delay)
   - Located in: `src/lib/analytics-loader.ts`
2. **Main thread work:** 2.1s blocking
3. **JavaScript execution:** 1.5s
4. **Critical path latency:** 485ms (CSS blocking)

---

## ✅ What We Did Right (KEEP THESE)

### 1. **Form Submission Fix** ✅ (src/pages/Home.tsx:491)
```javascript
// CORRECT - Use e.target instead of e.currentTarget
await window.emailjs.sendForm('service_0uzikxr', config.emailTemplateId, e.target);
```
**Why:** EmailJS expects the actual form DOM element, not the React synthetic event target.

### 2. **GTM Lazy Loading** ✅ (src/lib/analytics-loader.ts)
- 3-second delay after page load
- Defers 416 KiB of scripts
- Already optimized - DO NOT REMOVE

### 3. **Environment Detection** ✅ (src/config/environment.ts)
- Staging vs Production email routing
- Analytics toggle based on environment
- Template ID configuration

### 4. **Critical CSS** ✅ (vite.config.ts)
- Critters plugin for inlining critical CSS
- Already configured and working

### 5. **Image Optimization** ✅
- LCP image preload in index.html (lines 18-20)
- Responsive WebP images
- Proper fetchpriority="high"

---

## ❌ What We Did Wrong (AVOID THESE)

### 1. **Removed Lazy Loading for Routes** ❌
**What we did:** Removed React.lazy() and Suspense for ThankYou/Privacy pages
**Result:** Increased initial bundle size, worse performance
**Lesson:** Keep lazy loading for non-critical routes

### 2. **Enabled Console Logs in Production** ❌
**What we did:** Set `drop_console: false` in vite.config.ts
**Result:** Slower JavaScript execution, larger bundles
**Lesson:** Always drop console logs in production

### 3. **Aggressive Chunk Splitting** ❌
**What we did:** Split React ecosystem into 7+ vendor chunks
**Result:** Broke React context, blank page errors
**Lesson:** Keep React dependencies together in single chunk

### 4. **Used CSS Selector for EmailJS** ❌
**What we tried:** `window.emailjs.sendForm(..., '#contact-form')`
**Result:** Still failed with same error
**Lesson:** e.target is the only reliable method

### 5. **Focused on Bundle Size Instead of Real Bottlenecks** ❌
**What we did:** Optimized bundle splitting and minification
**Result:** Performance got WORSE (89 → 78)
**Lesson:** The real bottlenecks are GTM (290KB), main-thread work (2.1s), and JS execution (1.5s)

---

## 🗂️ Key Files and Their Purposes

### Core Application Files
```
src/
├── App.tsx                           # Main app, routing, scroll-to-top
├── main.tsx                          # Entry point, analytics loader
├── pages/
│   ├── Home.tsx                      # Landing page (FORM IS HERE - line 464-512)
│   ├── ThankYou.tsx                  # Conversion tracking page
│   └── Privacy.tsx                   # Privacy policy
├── config/
│   └── environment.ts                # Environment detection, EmailJS config
├── lib/
│   └── analytics-loader.ts           # GTM lazy loading (3s delay)
└── hooks/
    └── useEmailJS.ts                 # Lazy load EmailJS SDK

Build Configuration
├── vite.config.ts                    # Build config, Critters plugin
├── index.html                        # Meta tags, preloads, schema.org
└── package.json                      # Dependencies, scripts

Performance Testing (Created but reverted)
├── .lighthouserc.json                # Lighthouse CI config (if exists)
├── playwright.config.ts              # Playwright config (if exists)
└── performance-baseline.json         # Baseline metrics (if exists)
```

---

## 🚀 How to Start Working Immediately

### Option 1: Continue Performance Optimization
**Goal:** Get from 89 → 96+ mobile performance

**Steps:**
1. Read this file first
2. **DO NOT** repeat bundle optimization mistakes
3. Focus on REAL bottlenecks:
   - Reduce GTM impact (already lazy loaded, may need different approach)
   - Reduce main thread work (analyze what's blocking)
   - Optimize JavaScript execution time
4. Test incrementally on staging before production
5. **ALWAYS verify form still works** after changes

**Commands:**
```bash
cd C:\Users\yadga\clear-air-ny-leads
npm run dev                # Start dev server
npm run build              # Build for production
npm run lighthouse         # Run Lighthouse CI (if configured)
```

### Option 2: Add New Features
**Steps:**
1. Read this file + src/pages/Home.tsx
2. Test locally: `npm run dev`
3. Test staging: push to `staging` branch
4. **Test form submission** on staging
5. Merge to `main` when verified

### Option 3: Fix Bugs
**Steps:**
1. Read this file
2. Check if bug relates to form submission (see "Form Submission Details" below)
3. Test fix on staging first
4. Verify with user before deploying to production

---

## 📧 Form Submission Details (CRITICAL)

### EmailJS Configuration
- **Service ID:** `service_0uzikxr`
- **User ID:** `0b8LuYZ3y4_Z4utia`
- **Template ID (Production):** `template_fpqq66m`
- **Template ID (Staging):** `template_fpqq66m` (same as production)

### Form Implementation (src/pages/Home.tsx:464-512)
```javascript
onSubmit={async (e) => {
  e.preventDefault();

  // 1. Validate NYC phone number
  const error = validateNYCPhone(phone);
  if (error) {
    setPhoneError(error);
    return;
  }

  // 2. Load EmailJS SDK (lazy loaded)
  await loadEmailJS();

  // 3. Submit form - USE e.target NOT e.currentTarget
  await window.emailjs.sendForm('service_0uzikxr', config.emailTemplateId, e.target);

  // 4. Redirect to thank-you page (conversion tracking)
  window.location.href = '/thank-you';
}
```

### Phone Validation (NYC Only)
Valid area codes: 212, 332, 646, 718, 917, 347, 929
Format: (XXX) XXX-XXXX

### Testing Form Submission
1. Open https://staging.cleanventnyc.com/
2. Fill form with test data:
   - Name: Test User
   - Phone: (646) 646-4444
   - Service: Air Duct Cleaning
3. Submit and check:
   - ✅ Should redirect to /thank-you
   - ✅ Email should arrive at configured recipient
   - ❌ If error, check browser console

---

## 🌍 Environment Configuration

### Production (cleanventnyc.com)
- Email recipient: `cleanventprofessional@gmail.com`
- GTM Container: `GTM-MG4QT5TJ`
- GA4: `G-W685J6YNLM`
- Google Ads: `AW-17485397894`
- Analytics: Enabled

### Staging (staging.cleanventnyc.com)
- Email recipient: `staging-test@cleanventprofessional.gmail.com`
- GTM Container: `GTM-W24X5XTZ` (Staging)
- GA4: `G-FBWZ1N7VST` (Staging)
- Google Ads: Same as production (traffic won't affect prod)
- Analytics: Enabled
- **Note:** Password protected (Vercel Pro feature required to disable)

---

## 🔧 Common Commands

```bash
# Development
npm run dev                          # Start dev server (localhost:8080)

# Build
npm run build                        # Production build
npm run preview                      # Preview production build locally

# Git Workflow
git checkout -b feature/your-feature # Create feature branch
git add -A && git commit -m "msg"   # Commit changes
git push origin feature/your-feature # Push to GitHub

# Deployment
git push origin main                 # Deploy to production (auto via Vercel)
git push origin staging              # Deploy to staging (auto via Vercel)

# Performance Testing (if Lighthouse CI installed)
npm run lighthouse                   # Run Lighthouse test
```

---

## 🎨 Design System

**UI Library:** shadcn/ui + Tailwind CSS
**Font:** Inter (Google Fonts, optimized loading)
**Color Scheme:**
- Primary: Blue (links, buttons, CTAs)
- Background: White/Light gray
- Text: Dark gray/Black

**Components:**
- Form: shadcn Card + Input components
- Buttons: shadcn Button (primary variant)
- Icons: lucide-react

---

## 🐛 Known Issues

### 1. Staging Password Protection
- **Issue:** Can't disable password without Vercel Pro
- **Workaround:** Test on production (low risk) or manually test on staging
- **Impact:** Can't run automated Lighthouse CI on staging

### 2. Performance Score Variability
- **Issue:** Lighthouse scores vary ±5 points between runs
- **Reason:** Network conditions, server response times
- **Solution:** Run 3+ tests and take median score

---

## 📝 Git History (Relevant Commits)

```
e983b74 - Revert performance optimizations, keep form fix (CURRENT)
3f1fccd - Fix button color contrast for WCAG AA accessibility
4e3bb57 - Fix logo aspect ratio in all components
e0b3506 - Fix GTM blocking issue with aggressive deferral strategy
```

**Reverted commits** (performance-optimization branch):
- 089b821 - Fix: Use e.target instead of CSS selector for EmailJS
- f41fcdc - Fix: Remove lazy loading and enable console logs
- c7fef7e - Phase 2: Advanced bundle optimization
- 9756078 - Phase 0: Performance testing infrastructure

---

## 🎯 Future Optimization Opportunities (NOT YET ATTEMPTED)

### Phase 3 Ideas (When Ready)
1. **Defer non-critical JavaScript**
   - Move analytics to after-load
   - Lazy load gallery component

2. **Optimize Images Further**
   - Use next-gen formats (AVIF)
   - Implement responsive images with srcset

3. **Reduce Main Thread Work**
   - Analyze and optimize React re-renders
   - Use React.memo() for expensive components

4. **Service Worker / Caching**
   - Cache static assets
   - Implement offline fallback

### Why NOT to Do These Now
- Form is working ✅
- Performance is acceptable (89/100) ✅
- Previous optimization attempts made things worse ❌
- Risk > Reward until user requests it

---

## 💡 Quick Reference: Do's and Don'ts

### ✅ DO
- Test on staging before production
- Verify form works after ANY change to Home.tsx
- Use `e.target` for EmailJS submissions
- Keep console logs for development only
- Run Lighthouse tests for baseline comparison
- Keep GTM lazy loading as-is

### ❌ DON'T
- Remove lazy loading from analytics-loader.ts
- Use `e.currentTarget` or CSS selectors with EmailJS
- Enable console logs in production builds
- Split React dependencies into multiple chunks
- Optimize without measuring impact first
- Deploy to production without testing form

---

## 📞 Contact & Support

**User:** yadga
**Project Owner:** CleanVent NYC
**Business Phone:** (646) 596-3677
**Business Email:** cleanventprofessional@gmail.com

---

## 🔍 Troubleshooting Guide

### Form Not Submitting
1. Check browser console for errors
2. Verify EmailJS script loaded: `console.log(window.emailjs)`
3. Confirm using `e.target` not `e.currentTarget`
4. Test with valid NYC phone number
5. Check environment config (src/config/environment.ts)

### Build Failures
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check for TypeScript errors: `npm run build`
3. Verify all imports are correct
4. Check vite.config.ts syntax

### Performance Regression
1. Compare to baseline (89/100 mobile)
2. Check bundle sizes in build output
3. Verify GTM still lazy loads after 3s
4. Run Lighthouse CI for detailed metrics
5. Consider reverting recent changes

---

**Remember:** Form functionality > Performance scores. Always verify form works before optimizing.
