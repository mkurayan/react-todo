import React,  { useEffect }  from 'react';
import useTaskInput from './useTaskInput'
import { 
  TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@material-ui/core';

export default function AddTaskDialog(props) {  
  const [taskText, taskInput] = useTaskInput(() => props.handleClose());

  // Lets cleau-up text field every time when we open dialog.
  // We track 'open' prop changes. 'setText' will not be changed during the next renders.
  const setText = taskInput.setText;
  useEffect(() => {
    if(props.open) {
      setText('');
    }
  }, [props.open, setText]);

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title"
      fullWidth={true}>
      <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          What needs to be done?
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="New task"
          fullWidth
          multiline
          rowsMax="4"
          value={taskText}
          onChange ={taskInput.textChange}
          onKeyPress ={taskInput.keyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={taskInput.addTask} color="primary">
          Add 
        </Button>
      </DialogActions>
    </Dialog>
  );
}