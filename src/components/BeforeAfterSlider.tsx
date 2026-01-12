import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  caption?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  autoPlay?: boolean;
  autoPlayDuration?: number;
  priority?: boolean; // For LCP optimization (fetchpriority="high")
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  caption,
  beforeObjectPosition = 'center',
  afterObjectPosition = 'center',
  autoPlay = false,
  autoPlayDuration = 3000,
  priority = false
}: BeforeAfterSliderProps) => {
  // Helper to convert .jpeg path to .webp path
  const getWebPPath = (path: string) => path.replace('.jpeg', '.webp');
  // Helper to get mobile version of image
  const getMobilePath = (path: string) => path.replace('.webp', '-mobile.webp');
  const [sliderPosition, setSliderPosition] = useState(autoPlay ? 100 : 50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const cacheContainerRect = () => {
    if (containerRef.current) {
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMove = (clientX: number) => {
    if (!cachedRectRef.current) return;

    // Cancel previous RAF if exists
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const rect = cachedRectRef.current;
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    // Batch DOM write with RAF
    rafIdRef.current = requestAnimationFrame(() => {
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    });
  };

  const handleMouseDown = () => {
    cacheContainerRect();
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);

      // Clean up RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isDragging]);

  // Auto-play animation effect
  useEffect(() => {
    if (autoPlay && !hasAutoPlayed) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / autoPlayDuration, 1);

        // Animate from 100 (all BEFORE/dirty) to 0 (all AFTER/clean revealed)
        setSliderPosition(100 - (progress * 100));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setHasAutoPlayed(true);
        }
      };

      // Start animation after a brief delay
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [autoPlay, hasAutoPlayed, autoPlayDuration]);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden shadow-lg select-none"
        style={{ cursor: 'ew-resize' }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => {
          cacheContainerRect();
          setIsDragging(true);
        }}
      >
        {/* After Image (Background) */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={getMobilePath(getWebPPath(afterImage))}
            type="image/webp"
          />
          <source
            srcSet={getWebPPath(afterImage)}
            type="image/webp"
          />
          <img
            src={afterImage}
            alt="After"
            className="w-full h-auto object-cover"
            style={{ objectPosition: afterObjectPosition }}
            draggable="false"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={getMobilePath(getWebPPath(beforeImage))}
              type="image/webp"
            />
            <source
              srcSet={getWebPPath(beforeImage)}
              type="image/webp"
            />
            <img
              src={beforeImage}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: beforeObjectPosition }}
              draggable="false"
              fetchPriority={priority ? 'high' : 'auto'}
            />
          </picture>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-600"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-white"></div>
              <div className="w-0.5 h-4 bg-white"></div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-lg font-bold">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-lg font-bold">
          After
        </div>
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
