class DashboardUI {
  constructor(relationshipManager) {
    this.relationshipManager = relationshipManager;
    this.bindMethods();
    this.initEventListeners();
  }

  bindMethods() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateRelationshipsList = this.updateRelationshipsList.bind(this);
  }

  initEventListeners() {
    document
      .querySelector(".relationship-form")
      .addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  async initializeUI() {
    const relationships = await this.updateRelationshipsList();
    for (const auditor of relationships.auditors) {
      document.querySelector(".auditors-list").innerHTML += `
        <li>${auditor.name}</li>
      `;
    }
    for (const auditee of relationships.auditees) {
      document.querySelector(".auditees-list").innerHTML += `
        <li>${auditee.name}</li>
      `;
    }
    document.querySelector(".auditees-list");
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const auditeeId = document.getElementById("auditee-selector").value;
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