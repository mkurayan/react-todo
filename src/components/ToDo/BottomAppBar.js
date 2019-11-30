import React, { useState, useContext } from 'react';
import AddTaskDialog from './AddTaskDialog';
import TaskFilterEnum from './TaskFilterEnum';
import { 
  AppBar, Toolbar, 
  Select, MenuItem, 
  Input, 
  Button, Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { AppContext }  from '../../reducer/rootReducer';
import { changeFilter } from '../../reducer/taskFilterReducer';

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
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const handleChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  const handleAddTaskDialogOpen = () => {    
    setOpen(true);
  };

  const handleAddTaskDialogClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Select value={state.filter} onChange={handleChange} 
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

          <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleAddTaskDialogOpen}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />

          {props.showClearButton > 0 &&
            <Button className={classes.clearButton}  onClick={props.handelClearCompleted}>Clear</Button>
          }
        </Toolbar>
      </AppBar>
      
      <AddTaskDialog  open={open} handleClose={handleAddTaskDialogClose} />
    </React.Fragment>
  );
}