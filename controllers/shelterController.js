const db = require("../db.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
	const shelter = {
		username: req.body.username,
		password: req.body.password,
	};

	try {
		const [result] = await db.execute(
			`   
            SELECT 
                *
            FROM 
                shelters s 
            WHERE 
                s.username = ?;
            `,
			[shelter.username],
		);

		if (result.length <= 0)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Shelter does not exist" });

		const shelterResult = result[0];
		const authResult = await bcrypt.compare(
			shelter.password,
			shelterResult.password,
		);

		if (!authResult)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid password" });

		shelterResult.role = "shelter";
		const token = jwt.sign(shelterResult, process.env.SECRET_TOKEN, {
			expiresIn: "1h",
		});

		// generate test token
		// const token = jwt.sign(shelterResult, process.env.SECRET_TOKEN);

		return res.json({
			message: "Successful login",
			token,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const info = (req, res) => {
	res.json(req.authData);
};

const listing = async (req, res) => {
	const {
		name,
		speciesID,
		breedID,
		age,
		sex,
		condition,
		status,
		shelterID,
		imageID,
		tagID,
	} = req.body;

	try {
		const [result] = await db.execute(
			`   
            INSERT INTO
                pets
            (name,id_species,id_breed,age,sex,condition, status,id_shelter, id_image, id_tag) VALUES 
                (?,?,?,?,?,?,?,?,?,?);
            `,
			[
				name,
				speciesID,
				breedID,
				age,
				sex,
				condition,
				status,
				shelterID,
				imageID,
				tagID,
			],
		);

		return res.json(result);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const listings = async (req, res) => {
	try {
		const [result] = await db.execute(
			`
            SELECT name,species.species,breed,age,sex, status,id_shelter, id_image, tags.character
            FROM pets 
            LEFT JOIN species on species.id_species = pets.id_species
            LEFT JOIN breeds on breeds.id_breed = pets.id_breed
            LEFT JOIN tags on tags.id_tag = pets.id_tag
            `,
		);

		return res.json(result);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};
const breeds = async (res) => {
	try {
		const [result] = await db.execute(
			`
            SELECT breed, species
            FROM breeds
            RIGHT JOIN species ON species.id_species = breeds.id_species
            `,
		);

		return res.json(result);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const species = async (res) => {
	try {
		const [result] = await db.execute(
			`
            SELECT species FROM species
            `,
		);

		return res.json(result);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
};

module.exports = {
	login,
	info,
	listing,
	listings,
	breeds,
	species,
};
