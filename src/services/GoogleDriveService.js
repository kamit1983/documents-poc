// services/GoogleDriveService.js

export async function checkGDriveAuth() {
    const response = await fetch('http://localhost:3000/api/gdrive/auth/authurl');
    const data = await response.json();
    return data;
  }
  