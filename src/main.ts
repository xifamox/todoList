import { createApp } from 'vue';
import App from './app/App.vue';
import { registerPlugins } from './app/plugins';

import './app/styles/index.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
