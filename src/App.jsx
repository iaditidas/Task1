import React from 'react';
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
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />

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
