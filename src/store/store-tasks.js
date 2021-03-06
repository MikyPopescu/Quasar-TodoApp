import Vue from "vue";
import { uid } from "quasar";

const state = {
  tasks: {
    ID1: {
      name: "Go shopping",
      completed: false,
      dueDate: "2020/06/04",
      dueTime: "18:30"
    },
    ID2: {
      name: "Get the trash",
      completed: false,
      dueDate: "2020/12/06",
      dueTime: "12:30"
    },
    ID3: {
      name: "Eat an apple",
      completed: false,
      dueDate: "2020/05/15",
      dueTime: "16:30"
    }
  },
  search: "",
  sort: "name"
};

const mutations = {
  updateTask(state, payload) {
    // console.log("payload (from mutation):", payload);
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    // console.log("id: ", id);
    // delete state.tasks[id];
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  }
};

const actions = {
  updateTask({ commit }, payload) {
    // console.log("update task action");
    // console.log("payload: ", payload);
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    commit("addTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  }
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {};
    let keysOrdered = Object.keys(state.tasks);
    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key];
        let taskNameLowerCase = task.name.toLowerCase();
        let searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: state => {
    let tasks = {};
    Object.keys(state.tasks).forEach(function(key) {
      let task = state.tasks[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
