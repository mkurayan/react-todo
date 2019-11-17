import { useState } from "react";

export default function useTaskInput(addNewTask = () => {}) {
  const [text, setText] = useState("");

  const addTask = () => {
    let task = text.trim();

    if(task !== "") {
      setText("");
      addNewTask(task);
    }
  };

  const api = {
    textChange: (e) => setText(e.target.value),
    keyPress: (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    },
    clearTask: () => setText(''),
    addTask,
  };

  return  [text, api]
}

