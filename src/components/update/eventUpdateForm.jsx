import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getEventDetail,updateEventToDB} from '../../store/actions/eventActions'
import {validateState} from '../../config/utils'
import toastr from 'react-redux-toastr';

export class eventUpdateForm extends Component {

    state={
            event:
                {
                title:'',
                category:'',
                date:'',
                city:'',
                address:'',
                description:'',
                }
    }

    inputHandler=(e)=>{
        this.setState({
            ...this.state,
            event:{
                ...this.state.event,
                [e.target.name]:e.target.value
            }
        })
    }

    cancelHandler=()=>{
        this.setState({
            event:{
                title:'',
                category:'',
                date:'',
                city:'',
                address:'',
                description:'',
            }
        })
    }
     componentDidMount(){
        this.props.getEventDetail(this.props.id)
        this.setState({
            event:{
                title:this.props.event.title,
                category:this.props.event.category,
                date:this.props.event.date,
                city:this.props.event.city,
                address:this.props.event.address,
                description:this.props.event.description
            }
        })
    }
    
    updateHandler=()=>{
        if(validateState(this.state.event)){
            this.props.onUpdate(this.props.id,this.state.event)
            
        }
        else{
            
            alert('please check the form ,should nt be empty fields')
        }
        

    }
    

    render() {
        const {title,category,date,address,description,city}=this.state.event;
        return (
            <div className='update-form'>
                
                    <label htmlFor="title" className="update-form__title-label">Title</label>
                    <input onChange={this.inputHandler} name='title' value={title} type="text" className="update-form__title-input"/>
                
                
                    <label htmlFor="category" className="update-form__category-label">category</label>
                    <select name="category" id="category" className="update-form__category-selecet" value={category} onChange={this.inputHandler}>
                    <option disabled value="" >please pick a category</option>
                            <option value="education" >education</option>
                            <option value="networking" >networking</option>
                            <option value="cultural" >cultural</option>
                            <option value="language" >language</option>
                            <option value="health" >health</option>
                            <option value="others" >others</option>
                    </select>
                
                
                    <label htmlFor="date" className="update-form__date-label">date</label>
                    <input type="date" className="update-form__date-input" value={date} onChange={this.inputHandler}/>
                
               
                    <label htmlFor="city" className="update-form__city-label">City</label>
                    <input value={city} name='city' type="text" className="update-form__city-input" onChange={this.inputHandler}/>
                
                
                    <label htmlFor="address" className="update-form__address-label">address</label>
                    <input value={address} name="address" onChange={this.inputHandler} type="text" className="update-form__address-input"/>
                
                
                    <label htmlFor="description" className="update-form__description-label">description</label>
                    <input value={description} onChange={this.inputHandler} type="text" className="update-form__description-input"/>
                
                <button  onClick={this.updateHandler}className="update-form__button btn-update">Update</button>
                <button onClick={this.cancelHandler} className="update-form__button btn-cancel">Cancel</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    event:state.update.event
})

const mapDispatchToProps =dispatch=> {
    return{
        getEventDetail:(id)=>{dispatch(getEventDetail(id))},
        onUpdate:(id,event)=>{dispatch(updateEventToDB(id,event))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(eventUpdateForm)
