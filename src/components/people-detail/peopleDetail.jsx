import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import {withRouter,Link} from 'react-router-dom'
import {defaultImage,checkValidity,ageCalculate,renderUtil} from '../../config/utils'

export class peopleDetail extends Component {

    state={
        persona:null,
        id:undefined,
        profilePic:defaultImage,
    }

    listenPersona=null;async componentDidMount(){
         const id=this.props.match.params.peopleid;
         await firebase.firestore().doc(`user/${id}`).get()
         .then(
             doc=>{
                 let data=doc.data();

                 this.setState({
                     persona:data,
                     id:id,
                
                 })  
                 if(checkValidity(data.mainPhoto)){
                     this.setState({
                         profilePic:data.mainPhoto.downloadUrl
                     })
                 }else{
                     return;
                 }
             }
         )
      
    }
    

    render() {
        const{profilePic,persona}=this.state;
       
        return (
           
            <div >
                {
                persona === null ? <h4>loading</h4>
                :
                <div className='persona'>
                    <img src={profilePic} alt="profile_pic"/>
                <h4>{persona.displayName}</h4>
                <p>{renderUtil(ageCalculate(persona.birthday),'age')}</p>
                <p>{renderUtil(persona.bio,'bio')}</p>
                <p>{renderUtil(persona.job,'job')}</p>
                <p>{renderUtil(persona.gender,'gender')}</p>
                
                </div>

                }
            
            </div>
        )
    
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(peopleDetail))
