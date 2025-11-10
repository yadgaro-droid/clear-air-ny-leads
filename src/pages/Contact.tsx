import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d382f73a-e963-48f4-8404-d3d73fffc53a",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || "Not specified",
          message: formData.message || "No additional message",
          from_name: "CleanVent NYC Website",
          subject: `New Lead: ${formData.name} - ${formData.service || "General Inquiry"}`,
          cc: "Shiraleonardshailin@gmail.com,Oriannyc@gmail.com,yadgaro@gmail.com",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Track form submission in GTM
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'form_submit',
          form_name: 'contact_form',
          service_type: formData.service
        });

        // Redirect to thank you page
        navigate("/thank-you");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us at (646) 596-3677",
        variant: "destructive",
      });

      // Track error in GTM
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'form_error',
        error_type: 'submission_failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-6">Get Your Free Estimate</h1>
            <p className="text-xl text-muted-foreground">
              Ready to improve your indoor air quality? Contact us today for a free, no-obligation estimate.
              We'll respond within 2 hours!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Request a Free Estimate</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(646) 596-3677"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="air-duct">Air Duct Cleaning</option>
                    <option value="chimney">Chimney Cleaning</option>
                    <option value="dryer-vent">Dryer Vent Cleaning</option>
                    <option value="hvac">HVAC Maintenance</option>
                    <option value="combo">Air Duct + Chimney Combo</option>
                    <option value="other">Other/Not Sure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Additional Details
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your needs, property size, or any specific concerns..."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Get Free Estimate"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted by our team regarding your estimate request.
                </p>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Prefer to reach out directly? We're here to help! Contact us using any of the methods below.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-2">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <a href="tel:+16465963677" className="text-primary hover:underline text-xl font-bold">
                        (646) 596-3677
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Call us for immediate assistance
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <a href="mailto:yadgaro@gmail.com" className="text-primary hover:underline">
                        yadgaro@gmail.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send us an email anytime
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                      <p className="text-muted-foreground">
                        16 Sunset RD<br />
                        Demarest, NJ 07627
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Serving all of NYC
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Sunday: 8:00 AM - 8:00 PM</p>
                        <p className="text-sm text-green-600 font-medium">Same-day service available!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 mt-8">
                <h3 className="font-semibold text-xl mb-3">7+ Years of Experience</h3>
                <p className="text-muted-foreground mb-4">
                  Licensed & insured professionals serving NYC. We specialize in air duct cleaning,
                  chimney cleaning, and dryer vent cleaning for residential and commercial properties.
                </p>
                <Button variant="outline" asChild>
                  <a href="tel:+16465963677">Call Now: (646) 596-3677</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-foreground mb-6">Areas We Serve</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Proudly serving all of New York City and surrounding areas
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"].map((area) => (
                <div key={area} className="bg-background rounded-lg p-4 font-medium">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
