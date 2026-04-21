import "./CoffeeDrinks.css";

export default function CoffeeDrinks() {
  return (
    <div className="section-inner drinks-band">
      <div className="drinks-band-copy">
        <p className="eyebrow">Coffee and Drinks</p>
        <h3>Hot coffees, teas, matcha, smoothies, shakes, and juices.</h3>
        <p>
          Enough choice for a quick coffee stop, a slower catch-up, or the easy
          extra that turns brunch into a longer stay.
        </p>
        <a
          className="button button-outline drinks-band-link"
          href="/menu/#coffee-tea"
        >
          View drinks menu
        </a>
      </div>

      <div className="drinks-band-media">
        <img
          src="/drinks/matchaLatte.webp"
          alt="MALINA matcha latte with latte art"
        />
      </div>
    </div>
  );
}
