import "./Footer.css";

const openingHours = [
  { label: "Monday", value: "Closed" },
  { label: "Tuesday - Saturday", value: "9:00 - 16:00" },
  { label: "Sunday", value: "9:00 - 15:00" },
];

export default function Footer({ links = [] }) {
  return (
    <footer className="site-footer">
      <div className="section-inner site-footer-inner">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="footer-brand" href="/">
              <span className="footer-brand-subtitle">Patisserie</span>
              <span className="footer-brand-mark">MALINA</span>
            </a>

            <p className="footer-copy">
              Brunch, coffee, daily desserts, and celebration cakes in
              Brentwood.
            </p>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Visit</p>
            <div className="footer-stack">
              <a
                href="https://www.google.com/maps/search/?api=1&query=45+Kings+Road+Brentwood+CM14+4DJ"
                target="_blank"
                rel="noreferrer"
              >
                45 Kings Road
                <br />
                Brentwood CM14 4DJ
              </a>
              <a
                href="https://www.instagram.com/malinapatisserie/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Enquiries</p>
            <div className="footer-stack">
              <a href="tel:+447366695384">07366 695384</a>
              <a
                href="https://wa.me/447366695384"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a href="mailto:malinapatisserie@gmail.com">
                malinapatisserie@gmail.com
              </a>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Explore</p>
            <nav className="footer-stack" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Hours</p>
            <ul className="footer-hours" aria-label="Opening hours">
              {openingHours.map((entry) => (
                <li key={entry.label}>
                  <span>{entry.label}</span>
                  <span>{entry.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-note">Prices subject to change.</p>
        </div>
      </div>
    </footer>
  );
}
