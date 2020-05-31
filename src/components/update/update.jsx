import React, { Component } from 'react'
import { connect } from 'react-redux'
import UpdateForm from './eventUpdateForm';

export class update extends Component {
    render() {
        return (
            <div className='update'> 
                <h2>Update Event</h2>
                <UpdateForm id={this.props.match.params.eventid}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(update)
