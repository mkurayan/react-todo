import React, { useEffect, useContext } from 'react';
import useDebounce from './useDebounce';
import { 
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
  IconButton, Checkbox, Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red, grey } from '@material-ui/core/colors';
import { RadioButtonUnchecked, CheckCircle, Clear } from '@material-ui/icons';
import clsx from 'clsx';
import { ApiContext } from '../../api/apiContext';
import { AppContext }  from '../../reducer/rootReducer';
import { removeTask, toggleTask }  from '../../reducer/taskReducer';

const removeButtonClass = 'taskList_removeButton';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    '&::-webkit-scrollbar-track': { 
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)', 
      borderRadius: 10,
      backgroundColor: grey[200]
    },

    '&::-webkit-scrollbar': {
      width: theme.spacing(1),  
      backgroundColor: grey[200]
    },

    '&::-webkit-scrollbar-thumb': { 
      borderRadius: 10, 
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: grey[500] 
    }
  },
  
  task: { 
    ['&:hover + .' + removeButtonClass]: {
      display: 'block',
    },

    cursor: 'default'
  },

  removeButton: {
    display: 'none',
    right: 6,

    '&:hover': {
      display: 'block',
    },  
  },

  listItemText: {
    wordWrap: 'break-word'
  },

  greyText: {
    color: grey[500],
    textDecoration: 'line-through'
  }
}));

function Task(props) {
  const api = useContext(ApiContext);
  const classes = useStyles();

  const { dispatch } = useContext(AppContext);

  const greenColor = green[500];
  const redColor = red[500];
  
  const todo = props.todo;
  const labelId = `checkbox-list-label-${todo.text}`;

  // Debounce task status so that it only gives us latest value
  // if task status has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops clicking
  // so that we aren't hitting our API rapidly.
  const debouncedTaskStatus = useDebounce(todo.isDone, 500);

  // Effect for API call
  useEffect(
    () => {
      let task = api.get(todo.id);
      if(task) {
        task.isDone = debouncedTaskStatus;
        api.set(task);
      }
    },
    [debouncedTaskStatus, api, todo.id] // Only call effect if debounced status changes
  );

  const remove = () => {
    api.remove(todo.id);
    dispatch(removeTask(todo.id));
  };

  return (
    <ListItem dense button className={classes.task} disableRipple={true}>
      <ListItemIcon>
        <Checkbox
          checked={todo.isDone}
          onChange={() => dispatch(toggleTask(todo.id)) } 
          tabIndex={-1}
          icon={<RadioButtonUnchecked />} 
          checkedIcon={<CheckCircle  htmlColor={greenColor} />}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon> 
      <ListItemText id={labelId} primary={todo.text} className={clsx(classes.listItemText, todo.isDone && classes.greyText)} />
      <ListItemSecondaryAction className={clsx(classes.removeButton, removeButtonClass)}>
        <IconButton onClick={remove} aria-label="removeTask">
          <Clear htmlColor={redColor} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function TaskList(props) {
  const classes = useStyles();
  
  return (
    <List className= {clsx(classes.root, props.styleName)}>
      {props.tasks.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <Task todo={todo}/>
            <Divider/>
          </React.Fragment>
        );
      })}
    </List>
  );   
}


  export default TaskList;