import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Success message
    toast({
      title: "Request Received!",
      description: "Thank you! We'll contact you within 24 hours with your free estimate.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-6">Get Your Free Estimate</h1>
            <p className="text-xl text-muted-foreground">
              Ready to improve your indoor air quality? Contact us today for a free, no-obligation estimate. 
              We'll respond within 24 hours!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
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
                    placeholder="(555) 123-4567"
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
                    <option value="dryer-vent">Dryer Vent Cleaning</option>
                    <option value="hvac">HVAC Maintenance</option>
                    <option value="air-quality">Air Quality Testing</option>
                    <option value="sanitization">Sanitization Services</option>
                    <option value="commercial">Commercial Services</option>
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

                <Button type="submit" size="lg" className="w-full">
                  Get Free Estimate
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted by our team regarding your estimate request.
                </p>
              </form>
            </div>

            {/* Contact Information */}
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
                      <a href="tel:+16465963677" className="text-primary hover:underline">
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
                      <a href="mailto:info@nyductcleaning.com" className="text-primary hover:underline">
                        info@nyductcleaning.com
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
                      <h3 className="font-semibold text-lg mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        123 Clean Air Street<br />
                        New York, NY 10001
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
                        <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                        <p>Saturday: 9:00 AM - 6:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 mt-8">
                <h3 className="font-semibold text-xl mb-3">Emergency Service Available</h3>
                <p className="text-muted-foreground mb-4">
                  Need urgent assistance? We offer 24/7 emergency service for critical situations like 
                  suspected mold, severe air quality issues, or HVAC failures.
                </p>
                <Button variant="outline" asChild>
                  <a href="tel:+16465963677">Call Emergency Line</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
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
