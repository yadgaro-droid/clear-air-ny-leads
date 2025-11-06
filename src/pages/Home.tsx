import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Wind, Shield, Clock, Star, Phone } from "lucide-react";
import heroImage from "@/assets/hero-duct-cleaning.jpg";

const Home = () => {
  const benefits = [
    { icon: Wind, title: "Improved Air Quality", description: "Remove dust, allergens, and pollutants for healthier breathing" },
    { icon: Shield, title: "Certified Technicians", description: "Licensed and insured professionals you can trust" },
    { icon: Clock, title: "Same-Day Service", description: "Fast response times and flexible scheduling" },
    { icon: Star, title: "100% Satisfaction", description: "Guaranteed quality service or your money back" },
  ];

  const services = [
    "Air Duct Cleaning",
    "Dryer Vent Cleaning",
    "HVAC System Maintenance",
    "Air Quality Testing",
    "Sanitization & Deodorizing",
    "Commercial Services",
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-foreground">
                  Professional Duct Cleaning Services in New York
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Breathe cleaner, healthier air with our expert air duct cleaning services. 
                  Certified technicians, advanced equipment, and 100% satisfaction guaranteed.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg h-14 px-8">
                  <Link to="/contact">Get Free Estimate</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8">
                  <a href="tel:+16465963677" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-2 text-sm font-medium">4.7/5 (200+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Professional duct cleaning service improving air quality in New York home" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-soft p-6 max-w-xs">
                <p className="font-semibold text-2xl text-primary">7+ Years</p>
                <p className="text-muted-foreground">Serving New York</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              New York's trusted duct cleaning experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-foreground">Our Professional Services</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive air duct and HVAC cleaning solutions for residential and commercial properties across New York.
              </p>
              
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="text-lg">{service}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold">Health Benefits of Clean Air Ducts</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Reduce allergens, dust, and indoor air pollutants</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Improve HVAC system efficiency and lifespan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Lower energy bills with better airflow</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Eliminate musty odors and improve air freshness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Create a healthier environment for your family</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Ready for Cleaner, Healthier Air?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free estimate today and experience the difference professional duct cleaning makes
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-8">
            <Link to="/contact">Get Free Estimate Now</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
