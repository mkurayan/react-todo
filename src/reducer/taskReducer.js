const BULK_ADD_TASKS = 'bulk_add_tasks';
const ADD_TASK = 'add_task';
const REMOVE_TASK = 'remove_task';
const TOGGLE_TASK = 'toggle_task';
const CLEAR_TASKS = 'clear_tasks';

const taskListReducer = (state, action) => {
  switch(action.type) {
    case BULK_ADD_TASKS: 
      return [
        ...state, ...action.tasks
      ]; 
    case ADD_TASK:
      let task = action.task;

      return  [
          ...state,
          {
            id: task.id,
            text: task.text,
            isDone: task.isDone
          }
        ];
    case REMOVE_TASK: 
        return state.filter((task) => task.id !== action.id);
    case TOGGLE_TASK:
        return state.map(task =>
          (task.id === action.id)
            ? {...task, isDone: !task.isDone}
            : task
        );
    case CLEAR_TASKS: 
        return state.filter((task) => !task.isDone);
    default:
        return state;
  } 
};

export default taskListReducer;

export const addTasks = (tasks) => ({
  type: BULK_ADD_TASKS,
  tasks: tasks
});

export const addTask = (task) => ({
  type: ADD_TASK,
  task: task
});

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  id 
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id
});

export const clearTasks = () => ({
  type: CLEAR_TASKS
});
