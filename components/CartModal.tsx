import React from 'react';
import { useCart } from '../context/CartContext';
import Modal from './ui/Modal';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shopping Cart" className="max-w-2xl">
      {cart.length === 0 ? (
        <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🛒</div>
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <button onClick={onClose} className="mt-4 text-primary-gold font-semibold hover:underline">Continue Shopping</button>
        </div>
      ) : (
        <div className="space-y-6">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg text-2xl shadow-sm overflow-hidden">
                            {item.customPhoto ? (
                                <img src={item.customPhoto} alt="Custom" className="w-full h-full object-cover" />
                            ) : (
                                item.image
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-navy-blue">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.selectedSize} | {item.selectedColor}</p>
                            <p className="text-primary-gold font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="text-gray-500 hover:text-navy-blue"><Minus size={14}/></button>
                            <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="text-gray-500 hover:text-navy-blue"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:text-red-600 p-2">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-navy-blue">₹{cartTotal}</span>
                </div>
                <button 
                    onClick={onCheckout}
                    className="w-full bg-navy-blue text-white font-bold py-4 rounded-xl hover:bg-rich-indigo transition-colors flex items-center justify-center gap-2"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;