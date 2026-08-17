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
          Click on any hobby's "View Hobby Information" button below to fetch details inline from the backend database.
        </p>

        <button
          onClick={async () => {
            try {
              const data = await fetchHobbiesData();
              if (Array.isArray(data) && data.length > 0) {
                setHobbyList(data.map(item => ({
                  ...item,
                  borderColor: item.border_color || item.borderColor || 'border-stone-200'
                })));
              }
            } catch (e) {}
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-sm font-semibold hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View Hobbies Information</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hobbyList.map((hobby, idx) => {
          const isExpanded = activeHobby?.id === hobby.id;

          return (
            <motion.div
              key={hobby.id || hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${hobby.color || 'from-amber-50 to-orange-50'} border ${hobby.borderColor || 'border-amber-200'} shadow-sm transition-all duration-300 relative flex flex-col justify-between group overflow-hidden`}
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
                </h3>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (isExpanded) {
                      setActiveHobby(null);
                    } else {
                      handleOpenHobby(hobby);
                    }
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/80 border border-stone-200 text-[var(--color-primary)] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-2xs cursor-pointer mb-3"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{isExpanded ? 'Hide Details ▲' : 'View Hobby Information ✨'}</span>
                </button>

                {/* Inline Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-stone-200 overflow-hidden"
                    >
                      {detailLoading ? (
                        <div className="py-4 text-center flex flex-col items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 text-[var(--color-primary)] animate-spin" />
                          <p className="text-[11px] font-semibold text-[var(--text-muted)]">Fetching hobby info...</p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-white/90 border border-stone-200 text-xs text-[var(--text-primary)] leading-relaxed">
                          <p>{activeHobby.description}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
