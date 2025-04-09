<template>
    <div>
      <h2>Connect to a Document Service</h2>
      <UploadToGDriveVue />
      <UploadToSharepointVue />
    </div>
  </template>
  
  <script setup>
  import UploadToGDriveVue from "./UploadToGDrive.vue"
  import UploadToSharepointVue from "./UploadToSharepoint.vue";
  const connect = (provider) => {
    alert(`Simulating connection to ${provider}`)
  }
  </script>
  
  <style scoped>
  button {
    margin-right: 10px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
  }
  </style>
  