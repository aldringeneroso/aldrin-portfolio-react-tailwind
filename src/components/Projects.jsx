import React from 'react';
import { projects } from '../content';
import BalancedText from './BalancedText';
import Icon from './Icon';

// Alternating project composition adapted from Brittany Chiang's v4 featured.js.
// Separate columns keep text and links clear of the screenshots.
// MIT attribution: docs/licenses/brittany-chiang-MIT.txt.
export default function Projects() {
  return (
    <section className="work-section" id="projects">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <BalancedText as="h2">
            A few things I’ve brought to life.
          </BalancedText>
        </div>
        <p className="section-aside">
          From branching stories
          <br />
          to spatial problem-solving.
        </p>
      </div>
      <div className="featured-list">
        {projects.map((project, index) => (
          <article className="featured-project" key={project.id}>
            <div className="project-visual" data-reveal>
              <div className="project-browser" aria-hidden="true">
                <span />
                <span />
                <span />
                <p>{project.category}</p>
              </div>
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <img
                  className="project-image"
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-image-caption">
                <span>Featured project</span>
                <span>
                  0{index + 1} / 0{projects.length}
                </span>
              </div>
            </div>
            <div className="project-content" data-reveal>
              <p className="eyebrow">
                {project.id} / {project.category}
              </p>
              <h3>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
              <div className="project-description">
                <p>{project.description}</p>
              </div>
              <p className="project-role">{project.role}</p>
              <ul
                className="project-tech-list"
                aria-label="Project technologies"
              >
                {project.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <div className="project-links">
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" /> Explore the code{' '}
                  <span aria-hidden="true">↗</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live project <Icon name="arrow-up-right-from-square" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
