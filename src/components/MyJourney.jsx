import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Sparkles, Search, Compass, Target, Sun } from 'lucide-react';
import { fetchJourneyData } from '../services/api';
import SectionStateStatus from './SectionStateStatus';

const iconMap = {
  MapPin,
  Sun,
  Search,
  Target,
  Compass
};

export default function MyJourney() {
  const defaultMilestones = [
    {
      year: 'The Beginnings',
      location: 'Aurangabad, Maharashtra',
      title: 'Born with Curiosity',
      description: 'Born in Aurangabad, Maharashtra. Growing up with warmth, affection, and a heart full of wonder.',
      icon_name: 'MapPin',
      tag: 'Origin'
    },
    {
      year: 'Growing Up',
      location: 'Ballari, Karnataka',
      title: 'Raised in Ballari',
      description: 'Spent formative years in Ballari, Karnataka, learning values of hard work, discipline, and community.',
      icon_name: 'Sun',
      tag: 'Roots'
    },
    {
      year: 'Childhood Spark',
      location: 'The Tech Wonder',
      title: 'Curious About Computers',
      description: 'Fascinated by technology from a young age. Pondered deeply: "How does Google answer every question in seconds?"',
      icon_name: 'Search',
      tag: 'Inspiration'
    },
    {
      year: 'Personal Philosophy',
      location: 'Daily Evolution',
      title: 'Striving for Growth',
      description: 'Inspired by becoming a better version of myself every single day through continuous learning and persistence.',
      icon_name: 'Target',
      tag: 'Mindset'
    },
    {
      year: 'Core Dreams',
      location: 'Future Horizon',
      title: 'Making Parents Proud & Exploring the World',
      description: 'Driven by two core lifelong dreams: to make my parents proud through meaningful achievement, and to explore beautiful cultures across the globe.',
      icon_name: 'Compass',
      tag: 'Aspiration'
    }
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [milestones, setMilestones] = useState(defaultMilestones);

  const loadData = () => {
    setLoading(true);
    setError(false);
    fetchJourneyData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMilestones(data);
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
      if (e.detail === '#journey' || e.detail === '#story') loadData();
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

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
          The milestones, childhood sparks, and aspirations shaping my story.
        </p>
      </div>

      {loading || error ? (
        <SectionStateStatus loading={loading} error={error} onRetry={loadData} />
      ) : (
        <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-latte)] -translate-x-1/2 rounded-full hidden sm:block opacity-60" />

        <div className="space-y-12 sm:space-y-16">
          {milestones.map((item, idx) => {
            const Icon = iconMap[item.icon_name] || item.icon || MapPin;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Content Box */}
                <div className="w-full sm:w-1/2 sm:px-8">
                  <div className="journal-paper p-6 sm:p-7 shadow-sm hover:shadow-md transition-all rounded-2xl border border-[var(--border-accent)]">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="stamp-badge text-xs py-1 px-3">
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold text-[var(--color-primary)] mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {item.location}
                    </p>

                    <p className="text-sm text-[var(--text-primary)] leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--bg-card)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center shadow-md z-10 hidden sm:flex">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Spacer for two column symmetry */}
                <div className="w-full sm:w-1/2 hidden sm:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
      )}
    </section>
  );
}
