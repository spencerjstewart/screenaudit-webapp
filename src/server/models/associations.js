module.exports = (db) => {
  const { User, Screenshot, AuditorAuditeeXref } = db;

  User.associate = (models) => {
    User.hasMany(models.Screenshot, {
      foreignKey: "userId",
      as: "screenshots",
      onDelete: "CASCADE",
    });

    // Define an association from AuditorAuditeeXref to User as auditor
    AuditorAuditeeXref.belongsTo(User, {
      as: "auditor",
      foreignKey: "auditorId",
    });
    // Define an association from AuditorAuditeeXref to User as auditee
    AuditorAuditeeXref.belongsTo(User, {
      as: "auditee",
      foreignKey: "auditeeId",
    });

    // If necessary, also define the inverse associations from User to AuditorAuditeeXref
    User.hasMany(AuditorAuditeeXref, {
      as: "audited",
      foreignKey: "auditeeId",
    });
    User.hasMany(AuditorAuditeeXref, { as: "audits", foreignKey: "auditorId" });
  };

  Screenshot.associate = (models) => {
    Screenshot.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };
};