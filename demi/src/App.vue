<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'app',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  html, body, #app {
    width: 100%;
    height: 100%;
    /* background-color: #f0f0f0; */
    background:#f7f8fa;
    overflow-y: overlay;
    overflow-x: hidden;
    font-size: 14px;
  }

</style>
