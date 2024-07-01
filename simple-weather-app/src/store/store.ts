import { createStore } from 'vuex'

export default createStore({
  state: {
      apiBase: "https://api.openweathermap.org/data/2.5/",
      apiKey: "18b99ab3e00a5fd564234b7fae2c7940",
      defaultSearch: "Delhi",
      search: "",
      isError: false,
      weatherData:<any> {},
  },
  getters: {
    getWeatherMain(state) {
      const {temp, feelsLike, info} = state.weatherData
      return {
        temp,
        feelsLike,
        info,
      };
    },

    getWeatherInfo(state) {
      const {wind, humidity, clouds} = state.weatherData;
      return {
        wind,
        humidity,
        clouds,
      };
    },

    getWeatherCity(state) {
      return state.weatherData;
    },

    isSearched(state) {
      return state.search !== "";
    },

    getError(state) {
      return state.isError;
    },
  },
  mutations: {
    ["SET_SEARCH"](state, search) {
      state.search = search.toLowerCase();
    },

    ["SET_WEATHER_DATA"](state, data) {
      state.weatherData = data;
    },

    ["SET_ERROR"](state, value) {
      state.isError = value;
    },
  },
})
