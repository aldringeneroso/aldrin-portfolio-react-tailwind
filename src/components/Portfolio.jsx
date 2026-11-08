import React, { useEffect, useRef, useState } from 'react';
import { profile, projects, timeline, skills } from '../content';
import BalancedText from './BalancedText';
import ContactForm from './ContactForm';
import Icon from './Icon';
import Projects from './Projects';
import usePortfolioMotion from '../hooks/usePortfolioMotion';

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark
      ? '#111111'
      : '#ffffff';
    try {
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    } catch {
      /* Appearance still works when storage is unavailable. */
    }
  }, [dark]);

  return (
    <button
      type="button"
      className="theme-switch"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={() => setDark((value) => !value)}
    >
      <span className="theme-label">{dark ? 'Dark' : 'Light'}</span>
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
    </button>
  );
}

function SocialLinks() {
  return (
    <div className="socials" aria-label="Social profiles">
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        <Icon name="linkedin-in" /> LinkedIn <span aria-hidden="true">↗</span>
      </a>
      <a href={profile.github} target="_blank" rel="noopener noreferrer">
        <Icon name="github" /> GitHub <span aria-hidden="true">↗</span>
      </a>
      <a href={profile.resumeUrl} download>
        <Icon name="file-arrow-down" /> Résumé <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}

export default function Portfolio() {
  const root = useRef(null);
  const [menu, setMenu] = useState(false);
  usePortfolioMotion(root);

  return (
    <div className="portfolio" ref={root}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Aldrin Generoso home">
          aldrin<span>.dev</span>
          <span className="brand-dot" aria-hidden="true" />
        </a>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={menu ? 'open' : ''}
        >
          {[
            ['Work', 'projects'],
            ['About', 'about'],
            ['Toolkit', 'skills'],
            ['Journey', 'education'],
            ['Contact', 'contact'],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? 'Close −' : 'Menu +'}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> Aldrin E.
              Generoso
            </p>
            <p className="hero-role">
              Software Engineer &amp; Computer Science Student
            </p>
            <BalancedText as="h1" className="hero-title">
              {'Turning ideas\ninto experiences.'}
            </BalancedText>
            <p className="hero-intro">
              I explore software engineering through web applications and game
              development — building, learning, and bringing ideas to life.
            </p>
            <div className="actions">
              <a className="button primary" href="#projects">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href="#contact">
                Let’s talk <span aria-hidden="true">↗</span>
              </a>
            </div>
            <SocialLinks />
          </div>
          <div className="hero-visual">
            <div className="visual-grid" aria-hidden="true" />
            <div
              className="visual-coordinate top-coordinate"
              aria-hidden="true"
            >
              FIG. 01 — A WORK IN PROGRESS
            </div>
            <figure className="hero-portrait">
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                width="928"
                height="1147"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption>
                <span>Hi, I’m Aldrin.</span>
              </figcaption>
            </figure>
            <div
              className="visual-coordinate bottom-coordinate"
              aria-hidden="true"
            >
              CURIOSITY, IN EVERY DIMENSION.
            </div>
          </div>
          <div className="hero-footer">
            <span>Based in Bacoor, Cavite, Philippines</span>
            <span>
              <span className="tiny-dot" aria-hidden="true" /> MIS internship ·
              B Hotel
            </span>
            <a href="#projects">
              Scroll to discover <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <Projects />

        <section className="about-section" id="about">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">02 / Behind the code</p>
            <span className="section-aside">
              Always a student.
              <br />
              Always building.
            </span>
          </div>
          <div className="about-layout">
            <div className="about-photo" data-reveal>
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                width="928"
                height="1147"
                loading="lazy"
                decoding="async"
              />
              <span className="photo-index" aria-hidden="true">
                AG / 01
              </span>
            </div>
            <div className="about-copy" data-reveal>
              <BalancedText as="h2">
                Thoughtful software starts with curiosity.
              </BalancedText>
              <p className="about-lead">{profile.about}</p>
              <p className="muted">{profile.biography}</p>
              <p className="interests">
                Web development <span> / </span> Game development{' '}
                <span> / </span> Software engineering
              </p>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin-in" /> Get to know me on LinkedIn{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">03 / The toolkit</p>
              <BalancedText as="h2">
                {'Tools for turning\n“what if” into “it works.”'}
              </BalancedText>
            </div>
            <p className="section-aside">
              The languages and tools
              <br />
              behind my academic projects.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((group, index) => (
              <article className="skill-card" key={group.title} data-reveal>
                <span className="card-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="tiny-dot" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="toolkit-note" data-reveal>
            <Icon name="code" /> Currently exploring how interactive interfaces,
            spatial tools, and game systems fit together.
          </p>
        </section>

        <section id="education" className="journey-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">04 / The journey</p>
              <BalancedText as="h2">Learning by doing.</BalancedText>
            </div>
            <a className="text-link" href={profile.resumeUrl} download>
              <Icon name="file-arrow-down" /> Download résumé{' '}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="journey-grid">
            <div className="journey-column" data-reveal>
              <h3>
                Education <span>01</span>
              </h3>
              <div className="timeline">
                {timeline
                  .filter((item) => !item.dates.startsWith('CERTIFICATION'))
                  .map((item) => (
                    <article key={item.dates}>
                      <span className="date">{item.dates}</span>
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                    </article>
                  ))}
              </div>
            </div>
            <div className="journey-column" data-reveal>
              <h3>
                Experience <span>02</span>
              </h3>
              <div className="timeline">
                <article>
                  <span className="date">INTERNSHIP</span>
                  <h4>MIS Intern</h4>
                  <p>B Hotel</p>
                </article>
                {projects.map((project) => (
                  <article key={project.id}>
                    <span className="date">ACADEMIC PROJECT</span>
                    <h4>{project.title}</h4>
                    <p>{project.tools.join(' · ')}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="certification" data-reveal>
            <div className="certificate-mark" aria-hidden="true">
              <Icon name="award" />
            </div>
            <div>
              <p className="eyebrow">Certification / Jun 2026</p>
              <h3>Operating Systems Basics</h3>
              <p>Cisco Networking Academy</p>
            </div>
            <span className="certificate-label">Never stop learning.</span>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">05 / Let’s connect</p>
              <BalancedText as="h2">{'Have something\nin mind?'}</BalancedText>
              <p className="muted">
                A project idea, an opportunity, or a conversation.
                <br />
                I’d love to hear from you.
              </p>
              <div className="contact-list">
                {[
                  [
                    'envelope',
                    'Email',
                    `mailto:${profile.email}`,
                    profile.email,
                  ],
                  [
                    'linkedin-in',
                    'LinkedIn',
                    profile.linkedin,
                    'Connect with Aldrin',
                  ],
                  ['github', 'GitHub', profile.github, 'See what I’m building'],
                ].map(([icon, label, url, text]) => (
                  <a
                    key={label}
                    href={url}
                    target={url.startsWith('https:') ? '_blank' : undefined}
                    rel={
                      url.startsWith('https:')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    <span className="contact-icon">
                      <Icon name={icon} />
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>{text}</strong>
                    </span>
                    <span className="contact-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#home">
          aldrin<span>.dev</span>
        </a>
        <span>© {new Date().getFullYear()} Aldrin E. Generoso</span>
        <a className="text-link" href="#home">
          Back to the top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  );
}
