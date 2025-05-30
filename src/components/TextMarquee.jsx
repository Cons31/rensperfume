import React from 'react';

export default function TextMarquee({ text }) {
  return (
    <div className="marquee">
      <p>{text}</p>
    </div>
  );
}
