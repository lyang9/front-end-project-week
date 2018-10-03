import React, { Component } from 'react';
import axios from 'axios';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      textBody: ''
    }
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateNote = event => {
    event.preventDefault();
    const updatedNote = {
      id: this.state.id,
      title: this.state.title,
      textBody: this.state.textBody
    };
    this.props.updateNote(updatedNote);
    this.props.history.push('/');
  }

  updatedNote = note => {
    axios
      .put(`https://killer-notes.herokuapp.com/note/edit/${id}`, note)
      .then(response => {
        this.setState({notes: response.data});
      })
      .catch(error => (
        console.log('Server Error', error)
      ));
  }  

  render() {
    return (
      <div className='edit-container'>
        <h2>Edit Note:</h2>
        <input 
          name='title'
          placeholder='Note Title'
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <input
          name='textBody'
          placeholder='Note Content'
          value={this.state.textBody}
          onChange={this.handleInputChange}
        />
        <button onClick={this.updateNote}>Update</button>
      </div>
    );
  }
}

export default EditForm;