import { useEffect, useRef, useState } from 'react'
import './App.css'

const navigation = [
  { label: 'House', href: '#house' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
]

const experiences = [
  {
    id: '01',
    title: 'Morning salon',
    subtitle: 'Brunch that feels dressed for the occasion',
    copy:
      'Signature eggs, polished plates, strong coffee, and a room that turns an ordinary morning into a destination plan.',
    image:
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant brunch table with pastries, coffee, and refined plating',
  },
  {
    id: '02',
    title: 'Patisserie atelier',
    subtitle: 'Handmade cakes and desserts with centre-stage presence',
    copy:
      'Honey cake, macarons, celebration orders, and pastries that deserve more than a corner counter moment.',
    image:
      'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury plated desserts and pastries in a softly lit setting',
  },
  {
    id: '03',
    title: 'Afternoon rituals',
    subtitle: 'Tea, private dining, birthdays, and the slower linger',
    copy:
      'The more elevated MALINA becomes, the easier it is to own celebrations, gifting, and the kind of visits people photograph before the first sip.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Refined dining room with moody lighting and lush atmosphere',
  },
]

const houseNotes = [
  'Award-winning Brentwood hospitality',
  'French desserts, brunch, afternoon tea',
  'Colour, intimacy, and a more cinematic room',
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Moody luxury restaurant interior with warm lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cocktails and desserts on a dramatic restaurant table',
  },
  {
    src: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Beautiful pastry and cake display with rich colours',
  },
]

const visitDetails = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: '9:00 - 16:00' },
  { day: 'Wednesday', hours: '9:00 - 16:00' },
  { day: 'Thursday', hours: '9:00 - 16:00' },
  { day: 'Friday', hours: '9:00 - 16:00' },
  { day: 'Saturday', hours: '9:00 - 16:00' },
  { day: 'Sunday', hours: '9:00 - 15:00' },
]

const introIngredients = [
  { id: 1, type: 'petal', left: '7%', duration: 2.9, delay: 0.1, scale: 1.15, drift: '-28px', spin: 18 },
  { id: 2, type: 'berry', left: '14%', duration: 3.2, delay: 0.3, scale: 0.94, drift: '20px', spin: 42 },
  { id: 3, type: 'pistachio', left: '23%', duration: 2.6, delay: 0.15, scale: 1, drift: '-16px', spin: -16 },
  { id: 4, type: 'crumb', left: '31%', duration: 2.8, delay: 0.5, scale: 1.05, drift: '24px', spin: 30 },
  { id: 5, type: 'petal', left: '39%', duration: 3.1, delay: 0.2, scale: 1.1, drift: '-20px', spin: -10 },
  { id: 6, type: 'sugar', left: '48%', duration: 2.5, delay: 0.4, scale: 0.9, drift: '12px', spin: 12 },
  { id: 7, type: 'berry', left: '56%', duration: 3.3, delay: 0.55, scale: 1.08, drift: '-18px', spin: 26 },
  { id: 8, type: 'pistachio', left: '65%', duration: 2.7, delay: 0.05, scale: 1, drift: '18px', spin: -24 },
  { id: 9, type: 'petal', left: '73%', duration: 3, delay: 0.35, scale: 0.98, drift: '-12px', spin: 14 },
  { id: 10, type: 'crumb', left: '82%', duration: 2.85, delay: 0.18, scale: 1.1, drift: '22px', spin: -34 },
  { id: 11, type: 'sugar', left: '88%', duration: 2.4, delay: 0.45, scale: 0.82, drift: '-10px', spin: 20 },
  { id: 12, type: 'berry', left: '93%', duration: 3.15, delay: 0.25, scale: 0.9, drift: '14px', spin: -18 },
]

const INTRO_STORAGE_KEY = 'malina_intro_seen'
const INTRO_PLAY_MS = 3400
const INTRO_EXIT_MS = 850
const INTRO_FORCE_PARAM = 'intro'

const shouldForceIntro = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return new URLSearchParams(window.location.search).get(INTRO_FORCE_PARAM) === '1'
}

const readIntroSeen = () => {
  if (typeof window === 'undefined' || import.meta.env.DEV || shouldForceIntro()) {
    return false
  }

  try {
    return window.localStorage.getItem(INTRO_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

const writeIntroSeen = () => {
  if (typeof window === 'undefined' || import.meta.env.DEV || shouldForceIntro()) {
    return
  }

  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, 'true')
  } catch {
    // Ignore storage failures and let the intro behave as an in-memory effect.
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !(prefersReducedMotion || readIntroSeen())
  })
  const [introExiting, setIntroExiting] = useState(false)
  const introTimersRef = useRef([])

  useEffect(() => {
    const clearIntroTimers = () => {
      introTimersRef.current.forEach((timer) => window.clearTimeout(timer))
      introTimersRef.current = []
    }

    if (!showIntro) {
      return clearIntroTimers
    }

    introTimersRef.current = [
      window.setTimeout(() => {
        setIntroExiting(true)
      }, INTRO_PLAY_MS),
      window.setTimeout(() => {
        writeIntroSeen()
        setShowIntro(false)
        setIntroExiting(false)
      }, INTRO_PLAY_MS + INTRO_EXIT_MS),
    ]

    return clearIntroTimers
  }, [showIntro])

  useEffect(() => {
    if (!showIntro) {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [showIntro])

  const dismissIntro = () => {
    if (!showIntro || introExiting) {
      return
    }

    introTimersRef.current.forEach((timer) => window.clearTimeout(timer))
    introTimersRef.current = []

    writeIntroSeen()
    setIntroExiting(true)

    const closeTimer = window.setTimeout(() => {
      setShowIntro(false)
      setIntroExiting(false)
    }, INTRO_EXIT_MS)

    introTimersRef.current.push(closeTimer)
  }

  return (
    <div className="site-shell">
      {showIntro ? (
        <section className={`site-intro-gate ${introExiting ? 'is-exiting' : ''}`}>
          <img
            className="site-intro-image"
            src="https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1800&q=80"
            alt=""
          />
          <div className="site-intro-overlay" aria-hidden="true" />

          <div className="site-intro-ingredients" aria-hidden="true">
            {introIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className={`intro-ingredient intro-ingredient-${ingredient.type}`}
                style={{
                  '--ingredient-left': ingredient.left,
                  '--ingredient-duration': `${ingredient.duration}s`,
                  '--ingredient-delay': `${ingredient.delay}s`,
                  '--ingredient-scale': ingredient.scale,
                  '--ingredient-drift': ingredient.drift,
                  '--ingredient-spin': `${ingredient.spin}deg`,
                }}
              />
            ))}
          </div>

          <div className="site-intro-content">
            <p className="site-intro-kicker">Brentwood, Essex</p>
            <p className="site-intro-title">
              <span>MALINA</span>
              <span>Patisserie</span>
            </p>
            <p className="site-intro-copy">Handmade patisserie. Celebration energy.</p>
          </div>

          <button className="site-intro-skip" type="button" onClick={dismissIntro}>
            Skip intro
          </button>
        </section>
      ) : null}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="MALINA Patisserie home">
          <span className="brand-mark">MALINA</span>
          <span className="brand-subtitle">Patisserie</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="button button-outline"
          href="https://www.instagram.com/malinapatisserie/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </header>

      <main>
        <section className="hero-section" id="top">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
            alt="Luxury restaurant interior with dramatic warm lighting"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="section-inner hero-content">
            <p className="eyebrow">Brentwood, Essex</p>
            <h1>A richer, more seductive side of MALINA.</h1>
            <p className="hero-copy">
              Less daytime cafe. More destination room. Handmade patisserie, elevated brunch, and
              celebration energy in a setting designed to feel cinematic from the street.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="#visit">
                Plan your visit
              </a>
              <a className="button button-outline" href="mailto:malinapatisserie@gmail.com">
                Cake and events
              </a>
            </div>

            <div className="hero-meta">
              {houseNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="intro-section" id="house">
          <div className="section-inner intro-layout">
            <div className="intro-copy">
              <p className="eyebrow eyebrow-accent">The House</p>
              <h2>What to borrow from the luxury restaurant world</h2>
              <p>
                The Amazónico reference points in a smart direction: darker atmosphere, fuller
                sensory pull, stronger imagery, and a layout that feels like entering a venue rather
                than scanning a list of services.
              </p>
              <p>
                For MALINA, that means blending colour and patisserie charm with a deeper mood,
                better pacing, and more confidence in the room itself.
              </p>
            </div>

            <div className="intro-panel">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                alt="Elegant restaurant table with dramatic ambient light"
              />
              <div className="intro-panel-copy">
                <p>Luxury does not need to mean cold.</p>
                <strong>It should feel lush, intimate, and worth dressing up for.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="experiences-section" id="experiences">
          <div className="section-inner experiences-heading">
            <p className="eyebrow">Experiences</p>
            <h2>Designed like chapters, not boxes.</h2>
          </div>

          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className={`experience-row ${index % 2 === 1 ? 'experience-row-reverse' : ''}`}
            >
              <div className="section-inner experience-layout">
                <div className="experience-media">
                  <img src={experience.image} alt={experience.alt} />
                </div>

                <div className="experience-copy">
                  <p className="experience-id">{experience.id}</p>
                  <h3>{experience.title}</h3>
                  <h4>{experience.subtitle}</h4>
                  <p>{experience.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-inner gallery-header">
            <p className="eyebrow eyebrow-accent">Atmosphere</p>
            <h2>More drama. Better restraint. Stronger memory.</h2>
          </div>

          <div className="gallery-strip" aria-label="MALINA visual gallery">
            {galleryImages.map((image) => (
              <figure key={image.src} className="gallery-frame">
                <img src={image.src} alt={image.alt} />
              </figure>
            ))}
          </div>
        </section>

        <section className="visit-section" id="visit">
          <div className="section-inner visit-layout">
            <div className="visit-copy">
              <p className="eyebrow">Visit MALINA</p>
              <h2>Make Brentwood feel like the invitation.</h2>
              <p>
                45 Kings Road, Brentwood CM14 4DJ. A family-run patisserie with the bones to feel
                far more transportive online and in person.
              </p>

              <div className="visit-actions">
                <a
                  className="button button-solid"
                  href="https://www.google.com/maps/search/?api=1&query=45+Kings+Road+Brentwood+CM14+4DJ"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                </a>
                <a
                  className="button button-outline"
                  href="https://www.instagram.com/malinapatisserie/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Daily counter
                </a>
              </div>
            </div>

            <div className="visit-card">
              <div className="visit-card-block">
                <p className="visit-label">Opening hours</p>
                <ul className="hours-list">
                  {visitDetails.map((entry) => (
                    <li key={entry.day}>
                      <span>{entry.day}</span>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="visit-card-block">
                <p className="visit-label">Enquiries</p>
                <a className="visit-link" href="mailto:malinapatisserie@gmail.com">
                  malinapatisserie@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
