import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import apiConfig from '../config/api.json';

import './Feed.css';

import more from '../images/more.svg';
import like from '../images/like.svg';
import comment from '../images/comment.svg';
import send from '../images/send.svg';

export default class Feed extends Component {
  
  state = {
    feed: []
  }

  registerToSocket = () => {
    const socket = io(apiConfig.connectionUrl);

    socket.on('post', newPost => {
      this.setState({feed: [newPost, ...this.state.feed]});
    });

    socket.on('like', likedPost => {
      this.setState({feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)});
    });
  }

  handleLike = id => api.post(`/posts/${id}/like`);

  async componentDidMount(){
    const response = await api.get('posts');
    this.setState({feed: response.data})

    this.registerToSocket();
  }
  
  render() {
    return (
      <section id="post-list">
        { this.state.feed.map(post => (
           <article key={post._id}>
              <header>
                <div className="user-info">
                  <span>{post.author}</span>
                  <span className="place">{post.place}</span>
                </div>
                <img src={more} alt="Mais"/>
              </header>
              
              <img src={`${apiConfig.connectionUrl}/files/${post.image}`} alt="Mais"/>

              <footer>
                <div className="actions">
                  
                  <button onClick={()=> this.handleLike(post._id)}>
                    <img src={like} alt="Curtir"/>
                  </button>

                  <img src={comment} alt="Comentar"/>
                  <img src={send} alt="Enviar"/>
                </div>
              
                <strong>{post.likes} curtidas</strong>

                <p>{post.description}</p>
                <span>{post.hashtags}</span>
              </footer>

            </article>
        ))}
      </section>
    );
  }
}
