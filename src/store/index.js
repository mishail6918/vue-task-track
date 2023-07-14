import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  getters: {
    tasks: state => {
      return state.tasks;
    },
    taskById: s => id =>s.tasks.find(t => t.id === id)
  },
  mutations: {
    createTask(state,task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    },
    updateTask(state, {id, description, date}) {
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(t => t.id === id);
      const task = tasks[idx];

      console.log(idx);

      const status = new Date(date) > new Date() ? 'active' : 'outdated';

      tasks[idx] = {...task, date, description, status};
      console.log(tasks);

      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      state.tasks[idx].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  modules: {
  }
})
