import React from 'react';
// import axios from 'axios';


//TODO: Put this search form into main page in return function,
//something to the effect of:
// <Router>
//   <Route path="" component={ FlightSearchForm } />
//   <Route exact path="/search/:searchText" component={ ThumbnailGallery } />
// </Router>

class FlightSearchForm extends React.Component{
    
    state = {
        from: '',
        to:''
    };


    handleInputFrom = (ev) => {
        console.log('handleInputFrom()', ev.target.value);
        this.setState({from: ev.target.value})
    }; //handleInputFrom()

    handleInputTo = (ev) => {
        console.log('handleInputTo()', ev.target.value);
        this.setState({to: ev.target.value})
    }; //handleInputTo()

    handleSubmit = (ev) => {
        ev.preventDefault();
        console.log('handleSubmit()')
    }; //handleSubmit()

    //This waits for a search from parent component
    //
    //redirect to new Router Route Path similar to rails
    // use this.props.history.push(`/flights/search/${this.state.queryText}`);

    render(){


        return(
            
            <div>
                <h4>Search for a flight:</h4>
                {/* above console logs queryText */}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="From"   onChange={this.handleInputFrom} />
                    <input type="text" placeholder="To"     onChange={this.handleInputTo} />

                    <button>Find Flight</button>

                </form>    
            </div>



        )//return


    }//render()




}//class FlightsSearchForm

export default FlightSearchForm;