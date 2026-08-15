import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, ChevronRight, Loader2 } from 'lucide-react';
import { fetchHobbiesData, fetchHobbyById } from '../services/api';

const defaultHobbyList = [
  {
    id: 1,
    title: 'Watching Movies',
    emoji: '🎬',
    color: 'from-purple-50 to-indigo-50',
    borderColor: 'border-purple-200',
    description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.'
  },
  {
    id: 2,
    title: 'Listening to Music',
    emoji: '🎵',
    color: 'from-sky-50 to-blue-50',
    borderColor: 'border-sky-200',
    description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.'
  },
  {
    id: 3,
    title: 'Exploring New Places',
    emoji: '✈️',
    color: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.'
  },
  {
    id: 4,
    title: 'Dancing',
    emoji: '💃',
    color: 'from-rose-50 to-pink-50',
    borderColor: 'border-rose-200',
    description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.'
  }
];

export default function Hobbies() {
  const [hobbyList, setHobbyList] = useState(defaultHobbyList);
  const [activeHobby, setActiveHobby] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchHobbiesData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHobbyList(data.map(item => ({
            ...item,
            borderColor: item.border_color || item.borderColor || 'border-stone-200'
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenHobby = async (hobby) => {
    setActiveHobby(hobby);
    setDetailLoading(true);

    try {
      const data = await fetchHobbyById(hobby.id);
      if (data) {
        setActiveHobby({
          ...data,
          color: data.color || hobby.color,
          borderColor: data.border_color || data.borderColor || hobby.borderColor
        });
      }
    } catch (err) {
      console.warn('Using hobby fallback:', err);
    } finally {
      setDetailLoading(false);
    }
  };

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
          Click on any hobby card below to fetch details from the backend database.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hobbyList.map((hobby, idx) => (
          <motion.div
            key={hobby.id || hobby.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpenHobby(hobby)}
            className={`p-6 rounded-2xl bg-gradient-to-br ${hobby.color || 'from-amber-50 to-orange-50'} border ${hobby.borderColor || 'border-amber-200'} shadow-sm transition-all duration-300 relative flex flex-col justify-between group overflow-hidden cursor-pointer`}
          >
            {/* Tag pin decoration */}
            <div className="absolute top-3 right-4 text-xs font-medium text-[var(--text-muted)] opacity-60">
              #interest
            </div>

            <div>
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 w-fit">
                {hobby.emoji}
              </div>

              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center justify-between">
                <span>{hobby.title}</span>
                <ChevronRight className="w-4 h-4 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-[var(--color-accent)] font-medium">
              <span className="text-xs text-[var(--color-primary)] font-bold flex items-center gap-1">
                Discover Passion 💖
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cute Hobby Detail Modal */}
      <AnimatePresence>
        {activeHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveHobby(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-[var(--border-accent)]"
            >
              <button
                onClick={() => setActiveHobby(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:scale-110 transition-transform cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {detailLoading ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                  <p className="text-sm font-semibold text-[var(--text-muted)]">Fetching hobby detail from DB...</p>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-4 text-center">
                    {activeHobby.emoji}
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-center text-[var(--text-primary)] mb-2">
                    {activeHobby.title}
                  </h3>

                  <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider text-center mb-5">
                    Personal Creative Outlet
                  </p>

                  <div className="p-5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] mb-6 shadow-inner">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed text-center opacity-95">
                      {activeHobby.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-color)]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" /> PostgreSQL API Item
                    </span>
                    <button
                      onClick={() => setActiveHobby(null)}
                      className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-xs font-semibold hover:bg-[var(--color-dark-coffee)] cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
