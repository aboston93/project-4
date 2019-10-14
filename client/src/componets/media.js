import React from 'react'


  export default class NewMediaForm extends Component {
    state = {
      newMedia:
  
        { url: "" }
    }
    handleInput = (evnt) => {
      let newMedia = { ...this.state.newMedia };
  
      newMedia[evnt.target.name] = evnt.target.value;
  
      this.setState(newMedia)
    }
  
    handleSubmit = (evnt) => {
      evnt.preventDefault();
  
      this.props.addNewMedia(this.state.url)
      this.setState({ url: "", status: "", })
    }
  
    render = () => (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="url" onChange={this.handleInput} value={this.state.url} placeholder="url" />
  
        <input type="submit" value="New Media" />
      </form>
    )
  }
















 