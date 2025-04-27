'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import config from '@/constants/config.json';
import { getImagePath } from '@/utils/imagePath';
import '@/styles/animations.css';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShow(false);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500
      bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-950/40
      ${isExiting ? 'animate-fade-out' : ''}`}
      style={{
        backgroundImage: `url('${getImagePath('/assets/Fondo_smoke.webp')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.5,
        mixBlendMode: 'normal'
      }}
    >
      <div className={`relative flex flex-col items-center ${isExiting ? 'animate-scale-down-fade-out' : ''}`}>
        <div className="absolute inset-0 bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="animate-spin-slow relative w-[250px] h-[250px]">
          <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-pulse-glow" />
          <div className="absolute inset-0 rounded-full border-4 border-purple-300/60 animate-pulse-glow-delayed" />
          <Image
            src={getImagePath(config.site.loadingImage)}
            alt="Royal Spin Loading"
            width={250}
            height={250}
            priority
            className="animate-fade-in w-full h-full object-contain"
          />
        </div>
        {/* <div className="mt-8 text-2xl font-bold text-purple-200 tracking-wider flex items-center">
          <div className="inline-flex ml-1">
            <span className="animate-bounce-dot" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce-dot" style={{ animationDelay: '333ms' }}>.</span>
            <span className="animate-bounce-dot" style={{ animationDelay: '666ms' }}>.</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
