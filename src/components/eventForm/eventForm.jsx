import React, { Component } from 'react';
import { connect} from 'react-redux';
import { createEvent} from '../../store/actions/eventActions';
// import AutoComplete from './autoComplete';





export class eventForm extends Component {

    
        state={
            title:'',
            category:'',
            date:'',
            city:'',
            address:'',
            description:'',
            hostName:'',
            hostUserId:'',
            attendee:[]
        }
        
        handleInfo=(e)=>{
            this.setState({
               
                [e.target.name]:e.target.value,
                hostName:this.props.displayName,
                hostUserId:this.props.userId,
            })
        }

        handleForm=(e)=>{
            e.preventDefault();
           
            this.props.createEvent(this.state)
        }

        
       
        

    render() {
        return (
            
            <div className='eventform' >
                
                <form className='eventform__form'>
                    <div className="eventform__title__div">
    
                    <label htmlFor="title" className="eventform__title-label">title</label>
                    <input  onChange={this.handleInfo}name='title' type="text" className="eventform__title"/>
    
                    </div>
                    
                    <div className="eventform__category__div">
                        <label htmlFor="category" className="eventform__category-label">Category</label>
                        <select  onChange={this.handleInfo} name="category"  className="eventfrom__category">
                            <option value="please pick a category" className='event__category__option'>please pick a category</option>
                            <option value="education" className="event__category__option">education</option>
                            <option value="networking" className="event__category__option">networking</option>
                            <option value="cultural" className="event__category__option">cultural</option>
                            <option value="language" className="event__category__option">language</option>
                            <option value="health" className="event__category__option">health</option>
                            <option value="others" className="event__category__option">others</option>
                        </select>
                    </div>
                    <div className="eventform__date__div">
                        <label htmlFor="date" className="eventform__date-label">Date</label>
                        <input onChange={this.handleInfo} type="date" className="eventform__date" name='date'/>
                    </div>
                    <div className="eventform__city__div">
                        <label htmlFor="city" className="eventform__address-label">City</label> 
                        <input onChange={this.handleInfo} name='city'type="text" className="eventform__category__address"/>
                        
                    </div>

                    <div className="eventform__address__div">
                        <label htmlFor="address" className="eventform__address-label">Address</label>
                        <input onChange={this.handleInfo} name='address'type="text" className="eventform__category__address"/>
                    </div>
                   
                    <div className="eventform__description__div">
                        <label htmlFor="description" className="eventform__description-label">Description</label>
                        <input onChange={this.handleInfo} name='description' type="text" className="eventform__description"/>
                    </div>
    
                    <div className="eventform__button__div">
                        <button onClick={this.handleForm} className="eventform__button">submit</button>
                        <button onClick={this.props.onCancelClick}className="eventform__button">cancel</button>
                    </div>
                   
                </form>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        createEvent:(event)=>dispatch(createEvent(event))
    }
}
const mapStateToProps=state=>{
    return{
        userId:state.auth.user.userId,
        displayName:state.auth.user.displayName
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (eventForm);


