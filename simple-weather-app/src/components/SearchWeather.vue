<template>
    <div class="q-gutter-md row justify-center">
        <div class="search">
          <q-input
            dense
            color="black"
            placeholder="Search City"
            rounded
            outlined
            v-model.trim="search"
            @keydown.enter.prevent="fetchWeatherData(search)"
          >
            <span class="country" v-if="isSearched">{{this.$store.getters.getWeatherCity}}</span>
            <div class="error" v-if="getError">
              No results found! fix it try again.
            </div>
          </q-input>
        </div>
        <div class="toggle">
          <span>Celsius</span>
          <q-toggle size="4em" 
           keep-color
           v-model="value"
           color="orange" 
           @click="fetchWeatherData(search)" />
          <span>Fahrenheit</span>
        </div>
        <q-card-section class="weather-main">
          <div class="weather-feelsLike">
            Feels like
            <strong>
              {{this.$store.getters.getWeatherMain.feelsLike }}
              <sup>&deg;</sup>
            </strong>
          </div>
          <div class="weather-temp">
            <div
        class="weather-icon"
        :style="[this.$store.getters.getWeatherMain.icon ? {'background-image': 'url(http://openweathermap.org/img/wn/'+getWeatherMain.icon+'d@2x.png)'}: {}]"
      ></div>
      <span>{{this.$store.getters.getWeatherMain.temp }}</span>
      <sup>&deg;</sup>
          </div>
          <div class="weather-description">
            <strong>{{ this.$store.getters.getWeatherMain.info }}</strong>
          </div>
        </q-card-section>
        <q-separator dark />
        <q-card-section>
        <div class="q-card-section">
          <div class="weather-item" title="Wind">
            <q-icon name="air" size="1.5em" />
            <span class="value">{{ this.$store.getters.getWeatherInfo.wind }}</span>
          </div>
          <div class="weather-item" title="Humidity">
            <q-icon name="water_drop" size="1.5em" /><!--invert_colors-->
            <span class="value">&percnt;{{ this.$store.getters.getWeatherInfo.humidity }}</span>
          </div>
          <div class="weather-item" title="Cloud">
            <q-icon name="cloud" size="1.5em" /><!--cloud_queue -->
            <span class="value">&percnt;{{this.$store.getters.getWeatherInfo.clouds }}</span>
          </div>
        </div>
      </q-card-section>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios"

export default {
  setup() {
    const store = useStore();
    const value = ref(false);
    const search = store.state.search;
    async function fetchWeatherData(search) {
      if(this.value === false) {
      try {
        store.commit("SET_SEARCH", store.state.search);
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
    } else {
       try {
      store.commit("SET_SEARCH", store.state.search);
      const response = await axios.get(
        `${store.state.apiBase}weather?q=${search}&units=imperial&APPID=${store.state.apiKey}`
      )
      const newWeatherDatainF = {
        name: response.data.name,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        info: response.data.weather[0].main,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        clouds: response.data.clouds.all,
      };
      store.commit("SET_WEATHER_DATA", newWeatherDatainF);
      store.commit("SET_ERROR", false);
    } catch (error) {
      console.log(error);
      store.commit("SET_ERROR", true);
      store.commit("SET_WEATHER_DATA", {});
    }
    }
    }
    return {
      value,
      search,
     fetchWeatherData,
    };
  },
};
</script>

<style lang="less" scoped>

.search {
  margin-top: 30px;
  margin-left: 25px;
  width: 300px;
  .country {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
  }
}

.weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    .weather-temp {
        position: relative;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        box-shadow: 0 0 40px fade(black, 20);
        background-color: #fff;
        margin: 40px 0;
        span {
          font-size: 70px;
          font-weight: 600;
          letter-spacing: -2px;
          position: relative;
        }
        sup {
          position: relative;
          top: -21px;
          font-size: 55px;
        }
      }
      
      .weather-feelsLike {
        font-size: 25px;
        color: var(--darkColor);
        text-transform: capitalize;
      }
      .weather-description {
        font-size: 25px;
        color: var(--darkColor);
        text-transform: capitalize;
      }
    }
@media (max-height: 800px) {
  .weather-main {
    margin-top: 30px;
    margin-bottom: 30px;
    .weather-temp {
      width: 125px;
      height: 125px;
      margin: 30px 0;
    }
  }
}

.toggle {
  margin-top: 10px;
  margin-left:50px;
  span {
          font-size: 20px;
          font-weight: 800;
          position: relative;
        }
}

.error {
    position: absolute;
    color: red;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    bottom: -115px;
    left: 0;
    right: 0;
    margin: auto;
  }

.q-card-section {
  font-size: 16px;
  justify-content:space-between;
  display: flex;
  .weather-item {   
    align-items: center;
    color: var(--darkColor);
  .value {
    margin-left: 15px;
    margin-right: 15px;
  }
}
}
</style>