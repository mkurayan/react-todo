import React  from 'react';
import useTaskInput from './useTaskInput'

import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  root: {    
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  input: {
   flexGrow: 1
  }
}));

export default function AddTask(props) {
  const classes = useStyles();
  const [taskText, taskInput] = useTaskInput(props.addNewTask);

  return (
    <Box className={classes.root}>
      <InputBase className={classes.input}
          placeholder='What needs to be done?'
          inputProps={{ 'aria-label': 'enter new task' }}
          value={taskText}
          onChange ={taskInput.textChange}
          onKeyPress ={taskInput.keyPress}
          multiline
          rowsMax="4"
        />
      <IconButton aria-label="add new task" onClick={taskInput.addTask}>
        <AddCircleIcon color="primary" fontSize="large"/>
      </IconButton>
    </Box>
  );
}