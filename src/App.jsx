import React, { useState, useEffect } from 'react';
import { profile, projects, timeline } from './content';

function ProjectArt({ kind }) {
  return (
    <svg
      className={`project-art ${kind}`}
      viewBox="0 0 600 360"
      role="img"
      aria-label={`${kind} illustrative project preview`}
    >
      <rect x="65" y="46" width="470" height="275" rx="12" fill="#f9faf6" />
      <path d="M65 82h470" stroke="#dce3de" />
      <circle cx="84" cy="65" r="4" fill="#7f9b91" />
      <circle cx="99" cy="65" r="4" fill="#bac8bd" />
      <circle cx="114" cy="65" r="4" fill="#d8dfd6" />
      {kind === 'spatial' ? (
        <g fill="none" stroke="#496c63" strokeWidth="5">
          <path d="M120 120h350v155H120zM275 120v155M120 200h155M360 120v85h110" />
          <path d="M150 145h90v30h-90zM305 230h125" stroke="#abc5b3" />
          <circle cx="320" cy="165" r="12" stroke="#cd9759" />
          <circle cx="200" cy="238" r="10" stroke="#cd9759" />
        </g>
      ) : kind === 'tasks' ? (
        <g>
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <rect
                x={93 + n * 145}
                y="105"
                width="125"
                height="185"
                rx="6"
                fill={['#e8eee5', '#e8ecec', '#f0e7dc'][n]}
              />
              <rect
                x={106 + n * 145}
                y="121"
                width="65"
                height="7"
                rx="3"
                fill="#839b8c"
              />
              {[0, 1].map((k) => (
                <g key={k}>
                  <rect
                    x={104 + n * 145}
                    y={147 + k * 65}
                    width="103"
                    height="52"
                    rx="5"
                    fill="white"
                  />
                  <path
                    d={`M${116 + n * 145} ${163 + k * 65}h65m-65 12h42`}
                    stroke="#b3c2b8"
                    strokeWidth="5"
                  />
                </g>
              ))}
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="93" y="103" width="110" height="190" rx="5" fill="#e9eee7" />
          <path
            d="M112 130h65m-65 23h45m-45 24h56"
            stroke="#a0b5a7"
            strokeWidth="8"
          />
          {[70, 105, 87, 140, 120, 165].map((h, n) => (
            <rect
              key={n}
              x={231 + n * 44}
              y={285 - h}
              width="25"
              height={h}
              rx="4"
              fill={n === 5 ? '#d6a66d' : '#698e7d'}
            />
          ))}
        </g>
      )}
    </svg>
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
      <span className="initials" aria-hidden="true">
        AG
      </span>
      <small>PROFILE PHOTO TO FOLLOW</small>
      <span className="portrait-tag" aria-hidden="true">
        &lt;/&gt;
      </span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${String(data.get('name')).trim()}`,
    );
    const body = encodeURIComponent(
      `${String(data.get('message')).trim()}\n\nFrom: ${String(data.get('name')).trim()}\nReply to: ${String(data.get('email')).trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus(
      'Email draft requested. Complete sending in your email app. You can also use the Email link.',
    );
  }
  return (
    <form className="contact-form" onSubmit={submit}>
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
        />
      </label>
      <button className="button primary" type="submit">
        Open email draft <span>→</span>
      </button>
      <p className="caption">
        Opens your email app. Messages are sent only when you send the draft; no
        direct-send service is connected.
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
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a href={profile.resumeUrl} download>
                Résumé ↓
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
                <ProjectArt kind={project.style} />
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
                        Live demo ↗
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
                        View code ↗
                      </a>
                    ) : (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub profile ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="caption">
            Concept illustrations shown above; actual project screenshots and
            project-specific links have not been provided.
          </p>
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
                  <h4>Web application development</h4>
                  <p>Design and implementation of a queue management system.</p>
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
                Download résumé ↓
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
                  ['@', 'Email', `mailto:${profile.email}`, profile.email],
                  [
                    '</>',
                    'GitHub',
                    profile.github,
                    'github.com/aldringeneroso',
                  ],
                  [
                    'in',
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
                      {icon}
                    </span>
                    <span>
                      <small>{label}</small>
                      <strong>{text} ↗</strong>
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
