import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scoped reveal + scrub patterns based on GSAP's docs and Codrops portfolio studies.
export default function usePortfolioMotion(root) {
  useEffect(() => {
    let active = true;
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-copy > *', {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
        });
        gsap.from('.hero-portrait', {
          y: 40,
          opacity: 0,
          rotate: 3,
          duration: 1.25,
          delay: 0.15,
          ease: 'power3.out',
          clearProps: 'all',
        });
        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
        gsap.utils.toArray('.project-visual').forEach((element) => {
          gsap.fromTo(
            element.querySelector('img'),
            { scale: 1.045 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        });
        gsap.fromTo(
          '.scroll-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        );
      }, root);
      return () => context.revert();
    });
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      media.revert();
    };
  }, [root]);
}
