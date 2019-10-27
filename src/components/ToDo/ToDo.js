import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter.js'
import BottomAppBar from './BottomAppBar.js'
import TaskFilterEnum from './TaskFilterEnum';
import helpers from '../../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';

import Hidden from '@material-ui/core/Hidden';

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

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      filter: TaskFilterEnum.all
    };

    this.changeTasksFilter = this.changeTasksFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toogleTaskStatusDebounced = helpers.debounce(this.toogleTaskStatus, 250, this, true);
  }

  componentDidMount() {
    let tasks = this.props.taskApi.getTasks();
    this.setState({ tasks: tasks });
  }

  componentWillUnmount() {
    this.toogleTaskStatusDebounced.cancel();
  }

  toogleTaskStatus(taskId) {
    let index = this.state.tasks.findIndex((element) => element.id === taskId);
    if(index >= 0) {
      let tasks = this.state.tasks.slice();

      tasks[index] = {
        ...tasks[index],
        isDone: !tasks[index].isDone
      };

      this._setTasks(tasks);
    }
  }

  removeTask(taskId) {
    this._setTasks(this.state.tasks.filter((task)=> task.id !== taskId));
  }

  addTask(text) {
    const trimmedText = text.trim();
    if(trimmedText !== "") {
      var tasks = [...this.state.tasks];

      tasks.push({
        id: helpers.uuid(),
        isDone: false,
        text: text
      });

      this._setTasks(tasks);
    }
  }

  changeTasksFilter(filter) {
    this.setState({filter: filter});
  }

  clearCompleted() {
    this._setTasks(this.state.tasks.filter((task)=> !task.isDone ));
  }

  render() {
    const { classes } = this.props;
    

    let tasksToDisplay = this.state.tasks;
    if(this.state.filter === TaskFilterEnum.completed) {
      tasksToDisplay = this.state.tasks.filter(task => task.isDone);
    } else if(this.state.filter === TaskFilterEnum.active) {
      tasksToDisplay = this.state.tasks.filter(task => !task.isDone);
    }

    const incompleteTasksCount = this.state.tasks.filter(task => !task.isDone).length;

    let clearButton = null;
    let showClearButton = false;

    if (this.state.tasks.length - incompleteTasksCount > 0) {
      showClearButton = true;
      clearButton = <Button  color="primary" onClick={this.clearCompleted}>Clear completed</Button>;
    }

    let itemsLeft = <Typography> {`${incompleteTasksCount} Items left`} </Typography>;

    return (
      <React.Fragment>
        <Paper className={clsx(classes.root, this.props.styleName)}>
          <Box className={classes.header}>
            Todo List

            <Hidden smUp>
              {itemsLeft}
            </Hidden>
            <Hidden xsDown>
              <TaskFilter filter={this.state.filter} handleFilterChange={this.changeTasksFilter} />
            </Hidden>
          </Box>

          <Hidden xsDown>
            <AddTask addNewTask={this.addTask} />
            <Divider className={classes.divider}/>  
          </Hidden>

          <TaskList
              styleName={classes.flexContent}
              tasks={tasksToDisplay} 
              toogleTaskStatus={this.toogleTaskStatusDebounced}
              removeTask={this.removeTask} />

          <Box className={classes.footer}>
            {itemsLeft}
            {clearButton}   
          </Box>
        </Paper>

        <Hidden smUp>
          <BottomAppBar
            filter={this.state.filter} 
            handleFilterChange={this.changeTasksFilter}
            showClearButton={showClearButton}
            handelClearCompleted={this.clearCompleted}
            addNewTask={this.addTask}
          />
        </Hidden>
      </React.Fragment>
    );
  }

  _setTasks(tasks) {
    this.setState({ tasks: tasks });
    this.props.taskApi.setTasks(tasks);
  }
}
    
export default withStyles(styles)(ToDo); ;
  