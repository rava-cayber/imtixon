import pool from "../db.js";

export const createPayment = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    if (!order_id || !amount) {
      return res.status(400).json({ message: "Hammasini to'ldiring" });
    }
    // order_id orqali car price ni topamiz
    const orderResult = await pool.query(
      `SELECT car.price FROM orders JOIN cars car ON orders.car_id = car.id WHERE orders.id = $1`,
      [order_id]
    );
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order topilmadi" });
    }
    const carPrice = orderResult.rows[0].price;
    const minPayment = carPrice * 0.2;
    if (amount < minPayment) {
      return res.status(400).json({ message: `Boshlang'ich to'lov kamida ${minPayment} bo'lishi kerak` });
    }
    const { rows } = await pool.query(
      "INSERT INTO payments(order_id, amount, created_at) VALUES($1,$2,CURRENT_DATE) RETURNING *",
      [order_id, amount]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listPayments = async (req, res) => {
  try {
    if (req.params.id) {
      const { rows } = await pool.query(
        "SELECT * FROM payments WHERE id = $1",
        [req.params.id]
      );
      if (rows.length === 0)
        return res.status(404).json({ message: "Topilmadi" });
      return res.status(200).json(rows[0]);
    }
    const { rows } = await pool.query("SELECT * FROM payments");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
