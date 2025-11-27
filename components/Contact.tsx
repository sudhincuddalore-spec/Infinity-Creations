import React, { useState } from 'react';
import { OWNER_PHONE, OWNER_NAME } from '../constants';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `👋 Hello! \nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl lg:text-5xl font-bold text-center text-navy-blue font-serif mb-12">Get In Touch</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-gold/10 p-3 rounded-full text-primary-gold"><MapPin size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Location</h4>
                            <p className="text-gray-600">Coimbatore, Tamil Nadu, India</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-gold/10 p-3 rounded-full text-primary-gold"><Phone size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Phone</h4>
                            <p className="text-gray-600">{OWNER_PHONE}</p>
                            <p className="text-sm text-gray-500">Owner: {OWNER_NAME}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary-gold/10 p-3 rounded-full text-primary-gold"><Mail size={24} /></div>
                        <div>
                            <h4 className="font-bold text-lg">Support</h4>
                            <p className="text-gray-600">Available 24/7 on WhatsApp</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                    <h4 className="text-xl font-bold mb-6">Send Message via WhatsApp</h4>
                    <div className="space-y-4">
                        <input 
                            className="w-full p-3 border rounded-lg" 
                            placeholder="Your Name" 
                            required 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                            className="w-full p-3 border rounded-lg" 
                            placeholder="Phone Number" 
                            type="tel"
                            required 
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                        <textarea 
                            className="w-full p-3 border rounded-lg" 
                            placeholder="Your Message" 
                            rows={4}
                            required 
                            onChange={e => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                            <Send size={18} /> Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  );
};

export default Contact;