<template>
    <div id="app" style="max-width: 800px; margin: 0px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h1>Fingerprint POC</h1>
      <FingerprintRegistration />
      <FingerprintLogin />
    </div>
  </template>
  
  <script setup>
  import FingerprintRegistration from '../components/FingerPrint/FingerprintRegistration.vue';
  import FingerprintLogin from '../components/FingerPrint/FingerprintLogin.vue';
  </script>
