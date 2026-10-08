import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Subscribers from "./pages/Subscribers";
import Payments from "./pages/Payments";
import Deliveries from "./pages/Deliveries";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/subscribers" element={<Subscribers />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/deliveries" element={<Deliveries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;