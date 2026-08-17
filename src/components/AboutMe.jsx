import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import profileImg from '../assets/images/profile.png';
import { fetchAboutData } from '../services/api';

const iconMap = {
  Award,
  BookOpen,
  GraduationCap,
  MapPin
};

const defaultStats = [
  { icon_name: 'Award', label: 'Current CGPA', value: '8.68' },
  { icon_name: 'BookOpen', label: 'Current Semester', value: '5th Semester' },
  { icon_name: 'GraduationCap', label: 'Degree', value: 'B.Tech in CSE' },
  { icon_name: 'MapPin', label: 'Location', value: 'Ballari, KA' }
];

export default function AboutMe() {
  const [aboutData, setAboutData] = useState({
    profile_name: 'Aditi Das',
    subtitle: '"Crafting code & ideas ✨"',
    story_heading: 'The Story So Far',
    story_paragraph1: 'I am Aditi Das, a Computer Science student with a growing passion for Artificial Intelligence, software development, and solving real-world problems through technology.',
    story_paragraph2: 'I enjoy learning new technologies, building creative projects, and continuously improving my programming skills. My goal is to become an AI Engineer and create impactful solutions that make everyday life better.',
    personality_note: 'Believer in small daily wins, clean code, aesthetic design, and endless curiosity.',
    stats: defaultStats
  });

  useEffect(() => {
    fetchAboutData()
      .then((data) => {
        if (data) {
          setAboutData((prev) => ({
            profile_name: data.profile_name || prev.profile_name,
            subtitle: data.subtitle || prev.subtitle,
            story_heading: data.story_heading || prev.story_heading,
            story_paragraph1: data.story_paragraph1 || prev.story_paragraph1,
            story_paragraph2: data.story_paragraph2 || prev.story_paragraph2,
            personality_note: data.personality_note || prev.personality_note,
            stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : prev.stats
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title Header */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 01
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          About Me
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          A glimpse into who I am, what drives me, and my academic foundation.
        </p>

        <button
          onClick={async () => {
            try {
              const data = await fetchAboutData();
              if (data) {
                setAboutData((prev) => ({
                  profile_name: data.profile_name || prev.profile_name,
                  subtitle: data.subtitle || prev.subtitle,
                  story_heading: data.story_heading || prev.story_heading,
                  story_paragraph1: data.story_paragraph1 || prev.story_paragraph1,
                  story_paragraph2: data.story_paragraph2 || prev.story_paragraph2,
                  personality_note: data.personality_note || prev.personality_note,
                  stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : prev.stats
                }));
              }
            } catch (err) {}
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-sm font-semibold hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View About Information</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative max-w-sm w-full">
            <div className="polaroid-card transition-all duration-300">
              <div className="overflow-hidden rounded-xl bg-[var(--bg-card-secondary)] aspect-square mb-4">
                <img
                  src={profileImg}
                  alt="Aditi Das Profile"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center pt-1">
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                  {aboutData.profile_name}
                </h3>
                <p className="text-sm text-[var(--color-accent)] font-medium mt-1">
                  {aboutData.subtitle}
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
              <Sparkles className="w-5 h-5" />
              <h3 className="font-heading text-xl font-bold">{aboutData.story_heading}</h3>
            </div>
            
            <p className="text-[var(--text-primary)] leading-relaxed text-base opacity-90">
              {aboutData.story_paragraph1}
            </p>
            <p className="text-[var(--text-primary)] leading-relaxed text-base opacity-90 mt-4">
              {aboutData.story_paragraph2}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {aboutData.stats.map((stat, idx) => {
              const Icon = iconMap[stat.icon_name] || Award;
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

          {/* Personality Note */}
          <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] flex items-center gap-3">
            <div className="text-2xl">🌱</div>
            <p className="text-sm text-[var(--text-primary)]">
              <strong>Personal Note:</strong> {aboutData.personality_note}
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
