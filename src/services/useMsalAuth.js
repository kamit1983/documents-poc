// composables/useMsalAuth.js
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with real clientId
    authority: "https://login.microsoftonline.com/common", // Or your tenantId
    redirectUri: "http://localhost:3000", // Must match Azure registration
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export function useMsalAuth() {
  const login = async () => {
    try {
      const result = await msalInstance.loginPopup({
        scopes: ["Files.ReadWrite.All", "Sites.ReadWrite.All"],
      });
      return result.accessToken;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  return { login };
}
