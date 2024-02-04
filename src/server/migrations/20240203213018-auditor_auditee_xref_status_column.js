"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("auditor_auditee_xref", "status", {
      type: Sequelize.ENUM("active", "pending", "declined"),
      defaultValue: "pending",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("auditor_auditee_xref", "status");
  },
};