const express = require("express");
const router = express.Router();
const { AuditorAuditeeXref, User } = require("../models");
const authenticateToken = require("../middleware/jwtAuth");
const { Op } = require("sequelize");

router.post("/api/relationships", authenticateToken, async (req, res) => {
  const { auditeeId } = req.body;
  const auditorId = req.user.id;

  try {
    const relationship = await AuditorAuditeeXref.create({
      auditorId,
      auditeeId,
      status: "pending",
    });
    return res.status(201).json(relationship);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/api/relationships", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const relationships = await AuditorAuditeeXref.findAll({
      where: {
        [Op.or]: [{ auditorId: userId }, { auditeeId: userId }],
      },
      include: [
        { model: User, as: "auditor" },
        {
          model: User,
          as: "auditee",
        },
      ],
    });

    const relationshipData = relationships.map((relationship) => {
      return relationship.get({ plain: true });
    });

    return res.json(transformRelationships(relationshipData, userId));
  } catch (error) {
    return res.status(400).json({ error: error.message, cause: error.cause });
  }
});

function transformRelationships(relationships, currentUserId) {
  let auditors = [];
  let auditees = [];

  relationships.forEach((relationship) => {
    const { auditor, auditee } = relationship;

    // Remove passwords from the relationship objects
    delete auditor.password;
    delete auditee.password;

    // Determine if the current user is the auditor or the auditee and categorize accordingly
    if (auditor.id === currentUserId) {
      auditees.push({
        ...auditee,
        status: relationship.status,
        createdAt: relationship.createdAt,
        updatedAt: relationship.updatedAt,
      });
    } else if (auditee.id === currentUserId) {
      auditors.push({
        ...auditor,
        status: relationship.status,
        createdAt: relationship.createdAt,
        updatedAt: relationship.updatedAt,
      });
    }
  });

  return { auditors, auditees };
}

router.put(
  "/api/relationships/accept/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const relationship = await AuditorAuditeeXref.findOne({
        where: { id, auditeeId: userId },
      });

      if (!relationship)
        return res.status(404).json({ message: "Relationship not found." });

      relationship.status = "active";
      await relationship.save();

      return res.json(relationship);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

router.put(
  "/api/relationships/decline/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const relationship = await AuditorAuditeeXref.findOne({
        where: { id, auditeeId: userId },
      });

      if (!relationship)
        return res.status(404).json({ message: "Relationship not found." });

      relationship.status = "declined";
      await relationship.save();

      return res.json(relationship);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

module.exports = router;