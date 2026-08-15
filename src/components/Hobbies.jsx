import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { fetchHobbiesData } from '../services/api';
import SectionStateStatus from './SectionStateStatus';

export default function Hobbies() {
  const defaultHobbyList = [
    {
      title: 'Watching Movies',
      emoji: '🎬',
      color: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.'
    },
    {
      title: 'Listening to Music',
      emoji: '🎵',
      color: 'from-sky-50 to-blue-50',
      borderColor: 'border-sky-200',
      description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.'
    },
    {
      title: 'Exploring New Places',
      emoji: '✈️',
      color: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
      description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.'
    },
    {
      title: 'Dancing',
      emoji: '💃',
      color: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200',
      description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.'
    }
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hobbyList, setHobbyList] = useState(defaultHobbyList);

  const loadData = () => {
    setLoading(true);
    setError(false);
    fetchHobbiesData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHobbyList(data.map(item => ({
            ...item,
            borderColor: item.border_color || item.borderColor || 'border-stone-200'
          })));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
    const handleNavClick = (e) => {
      if (e.detail === '#hobbies') loadData();
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 04
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Hobbies & Passions
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          The simple joys and creative outlets that keep my mind inspired outside of code.
        </p>
      </div>

      {loading || error ? (
        <SectionStateStatus loading={loading} error={error} onRetry={loadData} />
      ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hobbyList.map((hobby, idx) => (
          <motion.div
            key={hobby.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${hobby.color} border ${hobby.borderColor} shadow-sm transition-all duration-300 relative flex flex-col justify-between group overflow-hidden`}
          >
            {/* Tag pin decoration */}
            <div className="absolute top-3 right-4 text-xs font-medium text-[var(--text-muted)] opacity-60">
              #interest
            </div>

            <div>
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 w-fit">
                {hobby.emoji}
              </div>

              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                {hobby.title}
              </h3>

              <p className="text-sm text-[var(--text-primary)] opacity-85 leading-relaxed">
                {hobby.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-[var(--color-accent)] font-medium">
              <span className="text-xs text-[var(--color-accent)] font-medium">Personal Interest</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
            </div>

          </motion.div>
        ))}
      </div>
      )}
    </section>
  );
}
