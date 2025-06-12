// services/adoptionFormService.js

const { Op } = require("sequelize");
const AdoptionForm = require("../models/AdoptionForm");
const User = require("../models/User");
const Pet = require("../models/Pet");
const Shelter = require("../models/Shelter");

class AdoptionFormService {
  // tworzy nowy wniosek
  static async submitAdoptionForm(formData) {
    const result = await AdoptionForm.create(formData);
    return result.toJSON();
  }

  // pobiera wszystkie wnioski dla moderatora schroniska
  static async getAllByUserID(userID) {
    const result = await AdoptionForm.findAll({
      include: [
        {
          model: Pet,
          as: "pet",
          required: true,
          include: [
            {
              model: Shelter,
              as: "shelter",
              required: true,
              include: [
                {
                  model: User,
                  as: "user",
                  where: {
                    id_user: userID,
                    role: "shelter",
                  },
                  required: true,
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "adopter",
        },
      ],
    });
    return result;
  }

  // usuwa wniosek (odrzucanie)
  static async deleteById(id) {
    const form = await AdoptionForm.findByPk(id);
    if (!form) return 0;
    await form.destroy();
    return 1;
  }

  // zmiana statusu wniosku (np. na "Zaakceptowany")
  static async updateStatus(id, status) {
    const form = await AdoptionForm.findByPk(id);
    if (!form) return 0;
    form.status = status;
    await form.save();
    return 1;
  }

  // oznaczenie zwierzaka jako oddanego
  static async markPetAsAdopted(petId) {
    const pet = await Pet.findByPk(petId);
    if (!pet) return 0;
    pet.status = "Oddany";
    await pet.save();
    return 1;
  }
}

module.exports = AdoptionFormService;
