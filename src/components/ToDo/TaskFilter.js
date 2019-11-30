import React, { useContext } from 'react';
import TaskFilterEnum from './TaskFilterEnum';
import { Button, ButtonGroup } from '@material-ui/core';
import { AppContext }  from '../../reducer/rootReducer';
import { changeFilter } from '../../reducer/taskFilterReducer';

function TaskFilters(props) {
  const { state, dispatch } = useContext(AppContext);

  function button(text, filter) {
    let varaiant = filter === state.filter ? 'contained' : 'outlined';

    return <Button variant={varaiant} onClick={() => dispatch(changeFilter(filter))}>{text}</Button>
  }

  return (
    <ButtonGroup color="primary">
      {button('All', TaskFilterEnum.all)}
      {button('Active', TaskFilterEnum.active)}
      {button('Completed', TaskFilterEnum.completed)}
    </ButtonGroup>
  );
}

export default TaskFilters;
