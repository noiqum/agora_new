import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {onSignupClick} from '../../store/actions/authActions';
import Error from './error';

export class signup extends Component {

    state={
        displayName:null,
        email:null,
        password:null
    }

   

    handlerSignup=()=>{
        if(this.state.password !== null && this.state.email !== null && this.state.displayName !== null){
            this.props.onSignupClick(this.state.email,this.state.password,this.state.displayName)
        }
    };
    handlerChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className='signup'>
                
                <div className="signup__grid">
                    <div className="signup__display">
                        <label htmlFor="displayName" className="signup__display-label">Name </label>
                        <input  onChange={this.handlerChange} required name='displayName' type="text" className="signup__display-input"/>
                    </div>
                    <div className="signup__email">
                        <label htmlFor="email" className="signup__email-label">Email</label>
                        <input onChange={this.handlerChange} required name='email' type="text" className="signup__email-input"/>
                    </div>
                    <div className="signup__password">
                        <label htmlFor="password" className="signup__password-label">Password</label>
                        <input  onChange={this.handlerChange}required type="password" name='password' className="signup__password-input"/>
                    </div>
                    <div className="signup__button">
                        <div onClick={this.handlerSignup} className="signup__button-text">Sign Up</div>
                    </div>
                    {this.props.signupStatus && <Redirect to='./login'/>}
                    {!this.props.signupStatus &&  this.props.signupError !== null && <Error errorMsg={this.props.signupError}/>}

                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        
        signupStatus:state.auth.signupProcess,
        signupError:state.auth.signupError
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSignupClick:(email,password,displayName)=>{dispatch(onSignupClick(email,password,displayName))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(signup)
