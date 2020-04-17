import React, { Component } from 'react';
import {connect} from 'react-redux';
import Wrong from './wrong';
import gsap from 'gsap';
import {errorMsgClose} from '../../store/actions/authActions';

export class error extends Component {

    msgClose=()=>{
        gsap.to('.error__msg__container',{duration:0.7,ease:'expo.inout',x:-1500})
        this.props.onErrorMsgClose()
    }



    render() {
        return (
            <div className='error__msg__container'>

                <div className="error__msg"><Wrong/>{this.props.errorMsg}</div>
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
const mapDispatchToProps=dispatch=>{
    return{
        onErrorMsgClose:()=>dispatch(errorMsgClose())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(error);
