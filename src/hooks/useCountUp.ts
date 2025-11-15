import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const startAnimation = () => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, start, hasAnimated]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return {
    ref,
    value: `${prefix}${displayValue}${suffix}`,
  };
};
