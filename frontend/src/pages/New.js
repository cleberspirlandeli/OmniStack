import React, { Component } from 'react';
import api from './../services/api';

import Header from './../components/Header'

import './New.css';

export default class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
        formError: {
            error: false,
            image: false,
            author: false,
            place: false,
            description: false,
            hashtags: false,
        },
    }

    async componentDidMount() {
        const response = await api.post('users/decoded');

        if (response.data) {
            this.setState({ author: response.data.name });
        }
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let error = false;
        let image = false;
        let place = false;
        let description = false;

        this.setState({
            formError: {
                error,
                image,
                place,
                description,
            }
        }, async () => {

            if (this.state.image === null) error = image = true;
            if (this.state.place.length === 0) error = place = true;
            if (this.state.description.length === 0) error = description = true;

            if (error) {
                this.setState({
                    formError: {
                        error,
                        image,
                        place,
                        description,
                    }
                });
                return;
            }

            if (!error) {
                const data = new FormData();
                data.append('image', this.state.image);
                data.append('author', this.state.author);
                data.append('place', this.state.place);
                data.append('description', this.state.description);
                data.append('hashtags', this.state.hashtags);

                await api.post('posts', data);

                this.props.history.push('/feed');
                //console.log(this.state);
            }
        });
    }

    render() {
        return (
            <div>
                <Header />
                <form id="new-post" onSubmit={this.handleSubmit}>
                    <input
                        type="file"
                        onChange={this.handleImageChange}
                    />

                    <input style={{ marginTop: '20px' }}
                        type="text"
                        name="author"
                        placeholder="Autor do post *"
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

                    <button type="submit" style={{ marginTop: '20px' }}> Enviar</button>

                    {this.state.formError.error && (
                        <ul className="collection">
                            <li className="collection-item avatar">
                                <i className="circle large material-icons" style={{ color: 'red', backgroundColor: '#FFCDD2' }}>error_outline</i>
                                <p>Erro ao preencher formulário<br />
                                    {this.state.formError.image && ('Nenhuma imagem selecionada')}
                                    <br />
                                    {this.state.formError.place && ('Lugar não informado')}
                                    <br />
                                    {this.state.formError.description && ('Descrição não informado')}
                                </p>
                            </li>
                        </ul>
                    )}

                </form>
            </div>
        );
    }
}