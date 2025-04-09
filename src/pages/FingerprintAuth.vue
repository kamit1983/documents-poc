<template>
    <div id="app">
      <h1>Fingerprint POC</h1>
      <FingerprintRegistration />
      <FingerprintLogin />
    </div>
  </template>
  
  <script setup>
  import FingerprintRegistration from '../components/FingerPrint/FingerprintRegistration.vue';
  import FingerprintLogin from '../components/FingerPrint/FingerprintLogin.vue';
  </script>
