import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, School, Compass, Sparkles, X, Loader2 } from 'lucide-react';
import { fetchLocationData } from '../services/api';
import SectionStateStatus from './SectionStateStatus';

export default function CollegeLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showLocationDetails, setShowLocationDetails] = useState(false);

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

  const handleFetchLocation = async () => {
    setLoading(true);
    setError(false);
    setShowLocationDetails(true);

    try {
      const data = await fetchLocationData();
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
    } catch (err) {
      console.error('Error fetching location data from DB:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleNavClick = (e) => {
      if (e.detail === '#college' || e.detail === '#location') {
        // Option to trigger or reset
      }
    };
    window.addEventListener('nav-section-click', handleNavClick);
    return () => window.removeEventListener('nav-section-click', handleNavClick);
  }, []);

  return (
    <section id="college" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div id="location" className="absolute -top-28" />
      
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
          Chapter 06
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 section-title">
          College & Location
        </h2>
        <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto mt-4">
          Click the button below to fetch campus details and load the live interactive Google Map inline on the page.
        </p>

        <button
          onClick={() => {
            if (showLocationDetails) {
              setShowLocationDetails(false);
            } else {
              handleFetchLocation();
            }
          }}
          disabled={loading}
          className="mt-6 px-8 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-cream)] font-bold text-sm hover:bg-[var(--color-dark-coffee)] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Fetching Location & Map from API...</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{showLocationDetails ? 'Hide Location Details ▲' : 'View Location & Interactive Map 🗺️'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Preview Card */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="journal-paper p-8 text-center rounded-3xl border-2 border-[var(--border-accent)] hover:border-[var(--color-primary)] shadow-md transition-all group relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-[var(--color-cream)] flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition-transform">
            <School className="w-8 h-8" />
          </div>

          <span className="stamp-badge text-xs mb-3 inline-block">
            Campus Headquarters
          </span>

          <h3 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-2">
            {locationInfo.university_name}
          </h3>

          <p className="text-sm font-semibold text-[var(--color-primary)] mb-6 flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" /> {locationInfo.location_city}
          </p>

          {/* Inline Location & Google Maps Container */}
          <AnimatePresence>
            {showLocationDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-6 border-t border-[var(--border-accent)] text-left overflow-hidden"
              >
                {loading ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
                    <p className="text-xs font-semibold text-[var(--text-muted)]">Loading campus map & details from API...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Info Column */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-accent)]">
                        <p className="text-xs text-[var(--text-primary)] opacity-90 leading-relaxed mb-4">
                          {locationInfo.description}
                        </p>

                        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-1.5 mb-4 text-xs">
                          <div className="flex justify-between">
                            <span className="font-semibold text-[var(--text-primary)]">Department:</span>
                            <span className="text-[var(--text-muted)]">{locationInfo.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold text-[var(--text-primary)]">Academic Year:</span>
                            <span className="text-[var(--text-muted)]">{locationInfo.academic_year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold text-[var(--text-primary)]">Status:</span>
                            <span className="text-emerald-700 font-bold">{locationInfo.status}</span>
                          </div>
                        </div>

                        <a
                          href={locationInfo.direct_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-primary)] text-[var(--color-cream)] font-medium hover:bg-[var(--color-dark-coffee)] transition-all flex items-center justify-center gap-2 text-decoration-none shadow-sm text-xs"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>
                      </div>
                    </div>

                    {/* Google Map Frame */}
                    <div className="lg:col-span-7">
                      <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--border-accent)] shadow-md h-72">
                        <iframe
                          title="Kishkinda University Map Location"
                          src={locationInfo.map_embed_url}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full grayscale-[0.1] contrast-[1.05] hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
