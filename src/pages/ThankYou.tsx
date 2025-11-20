import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Push page view to GTM for SPA routing
    // CRITICAL: Preserve gclid and other URL parameters for Google Ads conversion attribution
    // Without gclid, Google Ads cannot link the conversion to the ad click
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'virtualPageview',
      page_path: window.location.pathname + window.location.search, // Includes ?gclid=... if present
      page_location: window.location.href, // Full URL with all parameters
      page_title: 'Thank You - CleanVent NYC'
    });

    console.log('Thank You page loaded - GTM will handle conversion tracking');
    console.log('Page location with gclid:', window.location.href);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Thank You for Your Request!
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          We've received your information and will contact you within <strong>2 hours</strong> with your free estimate.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">We Review Your Request</h3>
                <p className="text-muted-foreground text-sm">
                  Our team will review your information and service needs immediately.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">We Call You Within 2 Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Expect a call from (646) 596-3677 to discuss your needs and schedule your free inspection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free On-Site Inspection</h3>
                <p className="text-muted-foreground text-sm">
                  We'll schedule a convenient time for our certified technician to visit your property.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Receive Your Free Estimate</h3>
                <p className="text-muted-foreground text-sm">
                  Get a detailed, transparent quote with no hidden fees or obligations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">Need Immediate Assistance?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="tel:+16465963677" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call (646) 596-3677
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:cleanventprofessional@gmail.com" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>

        <Button
          variant="link"
          onClick={() => navigate("/")}
          className="text-muted-foreground"
        >
          ← Return to Home
        </Button>
      </div>
    </main>
  );
};

export default ThankYou;
