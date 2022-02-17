import React from "react";
import FlightDetails from "./FlightDetails";
import FlightSearchForm from "./FlightSearchForm";
import Login from "./Login"
import SignUp from "./SignUp"
import '../App.css'
import axios from "axios";


import { Link,  HashRouter as Router, Route } from 'react-router-dom';

// 
export default class Main extends React.Component {

    //TODO: make sure this state is updating here. see if you can use the login form here.  RIGHT NOW DO THIS TODO: TODO:
    state = {
        isLoggedIn: false,
        user: {}
    }
    
    componentDidMount() {
        this.loginStatus()
    }

    loginStatus = () => {
        axios.get('http://localhost:3000/logged_in', 
            {withCredentials: true})    
        .then(response => {
            if (response.data.logged_in) {
                this.handleLogin(response)
            } else {
                this.handleLogout()
            }
        })
        .catch(err => console.log('LOGGING IN ERRROR AJAX:', err))
    };


    handleLogin = (data) => {
        this.setState({
             isLoggedIn: true,
             user: data.user
        })  
    }

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            user: {}
        })
    }


    logout = () => {
        axios.post('http://localhost:3000/logout', {withCredentials: true})
            .then( res => {
                console.log('the logout mounting response is:', res);
                this.handleLogout();
                console.log('sdfasdfafs');
            })
            .catch( err => {
                console.log('The error response when logging out is:', err);
            })
    }

    
    render() {
        return (
            <div className="App">
                <h1>Airline's that don't burn</h1>
                
                <Router>
                    <Link to="/">Search For Flights</Link> | {}
                    <Link to="/details/9">Temporary link to Flight Details</Link> |               {}
                    {
                        // TODO: if user logged in make a link button to logout,
                        // else if not logged in then make a login/ sign up button. 
                    }

                    {
                        !this.state.isLoggedIn
                        ?
                        <span>
                            <Link to='/login'>Log In</Link> | {}
                            <Link to='/signup'>Sign Up</Link>
                        </span>
                        :
                        <span>
                            <button onClick={this.logout}>Logout</button>
                        </span>
                    }

                    <Route path="/flights" component={ FlightSearchForm} /> 
                    {/* <Route exact path="/flights/:id" component={       } />  */}
                    <Route path="/details/:id" component={ FlightDetails } />
                    <Route exact path='/login' component={() => <Login handleLogin={this.handleLogin} handleLogout={this.handleLogout} />}/>
                    <Route exact path='/signup' component={SignUp}/> 
                </Router>
            </div>
        )
    }
}