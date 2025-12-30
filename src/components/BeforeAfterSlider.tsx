import ReactCompareImage from 'react-compare-image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption
}: BeforeAfterSliderProps) => {
  return (
    <div className="space-y-3">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <ReactCompareImage
          leftImage={beforeImage}
          rightImage={afterImage}
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
