# CleanVent NYC - Project Setup Summary

**Domain:** https://cleanventnyc.com
**Last Updated:** November 19, 2025
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
- Name (required)
- Email (required)
- Service Needed (dropdown, required)
- **Phone:** Intentionally removed to reduce form abandonment

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
- **Conversion ID:** `AW-17485397894`
- **Conversion Label:** `gzaaCNq9vMlbElb_15FB`
- **Implementation:** Google Tag Manager tag
- **Trigger:** Thank You page view (`/thank-you`)
- **Conversion Value:** $50 USD per lead

### Google Analytics
- **Property ID:** `G-W685J6YNLM` (GA4)
- **Integration:** Via Google Tag Manager

---

## 🏷️ Google Tag Manager Configuration

### Tags
1. **Tag Google Analytics GA4 Configuration** - Fires on all pages
2. **Google Tag AW-17485397894** - Global site tag
3. **Submit form** - Google Ads Conversion Tracking
   - Type: Google Ads Conversion Tracking
   - Conversion ID: `17485397894`
   - Conversion Label: `gzaaCNq9vMlbElb_15FB`
   - Value: 50
   - Currency: USD
   - Trigger: Thank you - Page View

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
1. **Contact Form Submission**
   - Source: Website (GTM)
   - Category: Submit lead form
   - Value: $50
   - Action optimization: Primary

2. **Call ((646) 596-3677)**
   - Source: Website
   - Category: Contact
   - Action optimization: Primary

3. **Calls from ads**
   - Source: Call from Ads
   - Category: Phone call lead
   - Action optimization: Primary

### Removed/Cleaned Up
- ❌ "Submit lead form" (duplicate, no tag installed)
- ❌ "Click to call" (inactive duplicate)
- ❌ "phone click" (duplicate)
- ❌ "Clear vent pro (web) form_submit" (GA4 import, less accurate)

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

1. **User visits** https://cleanventnyc.com
2. **GTM loads** (production domain only)
3. **User fills form** (Name, Email, Service)
4. **EmailJS sends email** to cleanventprofessional@gmail.com
5. **User redirects** to `/thank-you`
6. **GTM detects** page view on `/thank-you`
7. **Conversion tag fires** with label `gzaaCNq9vMlbElb_15FB`
8. **Google Ads records** $50 conversion
9. **Campaign optimizes** based on conversion data

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

1. **Conversion tracking uses GTM exclusively** - Direct gtag code was removed to prevent duplicate tracking
2. **Phone number field was removed from form** - Reduces abandonment by 33% (37% → 4%)
3. **Tracking scripts only load on production** - Prevents preview domains from polluting data
4. **EmailJS sends from business email** - cleanventprofessional@gmail.com for professional appearance
5. **Privacy Policy is required** - Google Ads won't approve without it
6. **GTM changes require publishing** - Preview mode doesn't affect live site
7. **Conversions may take 3-6 hours to appear** - Google Ads processes conversions with slight delay

---

## 🎓 Conversion Optimization Applied

Based on industry research (documented in `air-duct-landing-page-guide.md`):

### Implemented Best Practices
✅ **3-field form** (reduced from 5) - Increases conversion 25% → target
✅ **Phone optional** - Reduces abandonment 37% → 4%
✅ **Orange CTA buttons** - 20-30% higher conversion than blue
✅ **Privacy Policy** - Required for Google Ads compliance
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

### November 19, 2025
- ✅ Switched email recipient from yadgaro@gmail.com to cleanventprofessional@gmail.com
- ✅ Created Privacy Policy page at `/privacy`
- ✅ Added Google Ads conversion tracking (GTM implementation)
- ✅ Restricted tracking to production domain only
- ✅ Cleaned up duplicate conversion actions
- ✅ Removed phone number field from contact form
- ✅ Fixed GTM domain pollution from Lovable preview builds
- ✅ Published GTM container with form conversion tag

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
