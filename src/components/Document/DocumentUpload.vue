<template>
  <div style="max-width: 800px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>User App: User will upload the docs</h2>

    <div style="margin-bottom: 20px;">
      <button @click="triggerFileSelect">Upload</button>

      <button
        :disabled="!gdriveProvider.enabled || !gdriveProvider.access_token"
        @click="uploadToGDrive"
      >
        Upload to GDrive
      </button>

      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        style="display: none;"
      />
    </div>

    <div v-if="selectedFileName" style="margin-top: 10px;">
      Selected file: <strong>{{ selectedFileName }} {{ isUploading ? " (uploading...)" : "" }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGDriveProvider } from "@/services/GoogleDriveService";

const gdriveProvider = ref({
  enabled: false,
  access_token: null,
});

const fileInput = ref(null);
const selectedFileName = ref('');
const isUploading = ref(false);

onMounted(async () => {
  try {
    const data = await getGDriveProvider('gdrive');
    gdriveProvider.value = {
      enabled: data.enabled,
      access_token: data.tokens?.access_token,
      config: data.config
    };
  } catch (err) {
    console.error("Failed to load GDrive provider config", err);
  }
});

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFileName.value = file.name;
  }
};

const uploadToGDrive = async () => {
  if (!selectedFileName.value) {
    alert("Please select a file first.");
    return;
  }
  if(isUploading.value) {
    return;
  }
  const file = fileInput.value?.files?.[0];
  const accessToken = gdriveProvider.value.access_token;
  if (!file || !accessToken) return;
  isUploading.value = true;

  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: [gdriveProvider.value.config?.folder?.id]
  };

  const form = new FormData();
  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  form.append('metadata', metadataBlob);
  form.append('file', file);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: form
  });

  const data = await res.json();
  isUploading.value = false;
  if(data.error) {
    alert("Error Uploading to Google drive");
    return;
  }
  alert(data.name + " Uploaded to Google drive");
 if (fileInput.value.value) {
    fileInput.value.value = ''; // Clear the input
    selectedFileName.value = '';
  }
};
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
