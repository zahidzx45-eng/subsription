import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  async function addProduct(e) {
    e.preventDefault();

    if (!name || !price || !duration) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price: Number(price),
          duration
        }
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to add product");
      return;
    }

    setName("");
    setDescription("");
    setPrice("");
    setDuration("");

    getProducts();
  }

  async function deleteProduct(id) {
    if (!window.confirm("Delete this product?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete product");
      return;
    }

    getProducts();
  }

  return (
    <main className="page">
      <h1>Products</h1>

      <form className="form-card" onSubmit={addProduct}>
        <label>Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Monthly Milk Subscription"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="999"
        />

        <label>Duration</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="">Select duration</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <button type="submit">
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <div className="card-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>₹{product.price}</h3>
            <p>{product.duration}</p>

            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;