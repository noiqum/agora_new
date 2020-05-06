import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {joinEvent,onCancelClick} from '../../store/actions/eventActions';



export class eventHeader extends Component {

        state={
            loginNeed:false,
            joinCancel:false,
            joinProcessStart:null,
            
        }
   
        eventIdSelected=this.props.id;
        events=this.props.events;
        arr=this.events.filter((event)=>{
            return event.id === this.eventIdSelected
        })
        selectedEvent=this.arr[0];
        
       
            
        joinHandler=()=>{
            if(!this.props.loginStatus){
                this.setState({
                    loginNeed:true
                })
            }
            if(this.props.loginStatus){
                console.log('ok')
                this.props.onJoinClick(this.eventIdSelected,this.props.userId);
                
                
            }
        }

        cancelHandler=()=>{
           
                  this.props.onCancelClick(this.eventIdSelected,this.props.userId)
                this.setState({joinCancel:true})
        }

        componentDidUpdate(){
            if(this.state.joinCancel){
                document.getElementById('trycancel').style.display='none';
                
            }
        }
    
    render() {
        
        return (
            
            <div className='event-header'>
                <div className="event-header__cover">
                    <div className="event-header__cover-img"></div>
                    <div className="event-header__cover-title">{this.selectedEvent.title}</div>
                    <div className="event-header__cover-date">{this.selectedEvent.date}</div>
                    <div className="event-header__cover-host"><em >Hosted by </em> {this.selectedEvent.hostName}</div>
                </div>
                
                {this.props.loginStatus 
                && (this.selectedEvent.hostName===this.props.displayName)
                && 
                <div className="event-header__button">Update</div>}

                {
                !((this.props.loginStatus) && ( this.selectedEvent.attendee.includes(this.props.userId))) &&

                 
                
                <div id='join' onClick={this.joinHandler}className="event-header__button">Join This Event</div>}

                {((this.props.loginStatus)
                 && ( this.selectedEvent.attendee.includes(this.props.userId))) && 
                 
            
                <div id='trycancel' onClick={this.cancelHandler}className="event-header__button">Cancel to Join</div>}

                {this.state.loginNeed && <Redirect to='/login'/>}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        events:state.event.events,
        loginStatus:state.auth.login,
        userId:state.auth.user.userId,
        displayName:state.auth.user.displayName,
        joinProcess:state.event.joinProcess,
        joinProcessStart:state.event.joinProcessStart,
        joinProcessFinish:state.event.joinProcessFinish

    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onJoinClick:(eventId,userId)=>{dispatch(joinEvent(eventId,userId))},
        onCancelClick:(eventId,userId)=>{dispatch(onCancelClick(eventId,userId))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(eventHeader);
