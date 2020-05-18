import React, { Component } from 'react';
import Navlink from './navLinks';
import gsap from 'gsap';
import {connect} from 'react-redux';
import { loginModal , logout } from '../../store/actions/authActions';
import {Link} from 'react-router-dom';


const linkStyle ={
    textDecoration:'none'
};

let screenwidth =window.innerWidth;

export class navbar extends Component {

    constructor(props){
        super(props)
        this.state={
            burgerClicked:false,
            login:this.props.loginState,
            signup:this.props.signupState,
            
        }
    }

    

    handleBurger=()=>{
        if(this.state.burgerClicked===false){
        gsap.to('.navbar__nav',{duration:1.5,y:450,ease:'power2.out'})
        this.setState({burgerClicked:true})
        gsap.to('.navbar__burger-2',{
            opacity:0,duration:1,x:-10,ease:'power2.out'}
        )
        gsap.to('.navbar__burger-1',{duration:1,ease:'power2.out',rotate:45,transformOrigin:'20% 50% 7px'})
        gsap.to('.navbar__burger-3',{duration:1,ease:'power2.out',rotate:-45,transformOrigin:'20% 50% 7px'})
        }
        if(this.state.burgerClicked===true){
            gsap.to('.navbar__nav',{duration:1.5,y:0,ease:'power2.out'})
            this.setState({burgerClicked:false})
            gsap.to('.navbar__burger-2',{
                opacity:1,duration:1,x:0,ease:'power2.out'}
            )
            gsap.to('.navbar__burger-1',{duration:1,ease:'power2.out',rotate:0,translate:-7})
            gsap.to('.navbar__burger-3',{duration:1,ease:'power2.out',rotate:0,translate:7})
        }
    }

    handleLogin=()=>{
        this.props.onLoginClick();
        this.setState({login:this.props.loginState});
        if(screenwidth < 600 ){
            this.handleBurger();
        }
        }
    handleLogout=()=>{
        this.props.onLogoutClick();
        if(screenwidth < 600 ){
            this.handleBurger();
        }
        
    }
    handleSignup=()=>{
        if(screenwidth <600){
            this.handleBurger();
        }
    }
    render() {
        return (
        <div className='navbar'>
            <Link style={linkStyle} to='/'><div className="navbar__logo">agora</div></Link>
            <div className="navbar__burger-1" onClick={this.handleBurger}></div>
            <div className="navbar__burger-2" onClick={this.handleBurger}></div>
            <div className="navbar__burger-3" onClick={this.handleBurger}></div>
            <Navlink 
             loginClicked={this.handleLogin} 
             signupClicked ={this.handleSignup} 
             login={this.props.loginState} 
             signup={this.state.signup}
             logoutClicked={this.handleLogout}
             username={this.props.username}
             />
            
        </div>
        )
    }
}

const mapStateToProps=(state)=>{
   return  {
       loginState:state.auth.login,
       signupState:state.auth.signup,
       username:state.auth.user.displayName
    };
}
const mapDispatchToProps=dispatch=>{
    return {
        onLoginClick:()=>dispatch(loginModal()),
        onLogoutClick:()=>dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (navbar);
