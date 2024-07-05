'use client'
import { useEffect, useState } from 'react';

const usePreferredColorScheme = () => {
  const [preferredScheme, setPreferredScheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setPreferredScheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Set the initial value
    handleChange();

    // Listen for changes to the preference
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return preferredScheme;
}

export default usePreferredColorScheme;