import './App.css'
import './MenuPage.css'
import { menuSections, menuSupportingCards } from './menuData'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '#menu-list' },
  { label: 'Visit', href: '#visit' },
]

const heroNotes = [
  'All-day brunch in Brentwood',
  'Coffee, tea, smoothies, juices, and shakes',
  'Daily desserts and celebration cakes',
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

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function MenuPage() {
  return (
    <div className="site-shell menu-page-shell">
      <header className="site-header menu-page-header">
        <a className="brand" href="/" aria-label="MALINA Patisserie home">
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

      <main className="menu-page-main">
        <section className="menu-page-hero" id="top">
          <img
            className="menu-page-hero-image"
            src="/food/cake-coffee-coffeeMachine+Entrance.jpg"
            alt="MALINA coffee and cake beside the counter"
          />
          <div className="menu-page-hero-overlay" aria-hidden="true" />

          <div className="section-inner menu-page-hero-content">
            <p className="eyebrow">MALINA Menu</p>
            <h1>All-day brunch, coffee, tea, fresh juices, and daily-made sweets.</h1>
            <p className="menu-page-hero-copy">
              Settle in for brunch, stop by for coffee and cake, or plan the table before you
              arrive.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="#menu-list">
                Browse the menu
              </a>
              <a className="button button-outline" href="/">
                Back to home
              </a>
            </div>

            <div className="hero-meta">
              {heroNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-page-jump-band" aria-label="Menu categories">
          <div className="section-inner menu-page-jump-layout">
            <p className="eyebrow eyebrow-accent">Jump To</p>
            <div className="menu-page-jumps">
              {menuSections.map((section) => (
                <a key={section.title} href={`#${slugify(section.title)}`}>
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-section menu-page-section" id="menu-list">
          <div className="section-inner menu-header">
            <p className="eyebrow">The Menu</p>
            <h2>From signature brunch plates to teas, smoothies, and lighter daytime favourites.</h2>
            <p className="section-support">
              Please ask the team about allergens, gluten-free options on selected dishes, and
              today's dessert counter.
            </p>
          </div>

          <div className="section-inner menu-grid">
            {menuSections.map((section) => (
              <article key={section.title} id={slugify(section.title)} className="menu-category">
                <div className="menu-category-header">
                  <p className="menu-category-note">{section.note}</p>
                  <h3>{section.title}</h3>
                </div>

                {section.compact ? (
                  <div className="menu-pill-list" aria-label={section.title}>
                    {section.items.map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </div>
                ) : (
                  <div className="menu-list">
                    {section.items.map((item) => (
                      <article key={item.name} className="menu-item">
                        <div className="menu-item-top">
                          <h4>{item.name}</h4>
                          <span className="menu-price">{item.price}</span>
                        </div>
                        <p>{item.description}</p>
                        {item.note ? <p className="menu-item-note">{item.note}</p> : null}
                      </article>
                    ))}
                  </div>
                )}

                {section.footer ? <p className="menu-category-footer">{section.footer}</p> : null}
              </article>
            ))}
          </div>

          <div className="section-inner menu-support-grid">
            {menuSupportingCards.map((card) => (
              <article key={card.title} className="menu-support-card">
                <h3>{card.title}</h3>
                {card.copy ? <p>{card.copy}</p> : null}
                {card.items ? (
                  <ul className="menu-support-list">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="visit-section menu-page-visit" id="visit">
          <div className="section-inner visit-layout">
            <div className="visit-copy">
              <p className="eyebrow">Visit MALINA</p>
              <h2>45 Kings Road, Brentwood CM14 4DJ.</h2>
              <p>
                Join us for all-day brunch, coffee, daily desserts, and cakes made for the moments
                worth celebrating.
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
                <a className="button button-outline" href="mailto:malinapatisserie@gmail.com">
                  Cake and events
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
                <p className="visit-label">Daily counter</p>
                <a
                  className="visit-link"
                  href="https://www.instagram.com/malinapatisserie/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MenuPage
