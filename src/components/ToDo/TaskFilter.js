import React from 'react';
import TaskFilterEnum from './TaskFilterEnum';

function TaskFilters(props) {
  const handleOptionChange = (changeEvent) => props.handleOptionChange(changeEvent.target.value);

  return (
    <div>      
      <label>
        <input type="radio" value={TaskFilterEnum.all}
          checked={props.selectedOption === TaskFilterEnum.all}
          onChange={handleOptionChange} />
        All
      </label>
      <label>
        <input type="radio" value={TaskFilterEnum.active}
          checked={props.selectedOption === TaskFilterEnum.active}
          onChange={handleOptionChange}/>
        Active
      </label>
      <label>
        <input type="radio" value={TaskFilterEnum.completed}
          checked={props.selectedOption === TaskFilterEnum.completed}
          onChange={handleOptionChange}/>
        Completed
      </label>
    </div>  
  );
}

export default TaskFilters;
