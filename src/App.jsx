import './App.css'

const navigation = [
  { label: 'Experience', href: '#experience' },
  { label: 'Menu', href: '#menu' },
  { label: 'Moments', href: '#moments' },
  { label: 'Visit', href: '#visit' },
]

const experiencePoints = [
  {
    title: 'Brunch with polish',
    description:
      'Elegant plates, generous portions, and a room that feels special from the first coffee.',
  },
  {
    title: 'Handmade patisserie',
    description:
      'Macarons, celebration cakes, honey cakes, and seasonal desserts made to stop people mid-conversation.',
  },
  {
    title: 'Occasions worth dressing up for',
    description:
      'Afternoon tea, private dining, and cake enquiries for the kind of moments people remember.',
  },
]

const menuHighlights = [
  {
    label: 'Patisserie counter',
    title: 'Macarons, honey cake, black forest, napoleon',
    copy:
      'A front-of-house lineup that turns walk-ins into regulars and makes take-home boxes feel irresistible.',
  },
  {
    label: 'Morning to lunch',
    title: 'Eggs Royale, avocado toast, baked eggs, vibrant brunch plates',
    copy:
      'Comforting favourites with a cleaner, more elevated finish than the usual high-street cafe routine.',
  },
  {
    label: 'Coffee and matcha',
    title: 'Aromatic coffees, smooth matcha, juices and weekend lingerers',
    copy:
      'Drinks designed to carry the mood, not just fill a gap between food courses.',
  },
  {
    label: 'Bookable moments',
    title: 'Afternoon tea, cake orders, birthdays and private dining',
    copy:
      'A website should help people plan the celebration before they even step through the door.',
  },
]

const moments = [
  'Award-winning Brentwood hospitality',
  'Colour-rich interiors that still feel grown-up',
  'A menu with London-level destination appeal',
  'Independent warmth without losing polish',
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

const imageSet = {
  hero:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
  salon:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
  brunch:
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
  patisserie:
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80',
}

function App() {
  return (
    <div className="site-shell">
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
          className="button button-ghost header-cta"
          href="https://www.instagram.com/malinapatisserie/"
          target="_blank"
          rel="noreferrer"
        >
          Daily counter
        </a>
      </header>

      <main>
        <section className="hero-section" id="top">
          <img
            className="hero-image"
            src={imageSet.hero}
            alt="Elegant cafe interior with warm lighting and layered table settings"
          />

          <div className="hero-scrim" aria-hidden="true" />

          <div className="section-inner hero-content">
            <p className="eyebrow">Brentwood, Essex</p>
            <h1>Luxury brunch and patisserie with colour, comfort, and a reason to return.</h1>
            <p className="hero-copy">
              MALINA should feel like the place you recommend when someone wants a beautiful room,
              standout cakes, and a cafe experience polished enough to rival London without losing
              its local warmth.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="#visit">
                Plan your visit
              </a>
              <a className="button button-ghost" href="mailto:malinapatisserie@gmail.com">
                Cake enquiry
              </a>
            </div>

            <dl className="hero-highlights">
              <div>
                <dt>Address</dt>
                <dd>45 Kings Road, Brentwood CM14 4DJ</dd>
              </div>
              <div>
                <dt>Signature</dt>
                <dd>Brunch, handmade cakes, afternoon tea</dd>
              </div>
              <div>
                <dt>Reputation</dt>
                <dd>4.9-rated local favourite with award-winning buzz</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="ticker-band" aria-label="MALINA highlights">
          <div className="section-inner ticker-track">
            <span>Handmade cakes</span>
            <span>Brunch worth dressing up for</span>
            <span>Afternoon tea</span>
            <span>Private dining</span>
            <span>Celebration orders</span>
            <span>Colour-rich interiors</span>
          </div>
        </section>

        <section className="story-section" id="experience">
          <div className="section-inner story-grid">
            <div className="story-copy">
              <p className="eyebrow eyebrow-dark">Why this direction works</p>
              <h2>Brentwood warmth, London standard.</h2>
              <p className="section-lead">
                The strongest competitors in Essex and central London win on atmosphere, signature
                desserts, and how easily the website turns curiosity into a booking, visit, or
                enquiry. MALINA already has the food story. The website should make that story feel
                unmistakably premium.
              </p>

              <div className="point-list">
                {experiencePoints.map((point) => (
                  <article key={point.title} className="point-item">
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="story-media">
              <img
                src={imageSet.salon}
                alt="Fresh pastries arranged on a counter with soft afternoon light"
              />
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">What people come for</p>
              <h2>Built for the camera, but even better at the table.</h2>
              <p className="section-lead">
                This is the balance to protect online: a destination look, with enough clarity that
                visitors instantly understand MALINA does more than just coffee and cake.
              </p>
            </div>

            <div className="menu-grid">
              {menuHighlights.map((item) => (
                <article key={item.title} className="menu-card">
                  <p className="menu-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="moments">
          <div className="section-inner gallery-layout">
            <div className="gallery-copy">
              <p className="eyebrow eyebrow-dark">Moments that sell themselves</p>
              <h2>Give every reason to stay longer, celebrate bigger, and come back sooner.</h2>
              <ul className="moments-list">
                {moments.map((moment) => (
                  <li key={moment}>{moment}</li>
                ))}
              </ul>
            </div>

            <div className="gallery-stack">
              <figure className="gallery-panel gallery-panel-large">
                <img
                  src={imageSet.brunch}
                  alt="Colourful brunch plates with eggs, toast, and coffee"
                />
              </figure>
              <figure className="gallery-panel gallery-panel-small">
                <img
                  src={imageSet.patisserie}
                  alt="Luxury patisserie assortment with colourful macarons and pastries"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="visit-section" id="visit">
          <div className="section-inner visit-grid">
            <div className="visit-copy">
              <p className="eyebrow">Visit MALINA</p>
              <h2>Easy to find. Hard to leave quickly.</h2>
              <p className="section-lead">
                Built around the details people check before they visit: location, opening rhythm,
                and a direct route for cake or event enquiries.
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
                  className="button button-ghost"
                  href="https://www.instagram.com/malinapatisserie/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow on Instagram
                </a>
              </div>

              <div className="contact-strip">
                <a href="mailto:malinapatisserie@gmail.com">malinapatisserie@gmail.com</a>
                <span>Independent patisserie, brunch and afternoon tea destination</span>
              </div>
            </div>

            <div className="visit-card">
              <div className="visit-card-block">
                <p className="visit-label">Find us</p>
                <address>
                  45 Kings Road
                  <br />
                  Brentwood
                  <br />
                  Essex CM14 4DJ
                </address>
              </div>

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
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
