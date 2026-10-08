import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    getSubscribers();
    getProducts();
  }, []);

  async function getSubscribers() {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*, products(name)")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setSubscribers(data || []);
  }

  async function getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  async function addSubscriber(e) {
    e.preventDefault();

    if (!name || !email || !productId) {
      alert("Please fill all required fields");
      return;
    }

    const { error } = await supabase
      .from("subscribers")
      .insert([
        {
          name,
          email,
          phone,
          product_id: Number(productId),
          status: "Active"
        }
      ]);

    if (error) {
      console.error(error);
      alert("Failed to add subscriber");
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setProductId("");

    getSubscribers();
  }

  async function deleteSubscriber(id) {
    if (!window.confirm("Delete this subscriber?")) return;

    const { error } = await supabase
      .from("subscribers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete subscriber");
      return;
    }

    getSubscribers();
  }

  return (
    <main className="page">
      <h1>Subscribers</h1>

      <form className="form-card" onSubmit={addSubscriber}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="customer@email.com"
        />

        <label>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />

        <label>Subscription Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Subscriber</button>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>{subscriber.name}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.phone}</td>
                <td>{subscriber.products?.name}</td>
                <td>{subscriber.status}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteSubscriber(subscriber.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Subscribers;