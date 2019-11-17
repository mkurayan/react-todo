import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter'
import BottomAppBar from './BottomAppBar'
import TaskFilterEnum from './TaskFilterEnum';
import helpers from '../../utils/helpers';
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Paper, Typography, Hidden } from '@material-ui/core';
import clsx from 'clsx';
import { func } from 'prop-types';

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
      marginBottom: theme.spacing(2),
      fontSize: theme.typography.h5.fontSize,
    },
    [theme.breakpoints.up('sm')]: { 
      marginBottom: theme.spacing(5),
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
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(TaskFilterEnum.all);

  useEffect(() => {
    let tasks = props.taskApi.getTasks();
    setTasks(tasks);
  }, [props.taskApi]); 

  const _setTasks = (tasks) => {
    setTasks(tasks);
    props.taskApi.setTasks(tasks);
  };

  const toogleTaskStatusDebounced = helpers.debounce(
    (taskId) => {
      let index = tasks.findIndex((element) => element.id === taskId);
      if(index >= 0) {
        let t = tasks.slice();
  
        t[index] = {
          ...t[index],
          isDone: !t[index].isDone
        };
  
        _setTasks(t);
      }
    }, 
    250, this, true
  );

  useEffect(() => {
    // Cancel debounce when component did unmount.
    return () => toogleTaskStatusDebounced.cancel();
  }, []); 

  const removeTask = (taskId) => _setTasks(tasks.filter((task)=> task.id !== taskId));

  const addTask = (text) => {
    const trimmedText = text.trim();
    if(trimmedText !== "") {
      var t = [...tasks];

      t.push({
        id: helpers.uuid(),
        isDone: false,
        text: text
      });

      _setTasks(t);
    }
  };

  const changeTasksFilter = (filter) => setFilter(filter)

  const clearCompleted = () => _setTasks(tasks.filter((task)=> !task.isDone ));

  const { classes } = props;

  let tasksToDisplay = tasks;
  if(filter === TaskFilterEnum.completed) {
    tasksToDisplay = tasks.filter(task => task.isDone);
  } else if(filter === TaskFilterEnum.active) {
    tasksToDisplay = tasks.filter(task => !task.isDone);
  }

  const incompleteTasksCount = tasks.filter(task => !task.isDone).length;

  let clearButton = null;
  let showClearButton = false;

  if (tasks.length - incompleteTasksCount > 0) {
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
            <TaskFilter filter={filter} handleFilterChange={changeTasksFilter} />
          </Hidden>
        </Box>

        <Hidden xsDown>
          <AddTask addNewTask={addTask} />
          <Divider className={classes.divider}/>  
        </Hidden>

        <TaskList
            styleName={classes.flexContent}
            tasks={tasksToDisplay} 
            toogleTaskStatus={toogleTaskStatusDebounced}
            removeTask={removeTask} />

        <Box className={classes.footer}>
          {itemsLeft}
          {clearButton}   
        </Box>
      </Paper>

      <Hidden smUp>
        <BottomAppBar
          filter={filter} 
          handleFilterChange={changeTasksFilter}
          showClearButton={showClearButton}
          handelClearCompleted={clearCompleted}
          addNewTask={addTask}
        />
      </Hidden>
    </React.Fragment>
  ); 
}
   
export default withStyles(styles)(ToDo); ;
  