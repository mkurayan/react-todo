var inMemoryStore = (function() {
    var _tasks = [];

    return {
        getTasks: function() {
            return JSON.parse(JSON.stringify(_tasks));
        },
    
        setTasks: function(tasks) {
            _tasks = JSON.parse(JSON.stringify(tasks));
        }
    };
})();

var inSessionStore = (function () {
    var _tasksKey = "tasks";

    return {
        getTasks: function() {
            let tasks = sessionStorage.getItem(_tasksKey);
    
            return (tasks && JSON.parse(tasks)) || [];
        },
    
        setTasks: function(tasks) {
            sessionStorage.setItem(_tasksKey, JSON.stringify(tasks));
        }
    }
})();

export {inSessionStore, inMemoryStore};
