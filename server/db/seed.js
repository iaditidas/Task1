import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, checkConnection } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedDatabase = async () => {
  console.log('🔄 Connecting to PostgreSQL database to seed portfolio data...');
  
  const connected = await checkConnection();
  if (!connected) {
    console.warn('⚠️ Warning: PostgreSQL database is not reachable. Skipping seed step.');
    return false;
  }

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('✅ PostgreSQL schema verified/created.');

    // 1. Seed About
    const aboutRes = await pool.query('SELECT COUNT(*) FROM about');
    if (parseInt(aboutRes.rows[0].count, 10) === 0) {
      await pool.query(
        `INSERT INTO about (profile_name, subtitle, story_heading, story_paragraph1, story_paragraph2, personality_note)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          'Aditi Das',
          '"Crafting code & ideas ✨"',
          'The Story So Far',
          'I am Aditi Das, a Computer Science student with a growing passion for Artificial Intelligence, software development, and solving real-world problems through technology.',
          'I enjoy learning new technologies, building creative projects, and continuously improving my programming skills. My goal is to become an AI Engineer and create impactful solutions that make everyday life better.',
          'Believer in small daily wins, clean code, aesthetic design, and endless curiosity.'
        ]
      );

      const stats = [
        { label: 'Current CGPA', value: '8.68', icon_name: 'Award', display_order: 1 },
        { label: 'Current Semester', value: '5th Semester', icon_name: 'BookOpen', display_order: 2 },
        { label: 'Degree', value: 'B.Tech in CSE', icon_name: 'GraduationCap', display_order: 3 },
        { label: 'Location', value: 'Ballari, KA', icon_name: 'MapPin', display_order: 4 }
      ];

      for (const stat of stats) {
        await pool.query(
          `INSERT INTO about_stats (label, value, icon_name, display_order) VALUES ($1, $2, $3, $4)`,
          [stat.label, stat.value, stat.icon_name, stat.display_order]
        );
      }
      console.log('✅ About table seeded.');
    }

    // 2. Seed Story (Journey Milestones)
    const storyRes = await pool.query('SELECT COUNT(*) FROM story');
    if (parseInt(storyRes.rows[0].count, 10) === 0) {
      const milestones = [
        {
          year: 'The Beginnings',
          location: 'Aurangabad, Maharashtra',
          title: 'Born with Curiosity',
          description: 'Born in Aurangabad, Maharashtra. Growing up with warmth, affection, and a heart full of wonder.',
          icon_name: 'MapPin',
          tag: 'Origin',
          display_order: 1
        },
        {
          year: 'Growing Up',
          location: 'Ballari, Karnataka',
          title: 'Raised in Ballari',
          description: 'Spent formative years in Ballari, Karnataka, learning values of hard work, discipline, and community.',
          icon_name: 'Sun',
          tag: 'Roots',
          display_order: 2
        },
        {
          year: 'Childhood Spark',
          location: 'The Tech Wonder',
          title: 'Curious About Computers',
          description: 'Fascinated by technology from a young age. Pondered deeply: "How does Google answer every question in seconds?"',
          icon_name: 'Search',
          tag: 'Inspiration',
          display_order: 3
        },
        {
          year: 'Personal Philosophy',
          location: 'Daily Evolution',
          title: 'Striving for Growth',
          description: 'Inspired by becoming a better version of myself every single day through continuous learning and persistence.',
          icon_name: 'Target',
          tag: 'Mindset',
          display_order: 4
        },
        {
          year: 'Core Dreams',
          location: 'Future Horizon',
          title: 'Making Parents Proud & Exploring the World',
          description: 'Driven by two core lifelong dreams: to make my parents proud through meaningful achievement, and to explore beautiful cultures across the globe.',
          icon_name: 'Compass',
          tag: 'Aspiration',
          display_order: 5
        }
      ];

      for (const m of milestones) {
        await pool.query(
          `INSERT INTO story (year, location, title, description, icon_name, tag, display_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [m.year, m.location, m.title, m.description, m.icon_name, m.tag, m.display_order]
        );
      }
      console.log('✅ Story table seeded.');
    }

    // 3. Seed Education
    const edRes = await pool.query('SELECT COUNT(*) FROM education');
    if (parseInt(edRes.rows[0].count, 10) === 0) {
      const edItems = [
        {
          institution: 'Kishkinda University',
          degree: 'Bachelor of Technology (B.Tech)',
          field: 'Computer Science & Engineering',
          semester: '5th Semester',
          graduation: '2028',
          cgpa: '8.68',
          status: 'Current Program',
          details: 'Focusing on Data Structures, Algorithms, Artificial Intelligence, Database Management, and Web Technologies.',
          highlight: true,
          display_order: 1
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
          highlight: false,
          display_order: 2
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
          highlight: false,
          display_order: 3
        }
      ];

      for (const ed of edItems) {
        await pool.query(
          `INSERT INTO education (institution, degree, field, semester, graduation, cgpa, status, details, highlight, display_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [ed.institution, ed.degree, ed.field, ed.semester, ed.graduation, ed.cgpa, ed.status, ed.details, ed.highlight, ed.display_order]
        );
      }
      console.log('✅ Education table seeded.');
    }

    // 4. Seed Hobbies
    const hobbyRes = await pool.query('SELECT COUNT(*) FROM hobbies');
    if (parseInt(hobbyRes.rows[0].count, 10) === 0) {
      const hobbyItems = [
        {
          title: 'Watching Movies',
          emoji: '🎬',
          color: 'from-purple-50 to-indigo-50',
          border_color: 'border-purple-200',
          description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.',
          display_order: 1
        },
        {
          title: 'Listening to Music',
          emoji: '🎵',
          color: 'from-sky-50 to-blue-50',
          border_color: 'border-sky-200',
          description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.',
          display_order: 2
        },
        {
          title: 'Exploring New Places',
          emoji: '✈️',
          color: 'from-amber-50 to-yellow-50',
          border_color: 'border-amber-200',
          description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.',
          display_order: 3
        },
        {
          title: 'Dancing',
          emoji: '💃',
          color: 'from-rose-50 to-pink-50',
          border_color: 'border-rose-200',
          description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.',
          display_order: 4
        }
      ];

      for (const h of hobbyItems) {
        await pool.query(
          `INSERT INTO hobbies (title, emoji, color, border_color, description, display_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [h.title, h.emoji, h.color, h.border_color, h.description, h.display_order]
        );
      }
      console.log('✅ Hobbies table seeded.');
    }

    // 5. Seed Skills
    const skillRes = await pool.query('SELECT COUNT(*) FROM skills');
    if (parseInt(skillRes.rows[0].count, 10) === 0) {
      const skillItems = [
        { name: 'HTML5', category: 'Web & Frontend', level: 'Advanced', brew: '95%', icon: '🌐', display_order: 1 },
        { name: 'CSS3', category: 'Web & Frontend', level: 'Advanced', brew: '90%', icon: '🎨', display_order: 2 },
        { name: 'JavaScript (ES6+)', category: 'Web & Frontend', level: 'Advanced', brew: '88%', icon: '⚡', display_order: 3 },
        { name: 'React.js', category: 'Web & Frontend', level: 'Intermediate/Advanced', brew: '85%', icon: '⚛️', display_order: 4 },
        { name: 'Python', category: 'Programming Languages', level: 'Advanced', brew: '92%', icon: '🐍', display_order: 5 },
        { name: 'Java', category: 'Programming Languages', level: 'Intermediate', brew: '80%', icon: '💻', display_order: 6 },
        { name: 'Git', category: 'Tools & Platforms', level: 'Proficient', brew: '85%', icon: '🌿', display_order: 7 },
        { name: 'GitHub', category: 'Tools & Platforms', level: 'Proficient', brew: '88%', icon: '🐙', display_order: 8 },
        { name: 'Firebase', category: 'Tools & Platforms', level: 'Intermediate', brew: '75%', icon: '🔥', display_order: 9 },
        { name: 'AI Tools & Prompts', category: 'Tools & Platforms', level: 'Enthusiast/Advanced', brew: '90%', icon: '🤖', display_order: 10 },
        { name: 'Problem Solving', category: 'Core Competencies', level: 'Core', brew: '90%', icon: '🧠', display_order: 11 },
        { name: 'UI Design & Wireframing', category: 'Core Competencies', level: 'Creative', brew: '85%', icon: '✏️', display_order: 12 }
      ];

      for (const s of skillItems) {
        await pool.query(
          `INSERT INTO skills (name, category, level, brew, icon, display_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [s.name, s.category, s.level, s.brew, s.icon, s.display_order]
        );
      }
      console.log('✅ Skills table seeded.');
    }

    // 6. Seed College
    const collegeRes = await pool.query('SELECT COUNT(*) FROM college');
    if (parseInt(collegeRes.rows[0].count, 10) === 0) {
      await pool.query(
        `INSERT INTO college (university_name, location_city, description, department, academic_year, status, map_embed_url, direct_maps_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          'Kishkinda University',
          'Mount View Campus, Ballari, Karnataka',
          'Located in historical Ballari, Kishkinda University provides a vibrant academic environment for Computer Science & Engineering students to pursue innovation, research, and technical excellence.',
          'Computer Science Engineering',
          '2024 - 2028',
          'In Session (5th Sem)',
          'https://maps.google.com/maps?q=Kishkinda%20University%2C%20Siruguppa%20Road%2C%20Ballari%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed',
          'https://www.google.com/maps/search/?api=1&query=Kishkinda+University+Ballari+Karnataka'
        ]
      );
      console.log('✅ College table seeded.');
    }

    // 7. Seed Photos (Memories)
    const photosRes = await pool.query('SELECT COUNT(*) FROM photos');
    if (parseInt(photosRes.rows[0].count, 10) === 0) {
      const photoItems = [
        {
          title: 'Classical Bharatanatyam',
          tag: 'Stage Performance',
          date: 'Age 5 • Grand Stage',
          image_url: '/assets/images/bharatanatyam.jpg',
          caption: 'Performing classical Bharatanatyam dance on a huge stage at 5 years old in traditional ghungroo & costume!',
          rotation: '-2deg'
        },
        {
          title: 'Science Exhibition Victory',
          tag: 'Childhood Achievement',
          date: '3rd Standard',
          image_url: '/assets/images/science_exhibition.jpg',
          caption: 'Secured 1st prize in the school-wide science exhibition! Holding my trophy & certificate with pride.',
          rotation: '2.5deg'
        },
        {
          title: 'College Event 1st Prize',
          tag: 'College Achievement',
          date: '2nd Sem • ₹3,000 Cash Prize',
          image_url: '/assets/images/college_award.jpg',
          caption: 'Secured 1st place in 2nd semester college event, receiving certificate & ₹3,000 cash prize!',
          rotation: '-1.5deg'
        }
      ];

      for (const p of photoItems) {
        await pool.query(
          `INSERT INTO photos (title, tag, date, image_url, caption, rotation)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [p.title, p.tag, p.date, p.image_url, p.caption, p.rotation]
        );
      }
      console.log('✅ Photos table seeded.');
    }

    // 8. Seed Hero Content
    const heroRes = await pool.query('SELECT COUNT(*) FROM hero_content');
    if (parseInt(heroRes.rows[0].count, 10) === 0) {
      await pool.query(
        `INSERT INTO hero_content (name, tagline, titles, welcome_note, author_signature)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          'Aditi Das',
          'Welcome to My Portfolio',
          ['Computer Science Student', 'Aspiring AI Engineer', 'Creative Developer', 'Code & Tech Enthusiast'],
          '"Settle in and explore my portfolio. Here, technology meets curiosity, dreams, and continuous learning."',
          '— Aditi ✨'
        ]
      );
      console.log('✅ Hero content seeded.');
    }

    // 9. Seed Contact Info
    const contactRes = await pool.query('SELECT COUNT(*) FROM contact_info');
    if (parseInt(contactRes.rows[0].count, 10) === 0) {
      await pool.query(
        `INSERT INTO contact_info (email, phone, github_url) VALUES ($1, $2, $3)`,
        ['maditidas@gmail.com', '+91 7975612394', 'https://github.com/iaditidas']
      );
      console.log('✅ Contact info seeded.');
    }

    console.log('🎉 PostgreSQL Database Seeding Complete for all tables (about, story, education, hobbies, skills, college, photos)!');
    return true;
  } catch (err) {
    console.error('❌ Error during database seeding:', err);
    return false;
  }
};

// Run directly if invoked from CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => pool.end());
}
