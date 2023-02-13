import { openWeatherAPI, WeatherModel } from "@/shared/api";

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
    weatherArr(state: any) {
      return state.weatherArr;
    },
    Cities(state: any) {
      return state.citiesArr;
    },
  },
  mutations: {
    setConfig(state: any, payload: boolean) {
      state.isConfigOn = payload;
    },
    setLoading(state: any, payload: boolean) {
      state.isLoading = payload;
    },
    setWeather: (state: any, response: WeatherModel) => {
      state.weatherState = response;
      state.weatherArr.push(state.weatherState);
    },
    setCurrentCity: (state: any, response: WeatherModel) => {
      state.currentCity = response.city;
      localStorage.setItem("current_city", JSON.stringify(state.currentCity));
    },
    setAnotherCity: (state: any, response: WeatherModel) => {
      state.citiesArr.push(response.city);
      localStorage.setItem(
        "another_cities",
        JSON.stringify([...state.citiesArr])
      );
    },
    updateWeather(state: any, payload: WeatherModel) {
      state.weatherArr = payload;
    },
    updateCities(state: any, payload: WeatherModel) {
      state.citiesArr = payload.city;
    },
    removeWeather(state: any, payload: WeatherModel) {
      const inx = state.weatherArr.indexOf(payload);
      state.weatherArr.splice(inx, 1);
    },
    removeCity(state: any, payload: WeatherModel) {
      const inx = JSON.parse(localStorage.another_cities).indexOf(payload.city);
      const update_cities = JSON.parse(localStorage.another_cities).splice(
        inx,
        1
      );

      localStorage.setItem("another_cities", JSON.stringify(update_cities));
    },
  },
  actions: {
    getWeatherInitAsync: async ({ commit }: any, city?: string) => {
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
    getAnotherWeatherAsync: async ({ commit }: any, city?: string) => {
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
    updateElements({ commit }: any, payload: any) {
      commit("updateWeather", payload);
      commit("updateCities", payload);
    },
    removeElements({ commit }: any, payload: WeatherModel) {
      commit("removeWeather", payload);
      commit("removeCity", payload);
    },
  },
};

const withPrefix = (name: string) =>
  IS_NAMESPACED ? `${NAMESPACE}/${name}` : name;

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
