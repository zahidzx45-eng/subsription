import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [products, setProducts] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [payments, setPayments] = useState(0);
  const [deliveries, setDeliveries] = useState(0);

  useEffect(() => {
    getStats();
  }, []);

  async function getStats() {
    const productsResult = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const subscribersResult = await supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true });

    const paymentsResult = await supabase
      .from("payments")
      .select("*", { count: "exact", head: true });

    const deliveriesResult = await supabase
      .from("deliveries")
      .select("*", { count: "exact", head: true });

    setProducts(productsResult.count || 0);
    setSubscribers(subscribersResult.count || 0);
    setPayments(paymentsResult.count || 0);
    setDeliveries(deliveriesResult.count || 0);
  }

  return (
    <main className="page">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <StatCard title="Products" value={products} />
        <StatCard title="Subscribers" value={subscribers} />
        <StatCard title="Payments" value={payments} />
        <StatCard title="Deliveries" value={deliveries} />
      </div>
    </main>
  );
}

export default Dashboard;