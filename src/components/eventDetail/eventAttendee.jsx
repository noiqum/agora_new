import React, { Component } from 'react';

import Attendee from './attendee';


export class eventAttendee extends Component {

    attendeeArray=this.props.attendeeArr;
      
        

    render() {
        return (
            <div className='event-attendee__container'>
                <h2>Who is going to this event..</h2>
                <div className="event-attendee__frame">
                {   (this.attendeeArray !== undefined) ?
                    this.attendeeArray.map(attendee=>{
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


 
export default eventAttendee;
