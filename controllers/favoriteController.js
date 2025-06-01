// controllers/favoriteController.js
const db = require("../db.js");
const { StatusCodes } = require("http-status-codes");

// Funkcja pomocnicza do upewnienia się, że authData jest dostępne
// Teraz, gdy authenticate middleware jest poprawione,
// ta funkcja jest w zasadzie sprawdzeniem, czy authorizeRole("user") zadziałało.
const ensureAuthData = (req, res) => {
  // Sprawdzamy, czy authData istnieje i czy ma id_user (i opcjonalnie rolę "user", choć to już robi authorizeRole)
  if (!req.authData || !req.authData.id_user) {
    // W zasadzie, jeśli authorizeRole zadziałało, ta linia nie powinna być osiągnięta
    return res.status(StatusCodes.FORBIDDEN).json({
      // Zmienione na FORBIDDEN, bo to już po uwierzytelnieniu
      message: "Authentication data missing or insufficient permissions.",
    });
  }
  return null; // Brak błędu
};

// Dodawanie zwierzęcia do ulubionych
const addFavorite = async (req, res) => {
  const authError = ensureAuthData(req, res);
  if (authError) return authError;

  const userId = req.authData.id_user; // TERAZ JEST POPRAWNE! id_user pochodzi z tokena użytkownika
  const { petId } = req.body;

  if (!petId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Pet ID is required." });
  }

  try {
    const [petCheck] = await db.execute(
      `SELECT id_pet FROM pets WHERE id_pet = ?`,
      [petId]
    );

    if (petCheck.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Pet not found." });
    }

    const [existingFavorite] = await db.execute(
      `SELECT id_favourite FROM favorites WHERE id_user = ? AND id_pet = ?`,
      [userId, petId]
    );

    if (existingFavorite.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Pet is already in favorites." });
    }

    const [result] = await db.execute(
      `INSERT INTO favorites (id_user, id_pet, addedAt) VALUES (?, ?, NOW())`,
      [userId, petId]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Pet added to favorites successfully.",
      favoriteId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error.", error: error.message });
  }
};

// Usuwanie zwierzęcia z ulubionych
const removeFavorite = async (req, res) => {
  const authError = ensureAuthData(req, res);
  if (authError) return authError;

  const userId = req.authData.id_user; // POPRAWNE
  const { petId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM favorites WHERE id_user = ? AND id_pet = ?`,
      [userId, petId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Favorite not found or not authorized to delete." });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Pet removed from favorites successfully." });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error.", error: error.message });
  }
};

// Pobieranie ulubionych zwierząt dla danego użytkownika
const getFavorites = async (req, res) => {
  const authError = ensureAuthData(req, res);
  if (authError) return authError;

  const userId = req.authData.id_user; // POPRAWNE

  try {
    const [favorites] = await db.execute(
      `
            SELECT 
                f.id_favourite, 
                f.id_pet, 
                f.addedAt,
                p.name AS petName, 
                p.age AS petAge,   
                s.name AS shelterName, 
                spec.species AS speciesName, 
                b.breed AS breedName, 
                i.path AS imagePath 
            FROM 
                favorites f
            JOIN 
                pets p ON f.id_pet = p.id_pet 
            LEFT JOIN
                shelters s ON p.id_shelter = s.id_shelter 
            LEFT JOIN
                species spec ON p.id_species = spec.id_species 
            LEFT JOIN
                breeds b ON p.id_breed = b.id_breed 
            LEFT JOIN
                images i ON p.id_image = i.id_image 
            WHERE 
                f.id_user = ?
            `,
      [userId]
    );

    return res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error.", error: error.message });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
