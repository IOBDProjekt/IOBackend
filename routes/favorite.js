const db = require("../db.js");

const express = require("express");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { ID_Zwierzęcia } = req.body;
  const ID_Użytkownika = req.authData.id_user;

  try {
    const [zwierze] = await db.execute(
      "SELECT * FROM Zwierzeta WHERE ID_Zwierzecia = ?",
      [ID_Zwierzęcia]
    );
    if (zwierze.length === 0) {
      return res.status(404).json({ message: "Zwierzę nie istnieje" });
    }

    await db.execute(
      "INSERT INTO favorite (ID_Użytkownika, ID_Zwierzęcia, Data_dodania) VALUES (?, ?, NOW())",
      [ID_Użytkownika, ID_Zwierzęcia]
    );
    res.status(201).json({ message: "Dodano do ulubionych" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Zwierzę jest już w ulubionych" });
    }
    res.status(500).json({ message: "Błąd serwera" });
  }
});

router.get("/", authenticate, async (req, res) => {
  const ID_Użytkownika = req.authData.id_user;

  try {
    const [favorite] = await db.execute(
      `
            SELECT z.*, u.Data_dodania
            FROM Zwierzeta z
            JOIN favorite u ON z.ID_Zwierzecia = u.ID_Zwierzęcia
            WHERE u.ID_Użytkownika = ?
            ORDER BY u.Data_dodania DESC
        `,
      [ID_Użytkownika]
    );
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Błąd pobierania ulubionych" });
  }
});

router.delete("/:ID_Zwierzęcia", authenticate, async (req, res) => {
  const ID_Użytkownika = req.authData.id_user;
  const { ID_Zwierzęcia } = req.params;

  try {
    const [result] = await db.execute(
      "DELETE FROM favorite WHERE ID_Użytkownika = ? AND ID_Zwierzęcia = ?",
      [ID_Użytkownika, ID_Zwierzęcia]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nie znaleziono w ulubionych" });
    }
    res.status(200).json({ message: "Usunięto z ulubionych" });
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera" });
  }
});
module.exports = router;
