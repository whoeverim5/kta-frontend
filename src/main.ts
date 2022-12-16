import { createApp } from 'vue';

import WrapApp from './WrapApp.vue';
import router from './router';
import '@/index.css';

createApp(WrapApp).use(router).mount('#app');
