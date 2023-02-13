<script lang="ts" setup>
import "./styles.modules.scss";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { weatherModel } from "@/entities/weather";

const store = useStore();

const isOpenConfig = computed(
  () => store.state[weatherModel.NAMESPACE].isConfigOn
);

const onCloseClick = () => {
  store.commit(weatherModel.mutations.setConfig, !isOpenConfig.value);
};

let city_name = ref("");
const onEnter = (city: string) => {
  if (localStorage.another_cities) {
    const citiesArr = [
      JSON.parse(localStorage.current_city),
      ...new Set(JSON.parse(localStorage.another_cities)),
    ];
    if (!citiesArr.includes(city)) {
      citiesArr.push(city);

      store.dispatch(weatherModel.actions.getAnotherWeatherAsync, city);
    }
    store.commit(weatherModel.mutations.setConfig, false);
  }

  if (!localStorage.another_cities) {
    store.dispatch(weatherModel.actions.getAnotherWeatherAsync, city);
    store.commit(weatherModel.mutations.setConfig, false);
  }
};
</script>

<template>
  <v-row justify="center">
    <v-card class="bg-blue-grey-darken-4 ma-4" min-width="388">
      <v-card-text>
        <v-row align="center">
          <v-col cols="6">
            <v-list-item-title>Settings</v-list-item-title>
          </v-col>
          <v-col cols="6"
            ><v-btn
              variant="plain"
              icon="mdi-close"
              color="#fff"
              @click="onCloseClick"
            ></v-btn
          ></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
  <v-row justify="center" class="mt-3">
    <v-col cols="3">
      <v-row>
        <v-text-field
          label="Insert city name"
          hide-details="auto"
          class="justify-center bg-blue-grey-darken-4"
          color="#fff"
          v-model="city_name"
          @keyup.enter="onEnter(city_name)"
        ></v-text-field>
        <v-icon color="green" size="60">mdi-arrow-left-bottom-bold</v-icon>
      </v-row>
    </v-col>
  </v-row>
</template>
