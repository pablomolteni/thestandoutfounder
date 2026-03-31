'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* SVG Icons */
const PenIcon = () => (<svg width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M38 8L44 14L18 40L8 44L12 34L38 8Z" stroke="#bdf347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 14L38 20" stroke="#bdf347" strokeWidth="2" strokeLinecap="round"/><path d="M6 48C8 47 10 46 11 45" stroke="#bdf347" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/></svg>);
const TwisterIcon = () => (<svg width="52" height="52" viewBox="0 0 52 52" fill="none"><ellipse cx="26" cy="14" rx="16" ry="6" stroke="#bdf347" strokeWidth="2"/><ellipse cx="26" cy="22" rx="12" ry="5" stroke="#bdf347" strokeWidth="1.5" opacity=".7"/><path d="M26 28C26 28 24 34 26 42" stroke="#bdf347" strokeWidth="2" strokeLinecap="round"/><path d="M22 46C23.5 44 25 43 26 42C27 43 28.5 44 30 46" stroke="#bdf347" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/></svg>);
const PlaneIcon = () => (<svg width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M44 8L22 30" stroke="#bdf347" strokeWidth="2" strokeLinecap="round"/><path d="M44 8L30 44L22 30L8 22L44 8Z" stroke="#bdf347" strokeWidth="2" strokeLinejoin="round"/><path d="M22 30L30 44" stroke="#bdf347" strokeWidth="2" strokeLinecap="round"/></svg>);
const BrainIcon = () => (<svg width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M26 44V28" stroke="#bdf347" strokeWidth="2" strokeLinecap="round"/><path d="M26 28C20 28 14 24 14 18C14 12 18 8 24 8C24 6 26 4 28 4C30 4 32 6 32 8C36 8 40 12 40 18C40 24 34 28 26 28Z" stroke="#bdf347" strokeWidth="2"/><path d="M20 16C22 14 24 16 26 14C28 16 30 14 32 16" stroke="#bdf347" strokeWidth="1.5" strokeLinecap="round" opacity=".6"/><path d="M18 22C20 20 24 22 26 20C28 22 32 20 34 22" stroke="#bdf347" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/></svg>);

/* Reveal Component */
function Reveal({ children, delay = 0, dir = 'up', className = '', style = {} }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms: any = {
    up: 'translateY(36px)',
    down: 'translateY(-36px)',
    left: 'translateX(-36px)',
    right: 'translateX(36px)',
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : transforms[dir],
        transition: 'opacity .65s cubic-bezier(.22,1,.36,1) ' + delay + 's, transform .65s cubic-bezier(.22,1,.36,1) ' + delay + 's',
      }}
    >
      {children}
    </div>
  );
}

/* Styles */
const S: any = {
  sec: { maxWidth: 1160, margin: '0 auto', padding: '100px 5%' },
  btn: {
    display: 'inline-block', padding: '14px 34px', borderRadius: 50,
    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14,
    letterSpacing: 0.4, cursor: 'pointer', transition: 'all .3s',
    border: 'none', textDecoration: 'none',
  },
  bp: { background: '#bdf347', color: '#1d2549' },
  bo: { background: 'transparent', color: '#1d2549', border: '2px solid #1d2549' },
  gl: {
    background: 'rgba(255,255,255,.035)', border: '1px solid rgba(189,243,71,.08)',
    borderRadius: 16, padding: 32, transition: 'all .35s',
  },
  input: {
    width: '100%', padding: '14px 18px', borderRadius: 10,
    border: '1px solid rgba(189,243,71,.15)', background: 'rgba(255,255,255,.04)',
    color: '#fff', fontSize: 15, outline: 'none', transition: 'border .3s',
  },
};

const C = { dk: '#1d2549', ng: '#bdf347', wh: '#fff' };

const NAV_ITEMS = [
  ['free-guide', 'Free Guide'],
  ['who-is-tsf', 'Who Is TSF For'],
  ['how-we-help', 'How We Help'],
  ['about', 'About'],
  ['contact', 'Contact'],
];

const WHO_DATA = [
  {
    title: 'Unseen Founders',
    desc: 'You built a business, solved a problem, and disrupted an industry. But if no one knows your story, are you truly leading?',
    bullets: [
      'Struggling to communicate your vision?',
      'Lost in the noise of LinkedIn?',
      'Not turning visibility into opportunities?',
    ],
    cta: 'We help you craft a compelling personal brand that gets you recognized, followed, and trusted.',
  },
  {
    title: 'Overwhelmed Leaders',
    desc: "You're scaling fast, making critical decisions, and leading a growing team -- but your personal brand isn't keeping up.",
    bullets: [
      "Visibility matters, but there's no time.",
      'You struggle to stay consistent.',
      'Your digital presence lacks a cohesive narrative.',
    ],
    cta: 'We establish a strong online presence so you become the go-to expert -- without spending hours writing.',
  },
];

const SERVICES = [
  {
    Icon: PenIcon,
    title: 'LinkedIn Ghostwriting',
    p1: 'Your story needs to be heard, but writing takes time.',
    p2: 'We craft engaging, high-impact LinkedIn posts that position you as a thought leader, spark conversations, and grow your influence.',
  },
  {
    Icon: TwisterIcon,
    title: 'Email Nurturing Sequences',
    p1: "Turning followers into clients? That's where email comes in.",
    p2: 'We create powerful email sequences that educate, engage, and convert your audience into leads.',
  },
  {
    Icon: PlaneIcon,
    title: 'SEO-Optimized Blog Posts',
    p1: 'Establish your authority with posts that showcase your expertise.',
    p2: 'Compelling long-form content that builds trust, improves SEO, and positions you as an industry leader.',
  },
  {
    Icon: BrainIcon,
    title: 'Opt-in Pages & Lead Magnets',
    p1: "Your expertise is valuable -- so let's package it up.",
    p2: 'High-converting landing pages and lead magnets that capture leads and build trust.',
  },
];

const WHY_DATA = [
  { t: 'Build Trust & Authority', d: "People don't just buy products -- they buy into leaders they trust." },
  { t: 'Attract Investors, Clients & Talent', d: 'A strong personal brand opens doors to funding, partnerships, and top talent.' },
  { t: 'Become the Go-To Expert', d: 'Consistently share your expertise and become the first name in your industry.' },
  { t: 'Scale Influence Without More Work', d: 'We handle content creation so you grow your influence effortlessly.' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const submit = useCallback(async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }, [form]);

  return (
    <div>
      {/* HEADER */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          padding: '14px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: scrolled ? 'rgba(29,37,73,.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(189,243,71,.06)' : 'none',
          transition: 'all .4s',
        }}
      >
        <Image src="/images/tsf-logo.png" alt="TSF" width={100} height={40} style={{ objectFit: 'contain', height: 'auto' }} />
        <nav style={{ display: 'flex', gap: 28 }} className="desktop-nav">
          {NAV_ITEMS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', color: '#fff',
                fontSize: 13.5, fontWeight: 600, opacity: 0.8, cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <span style={{ width: 24, height: 2.5, background: '#fff', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 24, height: 2.5, background: '#fff', borderRadius: 2, display: 'block' }} />
          <span style={{ width: 24, height: 2.5, background: '#fff', borderRadius: 2, display: 'block' }} />
        </button>
      </header>

      {/* Mobile nav */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(29,37,73,.97)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 28, zIndex: 1000,
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}
          >
            X
          </button>
          {NAV_ITEMS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', color: '#fff',
                fontSize: 20, fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, background: 'radial-gradient(ellipse at 15% 50%, rgba(189,243,71,.035) 0%, transparent 55%)' }}>
        <div style={{ ...S.sec, display: 'flex', alignItems: 'center', gap: 56, width: '100%' }} className="hero-flex">
          <div className="hero-art" style={{ flex: '0 0 260px' }}>
            <Reveal delay={0.15} dir="left">
              <Image src="/images/hero-silhouette.png" alt="" width={260} height={260} style={{ animation: 'float 7s ease-in-out infinite', filter: 'drop-shadow(0 0 24px rgba(189,243,71,.1))', borderRadius: 8 }} />
            </Reveal>
          </div>
          <div style={{ flex: 1 }}>
            <Reveal delay={0.05}>
              <h1 className="hero-h1" style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
                <span style={{ color: C.ng }}>Turn Your<br />Vision Into<br /></span>
                <span>Influence.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 19, color: C.ng, marginBottom: 24, fontWeight: 600 }}>Lead the Conversation. Own Your Space.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p style={{ fontSize: 15.5, lineHeight: 1.75, opacity: 0.75, maxWidth: 520, marginBottom: 14 }}>
                {"You've built something incredible. Now it's time to make sure the world knows about it."}
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.75, opacity: 0.75, maxWidth: 520, marginBottom: 32 }}>
                At <strong style={{ color: C.ng }}>The Standout Founder</strong>, we help founders and startup leaders position themselves as industry authorities through strategic content -- without the overwhelm.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <button style={{ ...S.btn, ...S.bp }} onClick={() => scrollTo('free-guide')}>Get Started Free</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FREE GUIDE */}
      <section id="free-guide" style={{ background: C.ng }}>
        <div style={{ ...S.sec, display: 'flex', alignItems: 'center', gap: 56 }} className="guide-flex">
          <Reveal style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: C.dk, lineHeight: 1.1, marginBottom: 20 }}>
              Unlock the Thought Leadership Blueprint
            </h2>
            <p style={{ fontSize: 15.5, color: C.dk, lineHeight: 1.75, marginBottom: 28, maxWidth: 480, opacity: 0.8 }}>
              This <strong>free 5-day email course</strong> will show you how to craft high-impact content, grow your audience on LinkedIn, and turn visibility into real business opportunities.
            </p>
            <a href="https://thestandoutfounder.kit.com/a3c022b9c3" style={{ ...S.btn, ...S.bo }} target="_blank" rel="noopener noreferrer">
              Get Free Access
            </a>
          </Reveal>
          <Reveal delay={0.15} dir="right" style={{ flex: '0 0 220px', textAlign: 'center' as const }}>
            <Image src="/images/blueprint.png" alt="Thought Leadership Blueprint" width={200} height={240} style={{ animation: 'float 6s ease-in-out infinite', borderRadius: 8, boxShadow: '12px 12px 40px rgba(29,37,73,.3)' }} />
          </Reveal>
        </div>
      </section>

      {/* WHO IS TSF FOR */}
      <section id="who-is-tsf" style={{ background: '#fff', color: C.dk }}>
        <div style={S.sec}>
          <Reveal>
            <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 800, marginBottom: 56, color: C.ng }}>
              Who Is TSF For?
            </h2>
          </Reveal>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
            {WHO_DATA.map((col, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{ padding: 36, borderRadius: 16, border: '1px solid rgba(29,37,73,.1)', height: '100%' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 14 }}>{col.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, marginBottom: 16, opacity: 0.7 }}>{col.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
                    {col.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14.5, lineHeight: 1.85, paddingLeft: 22, position: 'relative' as const }}>
                        <span style={{ position: 'absolute' as const, left: 0, color: C.ng, fontWeight: 800, fontSize: 13 }}>X</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, fontWeight: 600 }}>{col.cta}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section id="how-we-help" style={{ background: C.dk }}>
        <div style={S.sec}>
          <Reveal>
            <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 800, color: C.ng, marginBottom: 56 }}>
              How We Can Help
            </h2>
          </Reveal>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={S.gl} className="service-card">
                  <s.Icon />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: C.ng, marginTop: 16, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.65, marginBottom: 6 }}>{s.p1}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.65 }}>{s.p2}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #bdf347, transparent)' }} />

      {/* WHY STAND OUT */}
      <section style={{ background: C.dk }}>
        <div style={{ ...S.sec, display: 'flex', gap: 48, alignItems: 'flex-start' }} className="why-flex">
          <Reveal dir="left" style={{ flex: '0 0 220px', minWidth: 200 }}>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: C.ng, lineHeight: 1.15 }}>
              Why You Must<br />Stand Out.
            </h2>
          </Reveal>
          <div className="grid-2" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {WHY_DATA.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ padding: '20px 24px', borderLeft: '3px solid ' + C.ng, borderRadius: 2 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: C.ng, marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.7 }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: C.dk }}>
        <div style={S.sec}>
          <Reveal>
            <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 800, color: C.ng, marginBottom: 56 }}>
              Meet the Founder
            </h2>
          </Reveal>
          <div className="about-flex" style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <Reveal dir="left" style={{ flex: '0 0 240px', textAlign: 'center' as const }}>
              <div style={{ width: 200, height: 200, borderRadius: '50%', border: '3px solid ' + C.ng, margin: '0 auto', animation: 'glow 4s ease-in-out infinite', overflow: 'hidden' }}>
                <Image src="/images/paula.jpeg" alt="Paula Graziani" width={200} height={200} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
            </Reveal>
            <Reveal delay={0.15} style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: C.ng, marginBottom: 16 }}>Paula Graziani</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, opacity: 0.75, marginBottom: 14 }}>
                {"Hi, I'm Paula and I've spent the last 15 years helping brands craft powerful stories that engage, inspire, and convert. As a creative strategist and storytelling expert, I help founders like you build thought leadership that drives "}
                <strong style={{ color: C.ng }}>tangible business results</strong>.
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, opacity: 0.75, marginBottom: 14 }}>
                {"I've worked with startups, entrepreneurs, and industry leaders to craft "}
                <strong style={{ color: C.ng }}>compelling narratives</strong>
                {", create high-impact content, and turn expertise into influence."}
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.8, opacity: 0.75, marginBottom: 28 }}>
                {"Let's build your "}
                <strong style={{ color: C.ng }}>standout brand</strong>.
              </p>
              <button style={{ ...S.btn, ...S.bp }} onClick={() => scrollTo('contact')}>Get in Touch</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: 'linear-gradient(180deg, #1d2549 0%, #151b38 100%)' }}>
        <div style={{ ...S.sec, maxWidth: 620 }}>
          <Reveal>
            <h2 style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 800, color: C.ng, marginBottom: 12 }}>
              {"Let's Talk"}
            </h2>
            <p style={{ textAlign: 'center', fontSize: 15, opacity: 0.55, marginBottom: 44, lineHeight: 1.7 }}>
              {"Ready to stand out? Send us a message and we'll get back to you within 24 hours."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.ng, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <span style={{ fontSize: 28, color: C.dk, fontWeight: 900 }}>&#10003;</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: C.ng, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ opacity: 0.65, fontSize: 15 }}>{"We'll get back to you soon."}</p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, opacity: 0.6, letterSpacing: 0.8 }}>NAME</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    style={S.input}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, opacity: 0.6, letterSpacing: 0.8 }}>EMAIL</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    style={S.input}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6, opacity: 0.6, letterSpacing: 0.8 }}>MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your goals..."
                    rows={5}
                    style={{ ...S.input, resize: 'vertical' as const, lineHeight: 1.6 }}
                  />
                </div>
                <button
                  style={{
                    ...S.btn, ...S.bp,
                    width: '100%', textAlign: 'center' as const,
                    fontSize: 15, padding: '16px 0',
                    opacity: status === 'sending' ? 0.6 : 1,
                  }}
                  onClick={submit}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : status === 'error' ? 'Error -- Try Again' : 'Send Message'}
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '36px 5%', borderTop: '1px solid rgba(189,243,71,.06)', fontSize: 13, opacity: 0.4 }}>
        {new Date().getFullYear()} The Standout Founder. All rights reserved.
      </footer>
    </div>
  );
}