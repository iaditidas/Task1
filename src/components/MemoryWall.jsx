import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Heart, Plus, Sparkles } from 'lucide-react';

import bharatanatyamImg from '../assets/images/bharatanatyam.jpg';
import scienceExhibitionImg from '../assets/images/science_exhibition.jpg';
import collegeAwardImg from '../assets/images/college_award.jpg';
import currentImg from '../assets/images/current.png';

export default function MemoryWall() {
  const initialMemories = [
    {
      id: 6,
      title: 'Classical Bharatanatyam',
      tag: 'Stage Performance',
      date: 'Age 5 • Grand Stage',
      image: bharatanatyamImg,
      caption: 'Performing classical Bharatanatyam dance on a huge stage at 5 years old in traditional ghungroo & costume!',
      rotation: '-2deg'
    },
    {
      id: 5,
      title: 'Science Exhibition Victory',
      tag: 'Childhood Achievement',
      date: '3rd Standard',
      image: scienceExhibitionImg,
      caption: 'Secured 1st prize in the school-wide science exhibition! Holding my trophy & certificate with pride.',
      rotation: '2.5deg'
    },
    {
      id: 7,
      title: 'College Event 1st Prize',
      tag: 'College Achievement',
      date: '2nd Sem • ₹3,000 Cash Prize',
      image: collegeAwardImg,
      caption: 'Secured 1st place in 2nd semester college event, receiving certificate & ₹3,000 cash prize!',
      rotation: '-1.5deg'
    }
  ];

  const [memories, setMemories] = useState(initialMemories);
  const [activeMemory, setActiveMemory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New photo simulator state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('New Memory');

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      tag: newTag,
      date: 'Just Now',
      image: currentImg, // default fallback photo
      caption: newCaption || 'A fresh snapshot added to my digital diary.',
      rotation: `${(Math.random() * 6 - 3).toFixed(1)}deg`
    };

    setMemories([newItem, ...memories]);
    setNewTitle('');
    setNewCaption('');
    setShowAddModal(false);
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 05
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Memory Wall
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          An aesthetic photo gallery of childhood curiosity, school days, college milestones, and current moments.
        </p>

        <button
          onClick={() => setShowAddModal(true)}
          className="mt-6 px-5 py-2.5 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--color-primary)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Add Photo Card</span>
        </button>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {memories.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveMemory(item)}
            className="polaroid-card cursor-pointer group relative"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl bg-stone-100 aspect-square mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn className="w-8 h-8 drop-shadow-md" />
              </div>
              <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                {item.tag}
              </span>
            </div>

            {/* Photo Card Caption */}
            <div className="text-center px-1">
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-1">
                "{item.caption}"
              </p>
              <div className="mt-2 text-[10px] uppercase font-semibold text-[var(--color-accent)] tracking-wider">
                {item.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-[var(--border-accent)]"
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-card-secondary)] text-[var(--text-primary)] hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="rounded-xl overflow-hidden shadow-md bg-stone-100 max-h-80">
                  <img
                    src={activeMemory.image}
                    alt={activeMemory.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="stamp-badge text-xs py-1 px-3 mb-3 inline-block">
                    {activeMemory.tag}
                  </span>

                  <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {activeMemory.title}
                  </h3>

                  <p className="text-xs text-[var(--color-accent)] font-semibold mb-4">
                    {activeMemory.date}
                  </p>

                  <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] mb-4">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      "{activeMemory.caption}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Saved in Aditi's Personal Gallery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Note Simulator Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] max-w-md w-full rounded-2xl p-6 shadow-2xl relative border border-[var(--border-accent)]"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[var(--color-primary)]" /> Add Photo Card
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-5">
                Simulate adding a new memory card to the memory wall!
              </p>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Hackathon Triumph"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="Childhood">Childhood</option>
                    <option value="School Memories">School Memories</option>
                    <option value="College Memories">College Memories</option>
                    <option value="Current Journey">Current Journey</option>
                    <option value="Special Moment">Special Moment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Caption
                  </label>
                  <textarea
                    rows="3"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Handwritten journal note..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--bg-card-secondary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-dark-coffee)]"
                  >
                    Pin to Wall
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
