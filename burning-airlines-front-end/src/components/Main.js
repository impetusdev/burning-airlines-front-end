import React from "react";
import FlightDetails from "./FlightDetails";
import FlightSearchForm from "./FlightSearchForm";
import ResultsPage from "./ResultsPage";
import '../App.css'

import { Link,  HashRouter as Router, Route } from 'react-router-dom';

// 
export default class Main extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Airline's that don't burn</h1>
                
                <Router>
                    <Link to="/">Search For Flights</Link> | {}
                    <Link to="/details/:id">Temporary link to Flight Details</Link>
                    
                    <Route path="/flights" component={ FlightSearchForm} /> 
                    {/* <Route exact path="/flights/:id" component={       } />  */}

                    <Route exact path="/details/:id" component={ FlightDetails } />
                    <Route></Route>
                </Router>

                Hello this is the Main component
            </div>
        )
    }
}