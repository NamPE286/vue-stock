import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Tooltip from 'primevue/tooltip';
import { router } from "@/router"
import "./style.css";

const app = createApp(App);

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});

app.directive('tooltip', Tooltip);

app.mount("#app");
