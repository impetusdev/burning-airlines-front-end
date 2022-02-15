import axios from "axios";
import React from "react";
import '../FlightDetails.css'

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
        this.getFlightSeats();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.searchText !== this.props.match.params.searchText) {
            this.getFlightSeats(); //this is if we input another details page index. 
        }
    }

    async getFlightSeats() {
        try {
            // const res = await axios.get(  )
            const res = await {
                date: '03/08/13',
                id: 1,
                departureLoc: 'JFK',
                arrivalLoc: 'LAX',
                seatsOccupied: [true, false, true, false, true, false, false, true, false ]
            }

            this.setState(res);

        } catch (err) {
            console.log('AJAX ERROR:', err)
        }
    }
    
    selectSeat(seatId = 0) { //TODO: figure out how to pass the on click props
        console.log(seatId)
    }
    
    render() {
        // use a grid to loop over the values and generate the squares. On the outside have the row and column numbers. 
        return (
            <div className="grid-container">
                { //TODO: make click event that makes the allocation call to backend. 
                    this.state.seatsOccupied.map( (seatOccupied, i) => {
                        // console.log(seat);
                        return seatOccupied
                        ?
                        // <div  className="">
                        <button key={i} className="button-fail" onClick={this.selectSeat}>Seat #{i}</button>
                        // </div>
                        :
                        <button key={i} className="button-pass" onClick={this.selectSeat}>Seat #{i}</button>
                    })
                }
            </div>
        )
    }
}