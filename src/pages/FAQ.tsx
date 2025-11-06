import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "How often should I have my air ducts cleaned?",
      answer: "The National Air Duct Cleaners Association (NADCA) recommends having your air ducts professionally cleaned every 3-5 years. However, you may need more frequent cleaning if you have pets, smokers in the home, recent renovations, or family members with allergies or respiratory conditions."
    },
    {
      question: "How long does the duct cleaning process take?",
      answer: "A typical residential duct cleaning takes 2-4 hours, depending on the size of your home and the complexity of your HVAC system. Larger homes or commercial properties may take longer. We'll provide you with an accurate time estimate during your free consultation."
    },
    {
      question: "Will duct cleaning make a mess in my home?",
      answer: "No! We use professional equipment with HEPA filtration and take extensive precautions to protect your home. We lay down protective coverings, and our technicians are trained to leave your home as clean as they found it. Many customers are surprised at how clean the process is."
    },
    {
      question: "How much does air duct cleaning cost?",
      answer: "Costs vary based on the size of your home, number of vents, and specific services needed. On average, residential duct cleaning ranges from $300-$600. We offer free, no-obligation estimates and transparent pricing with no hidden fees. Contact us for an exact quote for your property."
    },
    {
      question: "What are the signs that my ducts need cleaning?",
      answer: "Common signs include: visible dust buildup around vents, musty or stale odors when the HVAC runs, increased allergy symptoms, visible mold growth, pest infestation, recent home renovation, or if you've never had your ducts cleaned. If you notice any of these signs, it's time for a professional inspection."
    },
    {
      question: "Is duct cleaning worth it?",
      answer: "Absolutely! Professional duct cleaning improves indoor air quality, increases HVAC efficiency (which can lower energy bills), extends the life of your HVAC system, reduces allergens and irritants, and creates a healthier living environment. The investment pays for itself through improved health and energy savings."
    },
    {
      question: "Are your technicians certified and insured?",
      answer: "Yes! All our technicians are NADCA certified, fully licensed, and insured. We maintain the highest industry standards and continue ongoing training to stay current with the latest techniques and technologies. You can trust that your home is in professional hands."
    },
    {
      question: "Do you offer same-day service?",
      answer: "Yes, we offer same-day service in many cases, subject to availability. We understand that air quality issues can be urgent, especially for families with allergies or respiratory conditions. Call us to check same-day availability in your area."
    },
    {
      question: "What's included in your duct cleaning service?",
      answer: "Our comprehensive service includes: inspection with camera technology, cleaning of all supply and return vents, cleaning of the main trunk lines, blower motor and evaporator coil cleaning, sanitization and deodorizing (optional), filter replacement recommendations, and a final inspection with before/after photos."
    },
    {
      question: "How do I prepare for duct cleaning service?",
      answer: "Preparation is minimal! Simply ensure clear access to all vents and registers, clear the area around your furnace/air handler, secure any pets, and inform us of any specific concerns. We'll handle the rest!"
    },
    {
      question: "Do you clean commercial HVAC systems?",
      answer: "Yes! We provide comprehensive commercial duct cleaning services for offices, restaurants, retail spaces, medical facilities, and more. We work around your business hours to minimize disruption and ensure compliance with health and safety regulations."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), checks, and offer financing options for larger projects. Payment is due upon completion of service."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "Yes! We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll make it right or refund your money. We're committed to exceeding your expectations on every job."
    },
    {
      question: "Can duct cleaning help with allergies?",
      answer: "Definitely! Duct cleaning removes allergens like dust mites, pollen, pet dander, and mold spores that accumulate in your ductwork. Many customers report significant improvement in allergy symptoms after professional duct cleaning, especially when combined with regular filter changes."
    },
    {
      question: "What areas do you serve in New York?",
      answer: "We proudly serve all five boroughs of New York City (Manhattan, Brooklyn, Queens, The Bronx, and Staten Island) as well as surrounding areas. Contact us to confirm we service your specific location and to schedule your free estimate."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-foreground mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our duct cleaning services. 
              Can't find what you're looking for? Contact us directly!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:text-primary">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-foreground">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground">
              Our friendly team is here to help! Get in touch for personalized answers and a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+16465963677">Call (646) 596-3677</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
