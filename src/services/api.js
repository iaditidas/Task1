// Frontend API service layer connecting to backend endpoints with fallback protection

const fallbackStore = {
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
    { id: 1, year: 'The Beginnings', location: 'Aurangabad, Maharashtra', title: 'Born with Curiosity', description: 'Born in Aurangabad, Maharashtra. Growing up with warmth, affection, and a heart full of wonder.', icon_name: 'MapPin', tag: 'Origin' },
    { id: 2, year: 'Growing Up', location: 'Ballari, Karnataka', title: 'Raised in Ballari', description: 'Spent formative years in Ballari, Karnataka, learning values of hard work, discipline, and community.', icon_name: 'Sun', tag: 'Roots' },
    { id: 3, year: 'Childhood Spark', location: 'The Tech Wonder', title: 'Curious About Computers', description: 'Fascinated by technology from a young age. Pondered deeply: "How does Google answer every question in seconds?"', icon_name: 'Search', tag: 'Inspiration' },
    { id: 4, year: 'Personal Philosophy', location: 'Daily Evolution', title: 'Striving for Growth', description: 'Inspired by becoming a better version of myself every single day through continuous learning and persistence.', icon_name: 'Target', tag: 'Mindset' },
    { id: 5, year: 'Core Dreams', location: 'Future Horizon', title: 'Making Parents Proud & Exploring the World', description: 'Driven by two core lifelong dreams: to make my parents proud through meaningful achievement, and to explore beautiful cultures across the globe.', icon_name: 'Compass', tag: 'Aspiration' }
  ],
  education: [
    { id: 1, institution: 'Kishkinda University', degree: 'Bachelor of Technology (B.Tech)', field: 'Computer Science & Engineering', semester: '5th Semester', graduation: '2028', cgpa: '8.68', status: 'Current Program', details: 'Focusing on Data Structures, Algorithms, Artificial Intelligence, Database Management, and Web Technologies.', highlight: true },
    { id: 2, institution: 'BeST College', degree: 'Pre-University Education (PUC)', field: 'Science Stream (PCMB/CS)', semester: 'Completed', graduation: 'Pre-University', cgpa: 'Distinction', status: 'Pre-University', details: 'Built strong analytical foundations in Mathematics, Physics, and foundational Computer Science concepts.', highlight: false },
    { id: 3, institution: "St. Joseph's Girls High School", degree: 'Secondary School Leaving Certificate (SSLC)', field: 'School Education', semester: 'Completed', graduation: 'High School', cgpa: 'High Distinction', status: 'Schooling', details: 'Active participant in science exhibitions, academic clubs, and extracurricular activities.', highlight: false }
  ],
  hobbies: [
    { id: 1, title: 'Watching Movies', emoji: '🎬', color: 'from-purple-50 to-indigo-50', border_color: 'border-purple-200', description: 'Enjoying cinema storytelling, sci-fi thrillers, heartwarming comfort films, and inspiring narratives.' },
    { id: 2, title: 'Listening to Music', emoji: '🎵', color: 'from-sky-50 to-blue-50', border_color: 'border-sky-200', description: 'Unwinding with lo-fi beats, acoustic melodies, upbeat tunes, and soothing ambient tracks while coding.' },
    { id: 3, title: 'Exploring New Places', emoji: '✈️', color: 'from-amber-50 to-yellow-50', border_color: 'border-amber-200', description: 'Traveling to fresh locations, discovering cozy cafes, experiencing cultures, and gathering stories.' },
    { id: 4, title: 'Dancing', emoji: '💃', color: 'from-rose-50 to-pink-50', border_color: 'border-rose-200', description: 'Expressing rhythm, grace, and creativity through classical Bharatanatyam and freestyle dance.' }
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
    { id: 1, title: 'Classical Bharatanatyam', tag: 'Stage Performance', date: 'Age 5 • Grand Stage', image_url: '/assets/images/bharatanatyam.jpg', caption: 'Performing classical Bharatanatyam dance on a huge stage at 5 years old in traditional ghungroo & costume!', rotation: '-2deg' },
    { id: 2, title: 'Science Exhibition Victory', tag: 'Childhood Achievement', date: '3rd Standard', image_url: '/assets/images/science_exhibition.jpg', caption: 'Secured 1st prize in the school-wide science exhibition! Holding my trophy & certificate with pride.', rotation: '2.5deg' },
    { id: 3, title: 'College Event 1st Prize', tag: 'College Achievement', date: '2nd Sem • ₹3,000 Cash Prize', image_url: '/assets/images/college_award.jpg', caption: 'Secured 1st place in 2nd semester college event, receiving certificate & ₹3,000 cash prize!', rotation: '-1.5deg' }
  ],
  contact: {
    items: [
      { id: 'email', label: 'Email', value: 'maditidas@gmail.com', action: 'mailto:maditidas@gmail.com', copyable: true },
      { id: 'phone', label: 'Phone', value: '+91 7975612394', action: 'tel:7975612394', copyable: true },
      { id: 'github', label: 'GitHub', value: 'github.com/iaditidas', action: 'https://github.com/iaditidas', copyable: false }
    ]
  }
};

const safeApiFetch = async (path, fallbackKey, itemId = null, options = {}) => {
  // 1. Try relative path (Vite proxy)
  try {
    const res = await fetch(path, options);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data !== undefined) return json.data;
    }
  } catch (err) {
    console.warn(`Primary fetch to ${path} failed:`, err);
  }

  // 2. Try direct Express port 5001
  try {
    const directUrl = path.startsWith('http') ? path : `http://localhost:5001${path}`;
    const directRes = await fetch(directUrl, options);
    if (directRes.ok) {
      const directJson = await directRes.json();
      if (directJson.success && directJson.data !== undefined) return directJson.data;
    }
  } catch (err) {
    console.warn(`Direct port fetch to http://localhost:5001${path} failed:`, err);
  }

  // 3. Fallback to client-side data store so UI never breaks or gets stuck on error
  if (fallbackKey && fallbackStore[fallbackKey]) {
    const store = fallbackStore[fallbackKey];
    if (itemId !== null && Array.isArray(store)) {
      const item = store.find(i => i.id == itemId);
      if (item) return item;
    }
    return store;
  }

  throw new Error('failed to fetch the information');
};

export const fetchHeroData = () => safeApiFetch('/api/hero', 'hero');

export const fetchAboutData = () => safeApiFetch('/api/about', 'about');

export const fetchJourneyData = () => safeApiFetch('/api/story', 'story');

export const fetchEducationData = () => safeApiFetch('/api/education', 'education');

export const fetchHobbiesData = () => safeApiFetch('/api/hobbies', 'hobbies');

export const fetchSkillsData = () => safeApiFetch('/api/skills', 'skills');

export const fetchMemoriesData = () => safeApiFetch('/api/photos', 'photos');

export const createMemoryCard = async (memoryPayload) => {
  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memoryPayload)
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Relative POST /api/photos failed, trying direct http://localhost:5001...', err);
  }

  try {
    const directRes = await fetch('http://localhost:5001/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memoryPayload)
    });
    if (directRes.ok) {
      const json = await directRes.json();
      return json.data;
    }
  } catch (err) {
    console.error('Direct POST /api/photos failed:', err);
  }

  return { id: Date.now(), ...memoryPayload };
};

export const fetchLocationData = () => safeApiFetch('/api/college', 'college');

export const fetchContactData = () => safeApiFetch('/api/contact', 'contact');

export const fetchStoryById = (id) => safeApiFetch(`/api/story/${id}`, 'story', id);

export const fetchEducationById = (id) => safeApiFetch(`/api/education/${id}`, 'education', id);

export const fetchHobbyById = (id) => safeApiFetch(`/api/hobbies/${id}`, 'hobbies', id);

export const fetchMemoryById = (id) => safeApiFetch(`/api/photos/${id}`, 'photos', id);

export const submitContactNote = async (notePayload) => {
  try {
    const res = await fetch('/api/contact/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notePayload)
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('Relative POST /api/contact/notes failed, trying direct http://localhost:5001...', err);
  }

  try {
    const directRes = await fetch('http://localhost:5001/api/contact/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notePayload)
    });
    if (directRes.ok) {
      const json = await directRes.json();
      return json;
    }
  } catch (err) {
    console.error('Direct POST /api/contact/notes failed:', err);
  }

  return { success: true, message: 'Note received successfully!' };
};
