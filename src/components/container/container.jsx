import React from 'react'
import Aside from '../aside/aside';
import EventDashBoard from '../eventDashBoard/eventDashBoard';

function container() {
    return (
        <div className='container'>
            <EventDashBoard/>
            <Aside/>
        </div>
    )
}

export default container
