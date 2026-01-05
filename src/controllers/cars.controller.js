import pool from "../db.js";

export const createCar = async (req, res) => {
  try {
    const { name, year, price, color } = req.body;
    if (!name || !year || !price || !color) {
      return res.status(400).json({ message: "Hammasini to'ldiring" });
    }
    const { rows } = await pool.query(
      "INSERT INTO cars(name, year, price, color) VALUES($1,$2,$3,$4) RETURNING *",
      [name, year, price, color]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listCars = async (req, res) => {
  try {
    if (req.params.id) {
      const { rows } = await pool.query(
        "SELECT * FROM cars WHERE id = $1",
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Topilmadi" });
      return res.status(200).json(rows[0]);
    }
    const { rows } = await pool.query("SELECT * FROM cars");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
