<template>
  <div>
    <nav style="max-width: 800px; margin: 10px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <button @click="$router.push('/docs')">Document Upload</button>
      <button @click="$router.push('/fingerprint')">Fingerprint Auth</button>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
   margin-bottom: 20px;
 }
button {
  margin-right: 10px;
  padding: 10px;
}
</style>
