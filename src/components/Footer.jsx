import React from 'react';
import { Sparkles, ArrowUp, Heart, Mail } from 'lucide-react';

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-dark-coffee)] text-[#FAF7F2] pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-accent)] relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6">
        
        {/* Brand Badge */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-amber-900/40 text-amber-200 border border-amber-800">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-2xl font-bold tracking-wide">
            Aditi Das Portfolio
          </h3>
          <p className="text-sm text-amber-200 opacity-90 max-w-sm">
            "A personal portfolio of code, creativity, dreams, and continuous growth."
          </p>
        </div>

        {/* Quick Social & Navigation Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/iaditidas"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-100 transition-transform hover:scale-110 text-decoration-none"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:maditidas@gmail.com"
            aria-label="Email Aditi"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-100 transition-transform hover:scale-110 text-decoration-none"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-amber-900/60 my-2" />

        {/* Copyright & Back to top button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/80">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>by</span>
            <strong className="text-amber-100">Aditi Das</strong>
            <span>© {currentYear}</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-100 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
