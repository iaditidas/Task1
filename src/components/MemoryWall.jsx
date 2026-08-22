import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Heart, Plus, Sparkles, Loader2 } from 'lucide-react';

import bharatanatyamImg from '../assets/images/bharatanatyam.jpg';
import scienceExhibitionImg from '../assets/images/science_exhibition.jpg';
import collegeAwardImg from '../assets/images/college_award.jpg';
import currentImg from '../assets/images/current.png';
import { fetchMemoriesData, createMemoryCard, fetchMemoryById } from '../services/api';

const localImageMap = {
  '/assets/images/bharatanatyam.jpg': bharatanatyamImg,
  '/assets/images/science_exhibition.jpg': scienceExhibitionImg,
  '/assets/images/college_award.jpg': collegeAwardImg,
  '/assets/images/current.png': currentImg
};

const resolveImage = (item) => {
  if (item.image) return item.image;
  if (item.image_url && localImageMap[item.image_url]) return localImageMap[item.image_url];
  return item.image_url || currentImg;
};

const initialMemories = [
  {
    id: 1,
    title: 'Classical Bharatanatyam',
    tag: 'Stage Performance',
    date: 'Age 5 • Grand Stage',
    image: bharatanatyamImg,
    image_url: '/assets/images/bharatanatyam.jpg',
    caption: 'Performing classical Bharatanatyam dance on a huge stage at 5 years old in traditional ghungroo & costume!',
    rotation: '-2deg'
  },
  {
    id: 2,
    title: 'Science Exhibition Victory',
    tag: 'Childhood Achievement',
    date: '3rd Standard',
    image: scienceExhibitionImg,
    image_url: '/assets/images/science_exhibition.jpg',
    caption: 'Secured 1st prize in the school-wide science exhibition! Holding my trophy & certificate with pride.',
    rotation: '2.5deg'
  },
  {
    id: 3,
    title: 'College Event 1st Prize',
    tag: 'College Achievement',
    date: '2nd Sem • ₹3,000 Cash Prize',
    image: collegeAwardImg,
    image_url: '/assets/images/college_award.jpg',
    caption: 'Secured 1st place in 2nd semester college event, receiving certificate & ₹3,000 cash prize!',
    rotation: '-1.5deg'
  }
];

export default function MemoryWall() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [memories, setMemories] = useState(initialMemories);
  const [activeMemory, setActiveMemory] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New photo simulator state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('New Memory');

  useEffect(() => {
    fetchMemoriesData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMemories(data.map(item => ({
            ...item,
            image: resolveImage(item)
          })));
        }
      })
      .catch(() => {});

    const handleNavClick = (e) => {
      if (e.detail === '#memories') {
        setIsExpanded(true);
      }
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

  const handleToggle = async () => {
    if (!isExpanded) {
      try {
        const data = await fetchMemoriesData();
        if (Array.isArray(data) && data.length > 0) {
          setMemories(data.map(item => ({
            ...item,
            image: resolveImage(item)
          })));
        }
      } catch (e) {}
    }
    setIsExpanded(!isExpanded);
  };

  const handleOpenPhoto = async (item) => {
    setActiveMemory({ ...item, isFetching: true });
    setDetailLoading(true);

    try {
      const fetched = await fetchMemoryById(item.id);
      if (fetched) {
        setActiveMemory({
          ...fetched,
          image: resolveImage(fetched)
        });
      }
    } catch (err) {
      console.warn('Error fetching photo detail:', err);
      setActiveMemory(item);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const payload = {
      title: newTitle,
      tag: newTag,
      caption: newCaption || 'A fresh snapshot added to my digital diary.',
      date: 'Just Now',
      image_url: '/assets/images/current.png'
    };

    const created = await createMemoryCard(payload);
    const newItem = {
      id: created?.id || Date.now(),
      title: created?.title || payload.title,
      tag: created?.tag || payload.tag,
      date: created?.date || payload.date,
      image: currentImg,
      caption: created?.caption || payload.caption,
      rotation: created?.rotation || `${(Math.random() * 6 - 3).toFixed(1)}deg`
    };

    setMemories([newItem, ...memories]);
    setNewTitle('');
    setNewCaption('');
    setShowAddModal(false);
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 06
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Memory Wall
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          A visual collection of precious moments, stages, and milestones.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleToggle}
            className="px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] font-bold text-sm hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2.5 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isExpanded ? 'Hide Memories Information ▲' : 'View Memories Information ✨'}</span>
          </button>

          {isExpanded && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--color-primary)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Add Photo Card</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden pt-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
              {memories.map((item) => {
                const isPhotoExpanded = activeMemory?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className="journal-paper p-6 flex flex-col justify-between rounded-2xl border border-[var(--border-accent)] hover:border-[var(--color-primary)] shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="stamp-badge text-xs py-1 px-3">
                          {item.tag}
                        </span>
                        <span className="text-[10px] font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                          {item.date}
                        </span>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] text-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-cream)] transition-all shadow-xs">
                        <Camera className="w-7 h-7" />
                      </div>

                      <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          if (isPhotoExpanded) {
                            setActiveMemory(null);
                          } else {
                            handleOpenPhoto(item);
                          }
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-primary)] hover:text-[var(--color-cream)] transition-all shadow-2xs cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>{isPhotoExpanded ? 'Hide Photo Details ▲' : 'View Photo Information 📸'}</span>
                      </button>

                      {/* Inline Expanded Photo Details */}
                      <AnimatePresence>
                        {isPhotoExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-[var(--border-accent)] overflow-hidden"
                          >
                            {detailLoading ? (
                              <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                                <Loader2 className="w-6 h-6 text-[var(--color-primary)] animate-spin" />
                                <p className="text-xs font-semibold text-[var(--text-muted)]">Fetching photo record from API...</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="rounded-xl overflow-hidden shadow-sm aspect-video bg-stone-100">
                                  <img
                                    src={activeMemory.image}
                                    alt={activeMemory.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-3 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)]">
                                  <p className="text-xs text-[var(--text-primary)] leading-relaxed italic">
                                    "{activeMemory.caption}"
                                  </p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
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
                className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
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
                    className="px-4 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--bg-card-secondary)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-sm bg-[var(--color-primary)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-dark-coffee)] cursor-pointer"
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
