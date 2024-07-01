<template>
  <div id="app" class="app">
    <transition name="fade" mode="out-in" appear>
      <q-card class="card">
        <SearchWeather/>
      </q-card>
    </transition>
    <WeatherAnimate />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchWeather from '@/components/SearchWeather.vue';
import WeatherAnimate from '@/components/WeatherAnimate.vue'
import {useStore} from "vuex";
import axios from "axios"

export default {
  name: 'HomeView',
  components: {
    SearchWeather,
    WeatherAnimate,
  },
  setup() {
     const store = useStore();
     const search = store.state.defaultSearch;
     async function initData(search) {
       try {
        store.commit("SET_SEARCH",store.state.defaultSearch);
        const response = await axios.get(
          `${store.state.apiBase}weather?q=${search}&units=metric&APPID=${store.state.apiKey}`
        )
        const newWeatherData = {
          name: response.data.name,
          temp: response.data.main.temp,
          feelsLike: response.data.main.feels_like,
          info: response.data.weather[0].main,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          clouds: response.data.clouds.all,
        };
        store.commit("SET_WEATHER_DATA", newWeatherData);
        store.commit("SET_ERROR", false);
      } catch (error) {
        console.log(error);
       store.commit("SET_ERROR", true);
        store.commit("SET_WEATHER_DATA", {}); 
      }
     }
      return {
        search,
        initData,
      }
  },
  created() {
    this.initData(this.search);
  } 
}
</script>

<style lang="less">
:root {
  --cardWidth: 400px;
  --cardHeight: 700px;
  --darkColor: #666;
  --grayColor: #999;
  --cardBgColor: #f1f1f1;
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}
body {
  background-color: fade(#000, 30);
  overflow: hidden;
}
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.card {
  max-width: var(--cardWidth);
  max-height: var(--cardHeight);
  width: 100%;
  height: 100%;
  padding: 40px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 0 70px fade(black, 30);
  z-index: 9999;
  background-color: var(--cardBgColor);
  @media (max-height: 767px) {
    padding: 30px;
  } 
}
@media (max-width: 480px) {
  .card {
    padding: 30px;
  }
}
.footer-text {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    text-shadow: 0 2px 3px fade(black, 20);
    span {
      font-size: 18px;
      margin-left: 5px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
