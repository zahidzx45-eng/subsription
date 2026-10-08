import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <h1>Subscription Management System</h1>

      <p>
        Manage products, subscribers, payments and deliveries
        from one application.
      </p>

      <Link className="primary-button" to="/dashboard">
        Open Dashboard
      </Link>
    </main>
  );
}

export default Home;