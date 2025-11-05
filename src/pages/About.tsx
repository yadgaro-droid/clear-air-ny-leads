import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, ThumbsUp, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Customers" },
    { icon: Award, value: "7+", label: "Years Experience" },
    { icon: ThumbsUp, value: "99%", label: "Satisfaction Rate" },
    { icon: TrendingUp, value: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We never compromise on the quality of our work. Every job is completed to the highest standards."
    },
    {
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We listen to your needs and exceed your expectations."
    },
    {
      title: "Certified Professionals",
      description: "Our team is fully licensed, insured, and trained in the latest cleaning techniques."
    },
    {
      title: "Eco-Friendly",
      description: "We use environmentally safe products and methods to protect your health and the planet."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-6">About NY Duct Cleaning Pros</h1>
            <p className="text-xl text-muted-foreground">
              New York's trusted air duct cleaning experts, dedicated to improving indoor air quality 
              and creating healthier living environments for over 7 years.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, NY Duct Cleaning Pros began with a simple mission: to help New York 
                  families breathe easier through professional air duct cleaning services.
                </p>
                <p>
                  What started as a small family business has grown into one of New York's most trusted 
                  names in air quality improvement. We've served over 10,000 satisfied customers, from 
                  residential homes to large commercial properties.
                </p>
                <p>
                  Our success is built on a foundation of quality workmanship, transparent pricing, and 
                  exceptional customer service. Every member of our team is committed to ensuring your 
                  complete satisfaction.
                </p>
                <p>
                  Today, we continue to invest in the latest equipment and training to provide you with 
                  the most effective and efficient duct cleaning services available.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold">Why We're Different</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Advanced Technology</span>
                    <span className="text-muted-foreground text-sm">State-of-the-art equipment and inspection cameras</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Certified Experts</span>
                    <span className="text-muted-foreground text-sm">NADCA certified technicians with ongoing training</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Transparent Pricing</span>
                    <span className="text-muted-foreground text-sm">No hidden fees, upfront quotes you can trust</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">100% Guarantee</span>
                    <span className="text-muted-foreground text-sm">Your satisfaction is guaranteed or your money back</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-foreground mb-6">Certifications & Affiliations</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We maintain the highest industry standards through our certifications and memberships
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">NADCA Certified</div>
                <div className="text-sm">National Air Duct Cleaners Association</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">EPA Certified</div>
                <div className="text-sm">Environmental Protection Agency</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">BBB A+ Rating</div>
                <div className="text-sm">Better Business Bureau</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg mb-1">Fully Insured</div>
                <div className="text-sm">Licensed & Bonded</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
