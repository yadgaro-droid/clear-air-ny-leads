import BeforeAfterSlider from './BeforeAfterSlider';

const FeaturedSlider = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Transformation</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is what we remove from your air ducts - dust, debris, and allergens that you've been breathing
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <BeforeAfterSlider
            beforeImage="/images/before-after/flexible-duct-before.jpeg"
            afterImage="/images/before-after/flexible-duct-after.jpeg"
            caption="Flexible Air Duct - From Years of Dust to Pristine Clean"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;
