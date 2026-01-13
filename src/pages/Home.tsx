import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Wind, Shield, Clock, Star, Phone, ShieldCheck, Award, BadgeCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCountUp } from "@/hooks/useCountUp";
import { useEmailJS } from "@/hooks/useEmailJS";
import { getConfig, isStaging } from "@/config/environment";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const BeforeAfterGallery = lazy(() => import("@/components/BeforeAfterGallery"));

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { loadEmailJS } = useEmailJS();
  const familiesCount = useCountUp({ end: 5000, duration: 2000, suffix: "+" });
  const ratingCount = useCountUp({ end: 4.7, duration: 2000, decimals: 1 });
  const reviewsCount = useCountUp({ end: 200, duration: 2000, suffix: "+" });
  const satisfactionCount = useCountUp({ end: 100, duration: 2000, suffix: "%" });
  const yearsCount = useCountUp({ end: 7, duration: 2000, suffix: "+" });

  // Hero section animations
  const heroFamiliesCount = useCountUp({ end: 5000, duration: 3000, suffix: "+", prefix: "" });
  const heroPriceCount = useCountUp({ start: 100, end: 25, duration: 5000, prefix: "$" });

  // NYC area codes: 212, 332, 646, 718, 917, 347, 929
  const validNYCAreaCodes = ['212', '332', '646', '718', '917', '347', '929'];

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const validateNYCPhone = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.length !== 10) {
      return 'Phone number must be 10 digits';
    }

    const areaCode = digits.slice(0, 3);
    if (!validNYCAreaCodes.includes(areaCode)) {
      return `Must be a valid NYC area code (${validNYCAreaCodes.join(', ')})`;
    }

    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);

    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('');
    }
  };

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
    <>
      {/* Sticky Header - Mobile Only */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border md:hidden">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CleanVent NYC" className="h-8 w-8" />
            <span className="font-bold text-base">CleanVent NYC</span>
          </div>
          <Button size="sm" asChild className="h-10">
            <a href="tel:+16465963677" className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </a>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section - Professional Design with Auto-Playing Before/After */}
        <section className="relative md:min-h-[90vh] flex items-center justify-center pt-8 pb-12 md:pb-20 px-5 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="relative z-10 max-w-6xl w-full bg-white/95 py-6 md:py-12 px-6 md:px-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">

            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">

              {/* Left Side - Text & CTA */}
              <div className="text-center md:text-left">
                {/* Main Headline */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4 leading-tight">
                  NYC Air Duct and HVAC Cleaning
                </h1>

                <h2 className="text-2xl md:text-4xl font-semibold text-blue-600 mb-3 md:mb-4">
                  from <span ref={heroPriceCount.ref}>{heroPriceCount.value}</span> per Duct
                </h2>

                {/* Professional Urgency Lines */}
                <div className="mb-3 md:mb-4 space-y-1">
                  <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                    Same-Day Service Available
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                    30-Minute Callback
                  </p>
                </div>

                {/* Credibility Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mb-4 md:mb-6 text-sm">
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 font-semibold py-2 px-3 rounded-lg">
                    ✓ 7+ Years Experience
                  </span>
                  <span className="flex items-center gap-1.5 bg-green-50 text-green-700 font-semibold py-2 px-3 rounded-lg">
                    ✓ Licensed & Insured
                  </span>
                </div>

                {/* Trust Badge */}
                <div className="mb-4 md:mb-6">
                  <span className="inline-block bg-green-500 text-white text-sm md:text-base font-semibold py-2 px-4 md:px-5 rounded-full">
                    Trusted by <span ref={heroFamiliesCount.ref}>{heroFamiliesCount.value}</span> NYC Families
                  </span>
                </div>

                {/* Primary CTA Button */}
                <div className="space-y-2 md:space-y-3">
                  <a
                    href="#contact-form"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)]"
                  >
                    Get Free Quote
                  </a>

                  {/* Secondary Urgency CTA */}
                  <p className="text-sm md:text-base text-gray-600">
                    Needed today? We're near you -{" "}
                    <a href="#contact-form" className="text-blue-600 font-semibold hover:underline">
                      Book Same-Day Service
                    </a>
                    {" "}or{" "}
                    <a href="tel:+16465963677" className="text-blue-600 font-bold hover:underline">
                      📞 (646) 596-3677
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Side - Before/After Slider */}
              <div>
                <div className="mb-3 text-center">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    See The Difference
                  </p>
                </div>
                <BeforeAfterSlider
                  beforeImage="/images/before-after/flexible-duct-before.jpeg"
                  afterImage="/images/before-after/flexible-duct-after.jpeg"
                  caption="Years of dust removed in minutes"
                  autoPlay={false}
                  priority={true}
                  width={665}
                  height={809}
                />
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
                <a href="#contact-form">Schedule Free Inspection</a>
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
                <a href="#contact-form">Get Free Quote</a>
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
      <Suspense fallback={
        <div className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      }>
        <BeforeAfterGallery />
      </Suspense>


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

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Get Your Free Quote</h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll respond within 30 minutes. Or call us now at{" "}
                <a href="tel:+16465963677" className="text-primary font-semibold hover:underline">
                  (646) 596-3677
                </a>
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <form
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    // Validate phone number before submission
                    const error = validateNYCPhone(phone);
                    if (error) {
                      setPhoneError(error);
                      return;
                    }

                    setIsSubmitting(true);

                    try {
                      // Load EmailJS on demand
                      await loadEmailJS();

                      // Log environment for debugging
                      const config = getConfig();
                      console.log(`📧 Submitting form in ${config.environment.toUpperCase()} environment`);
                      if (isStaging()) {
                        console.log('⚠️ STAGING MODE: Email will be sent to test recipient');
                        console.log('💡 TIP: Update EmailJS template to send staging emails to your test inbox');
                      }

                      // @ts-ignore - EmailJS is loaded dynamically
                      await window.emailjs.sendForm('service_0uzikxr', config.emailTemplateId, e.currentTarget);

                      console.log('✅ Email sent successfully');
                      // Redirect to thank you page (conversion tracking happens there)
                      window.location.href = '/thank-you';
                    } catch (error: any) {
                      console.error('❌ EmailJS error:', error);
                      const message = isStaging()
                        ? 'Test form submission failed. Check console for details.'
                        : 'Failed to send message. Please call us at (646) 596-3677';
                      alert(message);
                      setIsSubmitting(false);
                    }
                  }}
                >

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring ${
                        phoneError ? 'border-red-500 focus:ring-red-500' : 'border-input'
                      }`}
                      placeholder="(212) 555-1234"
                      maxLength={14}
                    />
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      NYC area codes only: 212, 332, 646, 718, 917, 347, 929
                    </p>
                  </div>

                  {/* Service Date Preference - Professional Urgency */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Preferred Service Date:
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center text-base text-gray-700 cursor-pointer py-2">
                        <input
                          type="radio"
                          name="service_date"
                          value="today"
                          defaultChecked
                          className="w-5 h-5 mr-3 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        Today (Same-Day Available)
                      </label>
                      <label className="flex items-center text-base text-gray-700 cursor-pointer py-2">
                        <input
                          type="radio"
                          name="service_date"
                          value="tomorrow"
                          className="w-5 h-5 mr-3 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        Tomorrow
                      </label>
                      <label className="flex items-center text-base text-gray-700 cursor-pointer py-2">
                        <input
                          type="radio"
                          name="service_date"
                          value="week"
                          className="w-5 h-5 mr-3 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        This Week
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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

                  <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Get Free Quote'}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll contact you within 30 minutes. Takes less than 60 seconds to complete.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <img src={logo} alt="CleanVent NYC" className="h-10 w-10" />
              <span className="font-bold text-xl">CleanVent NYC</span>
            </div>

            {/* Footer Urgency Line */}
            <p className="text-lg text-gray-600 font-medium">
              Call now for same-day availability in New York City
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="tel:+16465963677" className="flex items-center hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                (646) 596-3677
              </a>
              <span className="hidden sm:block">•</span>
              <span>16 Sunset RD, Demarest, NJ 07627</span>
              <span className="hidden sm:block">•</span>
              <span>Serving all of NYC</span>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Licensed & Insured • EPA-Certified • 7+ Years Experience</p>
              <p className="mt-2">
                © {new Date().getFullYear()} CleanVent NYC. All rights reserved. •{" "}
                <a href="/privacy" className="hover:text-primary underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </>
  );
};

export default Home;
