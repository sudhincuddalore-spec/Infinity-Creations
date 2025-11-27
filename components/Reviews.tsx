import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    const saved = localStorage.getItem('infinityReviews');
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: new Date().toISOString()
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem('infinityReviews', JSON.stringify(updated));
    setNewReview({ name: '', text: '', rating: 5 });
  };

  const averageRating = reviews.length ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : "5.0";

  return (
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-center text-navy-blue mb-12 font-serif">What Our Customers Say</h3>
            
            <div className="text-center mb-12">
                <div className="text-4xl text-primary-gold mb-2">★★★★★</div>
                <div className="text-3xl font-bold">{averageRating}</div>
                <div className="text-gray-500">Based on {reviews.length} reviews</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {reviews.length === 0 && <p className="col-span-full text-center text-gray-400">No reviews yet. Be the first!</p>}
                {reviews.slice(0, 6).map(r => (
                    <div key={r.id} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex text-primary-gold mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < r.rating ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">"{r.text}"</p>
                        <p className="font-bold text-navy-blue">- {r.name}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold mb-6 text-center">Write a Review</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        className="w-full p-3 border rounded-lg" 
                        placeholder="Your Name" 
                        required 
                        value={newReview.name}
                        onChange={e => setNewReview({...newReview, name: e.target.value})}
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex gap-1">
                             {[1, 2, 3, 4, 5].map(star => (
                                <button type="button" key={star} onClick={() => setNewReview({...newReview, rating: star})}>
                                    <Star 
                                        size={24} 
                                        className={star <= newReview.rating ? "text-primary-gold fill-primary-gold" : "text-gray-300"} 
                                    />
                                </button>
                             ))}
                        </div>
                    </div>
                    <textarea 
                        className="w-full p-3 border rounded-lg" 
                        placeholder="Your Review" 
                        required 
                        rows={3}
                        value={newReview.text}
                        onChange={e => setNewReview({...newReview, text: e.target.value})}
                    />
                    <button className="w-full bg-navy-blue text-white py-3 rounded-lg font-bold hover:bg-rich-indigo transition-colors">Submit Review</button>
                </form>
            </div>
        </div>
    </section>
  );
};

export default Reviews;