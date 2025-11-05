import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Flame, Droplets, TestTube, Sparkles, Building } from "lucide-react";
import servicesHero from "@/assets/services-hero.jpg";

const Services = () => {
  const services = [
    {
      icon: Wind,
      title: "Air Duct Cleaning",
      description: "Complete cleaning of your HVAC air duct system to remove dust, debris, and allergens.",
      features: [
        "Removal of dust, pollen, and allergens",
        "Inspection with camera technology",
        "Antimicrobial treatment available",
        "Improved air circulation"
      ]
    },
    {
      icon: Flame,
      title: "Dryer Vent Cleaning",
      description: "Prevent fire hazards and improve dryer efficiency with professional vent cleaning.",
      features: [
        "Fire hazard prevention",
        "Improved dryer performance",
        "Reduced energy consumption",
        "Extended appliance lifespan"
      ]
    },
    {
      icon: Droplets,
      title: "HVAC System Maintenance",
      description: "Comprehensive maintenance to keep your heating and cooling system running efficiently.",
      features: [
        "Complete system inspection",
        "Filter replacement",
        "Coil cleaning",
        "Performance optimization"
      ]
    },
    {
      icon: TestTube,
      title: "Air Quality Testing",
      description: "Professional testing to identify pollutants and ensure your indoor air is healthy.",
      features: [
        "Comprehensive air quality analysis",
        "Allergen detection",
        "Mold and bacteria testing",
        "Detailed reporting"
      ]
    },
    {
      icon: Sparkles,
      title: "Sanitization & Deodorizing",
      description: "Eliminate odors and bacteria with our professional sanitization services.",
      features: [
        "EPA-approved sanitizers",
        "Odor elimination",
        "Bacteria and mold treatment",
        "Fresh, clean air"
      ]
    },
    {
      icon: Building,
      title: "Commercial Services",
      description: "Specialized duct cleaning services for offices, restaurants, and commercial buildings.",
      features: [
        "Minimal business disruption",
        "Compliance with regulations",
        "Large-scale systems",
        "Flexible scheduling"
      ]
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-foreground mb-4">Our Professional Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive air duct and HVAC cleaning solutions for residential and commercial properties in New York
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={servicesHero} 
                alt="Professional HVAC technician providing duct cleaning services in New York" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-elevated">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-foreground mb-4">Our Proven Process</h2>
            <p className="text-xl text-muted-foreground">
              We follow a thorough, systematic approach to ensure the best results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Inspection", description: "Thorough assessment of your duct system" },
              { step: "02", title: "Preparation", description: "Protect your home and setup equipment" },
              { step: "03", title: "Deep Cleaning", description: "Remove all contaminants and debris" },
              { step: "04", title: "Final Check", description: "Quality inspection and customer walkthrough" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free estimate and breathe easier tomorrow
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-8">
            <Link to="/contact">Get Your Free Estimate</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Services;
