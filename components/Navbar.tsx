import React, { useState } from 'react';
import { Menu, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OWNER_PHONE } from '../constants';

interface NavbarProps {
  onOpenCart: () => void;
  onApplyAmbassador: () => void;
  onScrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onApplyAmbassador, onScrollTo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <div className="flex flex-col cursor-pointer" onClick={() => handleNavClick('hero')}>
            <h1 className="text-xl lg:text-3xl font-bold font-serif premium-gradient-text tracking-tight">
              Infinity Creation
            </h1>
            <p className="text-[10px] lg:text-xs text-gray-600 font-light tracking-widest uppercase hidden sm:block">
              Drafted dreams. Endless memories
            </p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => handleNavClick('products')} className="text-navy-blue hover:text-primary-gold font-medium transition-colors">Shop Frames</button>
            <button onClick={() => handleNavClick('products')} className="text-navy-blue hover:text-primary-gold font-medium transition-colors">Combos</button>
            <button onClick={onApplyAmbassador} className="text-navy-blue hover:text-primary-gold font-medium transition-colors">Ambassador</button>
            <button onClick={() => handleNavClick('about')} className="text-navy-blue hover:text-primary-gold font-medium transition-colors">About</button>
            <button onClick={() => handleNavClick('contact')} className="text-navy-blue hover:text-primary-gold font-medium transition-colors">Contact</button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenCart} 
              className="relative p-2 text-navy-blue hover:text-primary-gold transition-transform hover:scale-110"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            
            <a 
              href={`tel:${OWNER_PHONE}`}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-navy-blue to-rich-indigo text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </a>

            <button 
              className="lg:hidden p-2 text-navy-blue hover:text-primary-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in-up">
          <div className="flex flex-col p-4 space-y-4">
            <button onClick={() => handleNavClick('products')} className="text-left px-4 py-3 rounded-lg hover:bg-yellow-50 text-navy-blue font-semibold">Shop Frames</button>
            <button onClick={onApplyAmbassador} className="text-left px-4 py-3 rounded-lg hover:bg-yellow-50 text-navy-blue font-semibold">Campus Ambassador</button>
            <button onClick={() => handleNavClick('about')} className="text-left px-4 py-3 rounded-lg hover:bg-yellow-50 text-navy-blue font-semibold">About Us</button>
            <button onClick={() => handleNavClick('contact')} className="text-left px-4 py-3 rounded-lg hover:bg-yellow-50 text-navy-blue font-semibold">Contact</button>
            <a href={`tel:${OWNER_PHONE}`} className="flex items-center justify-center gap-2 bg-navy-blue text-white py-3 rounded-lg font-bold">
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;