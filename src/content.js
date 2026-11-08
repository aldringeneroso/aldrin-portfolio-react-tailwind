// Portfolio details supplied by Aldrin; floor-plan project summary verified from its repository.
export const profile = {
  name: 'Aldrin E. Generoso',
  role: 'Software Engineer',
  intro: 'Thoughtful software. Meaningful experiences.',
  about:
    'I’m Aldrin, a Computer Science student at Cavite State University’s Bacoor City Campus, based in Bacoor, Cavite, Philippines. I build web and software projects while developing my skills as an engineer.',
  biography:
    'My experience includes an MIS internship at B Hotel, alongside academic projects in game development and web applications. I continue to develop my skills in software engineering.',
  email: 'aldringeneroso1@gmail.com',
  github: 'https://github.com/aldringeneroso',
  linkedin: 'https://www.linkedin.com/in/aldrin-esmeralda-generoso-633b1a416/',
  resumeUrl: '/assets/aldrin-generoso-resume.pdf',
  photoUrl: '/assets/aldrin-generoso-profile.jpeg',
};

export const skills = [
  {
    title: 'Languages & interfaces',
    items: ['JavaScript', 'Python', 'HTML', 'CSS'],
  },
  {
    title: 'Data & development tools',
    items: ['MySQL', 'Git', 'GitHub', 'Figma'],
  },
  {
    title: 'Game development',
    items: ['Godot 4', 'Dialogic 2', 'JSON save/load', 'Signal-driven systems'],
  },
];

export const projects = [
  {
    id: '01',
    title: 'Unnamed Fantasy: A Promise Kept',
    category: 'GAME DEVELOPMENT',
    image: '/assets/a-promise-kept.png',
    imageAlt: 'A Promise Kept title screen with a colorful pixel-art koi pond',
    imageWidth: 1281,
    imageHeight: 753,
    description:
      'A visual novel and action-RPG hybrid built with Godot 4. Modular systems handle health, economy, affection, and day progression, with JSON-based multi-slot saves and branching narrative events.',
    tools: ['Godot 4', 'Dialogic 2', 'JSON'],
    role: 'Development: gameplay systems, save/load functionality, and narrative state management.',
    demo: '',
    source: '',
  },
  {
    id: '02',
    title: 'AI Floorplan Analysis',
    category: 'AI & WEB APPLICATION',
    image: '/assets/ai-floorplan-analysis.png',
    imageAlt:
      'VED Electrical Services floor-plan analysis homepage with a wiring layout preview',
    imageWidth: 1890,
    imageHeight: 895,
    description:
      'An AI-assisted floor-plan analysis and electrical planning application for VED Electrical Services. It supports uploads, review of detected rooms, walls, and electrical symbols, synchronized 2D/3D layouts, electrical routing, and material-based cost estimates.',
    tools: ['React', 'FastAPI', 'MySQL', 'OpenCV', 'Three.js'],
    role: 'Project focus: computer vision, interactive 2D/3D editing, and electrical planning workflows.',
    demo: '',
    source: 'https://github.com/aldringeneroso/ai-floorplan-analysis',
  },
];

export const timeline = [
  {
    dates: 'SEP 2024 — PRESENT',
    title: 'BS Computer Science',
    detail: 'Cavite State University — Bacoor City Campus',
  },
  {
    dates: 'SEP 2023 — JUN 2024',
    title: 'BS Computer Science',
    detail: 'Asian Institute of Science and Technology — Dasmariñas',
  },
  {
    dates: 'AUG 2021 — JUL 2023',
    title: 'Science, Technology, Engineering, and Mathematics',
    detail: 'South East Asia Institute of Trade and Technology',
  },
  {
    dates: 'CERTIFICATION / JUN 2026',
    title: 'Operating Systems Basics',
    detail: 'Cisco Networking Academy',
  },
];
