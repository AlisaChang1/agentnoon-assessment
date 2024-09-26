<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script> -->

<template>
  <div class="person-node">
    <!-- <div @click="toggle" class="cursor-pointer">
      {{ person.name }} - Descendants: {{ getDescendantCount(person) }}
    </div>
    <div v-if="expanded" class="ml-4">
      <PersonNode v-for="subordinate in person.subordinates" :key="subordinate.id" :person="subordinate" />
    </div> -->
    <li v-for="person in people" :key="person['Employee Id']">
      <div>
        {{ person['Name'] }} (Salary: {{ person['Salary'] }})
      </div>
    </li>
  </div>
</template>

<script>
export default {
  computed: {
    // Accessing the global $people property via this.$people
    people() {
      return this.$people;
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    },
    getDescendantCount(person) {
      return this.$emit('descendant-count', person);
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
