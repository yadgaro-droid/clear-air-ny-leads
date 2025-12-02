# CleanVent NYC - Air Duct Cleaning Website

**Production URL:** https://cleanventnyc.com
**Staging URL:** https://staging.cleanventnyc.com
**Repository:** https://github.com/yadgaro-droid/clear-air-ny-leads

---

## Project Status: Phase 6 Complete (Staging Environment Live)

### Current State
- Production site: Fully operational
- Staging environment: Live and functional
- Next Priority: Separate analytics and email templates

---

## Quick Start

```bash
git clone https://github.com/yadgaro-droid/clear-air-ny-leads.git
cd clear-air-ny-leads
npm install
npm run dev
```

---

## Project Overview

Lead generation website for CleanVent NYC air duct cleaning services.

- Service Area: All NYC boroughs
- Phone: (646) 596-3677
- Email: cleanventprofessional@gmail.com
- Office: 16 Sunset RD, Demarest, NJ 07627

---

## Technology Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Vercel hosting (auto-deploy)
- EmailJS forms
- Google Analytics 4 + GTM

---

## What's Been Completed

### Core Website
- Responsive landing page with testimonials, FAQ
- Contact form with EmailJS (3 email recipients)
- Phone tracking with GA4/GTM
- Privacy Policy page
- Custom favicon

### Production Deployment
- Custom domain: cleanventnyc.com + www
- HTTPS with automatic SSL
- Vercel auto-deploy from main branch

### Staging Environment (Dec 2, 2025)
- Staging branch + subdomain: staging.cleanventnyc.com
- Environment detection system
- Visual staging banner (yellow)
- Vercel SSO protection
- Environment-aware logging
- Complete STAGING.md documentation (825 lines)

---

## What Needs To Be Done (Priority Order)

### HIGH PRIORITY

#### 1. Separate Analytics (Phase 7) - 1-2 hours
Prevent staging test data from polluting production analytics.

Tasks:
- Create new GA4 property "CleanVent NYC - Staging"
- Create new GTM container "CleanVent NYC - Staging"
- Update src/config/environment.ts with staging IDs
- Replace hardcoded GTM/GA4 IDs with dynamic values
- Test and verify separate tracking

See STAGING.md Phase 7 for detailed steps.

#### 2. Separate EmailJS Template (Phase 8) - 30 min
Prevent test submissions from going to customer emails.

Tasks:
- Clone EmailJS template (template_fpqq66m)
- Create "CleanVent NYC - Staging" template
- Add [STAGING] prefix to subject
- Update src/config/environment.ts
- Test form submission

See STAGING.md Phase 8 for detailed steps.

### MEDIUM PRIORITY

#### 3. Git Workflow Documentation (Phase 9) - 1 hour
Create WORKFLOW.md with feature → staging → main workflow.

#### 4. Testing Checklist (Phase 10) - 1 hour
Create TESTING.md with visual, functional, analytics tests.

---

## Configuration Reference

### Environment Settings (src/config/environment.ts)

```
Environment detection:
- Production: cleanventnyc.com | www.cleanventnyc.com
- Staging: staging.cleanventnyc.com
- Development: localhost | other

Email Recipients:
- Production: cleanventprofessional@gmail.com
- Staging: staging-test@cleanventprofessional@gmail.com

EmailJS:
- Service: service_0uzikxr
- Prod Template: template_fpqq66m
- Staging Template: TODO Phase 8

Analytics:
- Prod GTM: GTM-MG4QT5TJ
- Staging GTM: TODO Phase 7
- Prod GA4: G-W685J6YNLM
- Staging GA4: TODO Phase 7
```

### Vercel Settings

Production:
- Branch: main
- Domain: cleanventnyc.com, www.cleanventnyc.com

Staging:
- Branch: staging
- Domain: staging.cleanventnyc.com
- Protection: Vercel SSO

---

## Documentation

- README.md (this file) - Project overview
- STAGING.md - Complete staging documentation
- WORKFLOW.md (to be created)
- TESTING.md (to be created)

---

## Development Workflow

```bash
# 1. Start from staging
git checkout staging && git pull origin staging

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and test
npm run dev

# 4. Merge to staging
git checkout staging
git merge feature/your-feature-name
git push origin staging

# 5. Test on staging: https://staging.cleanventnyc.com

# 6. Deploy to production
git checkout main && git merge staging && git push origin main
```

---

## Troubleshooting

- Staging 401 error: Expected - requires Vercel SSO
- Changes not appearing: Check `vercel ls --yes`, hard refresh
- Staging banner missing: Verify URL is staging.cleanventnyc.com
- Form to wrong email: EmailJS template not separated yet (Phase 8)

---

## Next Session Quick Start

When starting new session:

1. Read this README.md first
2. Check STAGING.md for staging details
3. Pull latest: `git checkout staging && git pull`
4. Review priorities above

**Current Top Priority:** Complete Phase 7 (Analytics) and Phase 8 (EmailJS) to isolate staging from production data.

---

Last Updated: December 2, 2025
Status: Active Development
Version: 1.0.0 (Staging complete, analytics separation pending)
