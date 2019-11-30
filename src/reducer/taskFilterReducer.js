const CHANGE_TASK_FILTER = 'change_task_filter';

const taskFilterReducer = (state, action) => {
  switch(action.type) {
    case CHANGE_TASK_FILTER:
      return action.filter
    default:
      return state;
  }
}

export default taskFilterReducer;

export const changeFilter = (filter) => ({
  type: CHANGE_TASK_FILTER,
  filter: filter
});