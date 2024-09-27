<template>
  <div class="person-node">
      <CircularContainer 
          :key="filteredPeople.id"
          :person="filteredPeople"
          :level="0"/>
  </div>
</template>

<script>
import CircularContainer from './CircularContainer.vue';
export default {
  components: {
    CircularContainer,
  },
  computed: {
    filteredPeople() {
      return this.$people
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
