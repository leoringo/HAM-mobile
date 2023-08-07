'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, {foreignKey: 'productId'})
    }
  }
  Image.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Product cannot be empty'},
        notNull: {msg: 'Product cannot be empty'}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Image Url cannot be empty'},
        notNull: {msg: 'Image Url cannot be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};