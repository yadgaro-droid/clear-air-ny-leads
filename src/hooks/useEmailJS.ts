import { useState } from 'react';

declare global {
  interface Window {
    emailjs?: any;
  }
}

export const useEmailJS = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadEmailJS = () => {
    if (window.emailjs) {
      setIsLoaded(true);
      return Promise.resolve();
    }

    if (isLoading) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (window.emailjs) {
            clearInterval(checkInterval);
            setIsLoaded(true);
            resolve(undefined);
          }
        }, 100);
      });
    }

    setIsLoading(true);

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;

      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init("0b8LuYZ3y4_Z4utia");
          setIsLoaded(true);
          setIsLoading(false);
          resolve(undefined);
        }
      };

      script.onerror = () => {
        setIsLoading(false);
        reject(new Error('Failed to load EmailJS'));
      };

      document.head.appendChild(script);
    });
  };

  return { isLoaded, loadEmailJS };
};
