require("../../css/common.css");
require("../../css/dashboard.css");

const RelationshipManager = require("../api/RelationshipManager.js");
const DashboardUI = require("../ui/DashboardUI.js");

document.addEventListener("DOMContentLoaded", async () => {
  const apiBaseUrl = "/api";
  const relationshipManager = new RelationshipManager(apiBaseUrl);
  const dashboardUI = new DashboardUI(relationshipManager);
  await dashboardUI.initializeUI();
});