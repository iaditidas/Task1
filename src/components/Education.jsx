import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, School, Star } from 'lucide-react';

export default function Education() {
  const edList = [
    {
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
          Academic foundations that inspire my journey in computer science and technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {edList.map((item, idx) => (
          <motion.div
            key={item.institution}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`journal-paper p-6 sm:p-8 flex flex-col justify-between rounded-2xl relative transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
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
              <div className="p-3 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary)] w-fit mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">
                {item.institution}
              </h3>

              <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">
                {item.degree} — <span className="font-normal text-[var(--text-muted)]">{item.field}</span>
              </p>

              <p className="text-sm text-[var(--text-primary)] opacity-90 leading-relaxed mb-6">
                {item.details}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {item.semester}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Grad: {item.graduation}
                </span>
              </div>

              {item.cgpa && (
                <div className="mt-2 p-2.5 rounded-lg bg-[var(--bg-card-secondary)] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[var(--text-muted)]">Grade / Score</span>
                  <span className="font-heading font-bold text-base text-[var(--color-primary)] flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-600" /> {item.cgpa}
                  </span>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
