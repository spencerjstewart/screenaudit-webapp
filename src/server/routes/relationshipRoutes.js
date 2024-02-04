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
    return res.json(relationships);
  } catch (error) {
    return res.status(400).json({ error: error.message, cause: error.cause });
  }
});

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