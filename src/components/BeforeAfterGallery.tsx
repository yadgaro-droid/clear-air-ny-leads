import BeforeAfterSlider from './BeforeAfterSlider';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  width: number;
  height: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'vent-opening',
    beforeImage: '/images/before-after/vent-opening-before.jpeg',
    afterImage: '/images/before-after/vent-opening-after.jpeg',
    caption: 'Vent Opening',
    beforeObjectPosition: 'center',
    afterObjectPosition: 'center',
    width: 665,
    height: 499
  },
  {
    id: 'rigid-opening',
    beforeImage: '/images/before-after/rigid-opening-before.jpeg',
    afterImage: '/images/before-after/rigid-opening-after.jpeg',
    caption: 'Rigid Duct Opening',
    width: 665,
    height: 499
  },
  {
    id: 'duct-interior',
    beforeImage: '/images/before-after/duct-interior-before.jpeg',
    afterImage: '/images/before-after/duct-interior-after.jpeg',
    caption: 'Duct Interior',
    beforeObjectPosition: '50% 35%',
    afterObjectPosition: '50% 55%',
    width: 665,
    height: 499
  }
];

const BeforeAfterGallery = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">More of Our Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every duct tells a story - here's what else we clean
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item) => (
            <div key={item.id}>
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                caption={item.caption}
                beforeObjectPosition={item.beforeObjectPosition}
                afterObjectPosition={item.afterObjectPosition}
                width={item.width}
                height={item.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
