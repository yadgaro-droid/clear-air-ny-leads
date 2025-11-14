import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Wind, Shield, Clock, Star, Phone, ShieldCheck, Award, BadgeCheck } from "lucide-react";
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
    "Chimney Cleaning & Inspection",
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
                  Professional Air Duct Cleaning in NYC — Breathe Cleaner Air Today
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Trusted by 5,000+ NYC families. Same-day service. Licensed & insured. Free air quality inspection.
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

              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-2 text-sm font-medium">4.7/5 (200+ reviews)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-3">
                    <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold">7+ Years Experience</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-3">
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold">100% Satisfaction</span>
                  </div>
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

      {/* The Problem Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Why Clean Air Ducts Matter</h2>
              <p className="text-xl text-muted-foreground">
                73% of New York homes have dirty air ducts. Allergens, mold, and dust accumulate over years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl font-bold text-destructive">15-30%</div>
                  <p className="font-semibold">Efficiency Loss</p>
                  <p className="text-muted-foreground text-sm">
                    Dirty ducts reduce HVAC efficiency, costing you $50-100+ per month in wasted energy
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl font-bold text-destructive">2-5x</div>
                  <p className="font-semibold">More Allergens</p>
                  <p className="text-muted-foreground text-sm">
                    Increased allergies and respiratory issues from circulating dust, pollen, and pet dander
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl font-bold text-destructive">10+ Years</div>
                  <p className="font-semibold">Of Buildup</p>
                  <p className="text-muted-foreground text-sm">
                    Musty odors and poor air quality from years of accumulated contaminants
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Professional duct cleaning removes all accumulated contaminants and improves your indoor air quality immediately.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Schedule Free Inspection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">What NYC Customers Say</h2>
            <p className="text-xl text-muted-foreground">Trusted by thousands of New York families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground italic">
                  "My allergies literally disappeared after they cleaned our ducts. I don't wake up with sinus pressure anymore. Professional, on-time, thorough. Highly recommend!"
                </p>
                <p className="font-semibold">— Sarah M., Manhattan</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground italic">
                  "Best $400 I've spent. Our electric bill dropped $30 a month. The team was respectful, efficient, and cleaned up after themselves. Coming back next year!"
                </p>
                <p className="font-semibold">— Michael T., Brooklyn</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground italic">
                  "We've lived in our apartment for 12 years and never had our ducts cleaned. Shocked at the dust they pulled out. Air quality is night and day different. Thank you!"
                </p>
                <p className="font-semibold">— Jennifer L., Queens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-foreground mb-8 text-center">Common Questions About Air Duct Cleaning</h2>

            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">How often should I have my air ducts cleaned?</h3>
                  <p className="text-muted-foreground">
                    Every 3-5 years for most homes. More frequently if you have pets, allergies, or live in dusty areas. We'll recommend a schedule based on your inspection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">What areas do you serve?</h3>
                  <p className="text-muted-foreground">
                    All of New York City—Manhattan, Brooklyn, Queens, the Bronx, Staten Island, and surrounding areas. Same-day service available throughout the five boroughs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Are your technicians licensed and insured?</h3>
                  <p className="text-muted-foreground">
                    Absolutely. Our technicians are EPA-certified, licensed by New York State, and fully insured with $2M liability coverage for your protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">How long does air duct cleaning take?</h3>
                  <p className="text-muted-foreground">
                    Most residential jobs take 2-4 hours depending on the size of your home and HVAC system. We'll provide an accurate time estimate during your free inspection.
                  </p>
                </CardContent>
              </Card>
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
