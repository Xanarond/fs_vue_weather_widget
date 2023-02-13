<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import "./styles.module.scss";
import { WeatherCard } from "@/entities/weather/ui/weather-card";
import { WeatherOptions } from "@/entities/weather/ui/weather-options";
import { ConfigButton } from "@/features/ui/config-button";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { weatherModel } from "@/entities/weather";
import { ProgressBar } from "@/features/ui/progress_bar";
import { WeatherSimpleCard } from "@/entities/weather/ui/simple-card";

const store = useStore();

if (!localStorage?.another_cities) {
  const getWeatherAsync = () => {
    store.dispatch(weatherModel.actions.getWeatherInitAsync);
  };

  onMounted(getWeatherAsync);
}

if (localStorage.another_cities) {
  const citiesArr = [
    JSON.parse(localStorage.current_city),
    ...new Set(JSON.parse(localStorage.another_cities)),
  ];
  const getWeatherAsync = () => {
    for (const elem in [...new Set(citiesArr)]) {
      store.dispatch(weatherModel.actions.getWeatherInitAsync, citiesArr[elem]);
    }
  };
  onMounted(getWeatherAsync);
}

const weathers = computed({
  get() {
    return store.state[weatherModel.NAMESPACE].weatherArr;
  },
  set(newValue) {
    store.dispatch(weatherModel.actions.updateElements, newValue);
  },
});

const isDragging = ref(false);

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});
const isLoading = computed(() => store.state[weatherModel.NAMESPACE].isLoading);
const isConfig = computed(() => store.state[weatherModel.NAMESPACE].isConfigOn);
</script>

<template>
  <v-container fluid>
    <div v-if="!isLoading">
      <template v-if="!isConfig">
        <ConfigButton />
        <WeatherCard
          v-for="(weather, index) in weathers"
          :data="weather"
          :key="index"
        />
      </template>
      <template v-else>
        <WeatherOptions />
        <VueDraggableNext
          class="list-group"
          v-model="weathers"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <transition-group type="transition">
            <WeatherSimpleCard
              v-for="(weather, index) in weathers"
              :data="weather"
              :key="index"
            />
          </transition-group>
        </VueDraggableNext>
      </template>
    </div>
    <div v-else class="pt-16">
      <ProgressBar />
    </div>
  </v-container>
</template>
