import axios from "axios";
import React from "react";
import '../FlightDetails.css'


const RAILS_FLIGHT_BASE_URL = 'http://localhost:3000/flights/45'; //FIXME: this is a sample number
const RAILS_RESERVATION_BASE_URL_POST = 'http://localhost:3000/reservations.json';

const rowLength = 8;
const colLength = 5;

export default class FlightDetails extends React.Component {

    state = {
        flight_id: null,
        date: '',
        origin: '',
        destination: '',
        seatsOccupied: [],
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
            const res = await axios.get( RAILS_FLIGHT_BASE_URL )
            // console.log('flight response:', res.data);

            const seats = Array(40).fill(false); // occupied? => false; 8 by 5
            const {date, origin, destination, id } = res.data;
            const seatsOccupied = res.data.reservations.map( reservation =>  reservation.seat)
            // Convert the string in seats occupied to a raw index position. 
            // Where seat = A5 --> i = 4
            seatsOccupied.forEach(seat => {
                let seat_letter = seat.match(/^[A-Z]+/)[0]; // converts the array of letters into one string
                let seat_number = parseInt(seat.match(/\d+/g).join('')); // converts the array of numbers from match to a single integer
                let positionI = (seat_letter.charCodeAt(0) - 65) * rowLength + seat_number; // converts the letter to the index equivalent and adds the seat No.
                
                seats[positionI] = true;
            });

            this.setState({date: date, origin: origin, destination: destination , seatsOccupied: seats, flight_id: id }); //TODO: look into ways of cleaning this up
        } catch (err) {
            console.log('AJAX ERROR:', err);
        }
    }
    
    selectSeat(i) {
        console.log(i);
        // convert i to Seat ID e.g where i = 9 --> seat = 'B1'. 
        let newSeats = this.state.seatsOccupied.slice({});
        newSeats[i] = !newSeats[i];

        this.setState({ seatsOccupied: newSeats });
        
        const seat = `${String.fromCharCode(Math.floor(i / rowLength) + 65)}` +  `${(i % rowLength).toString()}`;
        console.log('seat is:', seat);

        // makes a new reservation with the current users details.
        this.postSeatReserved(seat);
    }

        // Perform the post request to the backend page. 
        async postSeatReserved(seat) {
        try {
            console.log('the flight_id that is passed into the post request: ', this.state.flight_id);
            const res = await axios.post(RAILS_RESERVATION_BASE_URL_POST, {seat: seat, flight_id: this.state.flight_id});
            console.log('reservation create response', res.data);

            //TODO: Figure out if I need to use the set state again. But I don't think I do. 

        } catch(err) {
            console.log('Posting Seat Reserved Error:', err);
        }
    }
    
    render() {
        // use a grid to loop over the values and generate the squares. On the outside have the row and column numbers. 
        return (
            <div className="grid-container">
                {
                    this.state.seatsOccupied.map( (seatOccupied, i) => {
                        return seatOccupied
                        ?
                        <button key={i} className="button-fail">Seat #{i}</button>
                        :
                        <button key={i} className="button-pass" onClick={()=>this.selectSeat(i)}>Seat #{i}</button>
                    })
                }
            </div>
        )
    }
}