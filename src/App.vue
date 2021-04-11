<template>
  <div id="app">
    <!-- app view -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --font: "Roboto", sans-serif;
}
#app {
  font-family: var(--font);
}
#app > * {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
}
.card {
}
.card-header {
}
.card-body {
}
.card-footer {
}
.btn {
}
</style>
