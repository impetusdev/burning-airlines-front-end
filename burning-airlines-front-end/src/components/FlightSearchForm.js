import React from 'react';


//TODO: Put this search form into main page in return function,
//something to the effect of:
// <Router>
//   <Route path="" component={ FlightSearchForm } />
//   <Route exact path="/search/:searchText" component={ ThumbnailGallery } />
// </Router>

class FlightSearchForm extends React.Component{


    state = {
        queryText:''
    };


    handleInput = (ev) => {
        console.log('handleInput()', ev.target.value);
        this.setState({queryText: ev.target.value})
    }; //handleInput()

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
                <h4>Search for a flight: {this.state.queryText}</h4>
                {/* above console logs queryText */}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleInput} />
                    <button>Find Flight</button>

                </form>    
            </div>



        )//return


    }//render()




}//class FlightsSearchForm

export default FlightSearchForm;