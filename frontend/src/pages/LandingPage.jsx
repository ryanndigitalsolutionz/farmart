import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiShoppingBag,
  FiHome,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import farmartImages from '../data/farmartImages'

function LandingPage() {
  const navigate = useNavigate()

  const livestock = [
    {
      name: 'Cattle',
      description: 'Healthy cattle from local farmers.',
      image: farmartImages.livestock.cows[0],
    },
    {
      name: 'Goats',
      description: 'Browse goats suited to different needs.',
      image: farmartImages.livestock.goats[0],
    },
    {
      name: 'Sheep',
      description: 'Find quality sheep directly from farms.',
      image: farmartImages.livestock.sheep[0],
    },
    {
      name: 'Pigs',
      description: 'Discover available pigs from farmers.',
      image: farmartImages.livestock.pigs[0],
    },
    {
      name: 'Poultry',
      description: 'Explore poultry from trusted farms.',
      image: farmartImages.livestock.poultry[0],
    },
  ]

  const products = [
    {
      name: 'Eggs',
      description: 'Farm-fresh eggs available from local producers.',
      image: farmartImages.products.eggs[0],
    },
    {
      name: 'Milk',
      description: 'Fresh dairy products from the farm.',
      image: farmartImages.products.milk[0],
    },
    {
      name: 'Butter',
      description: 'Quality farm-produced butter.',
      image: farmartImages.products.butter[0],
    },
  ]

  const values = [
    {
      icon: FiHome,
      title: 'Straight from the farm',
      description:
        'Discover livestock and farm produce directly from the people who raise and produce them.',
    },
    {
      icon: FiShield,
      title: 'Built around trust',
      description:
        'Farmart is designed to make buying and selling agricultural products clearer and more reliable.',
    },
    {
      icon: FiShoppingBag,
      title: 'More than livestock',
      description:
        'Explore both living livestock and farm-produced goods in one marketplace.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Discover',
      description:
        'Browse livestock and farm produce that farmers have made available.',
    },
    {
      number: '02',
      title: 'Choose',
      description:
        'Compare listings, prices and details before deciding what suits you.',
    },
    {
      number: '03',
      title: 'Order',
      description:
        'Place your order and move through the Farmart purchasing process.',
    },
  ]

  const reveal = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: {
        duration: 4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  }

  const fadeItem = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  }

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-glow" />

        <motion.div
          className="landing-hero-content"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="landing-eyebrow">
            THE FARMART MARKETPLACE
          </span>

          <h1>
            From the farm.
            <br />
            <span>Straight to you.</span>
          </h1>

          <p>
            Discover livestock and farm produce directly from
            farmers — with fair prices and fewer unnecessary
            middlemen.
          </p>

          <div className="landing-hero-actions">
            <button
              type="button"
              className="landing-hero-button landing-hero-button-primary"
              onClick={() => navigate('/welcome')}
            >
              <span>Try it out!</span>
              <FiArrowRight className="landing-button-icon" />
            </button>

            <button
              type="button"
              className="landing-hero-button landing-hero-button-secondary"
              onClick={() => navigate('/login')}
            >
              <span>Welcome back!</span>
              <FiArrowRight className="landing-button-icon" />
            </button>
          </div>
        </motion.div>
      </section>

      <motion.section
      className="landing-section landing-marketplace"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
        >
        <div className="landing-section-heading">
          <span className="landing-eyebrow">EXPLORE</span>

          <h2>
            What are you
            <br />
            looking for?
          </h2>

          <p>
            Farmart brings livestock and farm-produced goods
            together in one place.
          </p>
        </div>

        <div className="landing-category-group">
          <div className="landing-category-heading">
            <FiHome size={20} />
            <h3>Livestock</h3>
          </div>

          <div className="landing-category-grid">
            {livestock.map((item) => (
              <article
                className="landing-category-card"
                key={item.name}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="landing-category-overlay">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="landing-category-group">
          <div className="landing-category-heading">
            <FiShoppingBag size={20} />
            <h3>Farm Produce</h3>
          </div>

          <div className="landing-product-grid">
            {products.map((item) => (
              <article
                className="landing-product-card"
                key={item.name}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="landing-section-button"
          onClick={() => navigate('/welcome')}
        >
          <span>Explore Farmart</span>
          <FiArrowRight />
        </button>
      </motion.section>

      <section className="landing-section landing-values">
        <div className="landing-section-heading landing-centered-heading">
          <span className="landing-eyebrow">WHY FARMART</span>

          <h2>
            A marketplace
            <br />
            built around the farm.
          </h2>
        </div>

        <motion.div
          className="landing-values-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value) => {
            const Icon = value.icon

            return (
              <motion.article
                className="landing-value-card"
                variants={fadeItem}
                key={value.title}
              >
                <div className="landing-value-icon">
                  <Icon size={24} />
                </div>

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </section>

      <section className="landing-section landing-how">
        <div className="landing-how-intro">
          <span className="landing-eyebrow">
            HOW FARMART WORKS
          </span>

          <h2>
            Simple from
            <br />
            start to finish.
          </h2>
        </div>

        <motion.div
          className="landing-steps"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.article
              className="landing-step"
              variants={fadeItem}
              key={step.number}
            >
              <span className="landing-step-number">
                {step.number}
              </span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="landing-section landing-trust">
        <div className="landing-trust-card">
          <div className="landing-trust-content">
            <span className="landing-eyebrow">
              FARMART
            </span>

            <h2>
              Agriculture deserves
              <br />
              a better marketplace.
            </h2>

            <p>
              Whether you're looking for your next animal,
              fresh farm produce, or a place to sell what your
              farm produces, Farmart brings the experience
              together.
            </p>
          </div>

          <div className="landing-trust-list">
            <div>
              <FiCheckCircle size={20} />
              <span>Direct farmer-to-buyer connection</span>
            </div>

            <div>
              <FiCheckCircle size={20} />
              <span>Clear listing information</span>
            </div>

            <div>
              <FiCheckCircle size={20} />
              <span>Designed for livestock and farm produce</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-final-cta">
        <span className="landing-eyebrow">
          YOUR FARM. YOUR MARKET.
        </span>

        <h2>
          Ready to get
          <br />
          closer to the source?
        </h2>

        <p>
          Step into Farmart and discover what's waiting on
          the other side of the farm.
        </p>

        <button
          type="button"
          className="landing-final-button"
          onClick={() => navigate('/welcome')}
        >
          <span>Try it out!</span>
          <FiArrowRight />
        </button>
      </section>
    </main>
  )
}

export default LandingPage
