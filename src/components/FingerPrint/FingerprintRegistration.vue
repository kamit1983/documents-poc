<template>
    <div style="max-width: 400px; margin: 2rem auto; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
      <h2>Register Fingerprint</h2>
  
      <div style="margin-top: 1rem;">
        <label>Username:</label>
        <input
          v-model="username"
          type="text"
          placeholder="Enter username"
          style="width: 100%; padding: 8px; margin-top: 4px;"
        />
      </div>
  
      <button
        @click="registerFingerprint"
        style="margin-top: 1rem; padding: 8px 16px; cursor: pointer;"
      >
        Register
      </button>
  
      <p v-if="status" style="margin-top: 1rem;">{{ status }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import {startRegistration } from '@simplewebauthn/browser';
  import { ref } from 'vue';
  
  const username = ref('');
  const status = ref('');
  const API_URL = "http://127.0.0.1:8000/api/fingerprint";
  
  const registerFingerprint = async () => {
    status.value = 'Starting registration...';
  
    try {
      // 1. Fetch registration options
      const res = await fetch(`${API_URL}/generate-registration-options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value }),
      });
      const optionsJSON = await res.json();
      // 2. Call WebAuthn API
      const attResp = await startRegistration({ optionsJSON });
  
      if (!attResp) {
        status.value = '❌ Registration cancelled or failed.';
        return;
      } else {
        const verificationResp = await fetch(`${API_URL}/verify_registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username.value, attestationResponse:attResp}),
        });

        // Wait for the results of verification
        const verificationJSON = await verificationResp.json();
        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON.verified) {
            status.value = 'Success!';
        } else {
            status.value = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
            verificationJSON,
        )}</pre>`;
        }
      }
  
    } catch (err: any) {
      console.error(err);
      status.value = '⚠️ Error: ' + (err.message || err);
    }
}

  </script>
  