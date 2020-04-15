import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export class signup extends Component {
    render() {
        return (
            <div>
                <h1>signup</h1>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        
        signupStatus:state.auth.signup
    }
}

export default connect(mapStateToProps)(signup)
