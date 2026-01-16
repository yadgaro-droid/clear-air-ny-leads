import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="CleanVent NYC" className="h-10 w-auto" width="64" height="60" />
              <span className="font-bold text-xl">CleanVent NYC</span>
            </div>
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <Card className="mb-6">
            <CardContent className="p-8 space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Effective Date:</strong> November 16, 2025
                </p>
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> November 16, 2025
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  When you submit our contact form, we collect the following information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Name:</strong> To address you properly in our communications</li>
                  <li><strong>Email Address:</strong> To respond to your inquiry</li>
                  <li><strong>Service Needed:</strong> To understand your requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information you provide to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Respond to your service inquiries</li>
                  <li>Provide quotes and estimates</li>
                  <li>Schedule appointments</li>
                  <li>Communicate about our services</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We do <strong>NOT</strong> sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">3. How We Store Your Information</h2>
                <p className="text-muted-foreground">
                  Your form submissions are securely transmitted via EmailJS and stored in our Gmail inbox. We retain your information only as long as necessary to respond to your inquiry and provide our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  We use Google Analytics and Google Tag Manager to understand how visitors use our website. This helps us improve our services. These tools may use cookies to collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Pages you visit</li>
                  <li>Time spent on the site</li>
                  <li>How you found our website</li>
                  <li>General location (city/region level)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You can disable cookies in your browser settings, but this may affect website functionality.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>EmailJS:</strong> To send form submissions to our email</li>
                  <li><strong>Google Analytics:</strong> To analyze website traffic</li>
                  <li><strong>Google Tag Manager:</strong> To manage tracking tags</li>
                  <li><strong>Vercel:</strong> To host our website</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These services have their own privacy policies governing their use of your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Request access to your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of future communications</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, please contact us using the information below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. The "Last Updated" date at the top will reflect when changes were made. Continued use of our website after changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or how we handle your information, please contact us:
                </p>
                <div className="bg-muted rounded-lg p-6 space-y-2">
                  <p className="font-semibold">CleanVent NYC</p>
                  <p className="text-muted-foreground">16 Sunset RD, Demarest, NJ 07627</p>
                  <p className="text-muted-foreground">Phone: (646) 596-3677</p>
                  <p className="text-muted-foreground">Email: info@upsidedown.solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <a href="/">Return to Homepage</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
