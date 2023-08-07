"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.hasMany(models.Image, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
          notNull: { msg: "Name cannot be empty" },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
          notNull: { msg: "Description cannot be empty" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price cannot be empty" },
          notNull: { msg: "Price cannot be empty" },
          min: {
            args: 5,
            msg: "Minimum Price is 5!",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image cannot be empty" },
          notNull: { msg: "Image cannot be empty" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Category cannot be empty" },
          notNull: { msg: "Category cannot be empty" },
        },
      },
      mongoUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Mongo User Id cannot be empty" },
          notNull: { msg: "Mongo User Id cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate: (i) => {
          i.slug = i.name.toLowerCase().split(" ").join("-");
        },
        beforeBulkUpdate: (i) => {
          i.attributes.slug = i.attributes.name
            .toLowerCase()
            .split(" ")
            .join("-");
          i.fields.push("slug");
        },
      },
    }
  );
  return Product;
};
