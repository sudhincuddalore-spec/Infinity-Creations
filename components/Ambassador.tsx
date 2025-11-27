import React from 'react';
import { OWNER_PHONE } from '../constants';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const Ambassador: React.FC = () => {
  const handleApply = () => {
    const text = `🎯 Campus Ambassador Application\n\nI want to join the program!\nName:\nCollege:\nCity:`;
    window.open(`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy-blue to-rich-indigo text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl">🎯</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h3 className="text-3xl md:text-5xl font-bold font-serif mb-4">Join Our Elite Network</h3>
                <h4 className="text-2xl md:text-4xl font-bold text-primary-gold mb-2">CAMPUS AMBASSADOR PROGRAM</h4>
                <p className="text-lg opacity-80">(All Over India)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                    <h5 className="text-2xl font-bold mb-8">Program Benefits</h5>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="text-primary-gold w-8 h-8" />
                            <div>
                                <div className="font-bold text-xl">80% PROFIT</div>
                                <div className="text-sm opacity-70">Maximum earning potential</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Clock className="text-primary-gold w-8 h-8" />
                            <div>
                                <div className="font-bold text-xl">Flexible Hours</div>
                                <div className="text-sm opacity-70">Work at your convenience</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Users className="text-primary-gold w-8 h-8" />
                            <div>
                                <div className="font-bold text-xl">Build Network</div>
                                <div className="text-sm opacity-70">Expand connections</div>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Award className="text-primary-gold w-8 h-8" />
                            <div>
                                <div className="font-bold text-xl">Skill Development</div>
                                <div className="text-sm opacity-70">Entrepreneurial experience</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-7xl mb-6 animate-luxury-pulse inline-block">🚀</div>
                    <h5 className="text-3xl font-bold mb-6">Ready to Start?</h5>
                    <p className="mb-8 text-lg opacity-90">Join thousands of students across India earning while studying!</p>
                    <button 
                        onClick={handleApply}
                        className="bg-white text-navy-blue font-bold px-8 py-4 rounded-lg text-lg hover:bg-primary-gold hover:text-white transition-all transform hover:-translate-y-1"
                    >
                        Apply Now
                    </button>
                    <div className="mt-8 text-sm opacity-70 space-y-1">
                        <p>✓ No investment required</p>
                        <p>✓ Immediate start</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Ambassador;