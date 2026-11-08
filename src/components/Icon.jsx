import React from 'react';

// Font Awesome Free 7.3.1 webfont glyphs; no SVG renderer or icon images.
const icons = {
  'linkedin-in': ['brands', '\uf0e1'],
  github: ['brands', '\uf09b'],
  'file-lines': ['solid', '\uf15c'],
  'arrow-right': ['solid', '\uf061'],
  'arrow-down': ['solid', '\uf063'],
  'arrow-up': ['solid', '\uf062'],
  'arrow-up-right-from-square': ['solid', '\uf35d'],
  download: ['solid', '\uf019'],
  envelope: ['solid', '\uf0e0'],
  code: ['solid', '\uf121'],
  award: ['solid', '\uf5a2'],
};

export default function Icon({ name, className = '' }) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <span
      className={`icon icon--${icon[0]} ${className}`.trim()}
      aria-hidden="true"
    >
      {icon[1]}
    </span>
  );
}
