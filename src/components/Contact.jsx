import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Copy, Check, Send, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchContactData, submitContactNote } from '../services/api';

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const iconMap = {
  email: Mail,
  phone: Phone,
  github: GithubIcon
};

export default function Contact() {
  const [copiedField, setCopiedField] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', note: '' });

  const defaultContactItems = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: 'maditidas@gmail.com',
      action: 'mailto:maditidas@gmail.com',
      copyable: true
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      value: '+91 7975612394',
      action: 'tel:7975612394',
      copyable: true
    },
    {
      id: 'github',
      icon: GithubIcon,
      label: 'GitHub',
      value: 'github.com/iaditidas',
      action: 'https://github.com/iaditidas',
      copyable: false
    }
  ];

  const [contactItems, setContactItems] = useState(defaultContactItems);

  useEffect(() => {
    fetchContactData().then((data) => {
      if (data && Array.isArray(data.items)) {
        setContactItems(data.items.map(item => ({
          ...item,
          icon: iconMap[item.id] || Mail
        })));
      }
    });
  }, []);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.note) return;

    await submitContactNote(formData);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6F4E37', '#D8C3A5', '#B08968', '#FAF7F2']
    });

    setMessageSent(true);
    setFormData({ name: '', email: '', note: '' });
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 07
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          Let's Connect
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Whether you want to discuss AI, collaborate on projects, or simply connect and chat — my inbox is always open!
        </p>

        <button
          onClick={async () => {
            try {
              const data = await fetchContactData();
              if (data && Array.isArray(data.items)) {
                setContactItems(data.items.map(item => ({
                  ...item,
                  icon: iconMap[item.id] || Mail
                })));
              }
            } catch (e) {}
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] text-sm font-semibold hover:bg-[var(--color-dark-coffee)] hover:scale-105 transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View Contact Information</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Cards & Quick Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="journal-paper p-6 sm:p-8 rounded-2xl border border-[var(--border-accent)] shadow-sm space-y-6">
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" /> Contact Information
            </h3>

            {contactItems.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedField === item.id;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-between hover:border-[var(--color-primary)] transition-all group"
                >
                  <a
                    href={item.action}
                    target={item.id === 'github' ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="flex items-center gap-3.5 text-decoration-none min-w-0"
                  >
                    <div className="p-3 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary)] group-hover:scale-110 transition-transform flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="font-medium text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors truncate block">
                        {item.value}
                      </span>
                    </div>
                  </a>

                  {item.copyable && (
                    <button
                      onClick={() => handleCopy(item.value, item.id)}
                      aria-label={`Copy ${item.label}`}
                      className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--bg-card-secondary)] transition-all relative"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Quick Toast Notification when copied */}
            <AnimatePresence>
              {copiedField && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center border border-emerald-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-accent)] shadow-md relative">
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Leave a Note
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Send a quick message or note to Aditi's portfolio inbox.
            </p>

            <form onSubmit={handleSubmitNote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Professor / Friend"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                  Your Note or Message *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Share a message, feedback, or project idea..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[var(--border-accent)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-primary)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-dark-coffee)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send Note</span>
              </button>
            </form>

            <AnimatePresence>
              {messageSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-4 p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)] text-center"
                >
                  <p className="font-heading text-lg text-[var(--color-primary)] font-bold mb-1">
                    🎉 Note delivered successfully!
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Thank you for taking the time to send a message. Have a wonderful day!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
