"use client";

import { cn } from "@/lib/utils";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import Image from "next/image";
import { ContactButtonType } from "@/types/contact";
import { getImagePath } from "@/utils/imagePath";
import config from "@/constants/config.json";
import toast from "react-hot-toast";

const getIcon = (icon: string) => {
  switch (icon) {
    case "whatsapp":
      return <BsWhatsapp className="w-8 h-8" />;
    case "telegram":
      return <FaTelegramPlane className="w-8 h-8 text-black" />;
    case "chat":
      return <SiWechat className="w-8 h-8 text-black" />;
    default:
      return null;
  }
};

export default function ContactButton({
  label,
  icon,
  bonus,
  href,
  className,
  filled = true,
  delay = 0,
}: ContactButtonType & { delay?: number }) {
  const handleClick = () => {

    if (!href) {
      toast.error(config.notifications.unavailable, {
        style: {
          background: "#1a0a2e",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        icon: "⚠️",
      });
      return;
    }
    window.open(href, "_blank");
  };

  return (
    <div className="relative w-[250px] h-[60px]">
      {bonus && (
        <div className="absolute -top-4 -right-6 z-10 animate-gentle-scale">
          <Image
            src={getImagePath(`/assets/bono-${bonus}.png`)}
            alt={`Bono ${bonus}%`}
            width={100}
            height={100}
            priority
            className="w-150 h-auto"
          />
        </div>
      )}
      <button
        onClick={handleClick}
        className={cn(
          "relative w-full h-full flex items-center justify-center gap-3 px-4 rounded-full transition-all hover:scale-105",
          "border-[4px] border-purple-400",
          "shadow-[0_0_30px_rgba(168,85,247,0.5),inset_0_0_20px_rgba(168,85,247,0.4)]",
          "hover:border-purple-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.7),inset_0_0_25px_rgba(168,85,247,0.5)]",
          "after:absolute after:inset-0 after:rounded-full after:border-[4px] after:border-purple-300/60 after:blur-[3px]",
          "before:absolute before:inset-0 before:rounded-full before:border-[4px] before:border-purple-400/30 before:blur-[8px]",
          filled ? "bg-white text-black" : "bg-transparent text-white",
          className
        )}
        style={{
          animation: `pulse-glow 2s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {getIcon(icon)}
        <span className={cn("font-extrabold", !filled && "text-shadow-sm")}>
          {label}
        </span>
      </button>
    </div>
  );
}
