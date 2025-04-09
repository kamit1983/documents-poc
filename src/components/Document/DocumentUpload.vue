<template>
  <div style="max-width: 800px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>User App: User will upload the docs</h2>
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
  