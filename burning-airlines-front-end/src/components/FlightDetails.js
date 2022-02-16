import axios from "axios";
import React from "react";
import '../FlightDetails.css'


const RAILS_SECRETS_BASE_URL = 'http://localhost:3000/flights/41';
const RAILS_SECRETS_BASE_URL_POST = 'http://localhost:3000/reservations.json';

const rowLength = 8;
const colLength = 5;

export default class FlightDetails extends React.Component {

    state = {
        id: null,
        date: '',
        origin: '',
        destination: '',
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

            const seats = Array(40).fill(false); // occupied? => false; 8 by 5

            const {date, id , origin, destination } = res.data;
            const seatsOccupied = res.data.reservations.map( reservation =>  reservation.seat)
            // TODO: convert the string in seats occupied to a raw index position. 
            // 'if you put in A5
            seatsOccupied.forEach(seat => {
                // console.log(`Seat: ${seat} has the number: ${seat.match(/\d+/g)}`)
                // console.log(`Seat: ${seat} has the letter: ${seat.match(/^[A-Z]+/)}`)
                let seat_letter = seat.match(/^[A-Z]+/)[0]; // converts the array of letters into one string
                let seat_number = parseInt(seat.match(/\d+/g).join('')); // converts the array of numbers from match to a single integer
                let positionI = (seat_letter.charCodeAt(0) - 65) * rowLength + seat_number; // converts the letter to the index equivalent and adds the seat No.
                
                seats[positionI] = true;
            });
            

            // console.log('Occupied seats', occupiedSeats);
            
            this.setState({date: date, id: id , origin: origin, destination: destination , seatsOccupied: seats}); //TODO: look into ways of cleaning this up
        } catch (err) {
            console.log('AJAX ERROR:', err);
        }
    }
    
    selectSeat(i) {
        console.log(i);
        // convert i to Seat ID e.g where i = 9 --> seat = 'B1'. 
        let newSeats = this.state.seatsOccupied.slice({});
        newSeats[i] = !newSeats[i]

        this.setState({ seatsOccupied: newSeats });
        
        const seat = `${String.fromCharCode(Math.floor(i / rowLength) + 65)}` +  `${(i % rowLength + 1).toString()}`;
        console.log('seat is:', seat);

        // makes a new reservation with the current users details.
        this.postSeatReserved(seat);
    }

        // Perform the post request to the backend page. 
        async postSeatReserved(seat) {
        try {
            const res = await axios.post(RAILS_SECRETS_BASE_URL_POST, {seat: seat})
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