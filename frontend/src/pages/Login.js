import React, { Component } from 'react';
import api from './../services/api';

import './Login.css';
import user from './../assets/user.png'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            email: '',
            password: '',

            newName: '',
            newEmail: '',
            newPassword: '',
            newConfirmPassword: '',

            formError: {
                error: false,
                name: false,
                email: false,
            },
        }
    }

    componentDidMount() {
        localStorage.removeItem("x-token");
    }

    stepLogin = (step) => {
        this.setState({
            step
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();

        let error = false;
        let name = false;
        let email = false;

        this.setState({
            formError: {
                error,
                name,
                email
            }
        }, async () => {

            let regex = /\S+@\S+\.\S+/;

            if (!regex.test(this.state.email)) error = name = true;
            if (this.state.password.length < 6) error = email = true;

            if (error) {
                this.setState({
                    formError: {
                        error,
                        name,
                        email,
                    }
                });
                return;
            }


            if (!error) {

                const response = await api.post('users/authentication', {
                    email: this.state.email,
                    password: this.state.password
                });

                if (response.data.token !== null) {
                    // Salve dados ao armazenamento local atual
                    localStorage.setItem("x-token", response.data.token);

                    // Redirecionar para a página principal
                    this.props.history.push('/feed');
                }
            }

        });
    }

    newUser = async e => {
        e.preventDefault();

        if (this.state.newName < 3) return;
        if (this.state.newEmail < 3) return;
        if (this.state.newPassword < 6) return;
        if (this.state.newConfirmPassword < 6) return;

        if (this.state.newPassword === this.state.newConfirmPassword) {
            const response = await api.post('users/register', {
                name: this.state.newName,
                email: this.state.newEmail,
                password: this.state.newPassword
            });

            if (response.data) {
                this.stepLogin(2)
            }
        }

    }

    render() {

        const styles = {
            divForm: {
                display: 'inline-block',
                padding: '5px 15px 0px 15px',
                border: '1px solid #EEE'
            },
            img: {
                width: '70px'
            },
            label: {
                float: 'right'
            },
            href: {
                fontSize: '14px',
                cursor: 'pointer'
            }
        };

        switch (this.state.step) {
            case 0: // Login
                return (

                    <div >
                        <div className="section"></div>
                        <main>
                            <div className="center">

                                <div className="container">
                                    <div className="z-depth-1 grey lighten-4 row"
                                        style={styles.divForm}>

                                        <form className="col s12" onSubmit={this.handleSubmit}>
                                            <h5 className="indigo-text">Favor, efetuar o login</h5>
                                            <img style={styles.img} src={user} />
                                            <div className='row'>
                                                <div className='col s12'>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='input-field col s12'>
                                                    <input
                                                        name='email'
                                                        id='email'
                                                        className='validate'
                                                        type='text'
                                                        value={this.state.email}
                                                        onChange={this.handleChange} />
                                                    <label for='email'>Informar seu email</label>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='input-field col s12'>
                                                    <input
                                                        id='password'
                                                        name='password'
                                                        type='password'
                                                        className='validate'
                                                        value={this.state.password}
                                                        onChange={this.handleChange} />
                                                    <label for='password'>Informar sua senha</label>
                                                </div>
                                                <label style={styles.label}>
                                                    <a className='pink-text' href onClick={() => this.stepLogin(4)} style={styles.href}><b>Esqueceu sua senha?</b></a>
                                                </label>
                                            </div>

                                            <br />
                                            <div className="center">
                                                <div className='row'>
                                                    <button
                                                        type='submit'
                                                        name='btn_login'
                                                        className='col s12 btn waves-effect indigo'
                                                    >
                                                        Entrar
                                                    </button>

                                                </div>
                                                {this.state.formError.error && (
                                                    <ul className="collection">
                                                        <li className="collection-item avatar">
                                                            <i className="circle large material-icons" style={{ color: 'red', backgroundColor: '#FFCDD2' }}>error_outline</i>
                                                            <p>Erro ao preencher formulário<br />
                                                                {this.state.formError.name && ('Email não é válido')}
                                                                <br />
                                                                {this.state.formError.email && ('Senha deve ter no minímo 6 caracteres')}
                                                            </p>
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <a href style={styles.href} onClick={() => this.stepLogin(1)} >Criar uma conta</a>
                            </div>

                            <div className="section"></div>
                            <div className="section"></div>
                        </main>

                    </div>
                )
            case 1: // Register
                return (
                    <div>
                        <div className="section"></div>
                        <main>
                            <div className="center" >

                                <div className="container register">
                                    <div className="z-depth-1 grey lighten-4 row"
                                        style={styles.divForm} style={{ marginLeft: '29%', marginRight: '29%' }}>

                                        <form className="col s12" onSubmit={this.newUser}>
                                            <h5 className="indigo-text">Criar Conta</h5>
                                            <img style={styles.img} src={user} />

                                            <div className='row'>
                                                <div className='col s12'>
                                                </div>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                    id="newName"
                                                    name="newName"
                                                    type="text"
                                                    className="validate"
                                                    minlength="3"
                                                    onChange={this.handleChange}
                                                />
                                                <label for="newName">Informar seu nome</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                    id="newEmail"
                                                    name="newEmail"
                                                    type="email"
                                                    className="validate"
                                                    onChange={this.handleChange}
                                                />
                                                <label for="newEmail">Informar seu email</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type="password"
                                                    className="validate"
                                                    minlength="6"
                                                    onChange={this.handleChange}
                                                />
                                                <label for="newPassword">Informar sua senha</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                    id="newConfirmPassword"
                                                    name="newConfirmPassword"
                                                    type="password"
                                                    className="validate"
                                                    minlength="6"
                                                    onChange={this.handleChange}
                                                />
                                                <label for="newConfirmPassword">Confirmar sua senha</label>
                                            </div>


                                            <br />
                                            <div className="center">
                                                <div className='row' style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>
                                                    <button type='submit' name='btn_login'
                                                        className='col s12 btn waves-effect indigo'>Cadastrar</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <a href style={styles.href} onClick={() => this.stepLogin(0)}>&lt; Voltar</a>
                                <br /><br />
                                <small style={{color: 'red'}}>
                                    Página em desenvolvimento <br />
                                    mas você receberá o email de confirmação
                                </small>
                                <div className="section"></div>
                                <div className="section"></div>
                            </div>
                        </main>
                    </div>
                )
            case 2: // Success
                return (
                    <div>
                        <div className="section"></div>
                        <main>
                            <div className="center">

                                <div className="container">
                                    <div className="z-depth-1 grey lighten-4 row"
                                        style={styles.success}>
                                        <br />
                                        <h4 style={{ fontWeight: 'bold' }}>PARABÉNS</h4>
                                        <p>Seu cadastro foi efetuado com sucesso</p>
                                        <p>Você receberá um email para confirmação!</p>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <a href style={styles.href} onClick={() => this.stepLogin(0)}>&lt; Voltar</a>
                            </div>
                            <div className="section"></div>
                            <div className="section"></div>
                        </main>
                    </div>
                )
            case 3:
                return <h1><a href style={styles.href} onClick={() => this.stepLogin(1)} >Criar uma conta</a></h1>
        }


    }
}
