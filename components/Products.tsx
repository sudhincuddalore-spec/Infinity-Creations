import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Modal from './ui/Modal';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Quick View State
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setSize(product.sizes[0]);
    setColor(product.colors[0]);
    setPhotoPreview(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, size, color, photoPreview || undefined);
      setSelectedProduct(null);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-5xl font-bold font-serif text-navy-blue mb-4">Our Premium Collection</h3>
          <div className="h-1 w-24 bg-primary-gold mx-auto mb-6"></div>
          <p className="text-lg text-rich-indigo font-medium">Handcrafted frames for your precious memories</p>
        </div>

        {/* Special Offers Banner */}
        <div className="bg-soft-peach border-2 border-primary-gold rounded-2xl p-8 mb-16 shadow-lg text-center animate-pulse">
            <h4 className="text-2xl font-bold text-navy-blue font-serif mb-4">🎉 SPECIAL OFFERS</h4>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-primary-gold text-xl">BULK ORDERS</p>
                    <p className="text-navy-blue font-bold text-3xl">UPTO 50% OFF</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-primary-gold text-xl">BEST PRICE</p>
                    <p className="text-navy-blue font-bold text-3xl">GUARANTEED</p>
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white text-center">
                {product.category === 'combo' && (
                   <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">SAVE BIG</span>
                )}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{product.image}</div>
                <h5 className="text-xl font-bold text-navy-blue font-serif mb-2">{product.name}</h5>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <div className="flex justify-center items-center gap-3">
                  <span className="text-2xl font-bold text-primary-gold">₹{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => openQuickView(product)}
                    className="flex items-center justify-center gap-2 border border-primary-gold text-primary-gold py-2 rounded-lg font-semibold hover:bg-primary-gold hover:text-white transition-colors"
                  >
                    <Eye size={18} /> View
                  </button>
                  <button 
                    onClick={() => {
                        addToCart(product, product.sizes[0], product.colors[0]);
                    }}
                    className="flex items-center justify-center gap-2 bg-navy-blue text-white py-2 rounded-lg font-semibold hover:bg-rich-indigo transition-colors"
                  >
                    <ShoppingBag size={18} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name} className="max-w-4xl">
        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 text-center">
                <div className="text-9xl bg-gray-50 rounded-xl p-8">{selectedProduct.image}</div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                    <p className="text-sm font-medium mb-2 text-gray-600">Upload Photo for Preview (Optional)</p>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-gold file:text-white hover:file:bg-deep-bronze" />
                </div>
                
                {photoPreview && (
                    <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden border border-gray-200">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setPhotoPreview(null)} className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1">X</button>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-3xl font-bold text-navy-blue font-serif mb-2">₹{selectedProduct.price}</h4>
                    <p className="text-gray-400 line-through text-lg">₹{selectedProduct.originalPrice}</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Size</label>
                    <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(s => (
                            <button 
                                key={s} 
                                onClick={() => setSize(s)}
                                className={`px-4 py-2 rounded-lg border ${size === s ? 'bg-navy-blue text-white border-navy-blue' : 'bg-white text-gray-700 border-gray-300 hover:border-navy-blue'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Color</label>
                    <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map(c => (
                            <button 
                                key={c} 
                                onClick={() => setColor(c)}
                                className={`px-4 py-2 rounded-lg border ${color === c ? 'bg-primary-gold text-white border-primary-gold' : 'bg-white text-gray-700 border-gray-300 hover:border-primary-gold'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-navy-blue">Features:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {selectedProduct.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>

                <button 
                    onClick={handleAddToCart}
                    className="w-full bg-premium-gradient-bg text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #CD7F32 100%)' }}
                >
                    Add to Cart - ₹{selectedProduct.price}
                </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Products;