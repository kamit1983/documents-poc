<template>
    <div>
      <button @click="handleSharePointAuth">
        {{ accessToken ? "Authenticated" : "Connect to SharePoint" }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {useMsalAuth} from "../../services/useMsalAuth" ;
  
  const accessToken = ref(null);
  const { login } = useMsalAuth();
  
  const handleSharePointAuth = async () => {
    accessToken.value = await login();
    if (accessToken.value) {
      console.log("✅ Got SharePoint Access Token:", accessToken.value);
    }
  };
  </script>
  