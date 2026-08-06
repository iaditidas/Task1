import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, MapPin, Coffee, Sparkles } from 'lucide-react';
import profileImg from '../assets/images/profile.png';

export default function AboutMe() {
  const stats = [
    {
      icon: Award,
      label: 'Current CGPA',
      value: '8.68',
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      icon: BookOpen,
      label: 'Current Semester',
      value: '5th Semester',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      icon: GraduationCap,
      label: 'Degree',
      value: 'B.Tech in CSE',
      color: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Ballari, KA',
      color: 'bg-rose-100 text-rose-900 border-rose-300'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title Header */}
      <div className="text-center mb-14">
        <span className="font-handwritten text-xl text-[var(--color-accent)] font-semibold">
          Chapter 01
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          About Me
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          A glimpse into who I am, what drives me, and my academic foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Polaroid Profile Frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative max-w-sm w-full scrapbook-tape">
            <div className="polaroid-card rotate-[-2deg] hover:rotate-0 transition-all duration-300">
              <div className="overflow-hidden rounded-sm bg-[var(--bg-card-secondary)] aspect-square mb-4">
                <img
                  src={profileImg}
                  alt="Aditi Das Profile"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center pt-1">
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  Aditi Das
                </h3>
                <p className="font-handwritten text-lg text-[var(--color-accent)] font-medium">
                  "Brewing code & ideas ☕"
                </p>
              </div>
            </div>

            {/* Corner Decorative Badge */}
            <div className="absolute -bottom-4 -right-4 p-3 rounded-2xl bg-[var(--color-primary)] text-[var(--color-cream)] shadow-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-semibold tracking-wider uppercase">AI Enthusiast</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio Narrative & Stats Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Biography Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-accent)] shadow-sm relative">
            <div className="flex items-center gap-2 text-[var(--color-primary)] mb-3">
              <Coffee className="w-5 h-5" />
              <h3 className="font-heading text-xl font-bold">The Story So Far</h3>
            </div>
            
            <p className="text-[var(--text-primary)] leading-relaxed text-base opacity-90">
              I am <strong className="text-[var(--color-primary)] font-semibold">Aditi Das</strong>, a Computer Science student with a growing passion for Artificial Intelligence, software development, and solving real-world problems through technology.
            </p>
            <p className="text-[var(--text-primary)] leading-relaxed text-base opacity-90 mt-4">
              I enjoy learning new technologies, building creative projects, and continuously improving my programming skills. My goal is to become an <strong className="text-[var(--color-primary)] font-semibold">AI Engineer</strong> and create impactful solutions that make everyday life better.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-center flex flex-col items-center justify-center hover:border-[var(--color-accent)] hover:shadow-md transition-all group"
                >
                  <div className="p-2.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-0.5">
                    {stat.label}
                  </span>
                  <span className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Personality Brew Note */}
          <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-dashed border-[var(--border-accent)] flex items-center gap-3">
            <div className="text-2xl">🌱</div>
            <p className="font-handwritten text-lg text-[var(--text-primary)]">
              <strong>Personal Brew Note:</strong> Believer in small daily wins, clean code, aesthetic design, and endless curiosity.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
