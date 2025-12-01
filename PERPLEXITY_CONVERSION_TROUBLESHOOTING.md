Question for Perplexity:
Google Ads conversion tracking shows "This conversion action wasn't
 detected" after 6+ hours. Need help troubleshooting.
SETUP:
Domain: cleanventnyc.com (React SPA)
GTM Container: GTM-MG4QT5TJ (published)
Conversion ID: AW-17485397894
Conversion Label: gzaaCNq9vMlbElb_15FB
GTM Tag: "Submit form" fires on /thank-you page view
Setup method: Google Tag Manager (not direct gtag)
VERIFIED WORKING:
✅ Tag Assistant shows conversion tag firing correctly
✅ Network tab shows requests to googleadservices.com with correct
  conversion ID
✅ GTM container is published (not preview)
✅ Form redirects to /thank-you trigger the tag
✅ Using virtualPageview event for SPA routing
THE PROBLEM:
Despite everything firing correctly in Tag Assistant and network
 requests, Google Ads still shows "Inactive" and "conversion action
 wasn't detected" after 6+ hours.
QUESTION:
Why would Tag Assistant and network requests show the conversion
 firing but Google Ads not detect it? Is there a specific SPA requirement or GTM configuration I'm missing for Google Ads to
 recognize the conversion?
 
Perplexity answer:
Troubleshooting Google Ads Conversion Tracking: "Wasn't Detected" Despite Tag Assistant Confirmation
The critical issue you're experiencing is a known discrepancy between Tag Assistant and Google Ads detection, even when tags appear to fire correctly. This is particularly common with React SPAs and GTM. Here are the likely root causes and solutions:

Primary Culprits (In Order of Probability)
1. Missing or Incorrectly Configured Conversion Linker Tag

This is the most common cause for your exact scenario. The Conversion Linker tag is essential for Google Ads conversion tracking. Its core function is to detect the gclid parameter in your landing page URL and store it in a first-party cookie (_gcl_aw and _gcl_au).​

Why this breaks on React SPAs:

When your form redirects to /thank-you, the gclid parameter is no longer in the URL (virtual pageview)

Without the Conversion Linker capturing and storing this in a cookie first, Google Ads cannot associate your conversion with the original ad click

Tag Assistant shows the tag firing because the tag code executes, but Google Ads rejects it because there's no valid gclid or stored cookie to link the conversion

Action items:

Verify you have a Conversion Linker tag in your GTM container set to fire on Initialization - All Pages​

This tag must fire before any Google Ads conversion tags on every page (especially your landing pages)

If you already have one, republish your container to ensure the latest version is live

2. Auto-Tagging Is Disabled

If your Google Ads account has auto-tagging disabled, the gclid parameter won't be added to your ad URLs in the first place.​​

Check immediately:

Go to Google Ads > Admin > Account Settings > Auto-tagging

Verify "Tag the URL that people click through from my ad" is enabled​

This is now on by default for new accounts, but your account may have it disabled​

3. The gclid Parameter Is Being Stripped During SPA Routing

On React SPAs, if your virtual pageview implementation removes query parameters from the tracked URL, Google Ads won't see the gclid.​

Verify:

In your GTM tag's data layer variables, confirm that page_location or page_path for virtual pageviews still contains the gclid parameter

If it doesn't, you need to preserve the gclid in a variable and pass it through your virtual pageview tracking

Example issue:

javascript
// ❌ WRONG - strips gclid
gtag('event', 'page_view', {
  page_path: '/thank-you'  // Lost gclid
});

// ✅ CORRECT - preserves gclid
gtag('event', 'page_view', {
  page_path: '/thank-you?gclid=YOUR_GCLID_VALUE'
});
Secondary Issues to Investigate
4. Tag Sequencing/Timing Issue

Even though your tag fires in Tag Assistant, the timing might be slightly off. Google Ads conversion tags should fire after the Conversion Linker has established the cookie.​

Solution:

In GTM, ensure your Conversion Linker tag has a lower sequence number than your conversion tag

If using event-based tracking, confirm the base Google Tag (with your Conversion ID AW-17485397894) fires first before the specific conversion label tag

5. Data Validation Issue

There's documented evidence that Tag Assistant can show successful conversion tags while Google's servers return an invalid response type. This appears as "Succeeded" in Tag Assistant but Google Ads never records it.​

What to check:

The conversion tag is actually sending the correct data (check Network tab for the full request payload, not just that the request exists)

Verify the conversion label (gzaaCNq9vMlbElb_15FB) exactly matches what's in Google Ads—even a single character mismatch will cause rejection

6. Reporting Delay

Google Ads typically has a 3-6 hour reporting delay for conversion data. After 6+ hours, if nothing appears, it's likely one of the above issues, not just a delay.​

Step-by-Step Diagnostic Process
Confirm auto-tagging is enabled (fastest check first)

Add/verify Conversion Linker tag:

Go to GTM > Tags > New

Search for "Conversion Linker"

Set trigger to "Initialization - All Pages"

Publish container

Test the full flow in GTM Preview Mode:

Enable GTM preview on your live site

Include gclid=TEST123 in your landing page URL manually

Submit your form and navigate to /thank-you

In GTM preview, verify:

Conversion Linker fires first

Your "Submit form" tag fires on thank-you pageview

Check Variables for _gcl_aw cookie value (should exist)

Inspect Network requests:

Filter Network tab for your Conversion ID (AW-17485397894)

Verify the request includes _gcl_au parameter (the browser identifier cookie)

Verify conversion label is correct in the URL

Wait 24 hours with proper setup before assuming failure (some validation happens server-side with delay)

Why Tag Assistant Isn't Catching This
Tag Assistant shows the tag firing because it's testing tag execution, not Google Ads acceptance. It confirms:

The code runs ✓

Network requests are sent ✓

But NOT whether Google's validation servers accept the conversion ✗

This is the critical gap you're experiencing.​

SPA-Specific Best Practice
For React SPAs with GTM, implement this sequence:

Conversion Linker fires on first page load

Use History Change or custom event triggers for virtual pageviews

Preserve gclid in data layer when routing occurs

Fire conversion tag when conversion event fires, not just on pageview

Let me know which of these you've already verified, and we can narrow down the exact cause for your cleanventnyc.com domain.
