<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>

      <q-space />

      <q-btn v-close-popup flat round dense icon="close" />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="taskToSubmit.name"
            :rules="[val => !!val || 'Field is required']"
            autofocus
            ref="name"
            label="Task name"
            class="col"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.name"
                @click="taskToSubmit.name=' '"
                name="close"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input outlined label="Due date" v-model="taskToSubmit.dueDate">
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueDate"
                @click="clearDueDate"
                name="close"
                class="cursor-pointer"
              />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="taskToSubmit.dueDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
          <q-input outlined label="Due time" v-model="taskToSubmit.dueTime" class="col">
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueTime"
                @click="taskToSubmit.dueTime=' '"
                name="close"
                class="cursor-pointer"
              />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitForm() {
      // console.log("submitForm");
      this.$refs.name.validate();
      if (!this.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      //console.log("submitTask");
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    }
  }
};
</script>