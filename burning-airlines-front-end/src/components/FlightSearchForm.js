import React from 'react';
import axios from 'axios';
import { Route, HashRouter as Router, Link } from 'react-router-dom';
import FlightDetails from './FlightDetails';

const RAILS_FLIGHT_SEARCH_BASE_URL = 'http://localhost:3000/flights/search';



class FlightSearchForm extends React.Component{
    
    state = {
        searchFlightOrigin: '',
        searchFlightDestination:'',
        flights: []
    };


    handleInputOrigin = (ev) => {
        // console.log('handleInputOrigin()', ev.target.value);
        this.setState({searchFlightOrigin: ev.target.value})
    }; //handleInputOrigin()

    handleInputDestination = (ev) => {
        // console.log('handleInputDestination()', ev.target.value);
        this.setState({searchFlightDestination: ev.target.value})

    }; //handleInputDestination()

    handleSubmit = (ev) => {
        ev.preventDefault();
        console.log('handleSubmit()', this.state);
        // let searchFlightOrigin = this.state.toCapitalize().searchFlightOrigin;
        // let searchFlightDestination = this.state.toCapitalize().searchFlightDestination;
        //this.state.flights.filter(flight => flight.origin === searchFlightOrigin && flight.destination === searchFlightDestination); TODO: Filter Search
        this.fetchFlights()
        
    }; //handleSubmit()


    fetchFlights = async (origin, destination) => {

        try{
            const res = await axios.get(RAILS_FLIGHT_SEARCH_BASE_URL + `/${this.state.searchFlightOrigin}` + `/${this.state.searchFlightDestination}`);
            console.log('flights response:', res.data);
            // debugger;
            this.setState({
                flights: [...this.state.flights, res.data]
            });
        } catch(err){
            console.log('Error Loading AJAX Flight', err);
            // this.setState({error: err});
        }
    }; //fetchFlights()
 

    render(){

        // const {flights} = this.state;
        // if(this.state.err){
        //     return <p>Error Loading Flights</p>
        // }

        return(
            
            <div>
                <h4>Search for a flight:</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="From"   onChange={this.handleInputOrigin} />
                    <input type="text" placeholder="To"     onChange={this.handleInputDestination} />

                    <button>Find Flight</button>
                    
                </form>    

            <h4>Flight Results</h4>
            <p>
                Nice choice of Destination! Here's some of the best deals we could find for your search while you have 2 days off - leaving your students to fend for themselves against the evils of coding.
            </p>

            <div className='flightSearchTable'>
                <Router>
                    <table >
                        <tr>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th>Flight Number</th>
                        </tr>
                        
                    {this.state.flights.map(flight => 
                    
                        <tr key={flight.id}>

                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.date}</td>

                            <Link to={`/details/${flight.id}`}><td>{flight.number}</td></Link>
                            
                            <Route exact path={`/details/${flight.id}`} component={FlightDetails}></Route>

                        </tr>
                    
                    
                    
                    )}
                    </table> 
                </Router>
            </div>

        </div>



        )//return


    }//render()




}//class FlightsSearchForm

export default FlightSearchForm;