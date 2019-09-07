import React from 'react';
import Button from '../Button/Button';

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
    return (
    <div>
      <input 
        type="text" 
        value={this.state.text} 
        onChange ={this.handleTextChange}
        onKeyPress ={this.handleKeys} />
      <Button text="+" onClick={this.addTask}/>
    </div>
    );
  }
}

export default AddTask;