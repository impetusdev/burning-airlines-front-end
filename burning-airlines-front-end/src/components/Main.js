import React from "react";
import FlightDetails from "./FlightDetails";
import ResultsPage from "./ResultsPage";
import '../App.css'

import { Link,  HashRouter as Router, Route } from 'react-router-dom';


export default class Main extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Put your Title here</h1>
                
                <Router>
                    <Link to="/">Search For Flights</Link>
                    
                    
                    <Route exact path="/" component={ ResultsPage } />
                    <Route exact path="/details/:id" component={ FlightDetails } />
                    <Route></Route>
                </Router>

                Hello this is the Main component
            </div>
        )
    }
}