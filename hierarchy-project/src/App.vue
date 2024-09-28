<template>
  <div class="person-node">
    <!-- Renders the root node -->
      <EmployeeCard 
          :key="filteredPeople.id"
          :person="filteredPeople"
          :level="0"/>
  </div>
</template>

<script>
import EmployeeCard from './EmployeeCard.vue';
export default {
  components: {
    EmployeeCard,
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
