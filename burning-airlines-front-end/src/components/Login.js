import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class Login extends Component {
    state = { 
        email: '',
        password: '',
        errors: ''
    }

    
    // custom handle change that uses event to determine the state value to update. 
    handleChange = (event) => {
        const {name, value} = event.target 
        this.setState({
        [name]: value
        })
    };
    
    handleSubmit = (event) => {
        event.preventDefault()
        console.log('hello')
        const {email, password} = this.state
        let user = {
            email: email,
            password: password
        };

        axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
            .then(res => {
                console.log('the response is:', res);
                if (res.data.logged_in) {
                    this.props.handleLogin(res.data);
                    this.redirect();

                } else {
                    this.setState({
                        errors: res.data.errors
                    });
                }
            }).catch( err => {
                console.log('LOGIN ATTEMPT ERROR:', err);
            });
    };

    redirect() {
        this.props.history.push('/')
    }

    render() {

        // const {username, email, password} = this.statereturn (
        const {email, password} = this.state
        return (
        <div>
            <h1>Log In</h1>        
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                />
                <br />
                <br />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                />    
                <br />
                <br />

                <button placeholder="submit" type="submit">
                    Log In
                </button>          
                <div>
                    or <Link to='/signup'>sign up</Link>
                </div>
            </form>
        </div>
        );
    }
}