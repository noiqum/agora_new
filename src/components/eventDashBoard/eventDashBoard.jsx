import React, { Component } from 'react';
import EventItem from './eventItem';
import {connect} from 'react-redux';
import { initEvents} from '../../store/actions/eventActions';
import {Link} from 'react-router-dom'



export class eventDashBoard extends Component {

    componentDidMount(){
        this.props.initEvents();
        
    }
    windowScreen=window.innerWidth;
    style={"all":'inherit',"curser":'pointer'}
    render() {
        const {events}=this.props;
        return (
            <div className='event-dash-board'>
            
                {events.map(event=>{
                 if(this.windowScreen < 600){
                     return <Link
                      key={event.id}
                                to={{pathname:`/event-detail/${event.id}`,
                                     hash:`#${event.id}`,query:{attendeeArr:event.attendee}}}
                        style={{all:'inherit',cursor:'pointer'}}>
                            <EventItem key={event.id}event={event}></EventItem>
                            </Link>
                 }
                 else{
                 return <EventItem  key={event.id} event={event}/>
              }})}
            </div>
        )
    }
}




 const mapPropsToState=state=>{
     return {
         events:state.event.events
     };
 }
 const mapDispatchToProps =dispatch=>{
     return{
         initEvents:()=>dispatch(initEvents())
     }
 }

export default connect(mapPropsToState,mapDispatchToProps)(eventDashBoard);
