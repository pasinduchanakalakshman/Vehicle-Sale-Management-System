import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-card text-center space-y-4">
      <h1 className="section-title">Page not found</h1>
      <Link
        to="/"
        className="btn-link"
      >
        Go to vehicles
      </Link>
    </section>
  );
}
