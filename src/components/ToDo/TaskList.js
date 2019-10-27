import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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

  greyText: {
    color: grey[500],
    textDecoration: 'line-through'
  }
}));

function TaskList(props) {
  const greenColor = green[500];
  const redColor = red[500];

  const classes = useStyles();

  return (
    <List className= {clsx(classes.root, props.styleName)}>
      {props.tasks.map((todo) => {
        const labelId = `checkbox-list-label-${todo.text}`;

        return (
          <React.Fragment key={todo.id}>
            <ListItem dense button className={classes.task} disableRipple={true}>
              <ListItemIcon>
                <Checkbox
                  checked={todo.isDone}
                  onChange={() => props.toogleTaskStatus(todo.id) } 
                  tabIndex={-1}
                  icon={<RadioButtonUncheckedIcon />} 
                  checkedIcon={<CheckCircleIcon  htmlColor={greenColor} />}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon> 
              <ListItemText id={labelId} primary={todo.text} className={todo.isDone && classes.greyText} />
              <ListItemSecondaryAction className={clsx(classes.removeButton, removeButtonClass)}>
                <IconButton onClick={() => props.removeTask(todo.id)} aria-label="removeTask">
                  <ClearIcon htmlColor={redColor} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
          </React.Fragment>
        );
      })}
    </List>
  );   
}


  export default TaskList;