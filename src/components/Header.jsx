import { useEffect, useMemo, useState } from "react";
import "./Header.css";

export default function Header({ navigation = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopNav = useMemo(() => navigation.slice(0, 4), [navigation]);
  const leftNav = useMemo(() => desktopNav.slice(0, 2), [desktopNav]);
  const rightNav = useMemo(() => desktopNav.slice(2, 4), [desktopNav]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const smoothScrollToHash = (href) => {
    if (!href.startsWith("#")) return false;

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (!element) return false;

    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 88;
    const targetY =
      element.getBoundingClientRect().top + window.scrollY - headerHeight - 18;

    window.history.pushState(null, "", href);
    window.scrollTo({
      top: Math.max(targetY, 0),
      behavior: "smooth",
    });

    return true;
  };

  const handleLinkClick = (event, href) => {
    if (href.startsWith("#")) {
      const handled = smoothScrollToHash(href);

      if (handled) {
        event.preventDefault();
      }
    }

    setMobileOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="nav-group nav-left" aria-label="Primary left">
          {leftNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={(event) => handleLinkClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          className="brand"
          href="/?intro=1"
          aria-label="MALINA Patisserie home"
          onClick={(event) => handleLinkClick(event, "/?intro=1")}
        >
          <span className="brand-subtitle">Patisserie</span>
          <span className="brand-mark">MALINA</span>
        </a>

        <div className="nav-group nav-right" aria-label="Primary right">
          {rightNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={(event) => handleLinkClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="header-actions">
          <button
            type="button"
            className={`mobile-toggle ${mobileOpen ? "is-open" : ""}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay ${mobileOpen ? "is-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-nav-drawer"
        className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-top">
          <button
            type="button"
            className="mobile-close"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile primary">
          {desktopNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-link"
              onClick={(event) => handleLinkClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
