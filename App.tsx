import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Ambassador from './components/Ambassador';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import OwnerLogin from './components/OwnerLogin';
import { OWNER_PHONE } from './constants';
import { MessageCircle, Lock } from 'lucide-react';

// About Section Component (Internal for simplicity)
const About = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-5xl font-bold font-serif text-navy-blue mb-4">About Infinity Creation</h3>
            <div className="h-1 w-24 bg-primary-gold mx-auto"></div>
        </div>
        <div className="bg-soft-peach rounded-2xl p-8 lg:p-12 shadow-sm border border-primary-gold/20">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
                Welcome to <strong>Infinity Creation</strong>, your trusted partner for premium photo frames in Coimbatore, Tamil Nadu. Founded by <span className="text-primary-gold font-bold">Bismillah Khan</span>, we specialize in creating beautiful, high-quality frames that preserve your precious memories with style and elegance.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-navy-blue">0+</div>
                    <div className="text-xs text-gray-500">Happy Customers</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-navy-blue">0+</div>
                    <div className="text-xs text-gray-500">Orders Delivered</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-navy-blue">5.0⭐</div>
                    <div className="text-xs text-gray-500">Customer Rating</div>
                </div>
                 <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-navy-blue">24/7</div>
                    <div className="text-xs text-gray-500">Support</div>
                </div>
            </div>
        </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen relative">
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          onApplyAmbassador={() => window.open(`https://wa.me/${OWNER_PHONE}?text=Ambassador%20Application`, '_blank')}
          onScrollTo={scrollToSection}
        />
        
        <Hero onShopNow={() => scrollToSection('products')} />
        <Products />
        <Ambassador />
        <Reviews />
        <Gallery />
        <About />
        <Contact />
        <Footer />

        {/* Modals */}
        <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
            }} 
        />
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        <OwnerLogin isOpen={isOwnerLoginOpen} onClose={() => setIsOwnerLoginOpen(false)} />

        {/* Floating Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
             <button 
                onClick={() => setIsOwnerLoginOpen(true)}
                className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-50 hover:opacity-100"
                title="Owner Login"
             >
                <Lock size={16} />
             </button>
             <a 
                href={`https://wa.me/${OWNER_PHONE}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
             >
                <MessageCircle size={32} />
             </a>
        </div>
      </div>
    </CartProvider>
  );
};

export default App;