import React from 'react';
import { 
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
  IconButton, Checkbox, Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red, grey } from '@material-ui/core/colors';
import { RadioButtonUnchecked, CheckCircle, Clear } from '@material-ui/icons';
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

  listItemText: {
    wordWrap: 'break-word'
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
                  icon={<RadioButtonUnchecked />} 
                  checkedIcon={<CheckCircle  htmlColor={greenColor} />}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon> 
              <ListItemText id={labelId} primary={todo.text} className={clsx(classes.listItemText, todo.isDone && classes.greyText)} />
              <ListItemSecondaryAction className={clsx(classes.removeButton, removeButtonClass)}>
                <IconButton onClick={() => props.removeTask(todo.id)} aria-label="removeTask">
                  <Clear htmlColor={redColor} />
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