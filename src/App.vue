<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions(["fetchList"]),
  },
  mounted() {
    this.fetchList();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
button,
input[type="checkbox"] {
  cursor: pointer;
}
body {
  background-color: purple;
}
ul {
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
