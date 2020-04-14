import React, { Component } from 'react';
import Navlink from './navLinks';
import gsap from 'gsap';
import {connect} from 'react-redux';
import { loginModal , logout } from '../../store/actions/authActions';
import {Link} from 'react-router-dom';

const linkStyle ={
    'text-decoration':'none'
};

export class navbar extends Component {

    constructor(props){
        super(props)
        this.state={
            burgerClicked:false,
            login:this.props.loginState,
            signup:this.props.signupState
            
        }
    }

    handleBurger=()=>{
        if(this.state.burgerClicked===false){
        gsap.to('.navbar__nav',{duration:1.5,y:450,ease:'power2.out'})
        this.setState({burgerClicked:true})
        }
        if(this.state.burgerClicked===true){
            gsap.to('.navbar__nav',{duration:1.5,y:0,ease:'power2.out'})
            this.setState({burgerClicked:false})
        }
    }

    handleLogin=()=>{
        this.props.onLoginClick();
        this.setState({login:this.props.loginState});
        }
    handleLogout=()=>{
        this.props.onLogoutClick();
    }
    render() {
        return (
        <div className='navbar'>
            <Link style={linkStyle} to='./'><div className="navbar__logo">agora</div></Link>
            <div className="navbar__burger" onClick={this.handleBurger}></div>
            <Navlink 
             loginClicked={this.handleLogin} 
             signupClicked ={this.handleSignup} 
             login={this.props.loginState} 
             signup={this.state.signup}
             logoutClicked={this.handleLogout}
             />
            
        </div>
        )
    }
}

const mapStateToProps=(state)=>{
   return  {
       loginState:state.auth.login,
       signupState:state.auth.signup
    };
}
const mapDispatchToProps=dispatch=>{
    return {
        onLoginClick:()=>dispatch(loginModal()),
        onLogoutClick:()=>dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (navbar);
