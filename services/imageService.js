const pool = require("../db");

async function createImage({ name, encoding, mimetype, size, data }) {
	const query = `
    INSERT INTO images (name, encoding, mimetype, size, data)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id_image;
  `;
	const values = [name, encoding, mimetype, size, data];
	const result = await pool.query(query, values);

	return { id_image: result.rows[0].id_image };
}

async function changeImageData(id_image, { name, encoding, mimetype, size, data }) {
	const query = `
    UPDATE images
    SET name = $1,
        encoding = $2,
        mimetype = $3,
        size = $4,
        data = $5,
        created_at = NOW()
    WHERE id_image = $6;
  `;
	const values = [name, encoding, mimetype, size, data, id_image];
	await pool.query(query, values);
}

async function getImageByID(id_image) {
	const query = `
    SELECT name, mimetype, data
    FROM images
    WHERE id_image = $1;
  `;
	const values = [id_image];
	const result = await pool.query(query, values);

	if (result.rows.length === 0) {
		return null;
	}

	return {
		name: result.rows[0].name,
		mimetype: result.rows[0].mimetype,
		data: result.rows[0].data,
	};
}

module.exports = {
	createImage,
	changeImageData,
	getImageByID,
};
