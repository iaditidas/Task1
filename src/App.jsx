import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import MyJourney from './components/MyJourney';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import MemoryWall from './components/MemoryWall';
import CollegeLocation from './components/CollegeLocation';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('coffee_diary_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('coffee_diary_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('coffee_diary_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow">
        <Hero />
        <AboutMe />
        <MyJourney />
        <Education />
        <Hobbies />
        <MemoryWall />
        <CollegeLocation />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
