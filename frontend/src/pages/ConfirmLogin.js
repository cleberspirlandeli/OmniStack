import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from './../services/api';

import './Login.css';

export default class Login extends Component {

    state = {
        formError: {
            steep: 0, // 0 Aguardando // 1 OK // 2 Error
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id || null;
        if (id) {
            const response = await api.get(`users/active?user=${id}`);
            if (response.status === 200) {
                this.setState({
                    steep: 1,
                })
            } else {
                this.setState({
                    steep: 2,
                })
            }
        } else {
            this.setState({
                steep: 2,
            })
        }
    }

    render() {
        const styles = {
            href: {
                fontSize: '14px',
                cursor: 'pointer'
            }
        };

        return (

            <div>
                <div className="section"></div>
                <main>
                    <div className="center">
                        <div className="container">
                            <div className="z-depth-1 grey lighten-4 row">
                                <br />
                                <div className="section"></div>

                                {this.state.steep === 0 && (
                                    <ul className="collection">
                                        <li className="collection-item avatar">
                                            <i className="circle large material-icons" style={{ color: 'red', backgroundColor: '#FFCDD2' }}>error_outline</i>
                                            <h4>Aguarde....</h4>
                                        </li>
                                    </ul>
                                )}
                                {this.state.steep === 1 && (
                                    <ul className="collection">
                                        <li className="collection-item avatar">
                                            <i className="circle large material-icons" style={{ color: '#FFF', backgroundColor: '#004d40' }}>check</i>
                                            <h4>Email confirmado com sucesso!</h4>
                                            <br />
                                            <Link to="/">
                                                <a href style={styles.href}>&lt; Efetuar Login</a>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                                {this.state.steep === 2 && (
                                    <ul className="collection">
                                        <li className="collection-item avatar">
                                            <i className="circle large material-icons" style={{ color: 'red', backgroundColor: '#FFCDD2' }}>error_outline</i>
                                            <h4>Ocorreu um erro não esperado, tente novamente mais tarde!</h4>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        )
    }
}