import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, School, Compass } from 'lucide-react';

export default function CollegeLocation() {
  const universityName = "Kishkinda University";
  const locationCity = "Ballari, Karnataka, India";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61685.74830113271!2d76.88330756782352!3d15.143644078716386!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb71192e21b72e5%3A0xb3a27a810b402830!2sBallari%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const directMapsUrl = "https://maps.google.com/?q=Kishkinda+University+Ballari+Karnataka";

  return (
    <section id="location" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 06
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          College Location
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Where I learn, code, and innovate — Kishkinda University in Ballari, Karnataka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Custom Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="journal-paper p-6 sm:p-8 rounded-2xl border border-[var(--border-accent)] shadow-sm">
            <div className="p-3 rounded-2xl bg-[var(--color-primary)] text-[var(--color-cream)] w-fit mb-4 flex items-center justify-center shadow-md">
              <School className="w-6 h-6" />
            </div>

            <span className="stamp-badge text-xs mb-3 inline-block">
              Campus Headquarters
            </span>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
              {universityName}
            </h3>

            <p className="text-sm font-semibold text-[var(--color-primary)] mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" /> {locationCity}
            </p>

            <p className="text-sm text-[var(--text-primary)] opacity-90 leading-relaxed mb-6">
              Located in historical Ballari, Kishkinda University provides a vibrant academic environment for Computer Science & Engineering students to pursue innovation, research, and technical excellence.
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2 mb-6">
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Department:</span>
                <span>Computer Science Engineering</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Academic Year:</span>
                <span>2024 - 2028</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Status:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">In Session (5th Sem)</span>
              </div>
            </div>

            <a
              href={directMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-xl bg-[var(--color-primary)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-dark-coffee)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-decoration-none shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Google Maps Embed Frame */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="relative rounded-2xl overflow-hidden border-4 border-[var(--bg-card)] shadow-xl h-96 sm:h-[450px]">
            <iframe
              title="Kishkinda University Map Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.2] contrast-[1.05] hover:grayscale-0 transition-all duration-500"
            />
            
            {/* Overlay Cafe Badge */}
            <div className="absolute bottom-4 left-4 bg-[var(--bg-card)]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[var(--border-accent)] shadow-lg flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Kishkinda University</p>
                <p className="text-[10px] text-[var(--text-muted)]">Ballari, Karnataka</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
