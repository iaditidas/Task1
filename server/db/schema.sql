-- PostgreSQL Database Schema for Portfolio Website

CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    profile_name VARCHAR(100) NOT NULL,
    subtitle VARCHAR(255),
    story_heading VARCHAR(255),
    story_paragraph1 TEXT,
    story_paragraph2 TEXT,
    personality_note TEXT
);

CREATE TABLE IF NOT EXISTS about_stats (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS story (
    id SERIAL PRIMARY KEY,
    year VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    semester VARCHAR(100),
    graduation VARCHAR(100),
    cgpa VARCHAR(50),
    status VARCHAR(100),
    details TEXT NOT NULL,
    highlight BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS hobbies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    emoji VARCHAR(20) NOT NULL,
    color VARCHAR(100) NOT NULL,
    border_color VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(100) NOT NULL,
    brew VARCHAR(20) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS college (
    id SERIAL PRIMARY KEY,
    university_name VARCHAR(255) NOT NULL,
    location_city VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(255),
    academic_year VARCHAR(100),
    status VARCHAR(100),
    map_embed_url TEXT NOT NULL,
    direct_maps_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    rotation VARCHAR(20) DEFAULT '0deg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hero_content (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    titles TEXT[] NOT NULL,
    welcome_note TEXT NOT NULL,
    author_signature VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    github_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_notes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
