import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Hobbies() {
  const hobbyList = [
    {
      title: 'Watching Movies',
      emoji: '🎬',
      color: 'from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.'
    },
    {
      title: 'Listening to Music',
      emoji: '🎵',
      color: 'from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20',
      borderColor: 'border-sky-200 dark:border-sky-800',
      description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.'
    },
    {
      title: 'Exploring New Places',
      emoji: '✈️',
      color: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.'
    },
    {
      title: 'Dancing',
      emoji: '💃',
      color: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
      borderColor: 'border-rose-200 dark:border-rose-800',
      description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.'
    }
  ];

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

            <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-[var(--color-accent)] font-medium">
              <span className="text-xs text-[var(--color-accent)] font-medium">Personal Interest</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
