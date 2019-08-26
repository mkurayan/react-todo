import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: ""
    }

    this.handleTextChange = this.handleTextChange.bind(this);
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

  render() {
    return <input 
      type="text" 
      value={this.state.text} 
      onChange ={this.handleTextChange}
      onKeyPress ={this.handleKeys} />
  }
}

export default AddTask;