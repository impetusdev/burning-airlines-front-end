import axios from "axios";
import React from "react";
import '../FlightDetails.css'


const RAILS_SECRETS_BASE_URL = 'http://localhost:3000/flights/39';


export default class FlightDetails extends React.Component {

    state = {
        date: '',
        id: null,
        departureLoc: '',
        arrivalLoc: '',
        seatsOccupied: []
    };
    
    componentDidMount(){
        // TODO: perform axios request and populate the state. 
        this.fetchFlightSeats();
    }

    // componentDidUpdate(prevProps, prevState){
    //     if (prevProps.match.params.searchText !== this.props.match.params.searchText) {
    //         this fetchFlightSeats(); //this is if we input another details page index. 
    //     }
    // }

    async fetchFlightSeats() {
        try {
            const res = await axios.get( RAILS_SECRETS_BASE_URL )
            console.log('flight response:', res.data);
        

            const occupiedSeats = res.data.reservations.map( reservation => {
                
            })

            //TODO: parse the seat value to create an array then use the values to generate a grid. 
            // const res = await {
            //     date: '03/08/13',
            //     id: 1,
            //     departureLoc: 'JFK',
            //     arrivalLoc: 'LAX',
            //     seatsOccupied: [true, false, true, false, true, false, false, true, false ]
            // };

            // this.setState(res);

        } catch (err) {
            console.log('AJAX ERROR:', err);
        }
    }
    
    selectSeat(i) { //TODO: figure out how to pass the on click props
        console.log(i);
        let newSeats = this.state.seatsOccupied.slice();
        newSeats[i] = !newSeats[i]

        this.setState({ seatsOccupied: newSeats }); // TODO: figure out how to only modify the single value. 
        // TODO: Do the post request to the page. 
    }
    
    render() {
        // use a grid to loop over the values and generate the squares. On the outside have the row and column numbers. 
        return (
            <div className="grid-container">
                {
                    this.state.seatsOccupied.map( (seatOccupied, i) => {
                        // console.log(seat);
                        return seatOccupied
                        ?
                        <button key={i} className="button-fail" onClick={()=>this.selectSeat(i)}>Seat #{i}</button>
                        :
                        <button key={i} className="button-pass" onClick={()=>this.selectSeat(i)}>Seat #{i}</button>
                    })
                    // TODO: make a method to sets new state and then updates the values to the post
                    // Pass the onClick event into the methhod above.  
                }
            </div>
        )
    }
}