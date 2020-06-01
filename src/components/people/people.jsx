import React, { Component } from 'react'
import { connect } from 'react-redux'

export class people extends Component {
    render() {
        const{id}=this.props.location.query;
        return (
            <div className='people'>
                <h2>people you follow</h2>
                <h2>people who follow you</h2>
                <h2>people mutual interest</h2>
        <p>{id}</p>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(people)
