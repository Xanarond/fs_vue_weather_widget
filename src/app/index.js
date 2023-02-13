import { createApp } from "vue";
import { store } from "./providers";
import App from "./index.vue";
import { vuetify } from "@/shared/ui";
export const app = createApp(App).use(vuetify).use(store);
//# sourceMappingURL=index.js.map
