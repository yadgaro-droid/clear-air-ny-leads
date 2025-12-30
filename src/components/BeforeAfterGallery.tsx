import BeforeAfterSlider from './BeforeAfterSlider';
import LazyLoad from './LazyLoad';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  beforeImageFallback: string;
  afterImageFallback: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'flexible-duct',
    beforeImage: '/images/before-after/flexible-duct-before.webp',
    afterImage: '/images/before-after/flexible-duct-after.webp',
    beforeImageFallback: '/images/before-after/flexible-duct-before.jpeg',
    afterImageFallback: '/images/before-after/flexible-duct-after.jpeg',
    beforeAlt: 'Flexible air duct before cleaning showing heavy dust accumulation and debris buildup',
    afterAlt: 'Flexible air duct after professional cleaning showing pristine clean surface',
    caption: 'Flexible Air Duct - Years of dust and debris removed'
  },
  {
    id: 'vent-opening',
    beforeImage: '/images/before-after/vent-opening-before.webp',
    afterImage: '/images/before-after/vent-opening-after.webp',
    beforeImageFallback: '/images/before-after/vent-opening-before.jpeg',
    afterImageFallback: '/images/before-after/vent-opening-after.jpeg',
    beforeAlt: 'Vent opening before cleaning showing dust, dirt and particulate matter',
    afterAlt: 'Vent opening after professional cleaning showing sanitized clean surface',
    caption: 'Vent Opening - Professional deep cleaning restoration'
  },
  {
    id: 'rigid-opening',
    beforeImage: '/images/before-after/rigid-opening-before.webp',
    afterImage: '/images/before-after/rigid-opening-after.webp',
    beforeImageFallback: '/images/before-after/rigid-opening-before.jpeg',
    afterImageFallback: '/images/before-after/rigid-opening-after.jpeg',
    beforeAlt: 'Rigid duct opening before cleaning showing contamination and dust buildup',
    afterAlt: 'Rigid duct opening after professional cleaning showing complete sanitization',
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
            <LazyLoad
              key={item.id}
              className="transform transition-transform hover:scale-[1.02] duration-300"
            >
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeImageFallback={item.beforeImageFallback}
                afterImageFallback={item.afterImageFallback}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                beforeLabel="Before"
                afterLabel="After"
                caption={item.caption}
              />
            </LazyLoad>
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
