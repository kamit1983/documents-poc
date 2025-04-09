<template>
    <div>
      <button @click="handleUploadClick">
        {{ isUploading ? "Uploading..." : "Upload to Google Drive" }}
      </button>
      <input style="display: none" v-if="accessToken" type="file" @change="handleFileChange" ref="fileInput" />
    </div>
  </template>
  
  <script setup>
import { checkGDriveAuth } from "@/services/GoogleDriveService";
import { ref } from 'vue';

const accessToken = ref(null);
const folderId = ref(null);
const fileInput = ref(null);
const isUploading = ref(false);

const handleUploadClick = async () => {
  if(isUploading.value) {
    return;
  }
  if(accessToken.value) {
    await loadPicker();
    showPicker(accessToken.value);
    return;
  }
  const { authUrl } = await checkGDriveAuth();

  const popup = window.open(authUrl, '_blank', 'width=500,height=600');

  const handleMessage = async (event) => {
    if (event.origin !== "http://localhost:3000") return;
    const { access_token } = event.data;
    if (access_token) {
      console.log("Received token:", access_token);
      accessToken.value = access_token;
      window.removeEventListener('message', handleMessage);
      await loadPicker();
      showPicker(access_token);
    }
  };

  window.addEventListener('message', handleMessage);
};

const handleFileChange = async (event) => {
  isUploading.value = true;
  const file = event.target.files[0];
  if (!file || !accessToken.value) return;

  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: [folderId.value]
  };

  const form = new FormData();
  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  form.append('metadata', metadataBlob);
  form.append('file', file);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    },
    body: form
  });

  const data = await res.json();
  isUploading.value = false;
  alert(data.name + " Uploaded to Google drive");
  console.log('Upload result:', data);
  if (fileInput.value) {
    fileInput.value.value = ''; // Clear the input
  }
};
const loadPicker = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => gapi.load("picker", resolve);
    document.body.appendChild(script);
  });
};
const showPicker = (accessToken) => {
  const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
    .setIncludeFolders(true)
    .setSelectFolderEnabled(true);

  const picker = new google.picker.PickerBuilder()
    .addView(view)
    .setOAuthToken(accessToken)
    .setDeveloperKey("AIzaSyCcaDEDiCBmKiT9CG1x2ZMGlVPldBErxtg") // from Google Cloud Console
    .setCallback((data) => {
      if (data.action === google.picker.Action.PICKED) {
        folderId.value = data.docs[0].id;
        console.log("Selected Folder ID:", folderId);
        // Store or use the folderId for upload
        fileInput.value.click();
      }
    })
    .build();

  picker.setVisible(true);
};


</script>
