<script setup>
import "./module.styles.scss";
import { useStore } from "vuex";
import { weatherModel } from "@/entities/weather";
import { computed } from "vue";

const store = useStore();

const isListLoading = computed(
  () => store.state[weatherModel.NAMESPACE].isConfigOn
);

const onOptionClick = () => {
  store.commit(weatherModel.mutations.setConfig, !isListLoading.value);
};
</script>
<template>
  <v-row class="justify-end">
    <v-col cols="2">
      <v-btn
        variant="plain"
        icon="mdi-cog"
        color="#fff"
        @click="onOptionClick"
      ></v-btn>
    </v-col>
  </v-row>
</template>
