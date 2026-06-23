import { FormEvent, useMemo, useState } from 'react';

type WaitlistForm = {
  name: string;
  email: string;
  support: string;
  message: string;
};

const services = [
  {
    title: 'Counselling for women',
    tag: 'Warm, grounded support',
    text: 'Support for anxiety, overwhelm, burnout, identity shifts, boundaries, emotional labour and the invisible load of holding everything together.',
  },
  {
    title: 'Parenting support',
    tag: 'Connection before correction',
    text: 'Parent consults for big feelings, repair, routines, school stress, sensory overwhelm, behaviour concerns and family nervous-system patterns.',
  },
  {
    title: 'Neurodivergent families',
    tag: 'ADHD + autism affirming',
    text: 'Practical, shame-free support for neurodivergent parents, children and families who need tools that match real brains and real homes.',
  },
  {
    title: 'School advocacy support',
    tag: 'Clearer language, calmer meetings',
    text: 'Preparation for school conversations, reasonable adjustment requests, parent scripts, meeting notes and child-centred support planning.',
  },
];

const pathways = [
  {
    step: '01',
    title: 'Arrive gently',
    text: 'We start with what is feeling heavy, urgent or confusing. You do not need to arrive organised, articulate or already coping.',
  },
  {
    step: '02',
    title: 'Make sense of the pattern',
    text: 'Together we look underneath the surface: nervous-system needs, sensory load, family history, expectations, stress and protective strategies.',
  },
  {
    step: '03',
    title: 'Build realistic tools',
    text: 'You leave with language, scripts, visual tools, tiny next steps and support ideas that can actually work in a busy family system.',
  },
];

const values = [
  'Neuroaffirming, not behaviourist',
  'Trauma-informed and paced gently',
  'Practical tools without shame',
  'Warm, direct and human',
  'ADHD-friendly structure',
  'Parent-safe and child-centred',
];

const resources = [
  {
    title: 'Big feelings script card',
    text: 'A quick parent prompt for co-regulation moments when everyone is activated and words are hard to find.',
  },
  {
    title: 'School meeting preparation page',
    text: 'A simple planner for strengths, concerns, adjustment requests, examples and next steps.',
  },
  {
    title: 'ADHD-friendly family rhythm',
    text: 'A visual routine framework designed around energy, transitions and nervous-system load rather than perfection.',
  },
];

const audienceCards = [
  'Women who feel overloaded, stretched thin or disconnected from themselves',
  'Parents trying to support children with big feelings, anxiety, ADHD or autism',
  'Families who want practical tools without shame, blame or clinical coldness',
  'Neurodivergent adults who need therapy to feel accessible, warm and useful',
];

const faqs = [
  {
    question: 'Is Within open for bookings yet?',
    answer: 'Within is currently being prepared as a pre-opening counselling practice website. The waitlist form is functional as a front-end prototype and can be connected to email, Tally, Google Forms or a secure booking platform next.',
  },
  {
    question: 'What kind of therapy style is this?',
    answer: 'The brand direction is warm, trauma-informed, neuroaffirming and practical. The website avoids clinical or shaming language and centres nervous-system understanding, parenting support, emotional safety and real-life tools.',
  },
  {
    question: 'Can this site connect to bookings?',
    answer: 'Yes. The current booking buttons are ready placeholders. The next technical step is choosing a booking system such as Halaxy, Power Diary, Cliniko, Zanda or a simple enquiry form workflow.',
  },
];

const defaultForm: WaitlistForm = {
  name: '',
  email: '',
  support: '',
  message: '',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<WaitlistForm>(defaultForm);
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const enquiryText = useMemo(() => {
    return [
      'New Within waitlist enquiry',
      `Name: ${form.name || 'Not provided'}`,
      `Email: ${form.email || 'Not provided'}`,
      `Support interest: ${form.support || 'Not selected'}`,
      `Message: ${form.message || 'No message provided'}`,
    ].join('\n');
  }, [form]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Within waitlist enquiry');
    const body = encodeURIComponent(enquiryText);
    return `mailto:hello@withinmind.com.au?subject=${subject}&body=${body}`;
  }, [enquiryText]);

  const updateForm = <K extends keyof WaitlistForm>(key: K, value: WaitlistForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus('');
    setCopied(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existing = JSON.parse(localStorage.getItem('within-waitlist') || '[]') as WaitlistForm[];
    localStorage.setItem('within-waitlist', JSON.stringify([...existing, form]));
    setStatus('Saved in this browser. Use the email button below to send this enquiry to your inbox once your email is active.');
  };

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(enquiryText);
      setCopied(true);
      setStatus('Copied enquiry text. You can paste it into email, notes or your practice setup file.');
    } catch {
      setStatus('Copy did not work in this browser. You can still use the email button.');
    }
  };

  return (
    <main className="within-site">
      <section className="site-hero" id="top">
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="hero-bloom bloom-one" />
        <div className="hero-bloom bloom-two" />
        <div className="hero-bloom bloom-three" />

        <div className="site-hero-grid">
          <div className="site-hero-copy">
            <p className="eyebrow">Within Counselling</p>
            <h1>Neuroaffirming therapy for women, parents & families.</h1>
            <p className="hero-lead">
              A warm, practical counselling space for people carrying a lot — big feelings, parenting pressure,
              neurodivergence, family stress, identity shifts and the invisible mental load.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#waitlist">Join the waitlist</a>
              <a className="secondary-action" href="#services">Explore support</a>
            </div>
            <div className="trust-row" aria-label="Practice values">
              <span>Trauma-informed</span>
              <span>ADHD-friendly</span>
              <span>Parent-safe</span>
            </div>
          </div>

          <aside className="hero-portrait-card" aria-label="Within brand card">
            <div className="portrait-orb" />
            <div className="line-art-face" aria-hidden="true">
              <span />
            </div>
            <p className="small-label">A gentler way inward</p>
            <h2>Support that meets you where your nervous system actually is.</h2>
            <p>
              Calm language, clear tools, realistic expectations and deeply human care for the messy middle.
            </p>
          </aside>
        </div>
      </section>

      <section className="intro-band" id="about">
        <div>
          <p className="eyebrow">Why Within exists</p>
          <h2>Because support should feel safe, useful and un-shaming.</h2>
        </div>
        <p>
          Within is being built for people who are tired of being told to try harder when what they really need is
          understanding, structure, nervous-system support and language that honours their lived experience.
        </p>
      </section>

      <section className="audience-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Who it is for</p>
          <h2>For people who need therapy to feel more human.</h2>
        </div>
        <div className="audience-grid">
          {audienceCards.map((card) => (
            <article className="audience-card" key={card}>
              <span>✦</span>
              <p>{card}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap" id="services">
        <div className="section-heading">
          <p className="eyebrow">Support areas</p>
          <h2>Counselling and practical resources with a soft landing.</h2>
        </div>
        <div className="service-grid">
          {services.map((card) => (
            <article className="service-card" key={card.title}>
              <span>{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-section" id="approach">
        <div className="feature-card large-feature">
          <p className="eyebrow">The Within approach</p>
          <h2>Less fixing. More understanding, tools and repair.</h2>
          <p>
            Sessions are designed to help you make sense of what is happening underneath the surface,
            then build supports that work in real life — especially when everyone is tired, overstimulated or stretched thin.
          </p>
        </div>
        <div className="approach-list">
          {values.map((item) => (
            <div className="approach-pill" key={item}>
              <span>✦</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pathway-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">How support works</p>
          <h2>A clear, calm pathway.</h2>
        </div>
        <div className="pathway-grid">
          {pathways.map((pathway) => (
            <article className="pathway-card" key={pathway.step}>
              <span>{pathway.step}</span>
              <h3>{pathway.title}</h3>
              <p>{pathway.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap muted-section" id="resources">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Resources</p>
            <h2>Printable tools are part of the ecosystem.</h2>
          </div>
          <a className="secondary-action" href="#waitlist">Request resources</a>
        </div>
        <div className="resource-preview-grid">
          {resources.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <div className="paper-edge" />
              <h3>{resource.title}</h3>
              <p>{resource.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-card">
          <p className="eyebrow">Booking-ready section</p>
          <h2>Ready for a booking system when you are.</h2>
          <p>
            This section is designed to connect to your future booking platform. For now, it points people toward the
            waitlist so the site can start collecting interest before launch.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#waitlist">Join the waitlist</a>
            <a className="secondary-action" href="mailto:hello@withinmind.com.au?subject=Within%20enquiry">Email Within</a>
          </div>
        </div>
        <div className="availability-card">
          <span>Pre-launch</span>
          <h3>Planned service options</h3>
          <ul>
            <li>Individual counselling</li>
            <li>Parent consults</li>
            <li>Telehealth options</li>
            <li>School support planning</li>
          </ul>
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-copy">
          <p className="eyebrow">Pre-opening waitlist</p>
          <h2>Register interest in Within.</h2>
          <p>
            This prototype saves entries in your browser and creates a ready-to-send email. Do not collect clinical,
            crisis or highly sensitive information here until the final privacy and storage workflow is set up.
          </p>
        </div>
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={(event) => updateForm('name', event.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              value={form.email}
              onChange={(event) => updateForm('email', event.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            What kind of support are you interested in?
            <select
              name="support"
              value={form.support}
              onChange={(event) => updateForm('support', event.target.value)}
              required
            >
              <option value="" disabled>Select one</option>
              <option>Individual counselling</option>
              <option>Parent support</option>
              <option>Neurodivergent family resources</option>
              <option>School advocacy / adjustment planning</option>
            </select>
          </label>
          <label>
            Optional note
            <textarea
              name="message"
              value={form.message}
              onChange={(event) => updateForm('message', event.target.value)}
              placeholder="A short, non-urgent note. Please do not include crisis or highly sensitive information yet."
              rows={4}
            />
          </label>
          <button className="primary-action" type="submit">Save enquiry</button>
          <div className="form-actions compact-actions">
            <a className="secondary-action" href={mailtoHref}>Open email draft</a>
            <button className="secondary-action" type="button" onClick={copyEnquiry}>{copied ? 'Copied' : 'Copy enquiry'}</button>
          </div>
          {status && <p className="status-message">{status}</p>}
        </form>
      </section>

      <section className="section-wrap" id="faq">
        <div className="section-heading">
          <p className="eyebrow">Questions</p>
          <h2>Simple answers for now.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div>
          <h2>Within</h2>
          <p>Neuroaffirming therapy for women, parents & families.</p>
          <small>Pre-launch website prototype. Final policies, booking workflow and privacy notices still need to be connected.</small>
        </div>
        <div className="footer-links">
          <a href="#top">Top</a>
          <a href="#services">Services</a>
          <a href="#waitlist">Waitlist</a>
          <a href="mailto:hello@withinmind.com.au">Email</a>
        </div>
      </footer>
    </main>
  );
}

function Navigation({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="website-nav" aria-label="Within website navigation">
      <a className="website-brand" href="#top" aria-label="Within home" onClick={closeMenu}>
        <span>✺</span>
        Within
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Menu
      </button>
      <div className={`website-links ${menuOpen ? 'open' : ''}`} id="site-menu">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#approach" onClick={closeMenu}>Approach</a>
        <a href="#resources" onClick={closeMenu}>Resources</a>
        <a href="#booking" onClick={closeMenu}>Booking</a>
        <a href="#waitlist" onClick={closeMenu}>Waitlist</a>
      </div>
    </nav>
  );
}

export default App;
