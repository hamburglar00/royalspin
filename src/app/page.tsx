"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ContactButton from "@/components/common/ContactButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromotionsCarousel from "@/components/features/PromotionsCarousel";
import LoadingScreen from "@/components/ui/LoadingScreen";
import config from "@/constants/config.json";
import { getImagePath } from "@/utils/imagePath";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      <main
        className={`h-full w-full relative text-white flex flex-col items-center ${
          showContent ? "animate-scale-up-fade-in" : "opacity-0"
        }`}
      >
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 animate-background-zoom"
          style={{
            backgroundImage: `url(${getImagePath(config.site.backgroundImage)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "backgroundZoom 5s ease-in-out infinite alternate",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center px-4 pt-[5rem]">
            {/* Header Section */}
            <Header />

            {/* Logo and Brand Section */}
            <section className="flex flex-col items-center mb-6">
              <div className="animate-spin-pause">
                <Image
                  src={getImagePath(config.site.logo)}
                  alt="RoyalSpin Logo"
                  width={110}
                  height={110}
                  priority
                  className="animate-fade-in"
                />
              </div>
              <h1 className="tracking-[0.1rem] text-3xl font-semibold mt-1 bg-gradient-to-r from-white-400 via-white-300 to-white-400 bg-clip-text animate-fade-in">
                {config.site.name}
              </h1>
              <p className="tracking-[0.3em] text-xs text-white-300 tracking-wide animate-fade-in text-gray-300">
                {config.site.subname}
              </p>
            </section>

            {/* Main Heading Section */}
            <section className="text-center mt-4 mb-6">
              <h2 className="text-4xl font-extrabold mb-0 text-center">
                {config.home.headline}
              </h2>
              <p className="text-center max-w-lg mt-2 mb-6 text-gray-200">
                {config.home.subheadline}
              </p>
            </section>

            {/* Contact Buttons Section */}
            <section className="flex flex-col md:flex-row md:max-w-[800px] w-full items-center justify-center gap-4 mx-auto">
              {config.contactButtons.map(({ label, icon, bonus, href }, index) => (
                <div key={label} className="flex-shrink-0">
                  <ContactButton
                    label={label}
                    icon={icon}
                    bonus={bonus}
                    href={href}
                    filled={label !== "WHATSAPP"}
                    delay={index * 0.5}
                  />
                </div>
              ))}
            </section>

            <section className="flex flex-col items-center justify-center mt-10 w-full">
              <PromotionsCarousel />
            </section>
          </div>

          {/* Footer Section */}
          <Footer />
        </div>
      </main>
    </>
  );
}
