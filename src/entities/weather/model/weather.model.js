import { openWeatherAPI } from "@/shared/api";
export const NAMESPACE = "weather";
const IS_NAMESPACED = true;
export const module = {
  namespaced: IS_NAMESPACED,
  state: {
    isConfigOn: false,
    isWeatherLoading: false,
    isLoading: false,
    weatherState: {},
    weatherArr: [],
    currentCity: "",
    citiesArr: [],
  },
  getters: {
    weatherArr(state) {
      return state.weatherArr;
    },
    Cities(state) {
      return state.citiesArr;
    },
  },
  mutations: {
    setConfig(state, payload) {
      state.isConfigOn = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setWeather: (state, response) => {
      state.weatherState = response;
      state.weatherArr.push(state.weatherState);
    },
    setCurrentCity: (state, response) => {
      state.currentCity = response.city;
      localStorage.setItem("current_city", JSON.stringify(state.currentCity));
    },
    setAnotherCity: (state, response) => {
      state.citiesArr.push(response.city);
      localStorage.setItem(
        "another_cities",
        JSON.stringify([...state.citiesArr])
      );
    },
    updateWeather(state, payload) {
      state.weatherArr = payload;
    },
    updateCities(state, payload) {
      state.citiesArr = payload.city;
    },
    removeWeather(state, payload) {
      const inx = state.weatherArr.indexOf(payload);
      state.weatherArr.splice(inx, 1);
    },
    removeCity(state, payload) {
      const inx = JSON.parse(localStorage.another_cities).indexOf(payload.city);
      const update_cities = JSON.parse(localStorage.another_cities).splice(
        inx,
        1
      );
      console.log(
        update_cities,
        state.citiesArr,
        JSON.parse(localStorage.another_cities)
      );
      localStorage.setItem("another_cities", JSON.stringify(update_cities));
    },
  },
  actions: {
    getWeatherInitAsync: async ({ commit }, city) => {
      commit("setLoading", true);
      try {
        commit(
          "setWeather",
          await openWeatherAPI.openWeather.fetchCurrentWeather(city)
        );
        commit(
          "setCurrentCity",
          await openWeatherAPI.openWeather.fetchCurrentWeather(city)
        );
      } finally {
        commit("setLoading", false);
      }
    },
    getAnotherWeatherAsync: async ({ commit }, city) => {
      commit("setLoading", true);
      try {
        commit(
          "setWeather",
          await openWeatherAPI.openWeather.fetchCurrentWeather(city)
        );
        commit(
          "setAnotherCity",
          await openWeatherAPI.openWeather.fetchCurrentWeather(city)
        );
      } finally {
        commit("setLoading", false);
      }
    },
    updateElements({ commit }, payload) {
      commit("updateWeather", payload);
      commit("updateCities", payload);
    },
    removeElements({ commit }, payload) {
      commit("removeWeather", payload);
      commit("removeCity", payload);
    },
  },
};
const withPrefix = (name) => (IS_NAMESPACED ? `${NAMESPACE}/${name}` : name);
export const actions = {
  getWeatherInitAsync: withPrefix("getWeatherInitAsync"),
  getAnotherWeatherAsync: withPrefix("getAnotherWeatherAsync"),
  updateElements: withPrefix("updateElements"),
  removeElements: withPrefix("removeElements"),
};
export const mutations = {
  setConfig: withPrefix("setConfig"),
  setLoading: withPrefix("setLoading"),
};
//# sourceMappingURL=weather.model.js.map
