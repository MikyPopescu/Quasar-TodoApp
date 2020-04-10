const state = {
  tasks: {
    ID1: {
      name: "Go shopping",
      completed: false,
      dueDate: "15/06/2020",
      dueTime: "18:30"
    },
    ID2: {
      name: "Get the trash",
      completed: false,
      dueDate: "30/06/2020",
      dueTime: "12:30"
    },
    ID3: {
      name: "Eat an apple",
      completed: false,
      dueDate: "15/05/2020",
      dueTime: "16:30"
    }
  }
  // tasks: [
  //   {
  //     id: 1,
  //     name: "Go shopping",
  //     completed: false,
  //     dueDate: "15/06/2020",
  //     dueTime: "18:30"
  //   },
  //   {
  //     id: 2,
  //     name: "Get the trash",
  //     completed: false,
  //     dueDate: "30/06/2020",
  //     dueTime: "12:30"
  //   },
  //   {
  //     id: 3,
  //     name: "Eat an apple",
  //     completed: false,
  //     dueDate: "15/05/2020",
  //     dueTime: "16:30"
  //   }
  // ]
};

const mutations = {};

const actions = {};

const getters = {
  tasks: state => {
    return state.tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
