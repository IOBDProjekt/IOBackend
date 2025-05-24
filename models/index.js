const Sequelize = require("sequelize");
const sequelize = require("../database");

const models = {
  AdoptionForm: require("./AdoptionForm"),
  Advice: require("./Advice"),
  Application: require("./Application"),
  Breed: require("./Breed"),
  Favourite: require("./Favourite"),
  Form: require("./Form"),
  Image: require("./Image"),
  Messages: require("./Messages"),
  Notification: require("./Notification"),
  Pet: require("./Pet"),
  Shelter: require("./Shelter"),
  Species: require("./Species"),
  Tag: require("./Tag"),
  User: require("./User"),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};
