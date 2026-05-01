import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CoffeeDrinks from "./components/home/CoffeeDrinks";

const navigation = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "/menu/" },
  { label: "Cakes", href: "/cakes/" },
  { label: "Visit", href: "#visit" },
];

const footerLinks = [
  { label: "Menu", href: "/menu/" },
  { label: "Cakes", href: "/cakes/" },
  { label: "Visit", href: "#visit" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/malinapatisserie/",
  },
];

const experiences = [
  {
    id: "01",
    title: "All-day brunch",
    subtitle:
      "A menu built for proper sit-down mornings and unhurried afternoons",
    copy: "Shakshuka, English Breakfast Our Way, Potato Fritters with Salmon, Halloumi Bowl, poke bowls, and signature toast plates give MALINA a real brunch identity, not just a cafe feel.",
    image: "/food/artichoke-poachedEgg.webp",
    alt: "MALINA brunch plate with poached eggs, herbs, and toast",
    imagePositionDesktop: "center center",
    imagePositionMobile: "center center",
  },
  {
    id: "02",
    title: "Coffee, teas, smoothies, and lighter favourites",
    subtitle:
      "A drinks menu people can actually choose from, not a token side note",
    copy: "Latte, cappuccino, flat white, cortado, espresso, americano, mocha, hot chocolate, matcha latte, green tea, white tea, black tea, flower tea, smoothies, shakes, and juices sit alongside toast favourites, salads, pancakes, and easy daytime plates.",
    image: "/food/mochaCoffee.webp",
    desktopImage: "/food/mochaCoffee-desktop.jpg",
    alt: "MALINA mocha coffee topped with cream and chocolate drizzle",
    imagePositionDesktop: "center center",
    imagePositionMobile: "center 22%",
  },
  {
    id: "03",
    title: "Daily-made sweets and celebration cakes",
    subtitle:
      "A counter that changes, plus cakes people order for life's better moments",
    copy: "Desserts are made daily and the counter changes with the day, which keeps the counter feeling alive. Alongside that, celebration cakes can cover birthdays, gatherings, gifting, and simple excuses to celebrate life.",
    image: "/food/sliceCake.webp",
    desktopImage: "/food/sliceCake-desktop.jpg",
    alt: "MALINA layered cake slice with berries on a plate",
    imagePositionDesktop: "center center",
    imagePositionMobile: "center 44%",
  },
];

const houseNotes = [
  "All-day brunch in Brentwood",
  "Coffee, matcha, tea, smoothies, shakes, and juices",
  "Daily desserts and celebration cakes",
];

const offeringCards = [
  {
    title: "Brunch",
    copy: "Shakshuka, English Breakfast Our Way, Chorizo and Padron Frittata, Potato Fritters with Salmon, Halloumi Bowl, and more served all day.",
  },
  {
    title: "Coffee",
    copy: "Latte, cappuccino, flat white, cortado, espresso, americano, mocha, hot chocolate, matcha latte, green, white, black, and flower teas, plus smoothies, shakes, and juices.",
  },
  {
    title: "Dessert speciality",
    copy: "The sweet offering changes daily, which is part of the charm. The counter should feel fresh, handmade, and worth checking again tomorrow.",
  },
  {
    title: "Celebration cakes",
    copy: "Birthday cakes, milestone cakes, and cakes ordered simply to celebrate life should feel like a natural extension of the restaurant and patisserie.",
  },
];

const menuPreviewCards = [
  {
    title: "Signature brunch",
    copy: "Shakshuka, English Breakfast Our Way, Potato Fritters with Salmon, poke bowls, and favourite brunch plates served all day.",
  },
  {
    title: "Toast, salads, and lighter plates",
    copy: "Village Chanterelles, Avocado Feta & Crispy Bacon, salads, toasties, soup of the day, and easy daytime favourites.",
  },
  {
    title: "Coffee and drinks",
    copy: "Coffee, matcha, teas, smoothies, shakes, and fresh juices for slower mornings, quick stops, and afternoon catch-ups.",
  },
  {
    title: "Daily desserts and cakes",
    copy: "A changing dessert counter, layered cake slices, macarons, and celebration cakes made for birthdays, gatherings, and gifting.",
  },
];

const cakeMoments = [
  {
    src: "/food/sliceCake.webp",
    alt: "MALINA cake slice with berries and cream filling",
    title: "Daily cake counter",
    copy: "Fresh slices, layered cakes, and daily-made desserts give people a reason to come back often.",
    imagePosition: "center 42%",
  },
  {
    src: "/food/macarons.webp",
    alt: "MALINA macarons with caramel filling",
    title: "Signature sweet details",
    copy: "Macarons and patisserie details help MALINA feel handmade, giftable, and visually memorable.",
    imagePosition: "center center",
  },
  {
    src: "/food/cake-coffee-coffeeMachine+Entrance.webp",
    alt: "MALINA cake and coffee beside the coffee machine and counter",
    title: "Coffee and cake moments",
    copy: "The counter should sell the ritual too: choose dessert, add coffee, stay a little longer.",
    imagePosition: "center 38%",
  },
  {
    src: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1200&q=80",
    alt: "Elegant frosted celebration cake with floral styling",
    title: "Milestones and gatherings",
    copy: "Baby showers, dinner parties, thank-yous, and all the reasons people want something beautiful.",
    imagePosition: "center center",
  },
];

const customCakeTypes = [
  "Birthday cakes",
  "Celebration cakes",
  "Children's cakes",
  "Number cakes",
];

const visitHoursSummary = [
  { day: "Mon", hours: "Closed" },
  { day: "Tue-Sat", hours: "9:00 - 16:00" },
  { day: "Sun", hours: "9:00 - 15:00" },
];

const INTRO_STORAGE_KEY = "malina_intro_seen";
const INTRO_PLAY_MS = 3400;
const INTRO_EXIT_MS = 850;
const INTRO_FORCE_PARAM = "intro";
const INTRO_SKIP_VALUE = "skip";

const readIntroParam = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return new URLSearchParams(window.location.search).get(INTRO_FORCE_PARAM);
};

const shouldForceIntro = () => {
  return readIntroParam() === "1";
};

const shouldSkipIntro = () => {
  return readIntroParam() === INTRO_SKIP_VALUE;
};

const readIntroSeen = () => {
  if (shouldSkipIntro()) {
    return true;
  }

  if (
    typeof window === "undefined" ||
    import.meta.env.DEV ||
    shouldForceIntro()
  ) {
    return false;
  }

  try {
    return window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const writeIntroSeen = () => {
  if (
    typeof window === "undefined" ||
    shouldSkipIntro() ||
    import.meta.env.DEV ||
    shouldForceIntro()
  ) {
    return;
  }

  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // Ignore storage failures and let the intro behave as an in-memory effect.
  }
};

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return !(prefersReducedMotion || readIntroSeen());
  });

  const [introExiting, setIntroExiting] = useState(false);
  const introTimersRef = useRef([]);

  useEffect(() => {
    const clearIntroTimers = () => {
      introTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      introTimersRef.current = [];
    };

    if (!showIntro) {
      return clearIntroTimers;
    }

    introTimersRef.current = [
      window.setTimeout(() => {
        setIntroExiting(true);
      }, INTRO_PLAY_MS),
      window.setTimeout(() => {
        writeIntroSeen();
        setShowIntro(false);
        setIntroExiting(false);
      }, INTRO_PLAY_MS + INTRO_EXIT_MS),
    ];

    return clearIntroTimers;
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showIntro]);

  const dismissIntro = () => {
    if (!showIntro || introExiting) {
      return;
    }

    introTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    introTimersRef.current = [];

    writeIntroSeen();
    setIntroExiting(true);

    const closeTimer = window.setTimeout(() => {
      setShowIntro(false);
      setIntroExiting(false);
    }, INTRO_EXIT_MS);

    introTimersRef.current.push(closeTimer);
  };

  return (
    <div className="site-shell">
      {showIntro ? (
        <section
          className={`site-intro-gate ${introExiting ? "is-exiting" : ""}`}
        >
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
            <p className="site-intro-copy">
              Brunch. Coffee. Desserts. Celebration cakes.
            </p>
          </div>

          <button
            className="site-intro-skip"
            type="button"
            onClick={dismissIntro}
          >
            Skip intro
          </button>
        </section>
      ) : null}

      <Header navigation={navigation} />

      <main>
        <div id="top" aria-hidden="true" />

        <section className="hero-section">
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
              A Brentwood brunch restaurant and patisserie for slow mornings,
              coffee pauses, dessert cravings, and cakes made for birthdays or
              simply celebrating life.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="/menu/">
                View full menu
              </a>
              <a
                className="button button-outline"
                href="/cakes/"
              >
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
                A Brentwood address for all-day brunch, beautifully made coffee,
                daily desserts, and cakes ordered for birthdays, gatherings, and
                life's smaller excuses.
              </p>
              <p>
                Settle in for a slower morning, drop in for coffee and something
                sweet, or plan ahead for a cake that turns a good day into an
                occasion.
              </p>
            </div>

            <div className="intro-panel">
              <img
                src="/food/avocadoFeta-crispyBacon.webp"
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

          <CoffeeDrinks />
        </section>

        <section className="menu-preview-section">
          <div className="section-inner menu-preview-layout">
            <div className="menu-preview-copy">
              <p className="eyebrow">Full Menu</p>
              <h2>
                Signature brunch, lighter plates, coffee, drinks, and daily
                sweets.
              </h2>
              <p className="section-support">
                Browse the full menu before you visit, from all-day brunch and
                toast favourites to smoothies, juices, and the daily dessert
                counter.
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
              className={`experience-row ${
                index % 2 === 1 ? "experience-row-reverse" : ""
              }`}
            >
              <div className="section-inner experience-layout">
                <div className="experience-media">
                  <picture>
                    {experience.desktopImage ? (
                      <source
                        media="(min-width: 841px)"
                        srcSet={experience.desktopImage}
                      />
                    ) : null}
                    <img
                      src={experience.image}
                      alt={experience.alt}
                      style={{
                        "--experience-image-position-desktop":
                          experience.imagePositionDesktop,
                        "--experience-image-position-mobile":
                          experience.imagePositionMobile,
                      }}
                    />
                  </picture>
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
            <h2>
              Birthday cakes, milestone cakes, and cakes made simply to
              celebrate life.
            </h2>
            <p className="section-support">
              From birthdays and baby showers to dinner parties and thank-yous,
              cakes are made for the moments worth marking.
            </p>
          </div>

          <div className="section-inner cake-enquiry-panel">
            <div className="cake-enquiry-copy">
              <p className="eyebrow">Custom cakes</p>
              <h3>Looking for a custom cake?</h3>
              <p>
                Call or WhatsApp 07366 695384, email
                {" "}
                <a href="mailto:malinapatisserie@gmail.com">
                  malinapatisserie@gmail.com
                </a>
                , or pop into the shop. If you don't see the cake you want,
                we'll make it.
              </p>
            </div>

            <div className="cake-enquiry-details">
              <ul className="cake-type-list" aria-label="Custom cake options">
                {customCakeTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cake-enquiry-actions">
                <a href="tel:+447366695384">Call</a>
                <a
                  href="https://wa.me/447366695384"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=45+Kings+Road+Brentwood+CM14+4DJ"
                  target="_blank"
                  rel="noreferrer"
                >
                  Find us
                </a>
              </div>
            </div>
          </div>

          <div className="section-inner gallery-strip" aria-label="MALINA cake offering">
            {cakeMoments.map((image) => (
              <article key={image.src} className="gallery-frame">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: image.imagePosition }}
                />
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
                45 Kings Road, Brentwood CM14 4DJ. Join us for all-day brunch,
                coffee, daily desserts, and cakes made for everyday treats and
                bigger celebrations.
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
                  {visitHoursSummary.map((entry) => (
                    <li key={entry.day}>
                      <span>{entry.day}</span>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="visit-card-block">
                <p className="visit-label">Enquiries</p>
                <a
                  className="visit-link"
                  href="mailto:malinapatisserie@gmail.com"
                >
                  malinapatisserie@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer links={footerLinks} />
    </div>
  );
}

export default App;
