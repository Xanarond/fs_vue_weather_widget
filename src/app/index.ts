import { createApp } from "vue";
import { store } from "./providers";
import App from "./index.vue";
import { vuetify } from "@/shared/ui";

export const app = createApp(App).use(store).use(vuetify);
