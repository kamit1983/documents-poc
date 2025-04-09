import { createRouter, createWebHistory } from 'vue-router';

import FingerprintAuth from '@/pages/FingerprintAuth.vue';
import UploadDocs from '@/pages/UploadDocs.vue';

const routes = [
  { path: '/', redirect: '/docs' },
  { path: '/docs', component: UploadDocs },
  { path: '/fingerprint', component: FingerprintAuth }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

