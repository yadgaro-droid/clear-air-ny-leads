import ReactCompareImage from 'react-compare-image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeImageFallback?: string;
  afterImageFallback?: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeImageFallback,
  afterImageFallback,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption
}: BeforeAfterSliderProps) => {
  return (
    <div className="space-y-3">
      <div
        className="relative rounded-lg overflow-hidden shadow-lg"
        role="region"
        aria-label={`Before and after comparison: ${caption || 'air duct cleaning'}`}
        tabIndex={0}
      >
        <ReactCompareImage
          leftImage={beforeImage}
          rightImage={afterImage}
          leftImageLabel={beforeLabel}
          rightImageLabel={afterLabel}
          leftImageAlt={beforeAlt}
          rightImageAlt={afterAlt}
          sliderLineColor="#2563EB"
          sliderLineWidth={3}
          handleSize={40}
          hover={true}
        />
      </div>
      {caption && (
        <p className="text-sm text-center text-muted-foreground font-medium">
          {caption}
        </p>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
