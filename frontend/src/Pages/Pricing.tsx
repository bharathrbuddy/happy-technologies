

function Pricing() {
  const openChat = () => {
    const chatButton = document.querySelector(
      ".chat-button"
    ) as HTMLButtonElement;

    chatButton?.click();
  };

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <h1>Our Pricing</h1>

        <p>
          Transparent starting prices for professional
          digital solutions. Get a customised quotation
          based on your requirements.
        </p>
      </section>

      <section className="pricing-container">

        <div className="pricing-card">
          <h2>Website Development</h2>
          <p className="price">Starting from ₹75,000</p>

          <ul>
            <li>Up to 5 pages</li>
            <li>Responsive design</li>
            <li>Modern UI</li>
            <li>Contact form</li>
          </ul>

          <button onClick={openChat}>
            Get a Quote
          </button>
        </div>

        <div className="pricing-card">
          <h2>SEO Services</h2>
          <p className="price">Starting from ₹15,000/month</p>

          <ul>
            <li>Up to 4 website pages</li>
            <li>Up to 10 keywords</li>
            <li>On-page optimisation</li>
            <li>Technical SEO</li>
          </ul>

          <button onClick={openChat}>
            Get a Quote
          </button>
        </div>

        <div className="pricing-card">
          <h2>E-commerce Website</h2>
          <p className="price">Starting from ₹1,50,000</p>

          <ul>
            <li>Up to 10 pages</li>
            <li>Up to 50 products</li>
            <li>Shopping cart</li>
            <li>Secure checkout</li>
          </ul>

          <button onClick={openChat}>
            Get a Quote
          </button>
        </div>

        <div className="pricing-card">
          <h2>Website Maintenance</h2>
          <p className="price">Starting from ₹15,000/month</p>

          <ul>
            <li>Up to 10 support hours</li>
            <li>Bug fixes</li>
            <li>Website updates</li>
            <li>Technical support</li>
          </ul>

          <button onClick={openChat}>
            Get a Quote
          </button>
        </div>

        <div className="pricing-card">
          <h2>Custom Software</h2>
          <p className="price">Starting from ₹5,00,000</p>

          <ul>
            <li>Up to 10 core features</li>
            <li>Custom development</li>
            <li>Scalable architecture</li>
            <li>Custom solutions</li>
          </ul>

          <button onClick={openChat}>
            Get a Quote
          </button>
        </div>

      </section>

      <section className="custom-quote">
        <h2>Need a Custom Solution?</h2>

        <p>
          Tell us about your project and our AI Assistant
          can provide an instant estimate.
        </p>

        <button onClick={openChat}>
          Get Your Custom Quote
        </button>
      </section>
    </div>
  );
}

export default Pricing;