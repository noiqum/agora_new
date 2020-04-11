import React, { Component } from 'react';
import EventItem from './eventItem';
import {connect} from 'react-redux';



export class eventDashBoard extends Component {

    

    render() {
        const {events}=this.props;
        return (
            <div className='event-dash-board'>
            
                {events.map(event=>{
                 return <EventItem event={event}/>
                    })}
            </div>
        )
    }
}




 const mapPropsToState=state=>{
     return {
         events:state.event.events
     };
 }

export default connect(mapPropsToState)(eventDashBoard);
