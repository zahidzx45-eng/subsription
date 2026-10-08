import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [subscriberId, setSubscriberId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    getPayments();
    getSubscribers();
  }, []);

  async function getPayments() {
    const { data, error } = await supabase
      .from("payments")
      .select("*, subscribers(name, email)")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPayments(data || []);
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

  async function addPayment(e) {
    e.preventDefault();

    if (!subscriberId || !amount || !paymentMethod) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("payments")
      .insert([
        {
          subscriber_id: Number(subscriberId),
          amount: Number(amount),
          payment_method: paymentMethod,
          status: "Paid"
        }
      ]);

    if (error) {
      console.error(error);
      alert("Failed to add payment");
      return;
    }

    setSubscriberId("");
    setAmount("");
    setPaymentMethod("");

    getPayments();
  }

  return (
    <main className="page">
      <h1>Payments</h1>

      <form className="form-card" onSubmit={addPayment}>
        <label>Subscriber</label>

        <select
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
        >
          <option value="">Select subscriber</option>

          {subscribers.map((subscriber) => (
            <option key={subscriber.id} value={subscriber.id}>
              {subscriber.name} - {subscriber.email}
            </option>
          ))}
        </select>

        <label>Amount</label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="999"
        />

        <label>Payment Method</label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select method</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <button type="submit">Record Payment</button>
      </form>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.subscribers?.name}</td>
                <td>₹{payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.status}</td>
                <td>
                  {new Date(payment.payment_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Payments;