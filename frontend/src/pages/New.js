import React, { Component } from 'react';
import api from './../services/api';

import './New.css';

export default class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        formError: false,
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let err = false;
        if (this.state.imagem === null) err = true;
        if (this.state.author.length === 0) err = true;
        if (this.state.place.length === 0) err = true;
        if (this.state.description.length === 0) err = true;
        if (this.state.hashtags.length === 0) err = true;

        if (err) {
            this.setState({ formError: true });
            return;
        }

        const data = new FormData();
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');
        //console.log(this.state);
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>

                <input
                    type="file"
                    onChange={this.handleImageChange}
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Autor do post *"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input
                    type="text"
                    name="place"
                    placeholder="Local do post *"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descrição do post *"
                    onChange={this.handleChange}
                    value={this.state.description}
                />

                <input
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do post *"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit"> Enviar</button>

                { this.state.formError && (
                    <p>** Campo obrigatório não informado! **</p>
                ) }

            </form>
        );
    }
}