import { useState } from "react";

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: "",
    event_date: "",
    event_time: "",
    guest_count: "",
    table_count: "",
    table_shape: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="success-screen">
        <h2>🎉 Event Successfully Created!</h2>
        <p>Your event has been saved.</p>
        <p><strong>Tables Registered:</strong> {form.table_count}</p>
        <p><strong>Table Shape:</strong> {form.table_shape}</p>

        <button
          onClick={() => {
            setSuccess(false);
            setForm({
              name: "",
              event_date: "",
              event_time: "",
              guest_count: "",
              table_count: "",
              table_shape: ""
            });
          }}
        >
          Create Another Event
        </button>
      </div>
    );
  }

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="event_date"
          value={form.event_date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="event_time"
          value={form.event_time}
          onChange={handleChange}
        />

        <input
          type="number"
          name="guest_count"
          placeholder="Number of Guests"
          value={form.guest_count}
          onChange={handleChange}
        />

        <input
          type="number"
          name="table_count"
          placeholder="Number of Tables"
          value={form.table_count}
          onChange={handleChange}
        />

        <select
          name="table_shape"
          value={form.table_shape}
          onChange={handleChange}
        >
          <option value="">Select Table Shape</option>
          <option value="round">Round</option>
          <option value="square">Square</option>
          <option value="rectangle">Rectangle</option>
        </select>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
