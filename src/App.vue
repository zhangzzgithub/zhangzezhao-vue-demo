<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="this.$route.name + +this.$route.query._t"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
