import { createStore } from "vuex";
import { weatherModel } from "@/entities/weather";
export const store = createStore({
  modules: {
    [weatherModel.NAMESPACE]: weatherModel.module,
  },
});
