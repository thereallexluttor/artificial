'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function SplineScene() {
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSplineLoad = () => {
    setError(false);
  };

  const handleSplineError = () => {
    setError(true);
    console.warn('Spline scene failed to load');
  };

  return (
    <div className={`w-full h-full flex items-end justify-center relative ${isMobile ? 'pb-16' : 'pb-0'}`}>
      {/* White square background - Mobile Optimized */}
      <div 
        className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-[500px] lg:h-[600px] bg-white rounded-lg shadow-2xl"
        style={{
          bottom: isMobile ? '15%' : '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      />
      
      {/* Robot scene - Mobile Optimized */}
      <div 
        className="w-64 h-64 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] lg:w-[1250px] lg:h-[650px] relative"
        style={{ zIndex: 2 }}
      >
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                🤖
              </div>
              <p className="text-xs">Modelo 3D</p>
            </div>
          </div>
        ) : (
          <Spline
            scene="/robot/scene.splinecode"
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            style={{
              transform: isMobile ? 'scale(1.86)' : 'scale(1.3)', // 69% larger than original (1.43 * 1.3 = 1.86)
              transformOrigin: 'center bottom',
              width: '100%',
              height: '100%',
              position: 'absolute',
              bottom: isMobile ? 'calc(15% + 20px)' : '0%',
              left: '50%',
              marginLeft: '-50%'
            }}
          />
        )}
      </div>
    </div>
  );
} 