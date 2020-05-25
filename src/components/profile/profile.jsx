import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Link} from 'react-router-dom'
import Basic from './basic';
import Photo from './photo';
import Contact from './contact';
import About from './about';
import Account from './account';
import {ReactComponent as Cog} from './svg/cog.svg'
import {ReactComponent as Image} from './svg/image.svg';
import {ReactComponent as Profile} from './svg/profile.svg'
import {ReactComponent as BasicIcon} from './svg/basic.svg'
import {ReactComponent as AccountIcon} from './svg/account.svg'
import {ReactComponent as ContactIcon} from './svg/contact.svg'



const profile=({currentUser})=> {
    
    const {id,displayName}=currentUser;
    return (
        <div className='profile'>
           
            <div className="profile__header">
                <h1 className="profile__header-name">{displayName}</h1>
                <div className="profile__header-button">
                    <Cog/>
                </div>
            </div>
            <div className="profile__links">
            <Link to={{pathname:`/profile/:${id}/basic`}}><BasicIcon/>basic</Link>
            <Link to={{pathname:`/profile/:${id}/photo`}}><Image/>photo</Link>
            <Link to={{pathname:`/profile/:${id}/about`}}><Profile/>About Me</Link>
            <Link to={{pathname:`/profile/:${id}/contact`}}><ContactIcon/>Contact</Link>
            <Link to={{pathname:`/profile/:${id}/account`}}><AccountIcon/>Account</Link>
            </div>
            
            <Switch>
                <Route exact path='/profile/:id' component={Basic}></Route>
                <Route path='/profile/:id/basic' component={Basic}></Route>
                <Route path='/profile/:id/photo' component={Photo}></Route>
                <Route path='/profile/:id/about' component={About}></Route>
                <Route path='/profile/:id/contact' component={Contact}></Route>
                <Route path='/profile/:id/account' component={Account}></Route>
            </Switch>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        currentUser:state.auth.user
    }
}

export default connect(mapStateToProps)(profile)
