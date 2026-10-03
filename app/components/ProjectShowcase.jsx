'use client';

import { useState } from 'react';
import { FeatureCarousel } from './ui/feature-carousel';
import ProjectModal from './ProjectModal.jsx';

// WORK entries already match the carousel's project shape; the existing
// ProjectModal stays the "full write-up" behind each slide.
export default function ProjectShowcase({ work }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <FeatureCarousel
        items={work}
        onOpen={(item) => setActive(work.find((p) => p.name === item.name) ?? null)}
      />

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
