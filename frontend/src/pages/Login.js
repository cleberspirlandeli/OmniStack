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
            formError: false,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    handleChange(event) {
        console.log('handleChange');
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
        console.log('chamou login');

        let err = false;
        if (this.state.email.length === 0) err = true;
        if (this.state.password.length === 0) err = true;

        if (err) {
            this.setState({ formError: true });
            return;
        }

        const response = await api.get('/users/authentication');
        console.log(response.data)
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

                    <div>
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
                                                        type='email'
                                                        value={this.state.email} 
                                                        onChange={this.handleChange}/> 
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
                                                        minlength='6'
                                                        value={this.state.password} 
                                                        onChange={this.handleChange}/> 
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
                                                        { this.state.formError && (
                                                            <p>** Campo obrigatório não informado! **</p>
                                                        ) }
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
                        <div className="section "></div>
                        <main>
                            <div className="center ">

                                <div className="container register">
                                    <div className="z-depth-1 grey lighten-4 row"
                                        style={styles.divForm}>

                                        <form className="col s12">
                                            <h5 className="indigo-text">Criar Conta</h5>
                                            <img style={styles.img} src={user} />

                                            <div className='row'>
                                                <div className='col s12'>
                                                </div>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="name" name="name" type="text" className="validate" minlength="3" />
                                                <label for="name">Informar seu nome</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="email" name="email" type="email" className="validate" />
                                                <label for="email">Informar seu email</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="password" name="password" type="password" className="validate" minlength="6" />
                                                <label for="password">Informar sua senha</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input id="confirm-password" name="confirm-password" type="password" className="validate" minlength="6" />
                                                <label for="confirm-password">Confirmar sua senha</label>
                                            </div>


                                            <br />
                                            <div className="center">
                                                <div className='row'>
                                                    <button type='submit' name='btn_login'
                                                        className='col s12 btn waves-effect indigo'>Cadastrar</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <a href style={styles.href} onClick={() => this.stepLogin(0)}>&lt; Voltar</a>
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
