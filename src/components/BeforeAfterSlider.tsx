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
  // Use JPEG fallback for better compatibility
  const leftImg = beforeImageFallback || beforeImage;
  const rightImg = afterImageFallback || afterImage;

  return (
    <div className="space-y-3">
      <div
        className="relative rounded-lg overflow-hidden shadow-lg"
        role="region"
        aria-label={`Before and after comparison: ${caption || 'air duct cleaning'}`}
        tabIndex={0}
      >
        <ReactCompareImage
          leftImage={leftImg}
          rightImage={rightImg}
          leftImageLabel={beforeLabel}
          rightImageLabel={afterLabel}
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
