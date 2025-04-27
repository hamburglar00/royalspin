"use client";

import Image from "next/image";
import config from '@/constants/config.json';

export default function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-xs text-white/80 w-full">
      <div className="flex flex-row justify-center items-center w-full px-8 lg:px-16 gap-6">
        <Image
          src={config.footer.icon247}
          alt="24/7"
          width={30}
          height={30}
          priority
          style={{ width: '30px', height: '30px' }}
        />
        <div className="flex flex-col">
          <p className="tracking-[0.4em] uppercase text-gray-400">
            {config.footer.siteUrl}
          </p>
          <p className="text-xs">{config.footer.copyright}</p>
        </div>

        <Image
          src={config.footer.icon18}
          alt="+18"
          width={30}
          height={30}
          priority
          style={{ width: '30px', height: '30px' }}
        />
      </div>
    </footer>
  );
}
