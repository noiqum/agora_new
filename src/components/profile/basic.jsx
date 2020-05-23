import React ,{Component}from 'react'
import {connect} from 'react-redux';
import {updateProfile} from '../../store/actions/profileActions'
export class basic extends Component{

    state={
        name:'',
        gender:null,
        birthday:''
    }

    componentDidMount(){
        if(this.state.name === ''){
            this.setState({
                name:this.props.name
            })
        }
        else{
            return null
        }
    }
    nameHandler=(e)=>{
        return this.setState({
            name:e.target.value
        })
    }
    genderHandle=(e)=>{
        return this.setState({
            gender:e.target.value
        })
    }
    birthdayHandle=(e)=>{
        return this.setState({
            birthday:e.target.value
        })
    }

    updateHandle=()=>{
        this.props.onUpdate(this.state,this.props.id)
    }
    render(){
        const {name,birthday}=this.state;
        return (
            <div className='basic'>
                <h2>Basic Information</h2>
                <div className="basic__displayname">
    
                    <label htmlFor="basic-displayname">Name :</label>
                    <input value={name} id='basic-displayname'
                    type="text" className="basic__displayname-input" 
                    placeholder='Known as...'
                    onChange={this.nameHandler}
                    />
                    
                </div>
                <div className="basic__gender">
                    <input type="radio" name='gender' id='male' 
                    value='male' className="basic__gender-input" 
                    onClick={this.genderHandle}
                    />
                    <label htmlFor="male" className="basic__gender-label">Male</label>

                    <input type="radio" name='gender' id='female'
                     value='female'className="basic__gender-input"
                     onClick={this.genderHandle}
                     />
                    <label htmlFor="female" className="basic__gender-label">female</label>

                    <input type="radio" name='gender' id='whocares'
                    value='who cares?' className="basic__gender-input"
                    onClick={this.genderHandle}
                    />
                    <label htmlFor="whocares" className="basic__gender-label">Who cares ?</label>
                </div>
                <div className="basic__birthday">
                    <label htmlFor="basic-birthday">Birthday :</label>
                    <input id='basic-birthday'type="date" 
                    className="basic__birthday-input" value={birthday}
                    onChange={this.birthdayHandle}/>
                </div>
                <button onClick={this.updateHandle} className="basic__button">Update</button>
            </div>
        )
    }
    
}
const mapState=state=>{
    return{
        name:state.auth.user.displayName,
        id:state.auth.user.id
    }
}
const mapDispatch=dispatch=>{
    return{
        onUpdate:(basicData,id)=>{dispatch(updateProfile(basicData,id))}
    }
}
export default connect(mapState,mapDispatch)(basic)
