import BeforeAfterSlider from './BeforeAfterSlider';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'flexible-duct',
    beforeImage: '/images/before-after/flexible-duct-before.jpeg',
    afterImage: '/images/before-after/flexible-duct-after.jpeg',
    caption: 'Flexible Air Duct - Years of dust and debris removed'
  },
  {
    id: 'vent-opening',
    beforeImage: '/images/before-after/vent-opening-before.jpeg',
    afterImage: '/images/before-after/vent-opening-after.jpeg',
    caption: 'Vent Opening - Professional deep cleaning restoration'
  },
  {
    id: 'rigid-opening',
    beforeImage: '/images/before-after/rigid-opening-before.jpeg',
    afterImage: '/images/before-after/rigid-opening-after.jpeg',
    caption: 'Rigid Duct Opening - Complete sanitization'
  }
];

const BeforeAfterGallery = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-4">See the Difference We Make</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from NYC homes just like yours. Our professional cleaning delivers visible,
            measurable improvements to your air quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="transform transition-transform hover:scale-[1.02] duration-300"
            >
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeLabel="Before"
                afterLabel="After"
                caption={item.caption}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            These transformations happen in 2-4 hours. Your ducts could look this clean today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
