<template>
  <div class="progress mt-2" v-show="value">
    <div
      class="progress-bar progress-bar-striped"
      :class="{
        'bg-danger': value < 25,
        'bg-warning': value < 50,
        'bg-info': value < 75,
        'bg-success': value <= 100,
      }"
      role="progressbar"
      :style="{ width: `${value}%` }"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
</style>