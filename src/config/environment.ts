/**
 * Environment Detection for CleanVent NYC
 * Distinguishes between production, staging, and development environments
 */

export type Environment = 'production' | 'staging' | 'development';

export const getEnvironment = (): Environment => {
  if (typeof window === 'undefined') {
    return 'development';
  }

  const hostname = window.location.hostname;

  // Production environment
  if (hostname === 'cleanventnyc.com' || hostname === 'www.cleanventnyc.com') {
    return 'production';
  }

  // Staging environment
  if (hostname === 'staging.cleanventnyc.com') {
    return 'staging';
  }

  // Development (localhost, Vercel previews, etc.)
  return 'development';
};

export const isProduction = (): boolean => getEnvironment() === 'production';
export const isStaging = (): boolean => getEnvironment() === 'staging';
export const isDevelopment = (): boolean => getEnvironment() === 'development';

/**
 * Get environment-specific configuration
 */
export const getConfig = () => {
  const env = getEnvironment();

  return {
    environment: env,

    // Email configuration
    emailRecipient: env === 'production'
      ? 'cleanventprofessional@gmail.com'
      : 'staging-test@cleanventprofessional.gmail.com', // You'll need to create this or use your personal email

    emailTemplateId: env === 'production'
      ? 'template_fpqq66m'
      : 'template_fpqq66m', // Use production template for staging testing

    // Analytics configuration
    enableTracking: env === 'production' || env === 'staging',

    // GTM Container ID
    gtmContainerId: env === 'production'
      ? 'GTM-MG4QT5TJ'
      : 'GTM-W24X5XTZ', // Staging GTM container

    // GA4 Measurement ID
    ga4MeasurementId: env === 'production'
      ? 'G-W685J6YNLM'
      : 'G-FBWZ1N7VST', // Staging GA4 property

    // Google Ads Conversion ID
    googleAdsId: env === 'production'
      ? 'AW-17485397894'
      : 'AW-17485397894', // Same ID, but staging traffic won't affect production data
  };
};

// Console log environment on load (helpful for debugging)
if (typeof window !== 'undefined') {
  console.log(`🌍 Environment: ${getEnvironment().toUpperCase()}`);
}
