import "./App.css";
import "./CakesPage.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  cakeCatalogue,
  cakeOccasions,
  featuredCakes,
  orderSteps,
} from "./cakeData";

const navigation = [
  { label: "Brunch", href: "/?intro=skip#experiences" },
  { label: "Menu", href: "/menu/" },
  { label: "Cakes", href: "#cake-list" },
  { label: "Visit", href: "#cake-enquiry" },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu/" },
  { label: "Cakes", href: "#cake-list" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/malinapatisserie/",
  },
];

const heroNotes = [
  "Birthday cakes",
  "Celebration cakes",
  "Children's cakes",
  "Number cakes",
];

function CakesPage() {
  return (
    <div className="site-shell cakes-page-shell">
      <Header navigation={navigation} />

      <main className="cakes-page-main">
        <div id="top" aria-hidden="true" />

        <section className="cakes-hero">
          <img
            className="cakes-hero-image"
            src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1800&q=80"
            alt="Chocolate celebration cake ready for a special occasion"
          />
          <div className="cakes-hero-overlay" aria-hidden="true" />

          <div className="section-inner cakes-hero-content">
            <p className="eyebrow">Pre-order cakes</p>
            <h1>Cakes made for birthdays, celebrations, and life's sweeter moments.</h1>
            <p className="cakes-hero-copy">
              Choose from classic patisserie ideas, children's party cakes,
              number cakes, and custom designs made to order in Brentwood.
            </p>

            <div className="hero-actions">
              <a className="button button-solid" href="#cake-list">
                Browse cakes
              </a>
              <a className="button button-outline" href="#cake-enquiry">
                Order a cake
              </a>
            </div>

            <div className="hero-meta">
              {heroNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="cake-occasion-section">
          <div className="section-inner cakes-section-heading">
            <p className="eyebrow eyebrow-accent">Occasions</p>
            <h2>Cakes for every reason to gather.</h2>
            <p className="section-support">
              Start with a style, a flavour, or simply the occasion. If the cake
              is not listed here, MALINA can shape it around the celebration.
            </p>
          </div>

          <div className="section-inner cake-occasion-grid">
            {cakeOccasions.map((occasion) => (
              <article key={occasion.title} className="cake-occasion-card">
                <h3>{occasion.title}</h3>
                <p>{occasion.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cake-feature-section" id="cake-list">
          <div className="section-inner cakes-section-heading">
            <p className="eyebrow">Cake Collection</p>
            <h2>Featured cakes to make the choice feel easy.</h2>
            <p className="section-support">
              Start with one of these ideas, then ask the team about flavours,
              colours, sizes, and finishes for your celebration.
            </p>
          </div>

          <div className="section-inner cake-feature-grid">
            {featuredCakes.map((cake) => (
              <article key={cake.name} className="cake-card">
                <div className="cake-card-media">
                  <img src={cake.image} alt={cake.alt} />
                </div>

                <div className="cake-card-copy">
                  <div className="cake-card-topline">
                    <span>{cake.category}</span>
                    <strong>{cake.price}</strong>
                  </div>
                  <h3>{cake.name}</h3>
                  <p>{cake.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cake-catalogue-section">
          <div className="section-inner cake-catalogue-layout">
            <div className="cake-catalogue-copy">
              <p className="eyebrow eyebrow-accent">More Ideas</p>
              <h2>More flavours and styles to shape around your occasion.</h2>
              <p>
                Choose a classic, bring your own inspiration, or ask MALINA to
                suggest something for the date, guest count, and table.
              </p>
            </div>

            <div className="cake-catalogue-list">
              {cakeCatalogue.map((cake) => (
                <article key={cake.name} className="cake-catalogue-item">
                  <h3>{cake.name}</h3>
                  <span>{cake.price}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cake-process-section">
          <div className="section-inner cakes-section-heading">
            <p className="eyebrow">How To Order</p>
            <h2>Simple enough for a quick WhatsApp. Clear enough for a celebration cake.</h2>
          </div>

          <div className="section-inner cake-process-grid">
            {orderSteps.map((step, index) => (
              <article key={step.title} className="cake-process-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cake-enquiry-section" id="cake-enquiry">
          <div className="section-inner cake-enquiry-layout">
            <div className="cake-enquiry-page-copy">
              <p className="eyebrow eyebrow-accent">Cake Enquiries</p>
              <h2>Looking for a custom cake?</h2>
              <p>
                Call or WhatsApp 07366 695384, email
                {" "}
                <a href="mailto:malinapatisserie@gmail.com">
                  malinapatisserie@gmail.com
                </a>
                , or pop into the shop. If you don't see the cake you want,
                we'll make it.
              </p>
              <p>
                Prices vary by size, flavour, finish, and design. Please ask
                about allergens and lead times when placing an order.
              </p>
            </div>

            <div className="cake-enquiry-page-actions">
              <a href="tel:+447366695384">Call 07366 695384</a>
              <a
                href="https://wa.me/447366695384"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp MALINA
              </a>
              <a href="mailto:malinapatisserie@gmail.com">Email the shop</a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=45+Kings+Road+Brentwood+CM14+4DJ"
                target="_blank"
                rel="noreferrer"
              >
                Pop in store
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer links={footerLinks} />
    </div>
  );
}

export default CakesPage;
