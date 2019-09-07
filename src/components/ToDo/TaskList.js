import React from 'react';
import './TaskList.css'

function TaskList(props) {
  return (
    <ul className="TaskList">
      {props.tasks.map((todo) =>
        <Task 
          key={todo.id} 
          text={todo.text} 
          checked={todo.isDone} 
          onChange={() => props.toogleTaskStatus(todo.id) } 
          onRemove={() => props.removeTask(todo.id)}
        />
      )}
    </ul>
  );   
}

function Task(props) {
  return (
    <li className="TaskList_item">
      <input type="checkbox" checked={props.checked} onChange={props.onChange} />
      <span>{props.text}</span>
      <input type="button" onClick={props.onRemove} />
    </li>  
  );
}

  export default TaskList;