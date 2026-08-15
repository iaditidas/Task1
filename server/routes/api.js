import express from 'express';
import { pool, checkConnection } from '../db/index.js';

const router = express.Router();

// Fallback initial data in case DB is starting or offline
const fallbackData = {
  hero: {
    name: 'Aditi Das',
    tagline: 'Welcome to My Portfolio',
    titles: ['Computer Science Student', 'Aspiring AI Engineer', 'Creative Developer', 'Code & Tech Enthusiast'],
    welcome_note: '"Settle in and explore my portfolio. Here, technology meets curiosity, dreams, and continuous learning."',
    author_signature: '— Aditi ✨'
  },
  about: {
    profile_name: 'Aditi Das',
    subtitle: '"Crafting code & ideas ✨"',
    story_heading: 'The Story So Far',
    story_paragraph1: 'I am Aditi Das, a Computer Science student with a growing passion for Artificial Intelligence, software development, and solving real-world problems through technology.',
    story_paragraph2: 'I enjoy learning new technologies, building creative projects, and continuously improving my programming skills. My goal is to become an AI Engineer and create impactful solutions that make everyday life better.',
    personality_note: 'Believer in small daily wins, clean code, aesthetic design, and endless curiosity.',
    stats: [
      { label: 'Current CGPA', value: '8.68', icon_name: 'Award' },
      { label: 'Current Semester', value: '5th Semester', icon_name: 'BookOpen' },
      { label: 'Degree', value: 'B.Tech in CSE', icon_name: 'GraduationCap' },
      { label: 'Location', value: 'Ballari, KA', icon_name: 'MapPin' }
    ]
  },
  story: [
    {
      id: 1,
      year: 'The Beginnings',
      location: 'Aurangabad, Maharashtra',
      title: 'Born with Curiosity',
      description: 'Born in Aurangabad, Maharashtra. Growing up with warmth, affection, and a heart full of wonder.',
      icon_name: 'MapPin',
      tag: 'Origin'
    },
    {
      id: 2,
      year: 'Growing Up',
      location: 'Ballari, Karnataka',
      title: 'Raised in Ballari',
      description: 'Spent formative years in Ballari, Karnataka, learning values of hard work, discipline, and community.',
      icon_name: 'Sun',
      tag: 'Roots'
    },
    {
      id: 3,
      year: 'Childhood Spark',
      location: 'The Tech Wonder',
      title: 'Curious About Computers',
      description: 'Fascinated by technology from a young age. Pondered deeply: "How does Google answer every question in seconds?"',
      icon_name: 'Search',
      tag: 'Inspiration'
    },
    {
      id: 4,
      year: 'Personal Philosophy',
      location: 'Daily Evolution',
      title: 'Striving for Growth',
      description: 'Inspired by becoming a better version of myself every single day through continuous learning and persistence.',
      icon_name: 'Target',
      tag: 'Mindset'
    },
    {
      id: 5,
      year: 'Core Dreams',
      location: 'Future Horizon',
      title: 'Making Parents Proud & Exploring the World',
      description: 'Driven by two core lifelong dreams: to make my parents proud through meaningful achievement, and to explore beautiful cultures across the globe.',
      icon_name: 'Compass',
      tag: 'Aspiration'
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Kishkinda University',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      semester: '5th Semester',
      graduation: '2028',
      cgpa: '8.68',
      status: 'Current Program',
      details: 'Focusing on Data Structures, Algorithms, Artificial Intelligence, Database Management, and Web Technologies.',
      highlight: true
    },
    {
      id: 2,
      institution: 'BeST College',
      degree: 'Pre-University Education (PUC)',
      field: 'Science Stream (PCMB/CS)',
      semester: 'Completed',
      graduation: 'Pre-University',
      cgpa: 'Distinction',
      status: 'Pre-University',
      details: 'Built strong analytical foundations in Mathematics, Physics, and foundational Computer Science concepts.',
      highlight: false
    },
    {
      id: 3,
      institution: "St. Joseph's Girls High School",
      degree: 'Secondary School Leaving Certificate (SSLC)',
      field: 'School Education',
      semester: 'Completed',
      graduation: 'High School',
      cgpa: 'High Distinction',
      status: 'Schooling',
      details: 'Active participant in science exhibitions, academic clubs, and extracurricular activities.',
      highlight: false
    }
  ],
  hobbies: [
    {
      id: 1,
      title: 'Watching Movies',
      emoji: '🎬',
      color: 'from-purple-50 to-indigo-50',
      border_color: 'border-purple-200',
      description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.'
    },
    {
      id: 2,
      title: 'Listening to Music',
      emoji: '🎵',
      color: 'from-sky-50 to-blue-50',
      border_color: 'border-sky-200',
      description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.'
    },
    {
      id: 3,
      title: 'Exploring New Places',
      emoji: '✈️',
      color: 'from-amber-50 to-yellow-50',
      border_color: 'border-amber-200',
      description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.'
    },
    {
      id: 4,
      title: 'Dancing',
      emoji: '💃',
      color: 'from-rose-50 to-pink-50',
      border_color: 'border-rose-200',
      description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.'
    }
  ],
  skills: [
    { name: 'HTML5', category: 'Web & Frontend', level: 'Advanced', brew: '95%', icon: '🌐' },
    { name: 'CSS3', category: 'Web & Frontend', level: 'Advanced', brew: '90%', icon: '🎨' },
    { name: 'JavaScript (ES6+)', category: 'Web & Frontend', level: 'Advanced', brew: '88%', icon: '⚡' },
    { name: 'React.js', category: 'Web & Frontend', level: 'Intermediate/Advanced', brew: '85%', icon: '⚛️' },
    { name: 'Python', category: 'Programming Languages', level: 'Advanced', brew: '92%', icon: '🐍' },
    { name: 'Java', category: 'Programming Languages', level: 'Intermediate', brew: '80%', icon: '💻' },
    { name: 'Git', category: 'Tools & Platforms', level: 'Proficient', brew: '85%', icon: '🌿' },
    { name: 'GitHub', category: 'Tools & Platforms', level: 'Proficient', brew: '88%', icon: '🐙' },
    { name: 'Firebase', category: 'Tools & Platforms', level: 'Intermediate', brew: '75%', icon: '🔥' },
    { name: 'AI Tools & Prompts', category: 'Tools & Platforms', level: 'Enthusiast/Advanced', brew: '90%', icon: '🤖' },
    { name: 'Problem Solving', category: 'Core Competencies', level: 'Core', brew: '90%', icon: '🧠' },
    { name: 'UI Design & Wireframing', category: 'Core Competencies', level: 'Creative', brew: '85%', icon: '✏️' }
  ],
  college: {
    university_name: 'Kishkinda University',
    location_city: 'Mount View Campus, Ballari, Karnataka',
    description: 'Located in historical Ballari, Kishkinda University provides a vibrant academic environment for Computer Science & Engineering students to pursue innovation, research, and technical excellence.',
    department: 'Computer Science Engineering',
    academic_year: '2024 - 2028',
    status: 'In Session (5th Sem)',
    map_embed_url: 'https://maps.google.com/maps?q=Kishkinda%20University%2C%20Siruguppa%20Road%2C%20Ballari%2C%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed',
    direct_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kishkinda+University+Ballari+Karnataka'
  },
  photos: [
    {
      id: 1,
      title: 'Classical Bharatanatyam',
      tag: 'Stage Performance',
      date: 'Age 5 • Grand Stage',
      image_url: '/assets/images/bharatanatyam.jpg',
      caption: 'Performing classical Bharatanatyam dance on a huge stage at 5 years old in traditional ghungroo & costume!',
      rotation: '-2deg'
    },
    {
      id: 2,
      title: 'Science Exhibition Victory',
      tag: 'Childhood Achievement',
      date: '3rd Standard',
      image_url: '/assets/images/science_exhibition.jpg',
      caption: 'Secured 1st prize in the school-wide science exhibition! Holding my trophy & certificate with pride.',
      rotation: '2.5deg'
    },
    {
      id: 3,
      title: 'College Event 1st Prize',
      tag: 'College Achievement',
      date: '2nd Sem • ₹3,000 Cash Prize',
      image_url: '/assets/images/college_award.jpg',
      caption: 'Secured 1st place in 2nd semester college event, receiving certificate & ₹3,000 cash prize!',
      rotation: '-1.5deg'
    }
  ],
  contact: {
    items: [
      { id: 'email', label: 'Email', value: 'maditidas@gmail.com', action: 'mailto:maditidas@gmail.com', copyable: true },
      { id: 'phone', label: 'Phone', value: '+91 7975612394', action: 'tel:7975612394', copyable: true },
      { id: 'github', label: 'GitHub', value: 'github.com/iaditidas', action: 'https://github.com/iaditidas', copyable: false }
    ]
  }
};

// GET /api/about (From 'about' & 'about_stats' tables)
router.get('/about', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const aboutRes = await pool.query('SELECT * FROM about ORDER BY id LIMIT 1');
      const statsRes = await pool.query('SELECT label, value, icon_name FROM about_stats ORDER BY display_order');

      if (aboutRes.rows.length > 0) {
        const aboutData = {
          ...aboutRes.rows[0],
          stats: statsRes.rows
        };
        return res.json({ success: true, data: aboutData, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.about, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.about, source: 'fallback' });
  }
});

// GET /api/story or /api/journey (From 'story' table)
router.get('/story', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM story ORDER BY display_order ASC');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.story, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.story, source: 'fallback' });
  }
});
router.get('/journey', (req, res) => res.redirect('/api/story'));

// GET /api/education (From 'education' table)
router.get('/education', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM education ORDER BY display_order ASC');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.education, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.education, source: 'fallback' });
  }
});

// GET /api/hobbies (From 'hobbies' table)
router.get('/hobbies', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM hobbies ORDER BY display_order ASC');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.hobbies, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.hobbies, source: 'fallback' });
  }
});

// GET /api/skills (From 'skills' table)
router.get('/skills', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM skills ORDER BY display_order ASC');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.skills, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.skills, source: 'fallback' });
  }
});

// GET /api/college or /api/college-location (From 'college' table)
router.get('/college', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM college ORDER BY id LIMIT 1');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows[0], source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.college, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.college, source: 'fallback' });
  }
});
router.get('/college-location', (req, res) => res.redirect('/api/college'));

// GET /api/photos or /api/memories (From 'photos' table)
router.get('/photos', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM photos ORDER BY created_at DESC');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.photos, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.photos, source: 'fallback' });
  }
});
router.get('/memories', (req, res) => res.redirect('/api/photos'));

// POST /api/photos or POST /api/memories (Add new photo card)
router.post('/photos', async (req, res) => {
  const { title, tag, caption, date, image_url } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const memoryDate = date || 'Just Now';
  const memoryImage = image_url || '/assets/images/current.png';
  const memoryCaption = caption || 'A fresh snapshot added to my digital diary.';
  const rotation = `${(Math.random() * 6 - 3).toFixed(1)}deg`;

  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const insertRes = await pool.query(
        `INSERT INTO photos (title, tag, date, image_url, caption, rotation)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, tag || 'New Memory', memoryDate, memoryImage, memoryCaption, rotation]
      );
      return res.status(201).json({ success: true, data: insertRes.rows[0], source: 'database' });
    }
  } catch (err) {
    console.error('Error inserting photo into database:', err);
  }

  const newPhoto = {
    id: Date.now(),
    title,
    tag: tag || 'New Memory',
    date: memoryDate,
    image_url: memoryImage,
    caption: memoryCaption,
    rotation
  };
  res.status(201).json({ success: true, data: newPhoto, source: 'fallback' });
});
router.post('/memories', (req, res, next) => {
  req.url = '/photos';
  router.handle(req, res, next);
});

// GET /api/hero (From 'hero_content' table)
router.get('/hero', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM hero_content ORDER BY id LIMIT 1');
      if (dbRes.rows.length > 0) {
        return res.json({ success: true, data: dbRes.rows[0], source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.hero, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.hero, source: 'fallback' });
  }
});

// GET /api/contact
router.get('/contact', async (req, res) => {
  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const dbRes = await pool.query('SELECT * FROM contact_info ORDER BY id LIMIT 1');
      if (dbRes.rows.length > 0) {
        const row = dbRes.rows[0];
        const contactData = {
          items: [
            { id: 'email', label: 'Email', value: row.email, action: `mailto:${row.email}`, copyable: true },
            { id: 'phone', label: 'Phone', value: row.phone, action: `tel:${row.phone.replace(/[^0-9+]/g, '')}`, copyable: true },
            { id: 'github', label: 'GitHub', value: row.github_url.replace('https://', ''), action: row.github_url, copyable: false }
          ]
        };
        return res.json({ success: true, data: contactData, source: 'database' });
      }
    }
    res.json({ success: true, data: fallbackData.contact, source: 'fallback' });
  } catch (err) {
    res.json({ success: true, data: fallbackData.contact, source: 'fallback' });
  }
});

// POST /api/contact/notes
router.post('/contact/notes', async (req, res) => {
  const { name, email, note } = req.body;
  if (!name || !note) {
    return res.status(400).json({ success: false, error: 'Name and Note are required' });
  }

  try {
    const isConnected = await checkConnection();
    if (isConnected) {
      const insertRes = await pool.query(
        `INSERT INTO contact_notes (name, email, note) VALUES ($1, $2, $3) RETURNING *`,
        [name, email || null, note]
      );
      return res.status(201).json({ success: true, data: insertRes.rows[0], message: 'Note saved to database!', source: 'database' });
    }
  } catch (err) {
    console.error('Error saving contact note to database:', err);
  }

  res.status(201).json({
    success: true,
    data: { id: Date.now(), name, email, note, created_at: new Date().toISOString() },
    message: 'Note received successfully!',
    source: 'fallback'
  });
});

export default router;
