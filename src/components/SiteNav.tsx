import { Link } from "react-router-dom";

type NavProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteNav({
  ctaHref = "/studio",
  ctaLabel = "Open Studio",
}: NavProps) {
  return (
    <header className="site-nav">
      <div className="shell site-nav__inner">
        <Link to="/" className="brand" aria-label="Forgent AI home">
          <span className="brand__mark" aria-hidden="true">
            F
          </span>
          Forgent AI
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <a href="/#primitives">Primitives</a>
          <a href="/#workflow">Workflow</a>
          <Link to="/studio">Studio</Link>
        </nav>
        <Link className="btn btn--primary" to={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
