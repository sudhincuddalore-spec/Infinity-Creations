import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Upload } from 'lucide-react';
import { OWNER_NAME } from '../constants';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('infinityGallery');
    if (saved) setItems(JSON.parse(saved));
    
    // Check session for owner login
    if (localStorage.getItem('ownerLoggedIn') === 'true') {
        setIsOwner(true);
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTitle) {
        const reader = new FileReader();
        reader.onload = () => {
            const newItem: GalleryItem = {
                id: Date.now(),
                title: uploadTitle,
                image: reader.result as string,
                date: new Date().toISOString()
            };
            const updated = [newItem, ...items];
            setItems(updated);
            localStorage.setItem('infinityGallery', JSON.stringify(updated));
            setUploadTitle("");
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-5xl font-bold font-serif text-navy-blue mb-4">Our Work Gallery</h3>
                <div className="h-1 w-24 bg-primary-gold mx-auto"></div>
            </div>

            {isOwner && (
                <div className="max-w-md mx-auto mb-12 p-6 bg-gray-50 border-2 border-dashed border-primary-gold rounded-xl text-center">
                    <h4 className="font-bold mb-4 text-primary-gold">Owner Upload Panel ({OWNER_NAME})</h4>
                    <input 
                        className="w-full mb-4 p-2 border rounded" 
                        placeholder="Image Title" 
                        value={uploadTitle}
                        onChange={e => setUploadTitle(e.target.value)}
                    />
                    <label className="cursor-pointer bg-navy-blue text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-rich-indigo">
                        <Upload size={18} /> Upload New Work
                        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </label>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className="text-6xl mb-4 opacity-50">🖼️</div>
                        <h4 className="text-xl font-bold text-gray-500">Gallery Coming Soon</h4>
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-lg aspect-square">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white font-bold">{item.title}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </section>
  );
};

export default Gallery;