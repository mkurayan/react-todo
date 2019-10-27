import React from 'react';
import TaskFilterEnum from './TaskFilterEnum';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [text, setText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = () => {
    let task = text.trim();

    if(task !== "") {
      setText("");
      props.addNewTask(task);
      setOpen(false);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value)
  };

  const handleKeys = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
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
            value={text}
            onChange ={handleTextChange}
            onKeyPress ={handleKeys}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add 
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}