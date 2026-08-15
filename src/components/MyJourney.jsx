import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Search, Compass, Target, Sun, X, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { fetchJourneyData, fetchStoryById } from '../services/api';

const iconMap = {
  MapPin,
  Sun,
  Search,
  Target,
  Compass
};

const defaultMilestones = [
  {
    id: 1,
    year: 'The Beginnings',
    location: 'Aurangabad, Maharashtra',
    title: 'Born with Curiosity',
    description: 'Born in Aurangabad, Maharashtra. Growing up with warmth, affection, and a heart full of wonder.',
    icon_name: 'MapPin',
    tag: 'Origin'
  },
  {
    id: 2,
    year: 'Growing Up',
    location: 'Ballari, Karnataka',
    title: 'Raised in Ballari',
    description: 'Spent formative years in Ballari, Karnataka, learning values of hard work, discipline, and community.',
    icon_name: 'Sun',
    tag: 'Roots'
  },
  {
    id: 3,
    year: 'Childhood Spark',
    location: 'The Tech Wonder',
    title: 'Curious About Computers',
    description: 'Fascinated by technology from a young age. Pondered deeply: "How does Google answer every question in seconds?"',
    icon_name: 'Search',
    tag: 'Inspiration'
  },
  {
    id: 4,
    year: 'Personal Philosophy',
    location: 'Daily Evolution',
    title: 'Striving for Growth',
    description: 'Inspired by becoming a better version of myself every single day through continuous learning and persistence.',
    icon_name: 'Target',
    tag: 'Mindset'
  },
  {
    id: 5,
    year: 'Core Dreams',
    location: 'Future Horizon',
    title: 'Making Parents Proud & Exploring the World',
    description: 'Driven by two core lifelong dreams: to make my parents proud through meaningful achievement, and to explore beautiful cultures across the globe.',
    icon_name: 'Compass',
    tag: 'Aspiration'
  }
];

export default function MyJourney() {
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [activeStory, setActiveStory] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchJourneyData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMilestones(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenStory = async (item) => {
    setActiveStory(item);
    setDetailLoading(true);

    try {
      const data = await fetchStoryById(item.id);
      if (data) {
        setActiveStory(data);
      }
    } catch (err) {
      console.warn('Using item fallback:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 02
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          My Journey
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Click on any chapter card below to fetch and unfold its full story from the database.
        </p>
      </div>

      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-latte)] -translate-x-1/2 rounded-full hidden sm:block opacity-60" />

        <div className="space-y-8 sm:space-y-12">
          {milestones.map((item, idx) => {
            const Icon = iconMap[item.icon_name] || MapPin;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id || item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Interactive Cute Story Card Button */}
                <div className="w-full sm:w-1/2 sm:px-8">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenStory(item)}
                    className="journal-paper p-6 shadow-sm hover:shadow-lg transition-all rounded-2xl border border-[var(--border-accent)] hover:border-[var(--color-primary)] cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="stamp-badge text-xs py-1 px-3">
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <ChevronRight className="w-5 h-5 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>

                    <p className="text-xs font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {item.location}
                    </p>

                    <div className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-cream)] transition-all shadow-2xs">
                      <BookOpen className="w-4 h-4" />
                      <span>Click to Unfold Story ✨</span>
                    </div>
                  </motion.div>
                </div>

                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--bg-card)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center shadow-md z-10 hidden sm:flex">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Spacer for symmetry */}
                <div className="w-full sm:w-1/2 hidden sm:block" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cute Story Detail Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStory(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-[var(--border-accent)]"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:scale-110 transition-transform cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {detailLoading ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                  <p className="text-sm font-semibold text-[var(--text-muted)]">Fetching story details from DB...</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="stamp-badge text-xs py-1 px-3">
                      {activeStory.tag}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                      {activeStory.year}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {activeStory.title}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--color-primary)] mb-5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" /> {activeStory.location}
                  </p>

                  <div className="p-5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] mb-6 shadow-inner">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed opacity-95">
                      {activeStory.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-color)]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" /> PostgreSQL API Story
                    </span>
                    <button
                      onClick={() => setActiveStory(null)}
                      className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-xs font-semibold hover:bg-[var(--color-dark-coffee)] cursor-pointer"
                    >
                      Close Story
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
