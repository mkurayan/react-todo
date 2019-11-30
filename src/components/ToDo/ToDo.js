import React, { useEffect, useContext } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import BottomAppBar from './BottomAppBar';
import TaskFilterEnum from './TaskFilterEnum';
import { ApiContext } from '../../api/apiContext';
import { AppContext }  from '../../reducer/rootReducer';
import { addTasks, clearTasks }  from '../../reducer/taskReducer';

import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Paper, Typography, Hidden } from '@material-ui/core';
import clsx from 'clsx';

const styles = theme => ({
  root: { 
    [theme.breakpoints.up("xs")]: {
      padding: 0,
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(82),

      minHeight: theme.spacing(60),
      maxHeight: theme.spacing(100),
      padding: [[theme.spacing(6), theme.spacing(8)]],
    },

    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontWeight: theme.typography.fontWeightMedium,

    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2),
      fontSize: theme.typography.h5.fontSize,
    },
    [theme.breakpoints.up('sm')]: { 
      margin: [[0, 0, theme.spacing(5), 0]],
      color: theme.palette.primary.dark,
      fontSize: theme.typography.h3.fontSize,
    }
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),

    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
  },

  divider: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },

  flexContent: {
    flexGrow: 1
  }
});

function ToDo(props) {
  const { classes } = props;
  const api = useContext(ApiContext);
  const {state, dispatch} = useContext(AppContext);

  useEffect(() => {
    let tasks = api.get();
    dispatch(addTasks(tasks));
  }, [api, dispatch]); 

  const clearCompleted = () => { 
    let tasksToRemome = state.tasks.filter((task)=> task.isDone);

    // ToDo: optimize this.
    tasksToRemome.forEach(task => {
      api.remove(task.id)
    });

    dispatch(clearTasks());
  };

  
  let tasksToDisplay = state.tasks;
  if(state.filter === TaskFilterEnum.completed) {
    tasksToDisplay = state.tasks.filter(task => task.isDone);
  } else if(state.filter === TaskFilterEnum.active) {
    tasksToDisplay = state.tasks.filter(task => !task.isDone);
  }

  const incompleteTasksCount = state.tasks.filter(task => !task.isDone).length;

  let clearButton = null;
  let showClearButton = false;

  if (state.tasks.length - incompleteTasksCount > 0) {
    showClearButton = true;
    clearButton = <Button  color="primary" onClick={clearCompleted}>Clear completed</Button>;
  }

  let itemsLeft = <Typography> {`${incompleteTasksCount} Items left`} </Typography>;

  return (
    <React.Fragment>
      <Paper className={clsx(classes.root, props.styleName)}>
        <Box className={classes.header}>
          Todo List

          <Hidden smUp>
            {itemsLeft}
          </Hidden>
          <Hidden xsDown>
            <TaskFilter/>
          </Hidden>
        </Box>

        <Hidden xsDown>
          <AddTask/>
          <Divider className={classes.divider}/>  
        </Hidden>

        <TaskList
            styleName={classes.flexContent}
            tasks={tasksToDisplay} />

        <Box className={classes.footer}>
          {itemsLeft}
          {clearButton}   
        </Box>
      </Paper>

      <Hidden smUp>
        <BottomAppBar          
          showClearButton={showClearButton}
          handelClearCompleted={clearCompleted}
        />
      </Hidden>
    </React.Fragment>
  ); 
}
   
export default withStyles(styles)(ToDo); ;
  