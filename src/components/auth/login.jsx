import React, { Component } from 'react';
import gsap from 'gsap';
import {connect} from 'react-redux';
import {loginButtonClick,signupClick} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import Error from './error';


export class login extends Component {

     state={
         email:'',
         password:''
     }

     componentDidMount(){
         const tl=gsap.timeline();
         tl.to('.auth__cover-div',{width:0,duration:1.5,ease:'power2.out',
        stagger:{
            each:0.1,
            from:'random'
        }})
        .to('.auth__frame > div',{
            scale:0,duration:1.5,ease:'power3.easeinout',stagger:{
                each:0.1,
                from:'center'
            }
        })
        .to('.auth__cover-div',{
            scale:1,css:{
                width:'100%',    
            },duration:1.5,ease:'power2.easeinout',
            onComplete:()=>{
                gsap.to('.row1',{
                    duration:1.5,ease:'power2.out',scale:1
                })
                gsap.to('.text',{
                    duration:1.9,ease:'power2.out',css:{
                        opacity:1
                    },stagger:{
                        each:0.1,
                        from:'end'
                    }
                })
               
            }
        }
        ) 
     }
     changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
     }

     loginHandler=()=>{
         if(this.state.email !== null & this.state.password !== null){
            this.props.onLoginClick(this.state.email,this.state.password);
         }
         if(this.props.loginError !== null){
             gsap.to('.error__msg__container',{duration:0.7,ease:'expo.inout',x:0})
         }
        }
         
    keyPress=(e)=>{
        
       if(e.key === 'Enter'){
           this.loginHandler()
       }else{return null}
    }
    // for mobile version signup link
    signupHandler=()=>{
        this.props.onSignupClick()
    }
    render() {
        return (
            <div>
            <div className='login'>
                <div className="login__grid">
                
                <div className="login__email-div">
                    <label htmlFor="email" className="login__email-label">Email</label>
                    <input onChange={this.changeHandler} type="email" required name='email' className="login__email-input"/>
                </div>
                <div className="login__password-div">
                    <label htmlFor="password" className="login__password-label">Password</label>
                    <input onChange={this.changeHandler} name='password'type="password" required className="login__password-input"/>
                </div>
                <div className="login__button-div">
                    <span onClick={this.signupHandler} className="login__button-register">wanna register?</span>
                    <button onKeyPress={this.keyPress} onClick={this.loginHandler} className="login__button-submit">Log in</button>
                </div>

                </div>
            </div>
            {/* //////////////////////////////////for bigger screens only///////////////////// */}
            <div className='auth'>
                
                <div className="auth__frame">
                    <div className="auth__frame-div-1 row1"></div>
                    <div className="auth__frame-div-2 row1"></div>
                    <div className="auth__frame-div-3 row1"></div>
                    <div className="auth__frame-div-4 row2"></div>
                    <div className="auth__frame-div-5 row2"></div>
                    <div className="auth__frame-div-6 row2"></div>
                    <div className="auth__frame-div-7 row3"></div>
                    <div className="auth__frame-div-8 row3"></div>
                    <div className="auth__frame-div-9 row3"></div>
                </div>
                <div className="auth__cover">
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                </div>
                <div className="text">
                    <div  className="text__email-div">Email</div>
                    <input  onChange={this.changeHandler} name='email' required type="email" className="text__email-input"/>
                    <div className="text__password-div">Password</div>
                    <input onKeyPress={this.keyPress} name='password' onChange={this.changeHandler} required type="password" className="text__password-input"/>
                    <div onClick={this.loginHandler} className="text__login">Log in</div>
                </div>
            </div>
            {this.props.loginStatus && <Redirect to='/'/>}
            {this.props.loginError !==null && <Error/>}
            {this.props.signupStatus && <Redirect to={'/signup'}/>}
        </div>    
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLoginClick:(email,password)=>{dispatch(loginButtonClick(email,password))},
        onSignupClick:()=>{dispatch(signupClick())}
    }
}

const mapStateToProps=state=>{
    return{
        loginStatus:state.auth.login,
        loginError:state.auth.error,
        signupStatus:state.auth.signup
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (login) ;
