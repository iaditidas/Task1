// Frontend API service layer connecting to backend endpoints

export const fetchHeroData = async () => {
  const res = await fetch('/api/hero');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchAboutData = async () => {
  const res = await fetch('/api/about');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchJourneyData = async () => {
  const res = await fetch('/api/story');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchEducationData = async () => {
  const res = await fetch('/api/education');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchHobbiesData = async () => {
  const res = await fetch('/api/hobbies');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchSkillsData = async () => {
  const res = await fetch('/api/skills');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchMemoriesData = async () => {
  const res = await fetch('/api/photos');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const createMemoryCard = async (memoryPayload) => {
  const res = await fetch('/api/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memoryPayload)
  });
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  return json.data;
};

export const fetchLocationData = async () => {
  const res = await fetch('/api/college');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const fetchContactData = async () => {
  const res = await fetch('/api/contact');
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  if (!json.success) throw new Error('failed to fetch the information');
  return json.data;
};

export const submitContactNote = async (notePayload) => {
  const res = await fetch('/api/contact/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notePayload)
  });
  if (!res.ok) throw new Error('failed to fetch the information');
  const json = await res.json();
  return json;
};
