import React, { Component } from 'react';
import {connect} from 'react-redux';
import Wrong from './wrong';
import gsap from 'gsap';

export class error extends Component {

    msgClose=()=>{
        gsap.to('.error__msg__container',{duration:0.7,ease:'expo.inout',x:-1500})

    }



    render() {
        return (
            <div className='error__msg__container'>

                <div className="error__msg"><Wrong/>{this.props.loginError}</div>
                <div  onClick={this.msgClose}className="error__msg-close">close</div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loginError:state.auth.error
    }
}

export default connect(mapStateToProps)(error);
