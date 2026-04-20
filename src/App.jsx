import { useEffect, useRef, useState } from 'react'
import './App.css'
import { drinksSelection } from './menuData'

const navigation = [
  { label: 'Offering', href: '#offering' },
  { label: 'Menu', href: '/menu/' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Cakes', href: '#cakes' },
  { label: 'Visit', href: '#visit' },
]

const experiences = [
  {
    id: '01',
    title: 'All-day brunch',
    subtitle: 'A menu built for proper sit-down mornings and unhurried afternoons',
    copy:
      'Shakshuka, English Breakfast Our Way, Potato Fritters with Salmon, Halloumi Bowl, poke bowls, and signature toast plates give MALINA a real brunch identity, not just a cafe feel.',
    image: '/food/artichoke-poachedEgg.jpg',
    alt: 'MALINA brunch plate with poached eggs, herbs, and toast',
  },
  {
    id: '02',
    title: 'Coffee, teas, smoothies, and lighter favourites',
    subtitle: 'A drinks menu people can actually choose from, not a token side note',
    copy:
      'Latte, cappuccino, flat white, cortado, espresso, americano, mocha, hot chocolate, matcha latte, green tea, white tea, black tea, flower tea, smoothies, shakes, and juices sit alongside toast favourites, salads, pancakes, and easy daytime plates.',
    image: '/food/mochaCoffee.jpg',
    alt: 'MALINA mocha coffee topped with cream and chocolate drizzle',
  },
  {
    id: '03',
    title: 'Daily-made sweets and celebration cakes',
    subtitle: "A counter that changes, plus cakes people order for life's better moments",
    copy:
      'Desserts are made daily and the counter changes with the day, which keeps the counter feeling alive. Alongside that, celebration cakes can cover birthdays, gatherings, gifting, and simple excuses to celebrate life.',
    image: '/food/sliceCake.jpg',
    alt: 'MALINA layered cake slice with berries on a plate',
  },
]

const houseNotes = [
  'All-day brunch in Brentwood',
  'Coffee, matcha, tea, smoothies, shakes, and juices',
  'Daily desserts and celebration cakes',
]

const offeringCards = [
  {
    title: 'Brunch',
    copy: 'Shakshuka, English Breakfast Our Way, Chorizo and Padron Frittata, Potato Fritters with Salmon, Halloumi Bowl, and more served all day.',
  },
  {
    title: 'Coffee',
    copy: 'Latte, cappuccino, flat white, cortado, espresso, americano, mocha, hot chocolate, matcha latte, green, white, black, and flower teas, plus smoothies, shakes, and juices.',
  },
  {
    title: 'Dessert speciality',
    copy: 'The sweet offering changes daily, which is part of the charm. The counter should feel fresh, handmade, and worth checking again tomorrow.',
  },
  {
    title: 'Celebration cakes',
    copy: 'Birthday cakes, milestone cakes, and cakes ordered simply to celebrate life should feel like a natural extension of the restaurant and patisserie.',
  },
]

const menuPreviewCards = [
  {
    title: 'Signature brunch',
    copy:
      'Shakshuka, English Breakfast Our Way, Potato Fritters with Salmon, poke bowls, and favourite brunch plates served all day.',
  },
  {
    title: 'Toast, salads, and lighter plates',
    copy:
      'Village Chanterelles, Avocado Feta & Crispy Bacon, salads, toasties, soup of the day, and easy daytime favourites.',
  },
  {
    title: 'Coffee and drinks',
    copy:
      'Coffee, matcha, teas, smoothies, shakes, and fresh juices for slower mornings, quick stops, and afternoon catch-ups.',
  },
  {
    title: 'Daily desserts and cakes',
    copy:
      'A changing dessert counter, layered cake slices, macarons, and celebration cakes made for birthdays, gatherings, and gifting.',
  },
]

const cakeMoments = [
  {
    src: '/food/sliceCake.jpg',
    alt: 'MALINA cake slice with berries and cream filling',
    title: 'Daily cake counter',
    copy: 'Fresh slices, layered cakes, and daily-made desserts give people a reason to come back often.',
  },
  {
    src: '/food/macarons.jpg',
    alt: 'MALINA macarons with caramel filling',
    title: 'Signature sweet details',
    copy: 'Macarons and patisserie details help MALINA feel handmade, giftable, and visually memorable.',
  },
  {
    src: '/food/cake-coffee-coffeeMachine+Entrance.jpg',
    alt: 'MALINA cake and coffee beside the coffee machine and counter',
    title: 'Coffee and cake moments',
    copy: 'The counter should sell the ritual too: choose dessert, add coffee, stay a little longer.',
  },
  {
    src: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1200&q=80',
    alt: 'Elegant frosted celebration cake with floral styling',
    title: 'Milestones and gatherings',
    copy: 'Baby showers, dinner parties, thank-yous, and all the reasons people want something beautiful.',
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

          <div className="site-intro-content">
            <p className="site-intro-kicker">Brentwood, Essex</p>
            <p className="site-intro-title">
              <span>MALINA</span>
              <span>Patisserie</span>
            </p>
            <p className="site-intro-copy">Brunch. Coffee. Desserts. Celebration cakes.</p>
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
            src="/sittingArea-1200.webp"
            srcSet="/sittingArea-400.webp 400w, /sittingArea-1200.webp 510w"
            sizes="100vw"
            alt="MALINA restaurant seating area with blue banquette seating and warmly lit tables"
            fetchPriority="high"
          />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="section-inner hero-content">
            <p className="eyebrow">Brentwood, Essex</p>
            <h1>Brunch, coffee, desserts, and cakes worth planning around.</h1>
            <p className="hero-copy">
              A Brentwood brunch restaurant and patisserie for slow mornings, coffee pauses,
              dessert cravings, and cakes made for birthdays or simply celebrating life.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="/menu/">
                View full menu
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

        <section className="intro-section" id="offering">
          <div className="section-inner intro-layout">
            <div className="intro-copy">
              <p className="eyebrow eyebrow-accent">The Offering</p>
              <h2>Everything the business needs to say, clearly.</h2>
              <p>
                A Brentwood address for all-day brunch, beautifully made coffee, daily desserts,
                and cakes ordered for birthdays, gatherings, and life's smaller excuses.
              </p>
              <p>
                Settle in for a slower morning, drop in for coffee and something sweet, or plan
                ahead for a cake that turns a good day into an occasion.
              </p>
            </div>

            <div className="intro-panel">
              <img
                src="/food/avocadoFeta-crispyBacon.jpg"
                alt="MALINA avocado toast with salmon and poached eggs"
              />
              <div className="intro-panel-copy">
                <p>Come for brunch. Stay for daily-made sweets.</p>
                <strong>Leave with coffee, cake, or both.</strong>
              </div>
            </div>
          </div>

          <div className="section-inner offering-grid">
            {offeringCards.map((item) => (
              <article key={item.title} className="offering-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="section-inner drinks-band">
            <div className="drinks-band-copy">
              <p className="eyebrow">Coffee and Drinks</p>
              <h3>Hot coffees, teas, matcha, smoothies, shakes, and juices.</h3>
              <p>
                Enough choice for a quick coffee stop, a slower catch-up, or the easy extra that
                turns brunch into a longer stay.
              </p>
            </div>

            <div className="drinks-tag-cloud" aria-label="MALINA coffee and drinks selection">
              {drinksSelection.map((drink) => (
                <span key={drink}>{drink}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-preview-section">
          <div className="section-inner menu-preview-layout">
            <div className="menu-preview-copy">
              <p className="eyebrow">Full Menu</p>
              <h2>Signature brunch, lighter plates, coffee, drinks, and daily sweets.</h2>
              <p className="section-support">
                Browse the full menu before you visit, from all-day brunch and toast favourites to
                smoothies, juices, and the daily dessert counter.
              </p>
            </div>

            <div className="menu-preview-actions">
              <a className="button button-solid" href="/menu/">
                Browse the full menu
              </a>
              <a className="button button-outline" href="#visit">
                Plan your visit
              </a>
            </div>
          </div>

          <div className="section-inner menu-preview-grid">
            {menuPreviewCards.map((item) => (
              <article key={item.title} className="menu-preview-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experiences-section" id="experiences">
          <div className="section-inner experiences-heading">
            <p className="eyebrow">Daily reasons to visit</p>
            <h2>From all-day brunch to a changing dessert counter.</h2>
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

        <section className="gallery-section" id="cakes">
          <div className="section-inner gallery-header">
            <p className="eyebrow eyebrow-accent">Cakes</p>
            <h2>Birthday cakes, milestone cakes, and cakes made simply to celebrate life.</h2>
            <p className="section-support">
              From birthdays and baby showers to dinner parties and thank-yous, cakes are made for
              the moments worth marking.
            </p>
          </div>

          <div className="gallery-strip" aria-label="MALINA cake offering">
            {cakeMoments.map((image) => (
              <article key={image.src} className="gallery-frame">
                <img src={image.src} alt={image.alt} />
                <div className="gallery-copy-panel">
                  <h3>{image.title}</h3>
                  <p>{image.copy}</p>
                </div>
              </article>
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
