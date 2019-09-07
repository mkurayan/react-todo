import React from 'react';
import './ToDo.css';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskFilters from './TaskFilter';
import TaskFilterEnum from './TaskFilterEnum';
import Button from '../Button/Button';
import helpers from '../../utils/helpers';

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      filter: TaskFilterEnum.all
    };

    this.changeTasksFilter = this.changeTasksFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);

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
      <div className={`ToDo ${ this.props.styleName }`}>
        <div className="ToDo_header">
          ToDo list.
        </div>

        <TaskFilters
          selectedOption={this.state.filter}
          handleOptionChange={this.changeTasksFilter}
        />

        <AddTask addNewTask={(newTaskText) => this.addTask(newTaskText)} />

        <TaskList tasks={tasksToDisplay} 
            toogleTaskStatus={this.toogleTaskStatusDebounced}
            removeTask={this.removeTask} />

        <span>{`${tasksLeft} Items left`}</span>

        {clearButton}
      </div>
    );
  }

  _setTasks(tasks) {
    this.setState({ tasks: tasks });
    this.props.taskApi.setTasks(tasks);
  }
}
    
export default ToDo;
  