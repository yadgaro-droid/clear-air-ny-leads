import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  startOnMount?: boolean;
}

export const useCountUp = ({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  suffix = '',
  prefix = '',
  startOnMount = true,
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      const range = endValue - startValue;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentCount = startValue + (range * easeProgress);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    // Start animation on mount after small delay
    if (startOnMount) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }

    // For elements not on mount, use Intersection Observer
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, start, hasAnimated, startOnMount]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return {
    ref,
    value: `${prefix}${displayValue}${suffix}`,
  };
};
