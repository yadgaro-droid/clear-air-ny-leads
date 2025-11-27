// Vercel Edge Middleware for Geo-blocking
// Blocks traffic from outside US and Israel

export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  // Get country code from Vercel's geo headers
  const country = request.geo?.country || 'UNKNOWN';

  // Allow US and Israel only
  const allowedCountries = ['US', 'IL'];

  // Check if the request is already for the blocked page
  const url = new URL(request.url);
  if (url.pathname === '/blocked.html') {
    // Allow access to the blocked page itself
    return;
  }

  // Block if country is not in allowed list
  if (!allowedCountries.includes(country)) {
    console.log(`Blocked access from ${country} - IP: ${request.ip || 'unknown'}`);

    // Redirect to blocked page
    const blockedUrl = new URL('/blocked.html', request.url);
    return Response.redirect(blockedUrl, 302);
  }

  // Allow access for US and IL
  console.log(`Allowed access from ${country}`);
  return;
}
