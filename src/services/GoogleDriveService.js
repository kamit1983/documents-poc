// services/GoogleDriveService.js

export async function checkGDriveAuth() {
    const response = await fetch('http://localhost:3000/api/gdrive/auth/authurl');
    const data = await response.json();
    return data;
  }

  export async function updateGDriveProvider(obj) {
    const response = await fetch("http://localhost:3000/api/gdrive/provider", {
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
    const response = await fetch("http://localhost:3000/api/gdrive/provider", {
      method: "GET",
    });
  
    const data = await response.json();
    return data;
  }
  export async function deleteGDriveProvider() {
    const response = await fetch("http://localhost:3000/api/gdrive/provider", {
      method: "DELETE",
    });
  
    const data = await response.json();
    return data;
  }
  