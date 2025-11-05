import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manhattan, NY",
      rating: 5,
      text: "Absolutely fantastic service! The team was professional, thorough, and left my home spotless. I noticed an immediate improvement in air quality and my allergies have gotten so much better. Highly recommend!",
      service: "Air Duct Cleaning"
    },
    {
      name: "Michael Chen",
      location: "Brooklyn, NY",
      rating: 5,
      text: "I was skeptical at first, but after seeing the before and after photos of my ducts, I'm a believer. The technician explained everything clearly and the whole process took less than 3 hours. Great value for money!",
      service: "Residential Cleaning"
    },
    {
      name: "Emily Rodriguez",
      location: "Queens, NY",
      rating: 5,
      text: "Had my dryer vent cleaned and HVAC system serviced. The technician was knowledgeable, on time, and very respectful of my home. My dryer now works like new and my energy bills have gone down!",
      service: "Dryer Vent & HVAC"
    },
    {
      name: "David Thompson",
      location: "Bronx, NY",
      rating: 5,
      text: "Best decision I made for my family's health. Our youngest had been struggling with breathing issues, and within a week of the cleaning, we saw a huge improvement. The team was amazing!",
      service: "Air Duct Cleaning"
    },
    {
      name: "Lisa Martinez",
      location: "Staten Island, NY",
      rating: 5,
      text: "Professional, efficient, and reasonably priced. They arrived on time, completed the job perfectly, and cleaned up after themselves. The difference in air quality is remarkable. Will definitely use them again!",
      service: "Full Service Package"
    },
    {
      name: "James Wilson",
      location: "Manhattan, NY",
      rating: 5,
      text: "I manage several commercial properties and have used NY Duct Cleaning Pros for all of them. Consistent quality, reliable service, and great communication. They're my go-to for all HVAC cleaning needs.",
      service: "Commercial Services"
    },
    {
      name: "Amanda Foster",
      location: "Brooklyn, NY",
      rating: 5,
      text: "From the initial estimate to the final walkthrough, everything was top-notch. The technician showed me exactly what was cleaned and explained how to maintain the system. Very impressed!",
      service: "Air Duct Cleaning"
    },
    {
      name: "Robert Kim",
      location: "Queens, NY",
      rating: 5,
      text: "Great customer service! They worked around my schedule and were very accommodating. The air in my home has never felt fresher. Definitely worth every penny!",
      service: "HVAC Maintenance"
    },
    {
      name: "Jennifer Taylor",
      location: "Bronx, NY",
      rating: 5,
      text: "I appreciated the transparent pricing and no hidden fees. The team was courteous and professional. My home feels cleaner and smells fresher. Thank you!",
      service: "Air Quality Testing"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-6">What Our Customers Say</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Don't just take our word for it - hear from hundreds of satisfied customers across New York
            </p>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-2xl font-semibold mb-2">4.7 out of 5 stars</p>
            <p className="text-muted-foreground">Based on 200+ verified reviews</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                  
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-sm text-primary mt-1">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-foreground mb-12">Our Track Record</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">99%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.7/5</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-foreground mb-8">Trusted & Certified</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-muted rounded-xl">
                <div className="font-semibold text-lg mb-2">NADCA Certified</div>
                <div className="text-sm text-muted-foreground">Industry Standards</div>
              </div>
              <div className="p-6 bg-muted rounded-xl">
                <div className="font-semibold text-lg mb-2">BBB A+ Rating</div>
                <div className="text-sm text-muted-foreground">Better Business Bureau</div>
              </div>
              <div className="p-6 bg-muted rounded-xl">
                <div className="font-semibold text-lg mb-2">EPA Certified</div>
                <div className="text-sm text-muted-foreground">Environmental Safety</div>
              </div>
              <div className="p-6 bg-muted rounded-xl">
                <div className="font-semibold text-lg mb-2">Fully Insured</div>
                <div className="text-sm text-muted-foreground">Licensed & Bonded</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
