import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {onSignupClick} from '../../store/actions/authActions';
import Error from './error';
import gsap from 'gsap';

export class signup extends Component {

    state={
        displayName:null,
        email:null,
        password:null
    }

    componentDidMount(){
        let tl =gsap.timeline();
        let mediaSize=window.innerWidth;
        let letterSpace='25px'
        if(mediaSize <1000 && mediaSize > 600){
            letterSpace='10px';
        }
        tl.from('.signup-bg__container-title',{duration:2,opacity:0,ease:'none',letterSpacing:letterSpace})
   
        const sgform =document.getElementById('sgform');
        if(sgform.className !=='signup-form before'){
            sgform.classList.add('before');
        }
        
    }

    startClick=()=>{
        let text=document.getElementById('signup-text');
        let arr=text.innerText.split('');
        let html='';

        for(let i=0;i<arr.length;i++){
            if(arr[i] !== ' '){
                html += '<div style="position:relative;display:inline-block;">'+arr[i]+'</div>';
            }
            else{
                html += arr[i];
            }
        }
        
        text.innerHTML=html;
        let chars=text.getElementsByTagName('div');
        const textTl=gsap.timeline().set(text,{perspective:400});

        textTl.to(chars,{
            duration:2.2,
            opacity:0,
            x:gsap.utils.random(-300,300,true),
            y:gsap.utils.random(50,300,true),
            z:gsap.utils.random(0,300,true),
            rotate:gsap.utils.random(-90,90,true),
            scale:0,
            stagger:{
                amount:2,
                
            }
        })

        const button=document.getElementById('signup-btn');
        button.classList.add('btn-click');

        const clear=()=>{
            const sgform =document.getElementById('sgform');
            const contDiv=document.getElementById('signup-cont');

            contDiv.replaceWith(sgform);
            
            sgform.classList.remove('before');
        }

        const containerTl=gsap.timeline({onComplete:clear});
        containerTl.to('#signup-bg',{delay:1.2,duration:2.2,ease:'expo.out',width:0})
        containerTl.to('#signup-bg h2',{duration:1.3,color:'purple'},'<')
        containerTl.to('#signup-bg h2',{duration:0.4,ease:'power2.out',opacity:0})

        
        
        
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
            <div>
            <div id='signup'className='signup'>
                
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
            {/*/////////////////////////// for bigger screens//////////////////////////////////////////// */}

            <div id='signup-bg' className="signup-bg">
                <div id='signup-cont'className="signup-bg__container">
                    <h2 className="signup-bg__container-title">Be part of Journey</h2>
                    <div id='signup-text'className="signup-bg__container-text">Enjoy Meet Gain Share Learn Teach Network Engage Discover</div>
                    <div id='signup-btn' onClick={this.startClick} className="signup-bg__container-button">let's Start</div>
                </div>
            </div>
            {/* ///////////////////after animation part done////////////////////////////// */}
            <div id='sgform'className="signup-form before">
                <div className="signup-form__header">
                    <div className="signup-form__header-img"></div>
                </div>
                <div className="singup-form__displayname">
                    <label htmlFor="form-display" className="signup-form__displayName-label">Name :</label>
                    <input  name='form-display'type="text" className="singup-form__display-input"/>
                </div>
                <div className="signup-form__email">
                    <label htmlFor="form-email" className="signup-form__email-label">Email :</label>
                    <input  name='form-email'type="email" className="signup-form__email-input"/>
                </div>
                <div className="signup-form__password">
                    <label htmlFor="form-password" className="signup-form__password-label">Password :</label>
                    <input name='form-password'type="password" className="signup-form__password-input"/>
                </div>
                <div className="signup-form__button">
                    <div className="signup-form__button-text">Sign Up</div>
                </div>
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
