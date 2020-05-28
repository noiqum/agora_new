import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactItem from './contact-item'
import {deleteContactClick,addContactClick} from '../../store/actions/profileActions'

export class contact extends Component {
    state={
        contact:null,
        list:false,
        pick:false,
        picked:null,
        elm:{
            type:'',
            link:''
        }
    }

    componentDidMount(){
        this.setState({
            contact:this.props.contact
        })
    }
    
    deleteContact=(elm)=>{
        this.props.onDeleteClick(elm,this.props.id)
        
        let yy=this.state.contact.filter(e=>{
            return e !== elm
        })
        this.setState({
            contact:yy
        })
    }
    addBtnClick=()=>{
        this.setState({
            list:true
        })
    }
    pickItem=(e)=>{
        this.setState({
            list:false,
            pick:true,
            elm:{
                type:e
            }
        })
        console.log(e)
    }
    saveClick=(elm)=>{
        let newContact=[{...elm}]
        let updated=this.state.contact.concat(newContact)
        this.setState({
            contact:updated,
            pick:false
        })
        this.props.onSaveClick(elm,this.props.id)
    }
    inputChange=(e)=>{
        this.setState({
            elm:{
                type:this.state.elm['type'],
                link:e.target.value
            }
        })
    }
    render() {
        const{contact,list,elm,pick}=this.state;
        return (
            <div className='contact'>
                <h3>Contact Links</h3>
                <div className="contact__link">{contact && contact.map(elm=>{
                    return <ContactItem elm={elm} key={elm.link} onclick={()=>{this.deleteContact(elm)}}/>
                })}</div>
                <button onClick={this.addBtnClick} className="contact__button">Add new one</button>
                {list && <ul className="contact__collapse">
                    <li   className="contact__collapse-li" onClick={()=>{this.pickItem('facebook')}}>facebook</li>
                    <li  onClick={()=>{this.pickItem('twitter')}} className="contact__collapse-li">twitter</li>
                    <li  onClick={()=>{this.pickItem('instagram')}} className="contact__collapse-li">instagram</li>
                    <li  onClick={()=>{this.pickItem('email')}} className="contact__collapse-li">mail</li>
                    <li  onClick={()=>{this.pickItem('linkedin')}} className="contact__collapse-li">linkedin</li>
                    <li  onClick={()=>{this.pickItem('youtube')}} className="contact__collapse-li">youtube</li>
                    <li  onClick={()=>{this.pickItem('github')}} className="contact__collapse-li">github</li>
                    <li  onClick={()=>{this.pickItem('other')}} className="contact__collapse-li">other</li>
                </ul>}
                {pick && <ContactItem inputFill={this.inputChange} elm={elm} record={pick}  onclick={()=>{this.saveClick(elm)}}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id:state.auth.user.id,
    contact:state.auth.user.contact
})

const mapDispatchToProps =dispatch=> {
    return{
        onDeleteClick:(item,id)=>{dispatch(deleteContactClick(item,id))},
        onSaveClick:(item,id)=>{dispatch(addContactClick(item,id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(contact)
