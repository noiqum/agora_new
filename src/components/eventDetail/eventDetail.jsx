import React, { Component } from 'react';
import EventHeader from './eventHeader';
import EventInfo from './eventInfo';
import EventChat from './eventChat';
import EventAttendee from './eventAttendee';

export class eventDetail extends Component {


    render() {
        return (
            <div className='event-detail-container'>
                <h1>event detail</h1>
                <EventHeader id={this.props.location.hash.slice(1)}/>
                <EventInfo id={this.props.location.hash.slice(1)} /> 
                <EventChat id={this.props.location.hash.slice(1)}/>
                <EventAttendee  attendeeArr={this.props.location.query.attendeeArr} id={this.props.location.hash.slice(1)}/>
            </div>
        )
    }
}

export default eventDetail
