import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter.js'
import TaskFilterEnum from './TaskFilterEnum';
import helpers from '../../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Paper } from '@material-ui/core';
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
      maxHeight: theme.spacing(100),
      padding: [[theme.spacing(6), theme.spacing(8)]],
    },

    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.dark,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: theme.spacing(5)
    }
  },

  divider: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
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

    const tasksLeft = this.state.tasks.filter(task => !task.isDone).length;

    let clearButton = null;

    if (this.state.tasks.length - tasksLeft > 0) {
      clearButton = <Button text="Clear completed" onClick={this.clearCompleted}/>;
    }

    return (
      <Paper className={clsx(classes.root, this.props.styleName)}>
        <Box className={classes.header}>
          Todo List
          <TaskFilter filter={this.state.filter} handleFilterChange={this.changeTasksFilter} />
        </Box>
        <AddTask addNewTask={this.addTask} />
        <Divider className={classes.divider}/>
        <TaskList
            tasks={tasksToDisplay} 
            toogleTaskStatus={this.toogleTaskStatusDebounced}
            removeTask={this.removeTask} />

        <span>{`${tasksLeft} Items left`}</span>

        {clearButton}
      </Paper>
    );
  }

  _setTasks(tasks) {
    this.setState({ tasks: tasks });
    this.props.taskApi.setTasks(tasks);
  }
}
    
export default withStyles(styles)(ToDo); ;
  