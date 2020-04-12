import React, { Component } from 'react';
import EventItem from './eventItem';
import {connect} from 'react-redux';
import { initEvents} from '../../store/actions/eventActions';



export class eventDashBoard extends Component {

    componentDidMount(){
        this.props.initEvents();
        console.log(this.props.events);
    }

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
 const mapDispatchToProps =dispatch=>{
     return{
         initEvents:()=>dispatch(initEvents())
     }
 }

export default connect(mapPropsToState,mapDispatchToProps)(eventDashBoard);
