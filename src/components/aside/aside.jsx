
import EventForm from '../eventForm/eventForm';
import React, { Component } from 'react'
import Listing from './listing';

import {connect} from 'react-redux';

export class aside extends Component {

    state={
        formButtonClick:false
    }
    formButtonClick=()=>{
        this.setState({
            formButtonClick:true
        })
    }
    cancelButtonClick=()=>{
        this.setState({
            formButtonClick:false
        })
    }

    render() {
        return (
            <div>
                { this.props.loginStatus && <button onClick={this.formButtonClick} className='aside__button'>Create Event</button>}
                {this.state.formButtonClick && <EventForm onCancelClick={this.cancelButtonClick}/>}
                {this.props.loginStatus && <Listing/>}

            </div>
        )
    }
}


const mapStateToProps=state=>{
    return {loginStatus:state.auth.login}
}
export default  connect(mapStateToProps)(aside);
