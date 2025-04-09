<template>
  <div>
    <nav>
      <button @click="$router.push('/docs')">Document Upload</button>
      <button @click="$router.push('/fingerprint')">Fingerprint Auth</button>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>./components/Document/DocumentConnect.vue
nav {./components/FingerPrint/FingerprintRegistration.vue
  margin-bottom: 20px;./components/FingerPrint/FingerprintLogin.vue
}
button {
  margin-right: 10px;
  padding: 10px;
}
</style>
