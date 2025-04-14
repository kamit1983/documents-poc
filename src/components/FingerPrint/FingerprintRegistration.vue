<template>
  <div
    style="
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    "
  >
    <h2>Register Fingerprint</h2>

    <div style="margin-top: 1rem">
      <label>Username:</label>
      <input
        v-model="username"
        type="text"
        placeholder="Enter username"
        style="width: 100%; padding: 8px; margin-top: 4px"
      />
    </div>

    <button
      @click="registerFingerprint"
      style="margin-top: 1rem; padding: 8px 16px; cursor: pointer"
    >
      Register
    </button>

    <p v-if="status" style="margin-top: 1rem">{{ status }}</p>
    <div v-if="!devices" style="margin-top: 2rem">
      <p>Fetching...</p>
    </div>

    <div v-else-if="devices && devices.length" style="margin-top: 2rem">
      <h3>Registered Devices</h3>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 8px">ID</th>
            <th style="border: 1px solid #ccc; padding: 8px">Counter</th>
            <th style="border: 1px solid #ccc; padding: 8px">OS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in devices" :key="index">
            <td style="border: 1px solid #ccc; padding: 8px">
              {{ device.id }}
            </td>
            <td style="border: 1px solid #ccc; padding: 8px">
              {{ device.counter }}
            </td>
            <td style="border: 1px solid #ccc; padding: 8px">
              {{ device.os }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="devices && devices.length === 0"
      style="margin-top: 2rem"
    >
      <p>No devices found.</p>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { startRegistration } from "@simplewebauthn/browser";
import { ref, onMounted } from "vue";

const username = ref("");
const status = ref("");
const devices = ref(null);
const API_URL = "http://127.0.0.1:3000/api/fingerprint";

const getDevices = async () => {
  const response = await fetch(`${API_URL}/get_devices?username=${encodeURIComponent('amit')}`);
  const regs = await response.json();
  devices.value = regs.devices || [];
}

onMounted(getDevices);

const registerFingerprint = async () => {
  status.value = "Starting registration...";

  try {
    // 1. Fetch registration options
    const res = await fetch(`${API_URL}/generate-registration-options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value }),
    });
    const optionsJSON = await res.json();
    // 2. Call WebAuthn API
    const attResp = await startRegistration({ optionsJSON });

    if (!attResp) {
      status.value = "❌ Registration cancelled or failed.";
      return;
    } else {
      const verificationResp = await fetch(`${API_URL}/verify_registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          attestationResponse: attResp,
        }),
      });

      // Wait for the results of verification
      const verificationJSON = await verificationResp.json();
      // Show UI appropriate for the `verified` status
      if (verificationJSON && verificationJSON.verified) {
        status.value = "Success!";
        getDevices()
      } else {
        status.value = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
          verificationJSON
        )}</pre>`;
      }
    }
  } catch (err: any) {
    console.error(err);
    status.value = "⚠️ Error: " + (err.message || err);
  }
};
</script>
  