import pool from "../db.js";

export const createCustomer = async (req, res) => {
  try {
    const { full_name, age, contact } = req.body;
    if (!full_name || !age || !contact) {
      return res.status(400).json({ message: "Hammasini to'ldiring" });
    }
    const { rows } = await pool.query(
      "INSERT INTO customers(full_name, age, contact) VALUES($1,$2,$3) RETURNING *",
      [full_name, age, contact]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listCustomers = async (req, res) => {
  try {
    if (req.params.id) {
      const { rows } = await pool.query(
        "SELECT * FROM customers WHERE id = $1",
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Topilmadi" });
      return res.status(200).json(rows[0]);
    }
    const { rows } = await pool.query("SELECT * FROM customers");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
