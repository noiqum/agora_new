import React, { Component } from 'react';
import {connect} from 'react-redux';
import Attendee from './attendee';


export class eventAttendee extends Component {

    eventListFromRedux=this.props.events;
    eventIdPassedByParent=this.props.id;
    selectedEvent=this.eventListFromRedux.filter(
        event => event.id===this.eventIdPassedByParent
    )[0];
    attendeesOfSelectedEvent=this.selectedEvent.attendee;
      
        

    render() {
        console.log(this.attendeesOfSelectedEvent)
        return (
            <div className='event-attendee__container'>
                <h2>Who is going to this event..</h2>
                <div className="event-attendee__frame">
                {   (this.attendeesOfSelectedEvent !== undefined) ?
                    this.attendeesOfSelectedEvent.map(attendee=>{
                        return <Attendee key={Attendee} attendeeId={attendee}/>
                    })
                    :
                    'By now still waiting for first one to join :)'
                }
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

 
export default connect(mapStateToProps)(eventAttendee);
