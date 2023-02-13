<script setup lang="ts">
import "./styles.module.scss";
import { WeatherModel } from "@/shared/api";
import { defineProps, toRefs } from "vue";
export interface WeatherCard {
  data?: WeatherModel;
}

const props = defineProps<WeatherCard>();
const weather = toRefs(props);
</script>

<template>
  <v-card class="mx-auto bg-blue-grey-darken-4 ma-4" max-width="368">
    <v-card-item
      :title="weather.data?.value.city"
      :subtitle="weather.data?.value.country"
    />

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="6" class="text-center">
          <img :src="weather.data?.value.image_url" alt="weather" />
        </v-col>
        <v-col class="text-h2" cols="6"
          >{{ weather.data?.value.temperature }}&deg;C</v-col
        >
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col>
          <v-card-text
            >Feels like {{ weather.data.value.feels }}&deg;C.
            {{ weather.data?.value.weather?.main }},
            {{ weather.data?.value.weather?.description }}</v-card-text
          >
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-2 justify-space-between">
      <v-list-item
        density="compact"
        :prepend-icon="weather.data?.value.wind_arrow"
      >
        <v-list-item-subtitle
          >{{ weather.data.value.wind_info?.speed }}m/s
          {{ weather.data.value.wind_direction }}</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-arrow-collapse-down">
        <v-list-item-subtitle
          >{{ weather.data.value.pressure }}hPa</v-list-item-subtitle
        >
      </v-list-item>
    </div>

    <div class="d-flex py-2 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-rainy">
        <v-list-item-subtitle
          >{{ weather.data.value.humidity }}%</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-water-percent">
        <v-list-item-subtitle
          >{{ weather.data.value.dew_point }}&deg;C</v-list-item-subtitle
        >
      </v-list-item>
    </div>
    <div class="d-flex py-2 justify-center">
      <v-list-item density="compact" prepend-icon="mdi-eye">
        <v-list-item-subtitle
          >{{ weather.data.value.visibility }}km</v-list-item-subtitle
        >
      </v-list-item>
    </div>
  </v-card>
</template>
