import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fetchSkillsData } from '../services/api';

const categories = ['All', 'Web & Frontend', 'Programming Languages', 'Tools & Platforms', 'Core Competencies'];

const defaultSkillData = [
  { name: 'HTML5', category: 'Web & Frontend', level: 'Advanced', brew: '95%', icon: '🌐' },
  { name: 'CSS3', category: 'Web & Frontend', level: 'Advanced', brew: '90%', icon: '🎨' },
  { name: 'JavaScript (ES6+)', category: 'Web & Frontend', level: 'Advanced', brew: '88%', icon: '⚡' },
  { name: 'React.js', category: 'Web & Frontend', level: 'Intermediate/Advanced', brew: '85%', icon: '⚛️' },
  { name: 'Python', category: 'Programming Languages', level: 'Advanced', brew: '92%', icon: '🐍' },
  { name: 'Java', category: 'Programming Languages', level: 'Intermediate', brew: '80%', icon: '💻' },
  { name: 'Git', category: 'Tools & Platforms', level: 'Proficient', brew: '85%', icon: '🌿' },
  { name: 'GitHub', category: 'Tools & Platforms', level: 'Proficient', brew: '88%', icon: '🐙' },
  { name: 'Firebase', category: 'Tools & Platforms', level: 'Intermediate', brew: '75%', icon: '🔥' },
  { name: 'AI Tools & Prompts', category: 'Tools & Platforms', level: 'Enthusiast/Advanced', brew: '90%', icon: '🤖' },
  { name: 'Problem Solving', category: 'Core Competencies', level: 'Core', brew: '90%', icon: '🧠' },
  { name: 'UI Design & Wireframing', category: 'Core Competencies', level: 'Creative', brew: '85%', icon: '✏️' }
];

export default function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [skillData, setSkillData] = useState(defaultSkillData);

  useEffect(() => {
    fetchSkillsData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkillData(data);
        }
      })
      .catch(() => {});

    const handleNavClick = (e) => {
      if (e.detail === '#skills') {
        setIsExpanded(true);
      }
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

  const handleToggle = async () => {
    if (!isExpanded) {
      try {
        const data = await fetchSkillsData();
        if (Array.isArray(data) && data.length > 0) {
          setSkillData(data);
        }
      } catch (e) {}
    }
    setIsExpanded(!isExpanded);
  };

  const filteredSkills = activeTab === 'All'
    ? skillData
    : skillData.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 04
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Skills & Toolkit
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Technologies, frameworks, and tools I use to build digital solutions.
        </p>

        <button
          onClick={handleToggle}
          className="mt-6 px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] font-bold text-sm hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2.5 shadow-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isExpanded ? 'Hide Skills Information ▲' : 'View Skills Information ✨'}</span>
        </button>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden pt-4"
          >
            {/* Filter Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeTab === cat
                      ? 'bg-[var(--color-primary)] text-[var(--color-cream)] border-[var(--color-primary)] shadow-sm scale-105'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-accent)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills Badge Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-accent)] shadow-sm hover:border-[var(--color-primary)] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform">
                        {skill.icon}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary)]">
                        {skill.level}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-4">
                      {skill.category}
                    </p>
                  </div>

                  {/* Proficiency Meter */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-[var(--color-accent)] mb-1.5">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Proficiency
                      </span>
                      <span>{skill.brew}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--bg-card-secondary)] overflow-hidden">
                      <div
                        style={{ width: skill.brew }}
                        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
