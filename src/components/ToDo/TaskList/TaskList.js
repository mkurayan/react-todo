import React from 'react';

class TaskList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.tasks.map((todo) =>
          <Task 
            key={todo.id} 
            text={todo.text} 
            checked={todo.isDone} 
            onChange={() => this.props.toogleTaskStatus(todo.id) } 
            onRemove={() => this.props.removeTask(todo.id)}
          />
        )}
      </ul>
    );
    
  }
}

function Task(props) {
  return (
    <li>
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <span>{props.text}</span>
      <input type="button" onClick={props.onRemove} />
    </li>  
  );
}

  export default TaskList;