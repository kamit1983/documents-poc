<template>
  <div>
    <nav style="max-width: 800px; margin: 10px auto; padding: 5px; border: 1px solid #ccc; border-radius: 8px; text-align: center;">
      <button
        :class="{ active: $route.path === '/docs' }"
        @click="$router.push('/docs')"
      >
        Document Upload
      </button>
      <button
        :class="{ active: $route.path === '/fingerprint' }"
        @click="$router.push('/fingerprint')"
      >
        Fingerprint Auth
      </button>
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
  border: none;
  background-color: #eee;
  cursor: pointer;
}
button.active {
  background-color: #007BFF;
  color: white;
}
</style>

