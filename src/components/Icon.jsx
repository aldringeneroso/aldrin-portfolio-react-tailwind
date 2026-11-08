import React from 'react';

export default function Icon({ name, className = '' }) {
  return (
    <span
      className={`icon ${className}`.trim()}
      style={{ '--icon-url': `url('/assets/icons/${name}.svg')` }}
      aria-hidden="true"
    />
  );
}
