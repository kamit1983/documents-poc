// services/GoogleDriveService.js
const API_BASE_URL = "http://localhost:3000/api/gdrive"
export async function checkGDriveAuth(provider) {
    const response = await fetch(`${API_BASE_URL}/auth/authurl?provider=${provider}`);
    const data = await response.json();
    return data;
  }

  export async function updateGDriveProvider(obj, provider) {
    const response = await fetch(`${API_BASE_URL}/provider?provider=${provider}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  
    const data = await response.json();
    return data;
  }
  export async function getGDriveProvider(provider) {
    const response = await fetch(`${API_BASE_URL}/provider?provider=${provider}`, {
      method: "GET",
    });
  
    const data = await response.json();
    return data;
  }
  export async function deleteGDriveProvider(provider) {
    const response = await fetch(`${API_BASE_URL}/provider?provider=${provider}`, {
      method: "DELETE",
    });
  
    const data = await response.json();
    return data;
  }
  