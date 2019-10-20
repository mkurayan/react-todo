import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
  root: {    
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  input: {
   flexGrow: 1
  }
});

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: ""
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
  }
  
  handleTextChange(e) {
    console.log(e);
    this.setState({text: e.target.value})
  }

  handleKeys(e) {
    if (e.key === 'Enter') {
      this.props.addNewTask(this.state.text);
      this.setState({text: ""});
    }
  }

  addTask() {
    let task = this.state.text.trim();

    if(task !== "") {
      this.setState({text: ""});
      this.props.addNewTask(task);
    }
  }

  render() {
    const { classes } = this.props;

    return (
    <Box className={classes.root}>
      <InputBase className={classes.input}
          placeholder='What needs to be done?'
          inputProps={{ 'aria-label': 'enter new task' }}
          value={this.state.text}
          onChange ={this.handleTextChange}
          onKeyPress ={this.handleKeys}
        />
      <IconButton aria-label="add new task" onClick={this.addTask}>
        <AddCircleIcon color="primary" fontSize="large"/>
      </IconButton>
    </Box>
    );
  }
}

export default withStyles(styles)(AddTask);