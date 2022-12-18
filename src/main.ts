import { createApp } from 'vue';
import { createPinia } from 'pinia';

import WrapApp from './WrapApp.vue';
import router from './router';
import '@/index.css';

createApp(WrapApp).use(createPinia()).use(router).mount('#app');
