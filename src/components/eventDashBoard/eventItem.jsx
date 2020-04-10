import React from 'react'

function eventItem() {

    let picUrlRandom=()=>{
        let url='https://randomuser.me/api/portraits/med/men/';
        let num=Math.floor((Math.random()*100)+1).toString();
        let result=url+num+'.jpg';
        return result;
    }


    return (
        <div className='event'>
            <h3 className="event__title">title</h3>
            <p className="event__hostname">hostname</p>
            <span className="event__date">01.01.2020</span><span className="event__address">main street</span>
            <div className="event__attendee">
                <img src={picUrlRandom()} alt="attendees" className="event__attendee__img"/>
                <img src={picUrlRandom()} alt="attendees" className="event__attendee__img"/>
                <span className="event__attendee__counter">2</span>
            </div>
            <div className="event__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, voluptatibus.</div>
            <div className="event__button">
            <button className="event__button-item view">view</button><button className="event__button-item update">update</button>
            </div>
        </div>
    )
}

export default eventItem
