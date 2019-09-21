import React from 'react';
import TaskFilterEnum from './TaskFilterEnum';
import { Button, ButtonGroup } from '@material-ui/core';

function TaskFilters(props) {
  function button(text, filter) {
    let varaiant = filter === props.filter ? 'contained' : 'outlined';

    return <Button variant={varaiant} onClick={() => props.handleFilterChange(filter)}>{text}</Button>
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
