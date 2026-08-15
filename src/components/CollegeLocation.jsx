import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, School, Compass } from 'lucide-react';
import { fetchLocationData } from '../services/api';
import SectionStateStatus from './SectionStateStatus';

export default function CollegeLocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [locationInfo, setLocationInfo] = useState({
    university_name: 'Kishkinda University',
    location_city: 'Mount View Campus, Ballari, Karnataka',
    description: 'Located in historical Ballari, Kishkinda University provides a vibrant academic environment for Computer Science & Engineering students to pursue innovation, research, and technical excellence.',
    department: 'Computer Science Engineering',
    academic_year: '2024 - 2028',
    status: 'In Session (5th Sem)',
    map_embed_url: 'https://maps.google.com/maps?q=Kishkinda%20University%2C%20Siruguppa%20Road%2C%20Ballari%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed',
    direct_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kishkinda+University+Ballari+Karnataka'
  });

  const loadData = () => {
    setLoading(true);
    setError(false);
    fetchLocationData()
      .then((data) => {
        if (data) {
          setLocationInfo((prev) => ({
            university_name: data.university_name || prev.university_name,
            location_city: data.location_city || prev.location_city,
            description: data.description || prev.description,
            department: data.department || prev.department,
            academic_year: data.academic_year || prev.academic_year,
            status: data.status || prev.status,
            map_embed_url: data.map_embed_url || prev.map_embed_url,
            direct_maps_url: data.direct_maps_url || prev.direct_maps_url
          }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
    const handleNavClick = (e) => {
      if (e.detail === '#college' || e.detail === '#location') loadData();
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

  const universityName = locationInfo.university_name;
  const locationCity = locationInfo.location_city;
  const mapEmbedUrl = locationInfo.map_embed_url;
  const directMapsUrl = locationInfo.direct_maps_url;

  return (
    <section id="college" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div id="location" className="absolute -top-28" />
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 06
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          College
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Where I learn, code, and innovate — Kishkinda University in Ballari, Karnataka.
        </p>
      </div>

      {loading || error ? (
        <SectionStateStatus loading={loading} error={error} onRetry={loadData} />
      ) : (

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
              {locationInfo.description}
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2 mb-6">
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Department:</span>
                <span>{locationInfo.department}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Academic Year:</span>
                <span>{locationInfo.academic_year}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">Status:</span>
                <span className="text-emerald-700 font-bold">{locationInfo.status}</span>
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
      )}
    </section>
  );
}
