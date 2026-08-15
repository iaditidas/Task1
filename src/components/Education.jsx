import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, Star, Sparkles, X, ChevronRight, Loader2 } from 'lucide-react';
import { fetchEducationData, fetchEducationById } from '../services/api';

const defaultEdList = [
  {
    id: 1,
    institution: 'Kishkinda University',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    semester: '5th Semester',
    graduation: '2028',
    cgpa: '8.68',
    status: 'Current Program',
    details: 'Focusing on Data Structures, Algorithms, Artificial Intelligence, Database Management, and Web Technologies.',
    highlight: true
  },
  {
    id: 2,
    institution: 'BeST College',
    degree: 'Pre-University Education (PUC)',
    field: 'Science Stream (PCMB/CS)',
    semester: 'Completed',
    graduation: 'Pre-University',
    cgpa: 'Distinction',
    status: 'Pre-University',
    details: 'Built strong analytical foundations in Mathematics, Physics, and foundational Computer Science concepts.',
    highlight: false
  },
  {
    id: 3,
    institution: "St. Joseph's Girls High School",
    degree: 'Secondary School Leaving Certificate (SSLC)',
    field: 'School Education',
    semester: 'Completed',
    graduation: 'High School',
    cgpa: 'High Distinction',
    status: 'Schooling',
    details: 'Active participant in science exhibitions, academic clubs, and extracurricular activities.',
    highlight: false
  }
];

export default function Education() {
  const [edList, setEdList] = useState(defaultEdList);
  const [activeEd, setActiveEd] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchEducationData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEdList(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenEducation = async (item) => {
    setActiveEd(item);
    setDetailLoading(true);

    try {
      const data = await fetchEducationById(item.id);
      if (data) {
        setActiveEd(data);
      }
    } catch (err) {
      console.warn('Using education item fallback:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 03
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Education
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Click on any academic institution below to fetch its complete record from the database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {edList.map((item, idx) => (
          <motion.div
            key={item.id || item.institution}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenEducation(item)}
            className={`journal-paper p-6 sm:p-7 flex flex-col justify-between rounded-2xl relative transition-all duration-300 hover:shadow-lg cursor-pointer group ${
              item.highlight
                ? 'border-2 border-[var(--color-primary)] shadow-md bg-[var(--bg-card)]'
                : 'border border-[var(--border-accent)] bg-[var(--bg-card)]'
            }`}
          >
            {item.highlight && (
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[var(--color-primary)] text-[var(--color-cream)] text-xs font-semibold tracking-wider rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Active Degree
              </div>
            )}

            <div>
              <div className="p-3 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary)] w-fit mb-5 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors flex items-center justify-between">
                <span>{item.institution}</span>
                <ChevronRight className="w-5 h-5 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h3>

              <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">
                {item.degree} — <span className="font-normal text-[var(--text-muted)]">{item.field}</span>
              </p>

              <span className="inline-block text-xs font-medium py-1 px-2.5 rounded-md bg-[var(--bg-card-secondary)] text-[var(--text-muted)] mb-5">
                {item.status || 'Academic Program'}
              </span>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)]">
              <div className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-cream)] transition-all shadow-2xs">
                <BookOpen className="w-4 h-4" />
                <span>Click for Full Academic Details 🎓</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cute Education Detail Modal */}
      <AnimatePresence>
        {activeEd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveEd(null)}
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
                onClick={() => setActiveEd(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:scale-110 transition-transform cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {detailLoading ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                  <p className="text-sm font-semibold text-[var(--text-muted)]">Fetching education record from DB...</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-2.5 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-primary)]">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <span className="stamp-badge text-xs py-1 px-3">
                      {activeEd.status || 'Academic Record'}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">
                    {activeEd.institution}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--color-primary)] mb-4">
                    {activeEd.degree} — <span className="font-normal text-[var(--text-muted)]">{activeEd.field}</span>
                  </p>

                  <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] space-y-3 mb-6 shadow-inner">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {activeEd.details}
                    </p>

                    <div className="pt-3 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)] font-medium">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[var(--color-primary)]" /> {activeEd.semester}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[var(--color-primary)]" /> Grad: {activeEd.graduation}
                      </span>
                    </div>

                    {activeEd.cgpa && (
                      <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-accent)] flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-[var(--text-muted)]">Grade / CGPA</span>
                        <span className="font-heading font-bold text-base text-[var(--color-primary)] flex items-center gap-1">
                          <Award className="w-4 h-4 text-amber-600" /> {activeEd.cgpa}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" /> PostgreSQL API Record
                    </span>
                    <button
                      onClick={() => setActiveEd(null)}
                      className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-xs font-semibold hover:bg-[var(--color-dark-coffee)] cursor-pointer"
                    >
                      Close Details
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
