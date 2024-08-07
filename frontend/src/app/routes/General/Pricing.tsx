// This components functionality is to show pricing route

// ========= MODULES ==========
import PricingCard from "@/components/UI/Card/PricingCard";
import styles from "./styles/Pricing.module.scss";

// ======= COMPONENTS =========

const pricingCards = [
  {
    title: "Member",
    titleColor: "white",
    currency: "ZŁ",
    price: 0,
    description: "For personal use and exploration of our application.",
  },
  {
    title: "Subscriber",
    titleColor: "#7c50ff",
    currency: "ZŁ",
    price: 10,
    description: "For personal use and exploration of our application.",
    chipStyle: {
      variant: "outlined",
      color: "primary",
      size: "small",
      title: "Most popular",
    },
  },
  {
    title: "Pro",
    titleColor: "blue",
    currency: "ZŁ",
    price: 30,
    description: "For personal use and exploration of our application.",
  },
];

const Pricing = () => {
  return (
    <section id={styles.pricing}>
      <div className={`${styles.sectionWrapper} container`}>
        {/* SECTION HEADINGS */}
        <h2>Choose your plan</h2>
        <h3>Unlock unlimited possibilities</h3>

        {/* CARDS WRAPPER */}
        <ul className={styles.cards}>
          {pricingCards.map((card) => (
            // CARD
            <li className={styles.card}>
              <PricingCard
                title={card.title}
                titleColor={card.titleColor}
                currency={card.currency}
                price={card.price}
                description={card.description}
                key={card.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pricing;
