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
          Click on any chapter's "View Story Information" button below to fetch and unfold its full story inline from the database.
        </p>

        <button
          onClick={async () => {
            try {
              const data = await fetchJourneyData();
              if (Array.isArray(data) && data.length > 0) {
                setMilestones(data);
              }
            } catch (e) {}
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-sm font-semibold hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View Journey Information</span>
        </button>
      </div>

      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-latte)] -translate-x-1/2 rounded-full hidden sm:block opacity-60" />

        <div className="space-y-8 sm:space-y-12">
          {milestones.map((item, idx) => {
            const Icon = iconMap[item.icon_name] || MapPin;
            const isEven = idx % 2 === 0;
            const isExpanded = activeStory?.id === item.id;

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
                {/* Interactive Story Card */}
                <div className="w-full sm:w-1/2 sm:px-8">
                  <motion.div
                    className="journal-paper p-6 shadow-sm hover:shadow-lg transition-all rounded-2xl border border-[var(--border-accent)] hover:border-[var(--color-primary)] group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="stamp-badge text-xs py-1 px-3">
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2 flex items-center justify-between">
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-xs font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {item.location}
                    </p>

                    <button
                      onClick={() => {
                        if (isExpanded) {
                          setActiveStory(null);
                        } else {
                          handleOpenStory(item);
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-cream)] transition-all shadow-2xs cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isExpanded ? 'Hide Story Details ▲' : 'View Story Information ✨'}</span>
                    </button>

                    {/* Inline Expanded Story Container */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[var(--border-accent)] overflow-hidden"
                        >
                          {detailLoading ? (
                            <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                              <Loader2 className="w-6 h-6 text-[var(--color-primary)] animate-spin" />
                              <p className="text-xs font-semibold text-[var(--text-muted)]">Fetching story details from API...</p>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-accent)]">
                              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                                {activeStory.description}
                              </p>
                              <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                                <span className="flex items-center gap-1 text-amber-600 font-medium">
                                  <Sparkles className="w-3.5 h-3.5" /> API Fetched Record
                                </span>
                                <span className="font-semibold text-[var(--color-primary)]">
                                  {activeStory.year} • {activeStory.location}
                                </span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
    </section>
  );
}
