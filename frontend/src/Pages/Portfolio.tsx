import { ArrowUpRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/siteData';

export default function Portfolio() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">PORTFOLIO</span>

          <h1>
            Digital experiences
            <span> built with purpose.</span>
          </h1>

          <p>
            Explore our website concepts created to demonstrate how
            thoughtful design and modern technology can be used to solve
            different business problems.
          </p>
        </div>

        <div className="portfolio-large-grid">
          {projects.map((project) => (
            <article className="portfolio-large-card" key={project.title}>
              <div className="portfolio-large-image">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />

                <span className="portfolio-category">
                  {project.category}
                </span>
              </div>

              <div className="portfolio-large-content">
                <div>
                  <h2>{project.title}</h2>

                  <p>{project.description}</p>
                </div>

                <ArrowUpRight size={24} />
              </div>
            </article>
          ))}
        </div>


        <div className="bottom-cta">
          <span className="eyebrow">YOUR BUSINESS COULD BE NEXT</span>

          <h2>Let's create your website.</h2>

          <p>
            Tell us about your business and we'll discuss the best
            approach for your online presence.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Start a Project
          </Link>
        </div>
      </div>

      
        <div className="portfolio-disclaimer">
  <div className="portfolio-disclaimer-title">
    <Info size={15} />
    <strong>Portfolio Disclaimer</strong>
  </div>

  <p>
    The projects shown on this website include concept projects
    created by Happy Technologies to demonstrate our capabilities.
    Client work will be added as projects are completed.
  </p>
</div>
    </section>
  );
}