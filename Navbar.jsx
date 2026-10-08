import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Subscription Manager</h2>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/subscribers">Subscribers</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/deliveries">Deliveries</Link>
      </div>
    </nav>
  );
}

export default Navbar;