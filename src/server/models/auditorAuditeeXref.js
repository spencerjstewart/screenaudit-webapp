/** @type {import('sequelize').DataTypes} */
module.exports = (sequelize, DataTypes) => {
  const AuditorAuditeeXref = sequelize.define(
    "AuditorAuditeeXref",
    {
      auditorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      auditeeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "active", "declined"),
        defaultValue: "pending",
      },
    },
    {
      tableName: "auditor_auditee_xref",
      timestamps: true,
    },
  );

  return AuditorAuditeeXref;
};