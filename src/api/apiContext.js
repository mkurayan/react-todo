import React from 'react';

const api = (store) => {    
  return {
    get: (id) => {
      if(id) {
        let tasks = store.get();

        var index = tasks.findIndex((element) => element.id === id);
    
        return index !== -1 ? tasks[index] : null;
      }
      
      return store.get();
    },

    set: (task) => {
      let tasks = store.get();

      var index = tasks.findIndex((element) => element.id === task.id);
  
      if (index !== -1) {
        tasks[index] = task;
        store.set(tasks);
      }
    },

    add: (task) => {
      let tasks = store.get();
      tasks.push(task);
      store.set(tasks);
    },

    remove: (id) => {
      let tasks = store.get().filter((task) => task.id !== id);
      store.set(tasks);
    }
  }
}

// Replace SessionStore to MemoryStore in order to store data in memory.
/*
const Store = (() => {
  var _tasks = [];

  return {
    get: function() {
      return JSON.parse(JSON.stringify(_tasks));
    },

    set: function(tasks) {
      _tasks = JSON.parse(JSON.stringify(tasks));
    }
  };
})();
*/
const Store = (() => {
  const _tasksKey = "tasks";

  return {
    get: function() {
      let tasks = sessionStorage.getItem(_tasksKey);

      return (tasks && JSON.parse(tasks)) || [];
    },

    set: function(tasks) {
      sessionStorage.setItem(_tasksKey, JSON.stringify(tasks));
    }
  }
})();

const ApiContext = React.createContext(api(Store));

function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={api(Store)}>
      {children}
    </ApiContext.Provider>
  );
}

export { ApiContext, ApiProvider };

