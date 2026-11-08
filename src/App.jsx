import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { profile, projects, timeline } from './content';

// Public browser identifiers; the recipient is fixed in the EmailJS template.
const emailSettings = {
  serviceId:
    import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || 'service_rhr5g8e',
  templateId:
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ||
    'template_portfolio_contact',
  publicKey:
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '0Y9oXmWf5gXz_QP86',
};
const emailReady = Object.values(emailSettings).every(Boolean);

function Icon({ name, className = '' }) {
  return (
    <span
      className={`icon ${className}`.trim()}
      style={{ '--icon-url': `url('/assets/icons/${name}.svg')` }}
      aria-hidden="true"
    />
  );
}

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
      /* Theme still works without storage. */
    }
  }, [dark]);
  return (
    <button
      type="button"
      className="theme-switch"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={() => setDark((v) => !v)}
    >
      <span className="theme-label">{dark ? 'Dark' : 'Light'}</span>
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
    </button>
  );
}

function Portrait() {
  return (
    <div className="portrait">
      <img
        className="portrait-photo"
        src={profile.photoUrl}
        alt={`Portrait of ${profile.name}`}
        width="928"
        height="1147"
        decoding="async"
      />
      <span className="portrait-tag" aria-hidden="true">
        <Icon name="code" />
      </span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current || !emailReady) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !message) {
      setStatus('Please enter your name and a message.');
      return;
    }

    inFlight.current = true;
    setSending(true);
    setStatus('');

    try {
      await emailjs.send(
        emailSettings.serviceId,
        emailSettings.templateId,
        {
          name,
          email,
          message,
          title: 'Portfolio inquiry',
          time: `${new Date().toLocaleString('en-PH', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Asia/Manila',
          })} PHT`,
        },
        {
          publicKey: emailSettings.publicKey,
          limitRate: { id: 'portfolio-contact', throttle: 10000 },
        },
      );
      form.reset();
      setStatus('Your message has been sent. Thank you for reaching out!');
    } catch (error) {
      setStatus(
        error?.status === 429
          ? 'Please wait a moment before sending another message.'
          : 'Your message could not be sent. Please try again or email me directly.',
      );
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={sending}>
      <h3>Send a message</h3>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          required
          maxLength={100}
          disabled={sending}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={200}
          disabled={sending}
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or opportunity…"
          required
          maxLength={1800}
          disabled={sending}
        />
      </label>
      <button
        className="button primary"
        type="submit"
        disabled={sending || !emailReady}
      >
        <Icon name="envelope" /> {sending ? 'Sending…' : 'Send message'}
      </button>
      <p className="caption">
        {emailReady
          ? 'Sends directly to my inbox. You can also '
          : 'The form is temporarily unavailable. You can '}
        <a href={`mailto:${profile.email}`}>email me directly</a>.
      </p>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}

const skillGroups = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Programming & games', items: ['Python', 'Godot 4', 'Dialogic 2'] },
  { title: 'Database', items: ['MySQL', 'JSON save/load'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Figma'] },
];

function App() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#home">
          aldrin<span>.dev</span>
        </a>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={menu ? 'open' : ''}
        >
          {['About', 'Skills', 'Projects', 'Education', 'Contact'].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenu(false)}
              >
                {item}
              </a>
            ),
          )}
        </nav>
        <ThemeToggle />
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          Menu {menu ? '−' : '+'}
        </button>
      </header>
      <main id="main">
        <section className="hero" id="home">
          <div>
            <span className="status">MIS internship experience · B Hotel</span>
            <p className="greeting">Hi, I’m Aldrin.</p>
            <h1>
              Software Engineer
              <br />
              &amp; CS Student
            </h1>
            <p className="intro">
              I explore software engineering through web applications and game
              development — building, learning, and bringing ideas to life.
            </p>
            <div className="actions">
              <a className="button primary" href="#projects">
                View my projects →
              </a>
              <a className="button" href="#contact">
                Contact me
              </a>
            </div>
            <div
              className="socials flex gap-5 mt-6"
              aria-label="Social profiles"
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin-in" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" />
                GitHub
              </a>
              <a href={profile.resumeUrl} download>
                <Icon name="file-arrow-down" />
                Résumé
              </a>
            </div>
          </div>
          <Portrait />
        </section>
        <section id="about">
          <div className="about-grid">
            <Portrait />
            <div>
              <p className="eyebrow">01 — About</p>
              <h2>A little about me</h2>
              <p className="intro">{profile.about}</p>
              <p className="muted">{profile.biography}</p>
              <div className="interests">
                <p className="eyebrow">Interests</p>
                <p>Web Development · Game Development · Software Engineering</p>
              </div>
              <div className="facts">
                <div>
                  <strong>My journey</strong>
                  <p>Computer Science at CvSU</p>
                </div>
                <div>
                  <strong>What I build</strong>
                  <p>Web applications &amp; games</p>
                </div>
                <div>
                  <strong>Industry experience</strong>
                  <p>MIS Intern at B Hotel</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="skills">
          <div className="section-top">
            <div>
              <p className="eyebrow">02 — Skills</p>
              <h2>Skills &amp; tech stack</h2>
            </div>
            <p>Tools I use in my academic projects</p>
          </div>
          <div className="skills-grid grid grid-cols-1 min-[621px]:grid-cols-2 gap-4">
            {skillGroups.map((group, i) => (
              <article className="skill-card" key={group.title}>
                <div className="skill-title">
                  <span>0{i + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="tags flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="projects">
          <div className="section-top">
            <div>
              <p className="eyebrow">03 — Projects</p>
              <h2>Featured projects</h2>
            </div>
            <p>{projects.length} selected academic projects</p>
          </div>
          <div className="projects-grid grid grid-cols-1 min-[621px]:grid-cols-2 gap-5">
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <img
                  className="project-image"
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-body">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p>{project.role}</p>
                  <div className="tags flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo <Icon name="arrow-up-right-from-square" />
                      </a>
                    ) : (
                      <span>Demo unavailable</span>
                    )}
                    {project.source ? (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="github" /> View code
                      </a>
                    ) : (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="github" /> GitHub profile
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="education">
          <p className="eyebrow">04 — My journey</p>
          <h2>Education &amp; experience</h2>
          <div className="journey-grid">
            <div className="journey-column">
              <h3>01 &nbsp; Education</h3>
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
            <div className="journey-column">
              <h3>02 &nbsp; Experience</h3>
              <div className="timeline">
                <article>
                  <span className="date">INTERNSHIP</span>
                  <h4>MIS Intern</h4>
                  <p>B Hotel</p>
                </article>
                <article>
                  <span className="date">ACADEMIC PROJECT</span>
                  <h4>Game development</h4>
                  <p>
                    Gameplay systems, branching narratives, and multi-slot
                    save/load in Godot 4.
                  </p>
                </article>
                <article>
                  <span className="date">ACADEMIC PROJECT</span>
                  <h4>AI floor-plan analysis</h4>
                  <p>
                    Floor-plan review, 2D/3D layouts, and electrical planning
                    for VED Electrical Services.
                  </p>
                </article>
              </div>
            </div>
            <div className="journey-column">
              <h3>03 &nbsp; Certification</h3>
              <div className="timeline">
                {timeline
                  .filter((item) => item.dates.startsWith('CERTIFICATION'))
                  .map((item) => (
                    <article key={item.title}>
                      <span className="date">JUN 2026</span>
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                    </article>
                  ))}
              </div>
              <a className="button" href={profile.resumeUrl} download>
                <Icon name="file-arrow-down" /> Download résumé
              </a>
            </div>
          </div>
        </section>
        <section id="contact">
          <div className="contact-layout">
            <div>
              <p className="eyebrow">05 — Contact</p>
              <h2>
                Let’s work
                <br />
                together.
              </h2>
              <p className="muted">
                Have a project idea or an opportunity to discuss?
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
                    'github',
                    'GitHub',
                    profile.github,
                    'github.com/aldringeneroso',
                  ],
                  [
                    'linkedin-in',
                    'LinkedIn',
                    profile.linkedin,
                    'Connect with Aldrin on LinkedIn',
                  ],
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
                    <span className="contact-icon" aria-hidden="true">
                      <Icon name={icon} />
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>
                        {text} <Icon name="arrow-up-right-from-square" />
                      </strong>
                    </span>
                  </a>
                ))}
              </div>
              <p className="caption">Bacoor, Cavite, Philippines</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#home">
          aldrin<span>.dev</span>
        </a>
        <span>© {new Date().getFullYear()} Aldrin E. Generoso</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
