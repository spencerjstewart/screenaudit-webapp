class RelationshipManager {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async fetchAllRelationships() {
    const response = await fetch(`${this.apiBaseUrl}/relationships`, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  }

  async sendRequest(auditeeId) {
    // Matches POST /api/relationships
    const response = await fetch(`${this.apiBaseUrl}/relationships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ auditeeId }),
    });
    return await response.json();
  }

  async acceptRequest(requestId) {
    // Matches PUT /api/relationships/accept/:id
    const response = await fetch(
      `${this.apiBaseUrl}/relationships/accept/${requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        JSON: JSON.stringify({ requestId }),
      },
    );
    return await response.json();
  }

  async declineRequest(requestId) {
    // Matches PUT /api/relationships/decline/:id
    const response = await fetch(
      `${this.apiBaseUrl}/relationships/decline/${requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        JSON: JSON.stringify({ requestId }),
      },
    );
    return await response.json();
  }
}

module.exports = RelationshipManager;