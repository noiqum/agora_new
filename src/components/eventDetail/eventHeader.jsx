import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom';
import {joinEvent,onCancelClick,initEvents} from '../../store/actions/eventActions';



export class eventHeader extends Component {

        state={
            loginNeed:false,
            loginProcess:false,
            selectedEvent:null,
            cancelProcess:false
        }
   
        
        
       componentDidMount(){
        let eventIdSelected=this.props.id;
        let events=this.props.events;
        let arr=events.filter((event)=>{
            return event.id === eventIdSelected
        })
        let selectedEventById=arr[0];
        this.setState({selectedEvent:selectedEventById})
       }

       componentDidUpdate(){
       console.log(this.state.selectedEvent.attendee)
        
       }
       componentWillUnmount(){
           this.setState({
               selectedEvent:null
           })
       }
            
        joinHandler=()=>{
            if(!this.props.loginStatus){
                this.setState({
                    loginNeed:true
                })
            }
            if(this.props.loginStatus){
                this.props.onJoinClick(this.props.match.params.id,this.props.userId);
                this.setState({
                    loginProcess:true
                })        
            }
        }

        cancelHandler=()=>{
           
                this.props.onCancelClick(this.props.match.params.id,this.props.userId)
                this.setState({
                    cancelProcess:true
                })
        }

        
    
    render() {
        const {selectedEvent}=this.state;
        
        return (
            <div>
            {selectedEvent ?
            <div className='event-header'>
                <div className="event-header__cover">
                    <div className="event-header__cover-img"></div>
                    <div className="event-header__cover-title">{selectedEvent.title}</div>
                    <div className="event-header__cover-date">{selectedEvent.date}</div>
                    <div className="event-header__cover-host"><em >Hosted by </em> {selectedEvent.hostName}</div>
                </div>
                
                {this.props.loginStatus 
                && (selectedEvent.hostName===this.props.displayName)
                && 
                <div className="event-header__button">Update</div>}

                {
                !((this.props.loginStatus) && ( selectedEvent.attendee.includes(this.props.userId))) &&

                 
                
                <div id='join' onClick={this.joinHandler}className="event-header__button">Join This Event</div>}

                {((this.props.loginStatus)
                 && ( selectedEvent.attendee.includes(this.props.userId))) && 
                 
            
                <div id='trycancel' onClick={this.cancelHandler}className="event-header__button">Cancel to Join</div>}

                {this.state.loginNeed && <Redirect to='/login'/>}
            </div>
            :
            <h1>Loading</h1>
           
            } </div> 
        )
    }
}

const mapStateToProps=state=>{
    return{
        events:state.event.events,
        loginStatus:state.auth.login,
        userId:state.auth.user.userId,
        displayName:state.auth.user.displayName,
        
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onJoinClick:(eventId,userId)=>{dispatch(joinEvent(eventId,userId))},
        onCancelClick:(eventId,userId)=>{dispatch(onCancelClick(eventId,userId))},
        tryInitEvents:()=>{dispatch(initEvents())}
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(eventHeader));
