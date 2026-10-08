import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [subscriberId, setSubscriberId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getDeliveries();
    getSubscribers();
  }, []);

  async function getDeliveries() {
    const { data, error } = await supabase
      .from("deliveries")
      .select("*, subscribers(name, email)")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDeliveries(data || []);
  }

  async function getSubscribers() {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setSubscribers(data || []);
  }

  async function addDelivery(e) {
    e.preventDefault();

    if (!subscriberId || !deliveryDate || !address) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("deliveries")
      .insert([
        {
          subscriber_id: Number(subscriberId),
          delivery_date: deliveryDate,
          address,
          status: "Pending"
        }
      ]);

    if (error) {
      console.error(error);
      alert("Failed to add delivery");
      return;
    }

    setSubscriberId("");
    setDeliveryDate("");
    setAddress("");

    getDeliveries();
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("deliveries")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update delivery");
      return;
    }

    getDeliveries();
  }

  return (
    <main className="page">
      <h1>Deliveries</h1>

      <form className="form-card" onSubmit={addDelivery}>
        <label>Subscriber</label>

        <select
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
        >
          <option value="">Select subscriber</option>

          {subscribers.map((subscriber) => (
            <option key={subscriber.id} value={subscriber.id}>
              {subscriber.name}
            </option>
          ))}
        </select>

        <label>Delivery Date</label>

        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />

        <label>Delivery Address</label>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Delivery address"
        />

        <button type="submit">Add Delivery</button>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Date</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.subscribers?.name}</td>
                <td>{delivery.delivery_date}</td>
                <td>{delivery.address}</td>
                <td>
                  <select
                    value={delivery.status}
                    onChange={(e) =>
                      updateStatus(delivery.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Deliveries;