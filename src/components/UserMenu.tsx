'use client';

import { useState, useEffect } from 'react';
import { FaChevronRight, FaTimes, FaFacebook, FaInstagram } from 'react-icons/fa';
import config from '@/constants/config.json';

interface MenuItem {
  label: string;
  icon?: string;
  href?: string;
}

interface MenuSection {
  label: string;
  options: MenuItem[];
}

interface UserMenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: UserMenuProps) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState(false);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'facebook':
        return <FaFacebook />;
      case 'instagram':
        return <FaInstagram />;
      default:
        return null;
    }
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div
        className={`w-full max-w-md bg-[#1a0a2e] border-4 border-[#471b79] rounded-3xl p-4 mx-4 transform transition-all duration-300 ease-in-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-2xl font-bold text-white">{config.userMenu.title}</h2>
            <p className="text-purple-300 text-sm">10.000 {config.userMenu.points}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-purple-300 transition-colors"
          >
            <FaTimes className="w-8 h-8" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-b border-purple-400 mb-3"></div>

        {/* Menu Items */}
        <div className="space-y-1">
          {config.userMenu.items.map((section: MenuSection) => (
            <div key={section.label} className="bg-[#1a0a2e] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center p-2 text-white hover:bg-[#471b79] rounded-lg transition-colors duration-200"
              >
                <span className={`mr-2 text-purple-300 transition-transform duration-200 ${
                  openSections[section.label] ? 'rotate-90' : ''
                }`}>
                  <FaChevronRight className="w-4 h-4" />
                </span>
                <span className="text-md">{section.label}</span>
              </button>

              <div
                className={`transition-all duration-200 ease-in-out ${
                  openSections[section.label]
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-3 pb-1 space-y-1">
                  {section.options.map((option: MenuItem) => (
                    <a
                      key={option.label}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-1.5 text-sm text-gray-300 hover:text-white hover:bg-[#471b79] rounded transition-colors duration-200 flex flex-row items-center gap-2"
                    >
                      {option.icon ? getIcon(option.icon) : null}
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
