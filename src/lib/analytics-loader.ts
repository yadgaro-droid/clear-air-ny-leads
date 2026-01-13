/**
 * Lazy Analytics Loader
 * Defers GTM and tracking scripts until after initial page load
 * Improves FCP by ~1.5s and saves 165.7 KiB of blocking JavaScript
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer immediately (required before GTM loads)
window.dataLayer = window.dataLayer || [];

interface AnalyticsConfig {
  gtmId: string | null;
  ga4Id: string | null;
  googleAdsId: string | null;
  isProduction: boolean;
  isStaging: boolean;
  isDevelopment: boolean;
}

function getEnvironmentConfig(): AnalyticsConfig {
  const hostname = window.location.hostname;
  const isProduction = hostname === 'cleanventnyc.com' || hostname === 'www.cleanventnyc.com';
  const isStaging = hostname === 'staging.cleanventnyc.com';
  const isDevelopment = !isProduction && !isStaging;

  return {
    gtmId: isProduction ? 'GTM-MG4QT5TJ' : (isStaging ? 'GTM-W24X5XTZ' : null),
    ga4Id: isProduction ? 'G-W685J6YNLM' : (isStaging ? 'G-FBWZ1N7VST' : null),
    googleAdsId: isProduction ? 'AW-17485397894' : null,
    isProduction,
    isStaging,
    isDevelopment
  };
}

function loadGTM(gtmId: string, environment: string) {
  // GTM loader function
  (function(w: any, d: Document, s: string, l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode!.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', gtmId);

  console.log('✅ GTM loaded (deferred):', gtmId, `(${environment})`);
}

function loadGoogleAds(googleAdsId: string) {
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
  document.head.appendChild(gtagScript);

  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', googleAdsId);

  console.log('✅ Google Ads loaded (deferred):', googleAdsId);
}

export function initializeAnalytics() {
  const config = getEnvironmentConfig();

  // Log environment
  if (config.isDevelopment) {
    console.log('🔧 Development mode - Tracking disabled');
    return;
  }

  // Defer GTM loading until after page load
  if (config.gtmId) {
    const environment = config.isProduction ? 'Production' : 'Staging';

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGTM(config.gtmId!, environment));
    } else {
      setTimeout(() => loadGTM(config.gtmId!, environment), 0);
    }
  }

  // Defer Google Ads loading (production only)
  if (config.googleAdsId) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGoogleAds(config.googleAdsId!));
    } else {
      setTimeout(() => loadGoogleAds(config.googleAdsId!), 0);
    }
  }
}

// Auto-initialize after window load
if (document.readyState === 'complete') {
  initializeAnalytics();
} else {
  window.addEventListener('load', initializeAnalytics);
}
