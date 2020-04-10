<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <task v-for="(task,key) in tasks" :key="key" :task="task" :id="key"></task>
    </q-list>
  </q-page>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.getters["tasks/tasks"];
    }
  },
  components: {
    task: require("components/Tasks/Task.vue").default
  }
};
</script>

<style></style>
