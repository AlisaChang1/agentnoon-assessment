<template>
  <div class="person-node">
    <CircularContainer 
      :key="people['Employee Id']" 
      :person="people"
      :level="0"/>
  </div>
</template>

<script>
import CircularContainer from './CircularContainer.vue';
export default {
  components: {
    CircularContainer
  },
  computed: {
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
    toggleNode(node) {
      node.isExpanded = !node.isExpanded; // Toggles node expansion
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
/* .person-node {
  height: fit-content;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
} */
</style>
