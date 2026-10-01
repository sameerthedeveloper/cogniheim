'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import { Button } from './ui/button.jsx';
import ProjectModal from './ProjectModal.jsx';

// Maps the WORK data onto the showcase's generic slide shape and keeps the
// existing ProjectModal as the "full write-up" behind each slide.
export default function ProjectShowcase({ work }) {
  const [active, setActive] = useState(null);

  const slides = work.map((project) => ({
    name: project.name,
    designation: [project.category, ...project.stack].filter(Boolean).join(' · '),
    quote: project.description,
    src: project.image,
    alt: `${project.name} preview`,
  }));

  return (
    <>
      <AnimatedTestimonials
        testimonials={slides}
        renderAction={(_, index) => (
          <Button type="button" variant="secondary" onClick={() => setActive(work[index])}>
            View details
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      />

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
