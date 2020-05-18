import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAttendee} from '../../store/actions/eventActions';
import firebase from 'firebase/app'


export class attendee extends Component {

    state={
        displayname:'',
        photoUrl:null
    }
    attendeeId=this.props.attendeeId;
    
    
    
    componentDidMount(){
        firebase.firestore().collection('user').doc(this.attendeeId)
        .get()
        .then(res=>{
            let attendeeDB=res.data()
            this.displayname=attendeeDB.displayName;
            this.photoUrl=attendeeDB.photoUrl;
            
            this.setState({
                displayname:attendeeDB.displayName,
                photoUrl:attendeeDB.photoUrl
            });
        }
        )
    }
    
     picUrlRandom=()=>{
        let url='https://randomuser.me/api/portraits/med/men/';
        let num=Math.floor((Math.random()*100)+1).toString();
        let result=url+num+'.jpg';
        return result;
    }
    

    render() {

        
        return (
            <div className='attendee'>
              <img src={this.picUrlRandom()} alt="attendee"/>
                <p>{this.state.displayname}</p>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        attendee:state.event.attendee
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        getAttendee:(attendeeId)=>{
            dispatch(getAttendee(attendeeId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(attendee);
