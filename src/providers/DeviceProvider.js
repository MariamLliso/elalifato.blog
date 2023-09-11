import DeviceContext from 'context/DeviceContext';
import React, { useState, useEffect } from 'react';

function DeviceProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 640);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <DeviceContext.Provider value={{ isMobile }}>{children}</DeviceContext.Provider>;
}

export default DeviceProvider;
