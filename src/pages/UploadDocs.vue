<template>
    <div id="app" style="max-width: 800px; margin: 0px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h1>Document Integration POC</h1>
      <DocumentConfiguration />
      <DocumentUpload />
    </div>
  </template>
  
  <script setup>
  import DocumentConfiguration from '../components/Document/DocumentConfiguration.vue'
  import DocumentUpload from '../components/Document/DocumentUpload.vue'

</script>