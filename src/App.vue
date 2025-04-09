<template>
  <div>
    <nav>
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
