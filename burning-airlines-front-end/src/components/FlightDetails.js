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
            // const res = await axios.get( BASE_URL )
            const res = await {
                date: '03/08/13',
                id: 1,
                departureLoc: 'JFK',
                arrivalLoc: 'LAX',
                seatsOccupied: ['true', 'false', 'true', 'false', 'true', 'false', 'false', 'true', 'false' ]
            }

            this.setState(res);

        } catch (err) {
            console.log('AJAX ERROR:', err)
        }
    }
    
    render() {
        // use a grid to loop over the values and generate the squares. On the outside have the row and column numbers. 
        return (
            <div className="grid-container">
                {
                    this.state.seatsOccupied.map( (seat, i) => {
                        // console.log(seat);
                        return <div key={i} className="grid-item">{seat}</div>
                    })
                }
            </div>
        )
    }
}