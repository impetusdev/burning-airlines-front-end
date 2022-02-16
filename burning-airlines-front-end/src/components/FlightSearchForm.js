import React from 'react';
import axios from 'axios';

const RAILS_FLIGHT_SEARCH_BASE_URL = 'http://localhost:3000/flights.json';




//TODO: Put this search form into main page in return function,
//something to the effect of:
// <Router>
//   <Route path="" component={ FlightSearchForm } />
//   <Route exact path="/search/:searchText" component={ ThumbnailGallery } />
// </Router>

class FlightSearchForm extends React.Component{
    
    state = {
        searchFlightOrigin: '',
        searchFlightDestination:'',
        allFlights: [],
        allPlanes:[]
    };


    handleInputOrigin = (ev) => {
        console.log('handleInputOrigin()', ev.target.value);
        this.setState({searchFlightOrigin: ev.target.value})
        //or this.setState(state=>({...state, searchFlightOrigin: value}))
    }; //handleInputOrigin()

    handleInputDestination = (ev) => {
        console.log('handleInputDestination()', ev.target.value);
        this.setState({searchFlightDestination: ev.target.value})
        //or this.setState(state=>({...state, searchFlightDestination: value}))

    }; //handleInputDestination()

    handleSearch = () => {
        let searchFlightOrigin = this.state.toCapitalize().searchFlightOrigin;
        let searchFlightDestination = this.state.toCapitalize().searchFlightDestination;

        return this.state.allFlights.filter(flight => flight.origin === searchFlightOrigin && flight.destination === searchFlightDestination);

    }; //find search using partial component of search i.e 'sy' input by user should return sydney

    // handleSubmit = (ev) => {
    //     ev.preventDefault();
    //     console.log('handleSubmit()')
    // }; //handleSubmit()

    //This waits for a search Origin parent component
    //
    //redirect to new Router Route Path similar to rails
    // use this.props.history.push(`/flights/search/${this.state.queryText}`);

    componentDidMount(){
        this.fetchFlights();
        // window.setInterval(this.fetchFlights, 2000);
    }

    fetchFlights = async () => {
        try{
            const res = await axios.get(RAILS_FLIGHT_SEARCH_BASE_URL);
            console.log('flights response:', res.data);
            // this.setState({flights: res.data});
        } catch(err){
            console.log('Error Loading AJAX Flight', err);
            // this.setState({error: err});
        }
    }; //fetchFlights()




    render(){


        // if(err){
        //     return <p>Error Loading Flights</p>
        // }


        return(
            
            <div>
                <h4>Search for a flight:</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="From"   onChange={this.handleInputOrgin} />
                    <input type="text" placeholder="To"     onChange={this.handleInputDestination} />

                    <button>Find Flight</button>

                </form>    
            </div>



        )//return


    }//render()




}//class FlightsSearchForm

export default FlightSearchForm;