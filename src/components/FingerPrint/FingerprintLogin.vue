<template>
    <div style="max-width: 400px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h2>Login with Fingerprint</h2>
  
      <input
        v-model="username"
        type="text"
        placeholder="Enter username"
        style="width: 100%; padding: 8px; margin-top: 10px;"
      />
  
      <button
        @click="authenticateFingerprint"
        style="margin-top: 10px; padding: 8px 16px;"
      >
        Login
      </button>
  
      <p v-if="status" style="margin-top: 10px;">{{ status }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { startAuthentication } from "@simplewebauthn/browser";
  import { ref } from 'vue';
  const API_URL = "http://127.0.0.1:3000/api/fingerprint";
  
  const username = ref('');
  const status = ref('');

  
  const authenticateFingerprint = async () => {
    if (!username.value) {
      status.value = 'Please enter a username';
      return;
    }
  
    status.value = 'Requesting authentication options...';
  
    try {
      // Step 1: Get authentication options from backend
      const response = await fetch(`${API_URL}/generate_authentication_options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value }),
      });
  
      const optionsJSON = await response.json();
      if(optionsJSON.error) {
        alert(optionsJSON.error);
        return;
      }
      let asseResp = await startAuthentication({ optionsJSON });
      const verificationResp = await fetch(`${API_URL}/verify_authentication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.value, assertionResponse: asseResp}),
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

    } catch(err){
        console.error(err);
        status.value = 'Error: ' + (err.message || err.toString());
    }
  };
  </script>
  