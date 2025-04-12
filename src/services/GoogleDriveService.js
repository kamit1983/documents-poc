// services/GoogleDriveService.js
const API_BASE_URL = "http://localhost:3000/api/gdrive"
export async function checkGDriveAuth() {
    const response = await fetch(`${API_BASE_URL}/auth/authurl`);
    const data = await response.json();
    return data;
  }

  export async function updateGDriveProvider(obj) {
    const response = await fetch(`${API_BASE_URL}/provider`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  
    const data = await response.json();
    return data;
  }
  export async function getGDriveProvider() {
    const response = await fetch(`${API_BASE_URL}/provider`, {
      method: "GET",
    });
  
    const data = await response.json();
    return data;
  }
  export async function deleteGDriveProvider() {
    const response = await fetch(`${API_BASE_URL}/provider`, {
      method: "DELETE",
    });
  
    const data = await response.json();
    return data;
  }
  