import React from 'react';
import TaskFilterEnum from './TaskFilterEnum';
import useTaskInput from './useTaskInput'
import { 
  AppBar, Toolbar, 
  Select, MenuItem, 
  Input, TextField, 
  Button, Fab,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  selectRoot: {
    color: 'white'
  },
  selectIcon: {
    color: 'white'
  },
  inputUnderline: {
    borderBottom: '2px solid white',
    '&:after': {
      borderBottom: '1px solid white',
    }
  },
  clearButton: {
    color: 'white'
  }
}));

export default function BottomAppBar(props) {
  const classes = useStyles();

  const handleChange = event => {
    props.handleFilterChange(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const [taskText, taskApi] = useTaskInput((task) => {
      props.addNewTask(task);
      setOpen(false);
  });

  const handleClickOpen = () => {
    taskApi.clearTask()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Select value={props.filter} onChange={handleChange} 
            classes={{
              root: classes.selectRoot,
              icon: classes.selectIcon
            }}
            input={<Input classes={{
              underline: classes.inputUnderline,
            }}/>}
            >
            <MenuItem value={TaskFilterEnum.all}>All</MenuItem>
            <MenuItem value={TaskFilterEnum.active}>Active</MenuItem>
            <MenuItem value={TaskFilterEnum.completed}>Completed</MenuItem>
          </Select>

          <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />

          {props.showClearButton > 0 &&
            <Button className={classes.clearButton}  onClick={props.handelClearCompleted}>Clear</Button>
          }
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
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
            onChange ={taskApi.textChange}
            onKeyPress ={taskApi.keyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={taskApi.addTask} color="primary">
            Add 
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}