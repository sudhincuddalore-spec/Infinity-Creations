import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Modal from './ui/Modal';
import { OWNER_UPI_ID, OWNER_PHONE } from '../constants';
import { QrCode, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentConfirmed = () => {
    // Generate Order
    const newOrderId = 'INF' + Date.now();
    setOrderId(newOrderId);
    
    const order: Order = {
      orderId: newOrderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      customerAddress: formData.address,
      customerCity: formData.city,
      customerState: formData.state,
      customerPincode: formData.pincode,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    // Save to local storage mock DB
    const orders = JSON.parse(localStorage.getItem('infinityOrders') || '[]');
    orders.push(order);
    localStorage.setItem('infinityOrders', JSON.stringify(orders));

    // Send to WhatsApp
    const message = `🛒 *New Order from Infinity Creation*
    
📋 *Order ID:* ${order.orderId}
👤 *Name:* ${order.customerName}
📞 *Phone:* ${order.customerPhone}

📍 *Address:*
${order.customerAddress}, ${order.customerCity} - ${order.customerPincode}

🛍️ *Items:*
${order.items.map(i => `• ${i.name} (${i.selectedSize}, ${i.selectedColor}) x${i.quantity}`).join('\n')}

💰 *Total Paid:* ₹${order.total}

Please confirm order!`;

    const url = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 'payment' ? 'Payment' : step === 'success' ? 'Order Placed!' : 'Checkout'}>
      {step === 'form' && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="name" placeholder="Full Name *" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                <input required name="phone" placeholder="Phone Number *" type="tel" className="w-full p-3 border rounded-lg" onChange={handleChange} />
            </div>
            <input name="email" placeholder="Email (Optional)" type="email" className="w-full p-3 border rounded-lg" onChange={handleChange} />
            <textarea required name="address" placeholder="Address *" rows={3} className="w-full p-3 border rounded-lg" onChange={handleChange}></textarea>
            <div className="grid grid-cols-2 gap-4">
                <input required name="city" placeholder="City *" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                <input required name="state" placeholder="State *" className="w-full p-3 border rounded-lg" onChange={handleChange} />
            </div>
            <input required name="pincode" placeholder="Pincode *" className="w-full p-3 border rounded-lg" onChange={handleChange} />
            
            <div className="pt-4 flex justify-between items-center font-bold text-lg">
                <span>Total: ₹{cartTotal}</span>
                <button type="submit" className="bg-primary-gold text-white px-8 py-3 rounded-lg hover:bg-deep-bronze">Proceed to Payment</button>
            </div>
        </form>
      )}

      {step === 'payment' && (
        <div className="text-center space-y-6">
            <div className="bg-gray-100 p-8 rounded-xl inline-block">
                <QrCode size={64} className="mx-auto mb-4 text-navy-blue" />
                <p className="font-mono font-bold text-lg">{OWNER_UPI_ID}</p>
                <p className="text-sm text-gray-500 mt-2">Scan with any UPI App</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-green-600">₹{cartTotal}</p>
                <p className="text-gray-500">Total Payable Amount</p>
            </div>
            <button 
                onClick={handlePaymentConfirmed}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 animate-pulse"
            >
                I Have Made the Payment
            </button>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-8">
            <div className="flex justify-center mb-6">
                <CheckCircle size={80} className="text-green-500 animate-bounce" />
            </div>
            <h4 className="text-2xl font-bold text-navy-blue mb-2">Order Successful!</h4>
            <p className="text-gray-600 mb-6">Your Order ID: <span className="font-mono font-bold text-black">{orderId}</span></p>
            <p className="text-sm text-gray-500 mb-8">We have opened WhatsApp for you to send the order details.</p>
            <button onClick={handleClose} className="bg-navy-blue text-white px-8 py-3 rounded-lg">Continue Shopping</button>
        </div>
      )}
    </Modal>
  );
};

export default CheckoutModal;