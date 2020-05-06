import React, { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from "./svg/calendar";
import Info from './svg/info';
import Location from './svg/location';

export class eventInfo extends Component {

    eventIdSelected=this.props.id;
    
        events=this.props.events;
        arr=this.events.filter((event)=>{
            return event.id === this.eventIdSelected
        })
        selectedEvent=this.arr[0];



    render() {
        return (
            <div className='event-info__container'>
                <div className="event-info__info">
                    <Info/>{this.selectedEvent.description}
                </div>
                <div className="event-info__location">
                    <Location/> {this.selectedEvent.address}
                </div>
                <div className="event-info__calendar">
                    <Calendar/>{this.selectedEvent.date}
                </div>
                
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        events:state.event.events
    }
}
export default connect(mapStateToProps)(eventInfo)
