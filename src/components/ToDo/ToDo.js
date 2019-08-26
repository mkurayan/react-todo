import React from 'react';
import './ToDo.css';
import AddTask from './AddTask/AddTask';
import TaskList from './TaskList/TaskList';
import TaskFilters from "./TaskFilters/TaskFilter"
import TaskFilterEnum from "./Utils/TaskFilterEnum"

class ToDo extends React.Component {
  name = 'Jack';

  constructor(props) {
    super(props);

    this._counter = 0;

    this.state = {
      tasks: [],
      filter: TaskFilterEnum.all
    };

    this.changeTasksFilter = this.changeTasksFilter.bind(this);
  }

  toogleTaskStatus(taskId) {
    let index = this.state.tasks.findIndex((element) => element.id === taskId);
    if(index >= 0) {
      let tasks = this.state.tasks.slice();

      tasks[index] = {
        ...tasks[index],
        isDone: !tasks[index].isDone
      };

      this.setState({ tasks: tasks })
    }
  }

  removeTask(taskId) {
    this.setState({ tasks: this.state.tasks.filter((task)=> task.id !== taskId)})
  }

  addTask(text) {
    const trimmedText = text.trim();
    if(trimmedText !== "") {
      var tasks = [...this.state.tasks];

      tasks.push({
        id: this._counter++,
        isDone: false,
        text: text
      });

      this.setState({ tasks: tasks});
    }
  }

  changeTasksFilter(filter) {
    this.setState({filter: filter});
  }

  render() {     
    let tasks = this.state.tasks;
    if(this.state.filter === TaskFilterEnum.completed) {
      tasks = this.state.tasks.filter(task => task.isDone);
    } else if(this.state.filter === TaskFilterEnum.active) {
      tasks = this.state.tasks.filter(task => !task.isDone);
    }

    return (
      <div className="ToDo">
        <div className="ToDo-header">
          ToDo list.
        </div>
        <TaskList tasks={tasks} 
            toogleTaskStatus={(taskId) => this.toogleTaskStatus(taskId)}
            removeTask={(taskId) => this.removeTask(taskId)} />
        <AddTask addNewTask={(newTaskText) => this.addTask(newTaskText)} />
        <TaskFilters 
          selectedOption={this.state.filter}
          handleOptionChange={this.changeTasksFilter}
        />
      </div>
    );
  }
}
    
export default ToDo;
  