import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Heart } from 'lucide-react';
import { fetchHeroData } from '../services/api';

export default function Hero() {
  const defaultTitles = [
    'Computer Science Student',
    'Aspiring AI Engineer',
    'Creative Developer',
    'Code & Tech Enthusiast'
  ];

  const [heroData, setHeroData] = useState({
    name: 'Aditi Das',
    tagline: 'Welcome to My Portfolio',
    titles: defaultTitles,
    welcome_note: '"Settle in and explore my portfolio. Here, technology meets curiosity, dreams, and continuous learning."',
    author_signature: '— Aditi ✨'
  });

  useEffect(() => {
    fetchHeroData().then((data) => {
      if (data) {
        setHeroData((prev) => ({
          name: data.name || prev.name,
          tagline: data.tagline || prev.tagline,
          titles: Array.isArray(data.titles) && data.titles.length > 0 ? data.titles : prev.titles,
          welcome_note: data.welcome_note || prev.welcome_note,
          author_signature: data.author_signature || prev.author_signature
        }));
      }
    });
  }, []);

  const titles = heroData.titles;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = titles[titleIndex % titles.length] || '';
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentFullText.substring(0, displayText.length - 1)
            : currentFullText.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-latte)] opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[var(--color-accent)] opacity-15 blur-3xl rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Scrapbook Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 cursor-pointer group"
        >
          <div className="p-4 rounded-full bg-[var(--bg-card)] border-2 border-[var(--border-accent)] shadow-md text-[var(--color-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-9 h-9" />
          </div>
        </motion.div>

        {/* Welcome Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="stamp-badge text-sm font-medium tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-600" /> {heroData.tagline}
          </span>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-5xl sm:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-3"
        >
          {heroData.name}
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-10 text-xl sm:text-2xl font-semibold text-[var(--color-accent)] mb-6 flex items-center justify-center gap-1"
        >
          <span>{displayText}</span>
          <span className="w-0.5 h-6 bg-[var(--color-accent)] animate-pulse" />
        </motion.div>

        {/* Welcome Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="journal-paper p-6 sm:p-8 max-w-2xl w-full mb-10 text-left shadow-sm"
        >
          <p className="text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-normal">
            {heroData.welcome_note}
          </p>
          <div className="mt-3 text-right font-medium text-sm text-[var(--color-accent)]">
            {heroData.author_signature}
          </div>
        </motion.div>

        {/* CTA Buttons & View Section Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={async () => {
              try {
                const data = await fetchHeroData();
                if (data) {
                  setHeroData((prev) => ({ ...prev, ...data }));
                }
              } catch (e) {}
            }}
            className="px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] font-semibold hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>View Hero Information</span>
          </button>

          <a
            href="#journey"
            className="px-8 py-3.5 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--text-primary)] font-medium hover:border-[var(--color-primary)] hover:scale-105 transition-all flex items-center gap-2 text-decoration-none"
          >
            <span>Explore My Journey</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--text-primary)] font-medium hover:border-[var(--color-primary)] hover:scale-105 transition-all flex items-center gap-2 text-decoration-none"
          >
            <span>Say Hello</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-xs text-[var(--text-muted)] flex flex-col items-center gap-1 group text-decoration-none"
        >
          <span className="text-xs font-medium tracking-wide group-hover:text-[var(--color-primary)]">Scroll to read more</span>
          <div className="w-6 h-10 border-2 border-[var(--border-accent)] rounded-full p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-2.5 bg-[var(--color-primary)] rounded-full"
            />
          </div>
        </motion.a>

      </div>
    </section>
  );
}
