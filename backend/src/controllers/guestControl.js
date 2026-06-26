import pool from "../config/db.js";


//Create a new guest

export const createGuest = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, classification_id } = req.body;

    const result = await pool.query(
      `INSERT INTO guests (event_id, name, classification_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [eventId, name, classification_id]
    );

    res.status(201).json({
      message: "Guest added successfully",
      guest: result.rows[0],
    });
  } catch (err) {
    console.error("Error creating guest:", err);
    res.status(500).json({ error: "Failed to create guest" });
  }
};

// Get all guests for an event

export const getGuests = async (req, res) => {
  try {
    const { eventId } = req.params;

    const result = await pool.query(
      `SELECT g.*, c.name AS classification_name
       FROM guests g
       LEFT JOIN classifications c ON g.classification_id = c.id
       WHERE g.event_id = $1
       ORDER BY c.name, g.name ASC`,
      [eventId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching guests:", err);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
};

// Update guest classification
 
export const updateGuestClassification = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { classification_id } = req.body;

    const result = await pool.query(
      `UPDATE guests
       SET classification_id = $1
       WHERE id = $2
       RETURNING *`,
      [classification_id, guestId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Guest not found" });
    }

    res.json({
      message: "Guest classification updated",
      guest: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating classification:", err);
    res.status(500).json({ error: "Failed to update classification" });
  }
};

// Update RSVP status

export const updateGuestRSVP = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { rsvp_status, notes } = req.body;

    const result = await pool.query(
      `UPDATE guests
       SET rsvp_status = $1, notes = $2
       WHERE id = $3
       RETURNING *`,
      [rsvp_status, notes || null, guestId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Guest not found" });
    }

    res.json({
      message: "RSVP updated",
      guest: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating RSVP:", err);
    res.status(500).json({ error: "Failed to update RSVP" });
  }
};

// Delete a guest

export const deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    await pool.query(`DELETE FROM guests WHERE id = $1`, [guestId]);

    res.json({ message: "Guest deleted successfully" });
  } catch (err) {
    console.error("Error deleting guest:", err);
    res.status(500).json({ error: "Failed to delete guest" });
  }
};

// Create a custom classification
export const createClassification = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      `INSERT INTO classifications (event_id, name)
       VALUES ($1, $2)
       RETURNING *`,
      [eventId, name]
    );

    res.status(201).json({
      message: "Classification created",
      classification: result.rows[0],
    });
  } catch (err) {
    console.error("Error creating classification:", err);
    res.status(500).json({ error: "Failed to create classification" });
  }
};

// Get all classifications for an event

export const getClassifications = async (req, res) => {
  try {
    const { eventId } = req.params;

    const result = await pool.query(
      `SELECT * FROM classifications
       WHERE event_id = $1
       ORDER BY name ASC`,
      [eventId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching classifications:", err);
    res.status(500).json({ error: "Failed to fetch classifications" });
  }
};

// Delete a classification
export const deleteClassification = async (req, res) => {
  try {
    const { classificationId } = req.params;

    await pool.query(
      `DELETE FROM classifications WHERE id = $1`,
      [classificationId]
    );

    res.json({ message: "Classification deleted" });
  } catch (err) {
    console.error("Error deleting classification:", err);
    res.status(500).json({ error: "Failed to delete classification" });
  }
};
   cvxbvcxvxvxxbdcvnvnvnvnvn 