<template>
    <div id="app">
      <h1>Fingerprint POC</h1>
      <FingerprintRegistration />
      <FingerprintLogin />
    </div>
  </template>
  
  <script setup>
  import FingerprintRegistration from '../components/FingerprintRegistration.vue';
  import FingerprintLogin from '../components/FingerprintLogin.vue';
  </script>
