"use client"
import React, { useState } from 'react';
import { Bed, Plug, ArrowRight, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Partner With Us', href: '/partnerWithUs' },
  { label: 'Contact', href: '/contact' },
  { label: 'Career', href: 'https://www.dassgroup.in/career' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className={`w-full ${isOpen? 'bg-white' : 'bg-white/70'} px-4 py-3 sm:px-8 font-sans fixed top-0 z-50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-2 group">
           <img src={'/images/evstay-logo.avif'} alt='evstay logo' className='w-32'/>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-base font-normal transition-colors duration-200 ${
                item.active
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-900 hover:text-primary-600'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md shadow-primary-600/20 transition-all group"
          >
            Partner with Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 hover:text-primary-600 focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col space-y-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-base font-normal transition-colors duration-200 ${
                item.active
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-900 hover:text-primary-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md shadow-primary-600/20 transition-all w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Partner with Us
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;