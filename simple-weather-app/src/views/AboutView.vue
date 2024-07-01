<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom text-h4">
          Weather Application
        </div>
      </q-img>
      <q-card-section class="text-h6">
        {{ About }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  setup () {
    return {
      About: 'This is a weather app made with vue 3. You can search weather information by city name. It will provide information such as current Weather status which includes Temperature, Wind Speed, Humidity, Cloud percentage. Openweathermap API was used to fetch the weather data.'
    }
  }
}
</script>

<style lang="less" scoped>
.my-card {
  width: 100%;
  max-width: 450px;
  position: fixed;
  margin-top: 30px;
}
</style>
