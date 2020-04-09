import React, { Component } from 'react';
import Navlink from './navLinks';
import gsap from 'gsap';



export class navbar extends Component {

    constructor(props){
        super(props)
        this.state={
            burgerClicked:false
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
    render() {
        return (
        <div className='navbar'>
            <div className="navbar__logo">agora</div>
            <div className="navbar__burger" onClick={this.handleBurger}></div>
            <Navlink/>
            
        </div>
        )
    }
}

export default navbar;
