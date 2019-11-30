import { useState, useContext } from "react";
import { AppContext }  from '../../reducer/rootReducer';
import { addTask }  from  '../../reducer/taskReducer';
import { ApiContext } from '../../api/apiContext';
import helpers from '../../utils/helpers';

export default function useTaskInput(addTaskCallback) {
  const [text, setText] = useState("");
  
  const api = useContext(ApiContext);
  const { dispatch } = useContext(AppContext);

  const addNewTask = () => {
    let trimmedText = text.trim();

    if(trimmedText !== "") {
      setText("");

      let task = {
        id: helpers.uuid(),
        isDone: false,
        text: text
      };

      api.add(task);
      dispatch(addTask(task));

      if(addTaskCallback) {
        addTaskCallback();
      }
    }
  };

  const taskInput = {    
    textChange: (e) => setText(e.target.value),
    keyPress: (e) => {
      if (e.key === 'Enter') {
        addNewTask();
      }
    },
    addTask: addNewTask,
    setText
  };

  return  [text, taskInput]
}

