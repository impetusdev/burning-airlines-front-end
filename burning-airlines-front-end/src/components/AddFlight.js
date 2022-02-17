import React from "react";
import axios from "axios";
import Flights from "/flights"

class AddFlights extends React.Component{
    state ={
        number: '',
        origin: '',
        destination: '',
        date: '',
        plane: '',
    }

    componentDidMount(){
        const params = this.props.match.params 
    }
}