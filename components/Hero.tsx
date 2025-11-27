import React from 'react';
import { Truck, Star, MessageCircle } from 'lucide-react';
import { OWNER_PHONE } from '../constants';

const Hero: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-soft-peach">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-primary-gold/10 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-navy-blue mb-6 animate-slide-in-left">
          Framing Your <span className="premium-gradient-text">Finest Memories</span>
        </h2>
        
        <p className="text-lg lg:text-2xl text-rich-indigo mb-8 font-medium animate-slide-in-right delay-100">
          Premium Photo Frames & Gifts for Every Occasion
        </p>
        
        <p className="text-primary-gold font-bold text-lg mb-12 animate-fade-in-up delay-200">
          Starting from ₹150 | All India Shipping
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto animate-fade-in-up delay-300">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border-l-4 border-primary-gold">
            <Truck className="text-primary-gold w-8 h-8" />
            <div className="text-left">
              <div className="font-bold text-navy-blue">All India Shipping</div>
              <div className="text-sm text-gray-500">Reliable delivery</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border-l-4 border-primary-gold">
            <Star className="text-primary-gold w-8 h-8" />
            <div className="text-left">
              <div className="font-bold text-navy-blue">Premium Quality</div>
              <div className="text-sm text-gray-500">Crafted with excellence</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border-l-4 border-primary-gold">
            <MessageCircle className="text-primary-gold w-8 h-8" />
            <div className="text-left">
              <div className="font-bold text-navy-blue">24/7 Support</div>
              <div className="text-sm text-gray-500">WhatsApp assistance</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-500">
          <button 
            onClick={onShopNow}
            className="bg-premium-gradient-bg text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #CD7F32 100%)' }}
          >
            Shop Photo Frames
          </button>
          <a 
            href={`https://wa.me/${OWNER_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366] text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={24} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;