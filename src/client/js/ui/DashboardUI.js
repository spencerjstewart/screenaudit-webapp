const logo = require("../../assets/screen-audit-high-resolution-logo-black-transparent.png");

class DashboardUI {
  constructor(relationshipManager) {
    this.relationshipManager = relationshipManager;
    this.bindMethods();
    this.initEventListeners();
  }

  bindMethods() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateRelationshipsList = this.updateRelationshipsList.bind(this);
    this.loadImages = this.loadImages.bind(this);
  }

  initEventListeners() {
    document
      .querySelector(".relationship_management__form")
      .addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  async initializeUI() {
    const relationships = await this.updateRelationshipsList();
    for (const auditor of relationships.auditors) {
      document.querySelector(".auditors__list").innerHTML += `
        <li class="list-group-item">${auditor.name}</li>
      `;
    }
    for (const auditee of relationships.auditees) {
      document.querySelector(".auditees__list").innerHTML += `
        <li class="list-group-item">${auditee.name}</li>
      `;
    }
    this.loadImages();
  }

  loadImages() {
    const sideBarLogoEl = document.querySelector("img.sidebar__logo");
    sideBarLogoEl.src = logo;
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const auditeeId = document.getElementById(
      "relationship-management-form-user-search",
    ).value;
    await this.relationshipManager.sendRequest(auditeeId);
    await this.updateRelationshipsList();
  }

  async updateRelationshipsList() {
    return await this.relationshipManager.fetchAllRelationships();
  }

  updateAuditeesList(auditees) {
    const auditeeSelector = document.getElementById("auditee-selector");
    auditeeSelector.innerHTML = "";
    auditees.forEach((auditee) => {
      const option = document.createElement("option");
      option.value = auditee.id;
      option.textContent = auditee.name;
      auditeeSelector.appendChild(option);
    });
  }

  updateAuditorsList(auditors) {
    const auditorSelector = document.getElementById("auditor-selector");
    auditorSelector.innerHTML = "";
    auditors.forEach((auditor) => {
      const option = document.createElement("option");
      option.value = auditor.id;
      option.textContent = auditor.name;
      auditorSelector.appendChild(option);
    });
  }
}

module.exports = DashboardUI;