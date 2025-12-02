# CleanVent NYC - Project Setup Summary

**Domain:** https://cleanventnyc.com
**Last Updated:** December 2, 2025
**Status:** Production Ready

---

## 🎯 Project Overview

Landing page for CleanVent NYC air duct cleaning services with Google Ads conversion tracking, email form submissions, and analytics.

---

## 📧 Email Configuration

### Form Submissions
- **Service:** EmailJS
- **Service ID:** `service_0uzikxr`
- **Template ID:** `template_fpqq66m`
- **Recipient:** cleanventprofessional@gmail.com (business email)
- **SDK:** Loaded via CDN in index.html

### Form Fields
- **Name** (required)
- **Phone Number** (required) - NYC area codes only (212, 332, 646, 718, 917, 347, 929)
- **Service Needed** (dropdown, required)
- **Email:** Replaced with phone number to better qualify leads

### Phone Validation
- Auto-formats as (XXX) XXX-XXXX while typing
- Validates NYC area codes only: 212, 332, 646, 718, 917, 347, 929
- Shows error message for invalid area codes
- Prevents submission if phone is invalid
- Red border indicates validation errors

---

## 🔒 Privacy & Compliance

### Privacy Policy
- **URL:** https://cleanventnyc.com/privacy
- **Location:** `/src/pages/Privacy.tsx`
- **Link:** Footer of main page
- **Purpose:** Google Ads policy compliance

### Privacy Policy Covers
- Data collection (EmailJS form submissions)
- Google Analytics & GTM tracking
- User rights (access, correction, deletion)
- Contact information for privacy inquiries

---

## 📊 Tracking & Analytics Setup

### Google Tag Manager (GTM)
- **Container ID:** `GTM-MG4QT5TJ`
- **Implementation:** Loaded conditionally (production domain only)
- **Location:** `index.html`

### Google Ads Conversion Tracking
- **Method:** GA4 Event Import (via Google Tag Manager)
- **Conversion ID:** `AW-17485397894`
- **GA4 Event:** `form_submit`
- **GA4 Property:** G-W685J6YNLM
- **Implementation:** GTM fires GA4 event, Google Ads imports it
- **Trigger:** Thank You page view (`/thank-you`)
- **Conversion Value:** $50 USD per lead (from GA4 property)

### Google Analytics
- **Property ID:** `G-W685J6YNLM` (GA4)
- **Integration:** Via Google Tag Manager

---

## 🏷️ Google Tag Manager Configuration

### Tags
1. **Tag Google Analytics GA4 Configuration** - Fires on all pages
2. **Google Tag AW-17485397894** - Global site tag
3. **Conversion Linker** - Captures and stores gclid parameters
   - Type: Conversion Linker
   - Trigger: Initialization - All Pages
   - Auto Link Domains: cleanventnyc.com
   - Critical for conversion attribution
4. **GA4 - Event - Form Submit** - ⭐ PRIMARY CONVERSION TAG
   - Type: Google Analytics: GA4 Event
   - Event Name: `form_submit`
   - Measurement ID: G-W685J6YNLM
   - Trigger: Thank you - Page View
   - This event is imported to Google Ads as "Clear vent pro (web) form_submit"

### Triggers
1. **All Pages** - Page View on all pages
2. **Thank you - Page View** - Page Path equals `/thank-you`
3. **Initialization - All Pages** - Initialization on all pages

### Variables
- Standard built-in variables enabled
- Page Path, Page URL, Referrer, etc.

---

## 🎯 Google Ads Conversion Actions

### Active Conversions (Primary)
1. **Clear vent pro (web) form_submit** ⭐ PRIMARY CONVERSION
   - Source: Website (Google Analytics GA4)
   - Category: Page views
   - GA4 Event: `form_submit`
   - Value: Uses GA4 property value (or $50 if no value)
   - Action optimization: Primary
   - Status: Active and tracking correctly
   - Measurement ID: G-W685J6YNLM

2. **Call ((646) 596-3677)**
   - Source: Website
   - Category: Contact
   - Action optimization: Primary

3. **Calls from ads**
   - Source: Call from Ads
   - Category: Phone call lead
   - Action optimization: Primary

### How GA4 Conversion Works
- GTM fires "GA4 - Event - Form Submit" tag on /thank-you page
- Tag sends `form_submit` event to GA4 (G-W685J6YNLM)
- Google Ads imports this event as conversion
- More reliable for React SPAs than direct GTM conversion tags
- Automatically handles gclid attribution via Conversion Linker

### Removed/Cleaned Up
- ❌ "Submit lead form" (duplicate, no tag installed)
- ❌ "Click to call" (inactive duplicate)
- ❌ "phone click" (duplicate)
- ❌ "Contact Form Submission" (GTM direct conversion - replaced with GA4 method)

---

## 🛡️ Production Domain Restriction

### Purpose
Prevents tracking scripts from loading on preview/development domains to avoid:
- Polluting analytics data with test traffic
- GTM "Additional domains detected" warnings
- Wasted ad spend on dev/preview clicks

### Implementation
**File:** `index.html` (Lines 4-30)

```javascript
var isProduction = window.location.hostname === 'cleanventnyc.com' ||
                   window.location.hostname === 'www.cleanventnyc.com';

if (isProduction) {
  // Load GTM and Google Ads tracking
} else {
  console.log('Tracking disabled - not on production domain');
}
```

### Domains Blocked
- `localhost`
- `id-preview-*.lovable.app` (Lovable preview domains)
- `clear-air-ny-leads-*.vercel.app` (Vercel preview domains)
- Any other non-production domains

---

## 📱 Contact Information

- **Phone:** (646) 596-3677
- **Email:** cleanventprofessional@gmail.com
- **Address:** 16 Sunset RD, Demarest, NJ 07627
- **Service Area:** All of NYC (Manhattan, Brooklyn, Queens, Bronx, Staten Island)

---

## 🔧 Technical Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn-ui + Tailwind CSS
- **Routing:** React Router (SPA)
- **Hosting:** Vercel
- **Email:** EmailJS
- **Analytics:** Google Analytics 4 (via GTM)
- **Ads Tracking:** Google Ads Conversion Tracking (via GTM)

---

## 📁 Key Files

### Core Pages
- `/src/pages/Home.tsx` - Main landing page with contact form
- `/src/pages/ThankYou.tsx` - Post-submission confirmation page
- `/src/pages/Privacy.tsx` - Privacy policy page

### Configuration
- `/index.html` - GTM and Google Ads tracking initialization
- `/src/App.tsx` - Routing and scroll-to-top configuration

### Assets
- `/public/favicon.png` - CleanVent NYC logo favicon
- `/src/assets/logo.png` - Header logo

---

## 🚀 Deployment

- **Platform:** Vercel
- **Production URL:** https://cleanventnyc.com
- **Auto-deploy:** Enabled on `main` branch pushes
- **Build Command:** `npm run build`
- **Dev Command:** `npm run dev`

---

## ✅ Conversion Tracking Flow

1. **User clicks Google Ad** - URL includes `?gclid=...` parameter
2. **User visits** https://cleanventnyc.com
3. **GTM loads** (production domain only)
4. **Conversion Linker fires** - Stores gclid in cookie (_gcl_aw)
5. **User fills form** (Name, Phone with NYC validation, Service)
6. **Client-side validation** - Ensures phone has valid NYC area code
7. **EmailJS sends email** to cleanventprofessional@gmail.com with lead details
8. **User redirects** to `/thank-you` - URL preserves gclid: `/thank-you?gclid=...`
9. **virtualPageview pushed** to dataLayer with preserved gclid
10. **GTM detects** page view on `/thank-you`
11. **GA4 Event tag fires** - Sends `form_submit` event to GA4 (G-W685J6YNLM)
12. **Google Ads imports** GA4 event as "Clear vent pro (web) form_submit" conversion
13. **Google Ads attributes** conversion to original ad click using gclid from Conversion Linker cookie
14. **Campaign optimizes** based on conversion data (typically shows in dashboard within 24-48 hours)

---

## 🐛 Troubleshooting

### Conversion Not Tracking?
1. Check GTM container is **published** (not just in preview)
2. Verify domain is `cleanventnyc.com` (not preview URL)
3. Use Tag Assistant to confirm tag fires on `/thank-you`
4. Wait 3-6 hours for Google Ads to detect conversions
5. Check Network tab for requests containing `gzaaCNq9vMlbElb_15FB`

### GTM "Additional domains detected" Warning?
- This is resolved - tracking only loads on production domain
- If warning persists, manually remove preview domains from GTM → Container Settings → Monitored Domains

### Form Not Sending Emails?
1. Check EmailJS service ID: `service_0uzikxr`
2. Check template ID: `template_fpqq66m`
3. Verify EmailJS account is active and Gmail is connected
4. Check browser console for EmailJS errors

---

## 📈 Success Metrics

### Target Conversion Rate
- **Goal:** 10-12% form submission rate
- **Industry Average:** 7-10% for local services
- **Tracking:** Google Ads Conversions dashboard

### Key Performance Indicators
- Form submissions per week
- Cost per conversion
- Quality Score (target: 7+)
- Click-through rate (CTR)
- Phone calls from ads

---

## 🔐 Credentials & Access

### Services Requiring Login
- **EmailJS:** cleanventprofessional@gmail.com
- **Google Ads:** Account ID `560-530-0933`
- **Google Tag Manager:** Container `GTM-MG4QT5TJ`
- **Google Analytics:** Property `G-W685J6YNLM`
- **Vercel:** Connected to GitHub repo `yadgaro-droid/clear-air-ny-leads`

---

## 📝 Important Notes

1. **Conversion tracking uses GA4 event import** - More reliable for React SPAs than direct GTM conversion tags
2. **Phone number field replaces email** - Better lead qualification with NYC area code validation
3. **gclid parameter preservation is critical** - ThankYou.tsx uses `page_path: window.location.pathname + window.location.search` to preserve gclid for attribution
4. **Conversion Linker Auto Link Domains must match production domain** - Set to `cleanventnyc.com` (not `https://cleanventnyc.com/`)
5. **Tracking scripts only load on production** - Prevents preview domains from polluting data
6. **EmailJS template uses {{phone}} not {{email}}** - Must update template at dashboard.emailjs.com
7. **Privacy Policy is required** - Google Ads won't approve without it
8. **GTM changes require publishing** - Preview mode doesn't affect live site
9. **Conversions may take 24-48 hours to appear** - GA4 import to Google Ads has processing delay
10. **No geo-blocking** - Site accessible worldwide (geo-blocking was tested and removed)

---

## 🎓 Conversion Optimization Applied

Based on industry research (documented in `air-duct-landing-page-guide.md`):

### Implemented Best Practices
✅ **3-field form** (Name, Phone, Service) - Simple and focused
✅ **NYC phone validation** - Pre-qualifies leads geographically
✅ **Auto-formatting phone input** - Better UX, reduces errors
✅ **Orange CTA buttons** - 20-30% higher conversion than blue
✅ **Privacy Policy** - Required for Google Ads compliance
✅ **GA4 conversion tracking** - More reliable for React SPAs
✅ **gclid preservation** - Accurate conversion attribution
✅ **$50 conversion value** - Helps Google optimize bidding
✅ **Mobile-responsive** - 53% of clicks are mobile
✅ **Fast load time** - Target <2 seconds
✅ **Production-only tracking** - Clean data, accurate reporting

### Future Optimization Opportunities
- Add customer testimonials (can increase conversion by 15%)
- Add before/after images (83% engagement increase)
- Add FAQ section (reduces objections)
- A/B test headlines
- Add trust badges (BBB, EPA certification)

---

## 🔄 Recent Changes Log

### December 2, 2025
- ✅ **MAJOR:** Replaced email field with NYC phone number validation
  - Validates area codes: 212, 332, 646, 718, 917, 347, 929
  - Auto-formats as (XXX) XXX-XXXX while typing
  - Red border and error messages for invalid numbers
- ✅ **MAJOR:** Switched conversion tracking from GTM direct to GA4 event import
  - Now using "Clear vent pro (web) form_submit" (GA4) as primary conversion
  - Deleted "Contact Form Submission" (GTM direct) - wasn't detecting properly
  - More reliable for React SPA routing
- ✅ Fixed gclid preservation in ThankYou.tsx virtualPageview
  - Changed from `page: '/thank-you'` to `page_path: pathname + search`
  - Preserves gclid parameter for proper conversion attribution
- ✅ Fixed Conversion Linker Auto Link Domains to `cleanventnyc.com`
- ✅ Updated EmailJS template to use `{{phone}}` instead of `{{email}}`
- ✅ Tested and removed geo-blocking (site accessible worldwide)
- ✅ Published GTM container with all updates

### November 19, 2025
- ✅ Switched email recipient from yadgaro@gmail.com to cleanventprofessional@gmail.com
- ✅ Created Privacy Policy page at `/privacy`
- ✅ Added Google Ads conversion tracking (initial GTM implementation)
- ✅ Restricted tracking to production domain only
- ✅ Cleaned up duplicate conversion actions
- ✅ Fixed GTM domain pollution from Lovable preview builds

---

## 📞 Support Contacts

**For Technical Issues:**
- Developer: Claude AI (via Claude Code)
- Repository: https://github.com/yadgaro-droid/clear-air-ny-leads

**For Business Operations:**
- Business Owner: cleanventprofessional@gmail.com
- Phone: (646) 596-3677

---

**End of Summary**
