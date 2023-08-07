"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    let data = require("../data/product.json").map((e) => {
      e.updatedAt = e.createdAt = new Date();
      // e.slug = e.name.toLowerCase().split(' ').join('-')
      return e;
    });
    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Products_id_seq" RESTART WITH 1;'
    );
  },
};
