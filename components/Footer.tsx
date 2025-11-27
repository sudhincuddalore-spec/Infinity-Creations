import React from 'react';
import { OWNER_NAME, OWNER_PHONE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h4 className="text-2xl font-bold font-serif mb-4 bg-gradient-to-r from-primary-gold to-deep-bronze bg-clip-text text-transparent">Infinity Creation</h4>
                    <p className="text-gray-400 text-sm">Premium photo frames crafted with love and precision. Preserving your memories with style.</p>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#products" className="hover:text-primary-gold">Shop</a></li>
                        <li><a href="#about" className="hover:text-primary-gold">About Us</a></li>
                        <li><a href="#contact" className="hover:text-primary-gold">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-4">Contact</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Owner: {OWNER_NAME}</li>
                        <li>Phone: {OWNER_PHONE}</li>
                        <li>Location: Coimbatore, Tamil Nadu</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2024 Infinity Creation. All rights reserved.</p>
                <p className="mt-1">Designed by <span className="text-purple-400">GROWNEXT MEDIA TECH</span></p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;