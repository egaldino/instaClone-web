import React, { Component } from 'react';
import api from '../services/api';
import './New.css';

export default class New extends Component {
  state = { 
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  }

  handleTextChange = event => this.setState({ [event.target.name] : event.target.value }); 

  handleImageChange = event => this.setState({ image : event.target.files[0] });
  
  handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.history.push('/');
  }

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <h2>Novo Post</h2>

        <input type="file" onChange={this.handleImageChange}/>

        <input type="text" 
               name="author" 
               placeholder="Autor"
               value={this.state.author}
               onChange={this.handleTextChange}/>

        <input type="text" 
               name="place" 
               placeholder="Local"
               value={this.state.place}
               onChange={this.handleTextChange}/>

        <input type="text" 
               name="description" 
               placeholder="Descrição"
               value={this.state.description}
               onChange={this.handleTextChange}/>

        <input type="text" 
               name="hashtags" 
               placeholder="Hashtags"
               value={this.state.hashtags}
               onChange={this.handleTextChange}/>
      
        <button type="submit">Enviar</button>
      </form>
    )
  }
}
