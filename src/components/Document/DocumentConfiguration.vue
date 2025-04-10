<template>
  <div style="max-width: 800px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Admin Portal: Admin Configuration for Providers</h2>

    <!-- Google Drive Section -->
    <section class="provider-section">
      <h3>📁 Google Drive</h3>
      <p><strong>Token Status:</strong> {{ accessToken ? '✅ Generated' : '❌ Not Generated' }}</p>
      <p><strong>Selected Folder:</strong> {{ gdriveFolder.name || 'No folder selected (Files will be uploaded to root)' }}</p>
      <p><strong>Provider Status:</strong> {{ gdriveEnabled ? '🟢 Enabled' : '🔴 Disabled' }}</p>

      <div class="actions">
        <button @click="generateGDriveToken">Generate Token</button>
        <button @click="selectGdriveFolder" :disabled="!accessToken" class="disabled">Select Folder</button>
        <button @click="deleteGDriveConfig" class="secondary">Delete Config</button>
        <button @click="toggleGDriveEnabled" :disabled="!accessToken" class="toggle">
          {{ gdriveEnabled ? 'Disable' : 'Enable' }}
        </button>
      </div>
    </section>

    <!-- SharePoint Section -->
    <!-- <section class="provider-section">
      <h3>📁 SharePoint</h3>
      <p><strong>Token Status:</strong> {{ sharepointTokenGenerated ? '✅ Generated' : '❌ Not Generated' }}</p>
      <p><strong>Selected Folder:</strong> {{ sharepointFolder || 'No folder selected' }}</p>
      <p><strong>Provider Status:</strong> {{ sharepointEnabled ? '🟢 Enabled' : '🔴 Disabled' }}</p>

      <div class="actions">
        <button @click="generateSharepointToken">Generate Token</button>
        <button @click="deleteSharepointConfig" class="secondary">Delete Config</button>
        <button @click="toggleSharepointEnabled" class="toggle">
          {{ sharepointEnabled ? 'Disable' : 'Enable' }}
        </button>
      </div>
    </section> -->
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { checkGDriveAuth, getGDriveProvider, updateGDriveProvider, deleteGDriveProvider } from "@/services/GoogleDriveService";

// GDrive State
const gdriveFolder = ref({})
const gdriveEnabled = ref(false)
const accessToken = ref(null);
const API_KEY = ref(null);
onMounted(async () => {
  try {
    const response = await getGDriveProvider();
    gdriveFolder.value = response.folder || {};
    gdriveEnabled.value = response.enabled; // assuming API returns `enabled`
    accessToken.value = response.tokens?.access_token;
    API_KEY.value = response.API_KEY;
  } catch (error) {
    console.error('Failed to fetch GDrive provider:', error);
  }
});


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
    .setDeveloperKey(API_KEY.value) // from Google Cloud Console
    .setCallback(async (data) => {
      if (data.action === google.picker.Action.PICKED) {
        const response = await updateGDriveProvider({folder: {id: data.docs[0].id, name: data.docs[0].name}})
        gdriveFolder.value = response.folder;
      }
    })
    .build();

  picker.setVisible(true);
};
async function generateGDriveToken() {
  const { authUrl } = await checkGDriveAuth();
  const popup = window.open(authUrl, '_blank', 'width=500,height=600');
  const handleMessage = async (event) => {
    if (event.origin !== "http://localhost:3000") return;
    const { access_token } = event.data;
    if (access_token) {
      console.log("Received token:", access_token);
      accessToken.value = access_token;
      window.removeEventListener('message', handleMessage);
    }
  };
  window.addEventListener('message', handleMessage);
}
async function selectGdriveFolder() {
  await loadPicker();
  showPicker(accessToken.value);
}
async function deleteGDriveConfig() {
  await deleteGDriveProvider();
  gdriveFolder.value = {};
  accessToken.value = null;
  gdriveEnabled.value = false;
}
async function toggleGDriveEnabled() {
  const response = await updateGDriveProvider({enabled: !gdriveEnabled.value});
  gdriveEnabled.value = response.enabled;
}

// SharePoint State
const sharepointTokenGenerated = ref(false)
const sharepointFolder = ref('')
const sharepointEnabled = ref(false)

function generateSharepointToken() {
  sharepointTokenGenerated.value = true
  sharepointFolder.value = 'Sites/SharedDocuments'
}
function deleteSharepointConfig() {
  sharepointTokenGenerated.value = false
  sharepointFolder.value = ''
}
function toggleSharepointEnabled() {
  sharepointEnabled.value = !sharepointEnabled.value
}
</script>

<style scoped>
button {
  margin: 8px 10px 0 0;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
}
button:disabled {
  background-color: #dc3545;
  color: white;
  cursor: not-allowed;
  opacity: 0.7;
}
button.secondary {
  background-color: #dc3545;
  color: white;
}
button.toggle {
  background-color: #6c757d;
  color: white;
}
button:not(.secondary):not(.toggle) {
  background-color: #007BFF;
  color: white;
}
.provider-section {
  margin-top: 30px;
  padding: 15px;
  border-top: 1px solid #ccc;
}
.actions {
  margin-top: 10px;
}
</style>




  