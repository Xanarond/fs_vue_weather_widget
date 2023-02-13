<script lang="ts" setup>
import "@/entities/weather/ui/simple-card/index.scss";
import { WeatherModel } from "@/shared/api";
import { defineProps, ToRefs, toRefs } from "vue";
import { store } from "@/app/providers";
import { weatherModel } from "@/entities/weather";
interface WeatherCard {
  data?: WeatherModel;
}

const props = defineProps<WeatherCard>();
const weather = toRefs(props);

const onDelete = (weather: ToRefs<Readonly<WeatherCard>>) => {
  store.dispatch(weatherModel.actions.removeElements, weather.data?.value);
};
</script>

<template>
  <v-card class="mx-auto bg-blue-grey-darken-4 ma-4" max-width="368">
    <v-row justify="center" align="center">
      <v-col cols="2">
        <v-icon color="green" size="60">mdi-menu</v-icon>
      </v-col>
      <v-col cols="7">
        <v-card-item
          :title="weather.data.value.city"
          :subtitle="weather.data.value.country"
        />
      </v-col>
      <v-col cols="3"
        ><v-btn
          variant="plain"
          icon="mdi-delete"
          color="#fff"
          v-model="weather"
          @click="onDelete(weather)"
        ></v-btn
      ></v-col>
    </v-row>
  </v-card>
</template>
