import React from 'react'

function photoItem({photo,mainPhoto,onDeleteClick,onMainClick}) {
    return (
        <div className='photoItem'>
            <img className='photoItem__img' src={`${photo.downloadUrl}`}alt="user_photo"/>
    
            <div className="photoItem__buttons">
                {(photo.downloadUrl === mainPhoto.downloadUrl) ?
                <span className="photoItem__buttons-span">Profile</span>
                :
                (<div>
                <button onClick={onMainClick} className="photoItem__buttons-main">main</button>
                <button onClick={onDeleteClick} className="photoItem__buttons-delete">delete</button>
                </div>)
                }
            </div>
            
        </div>
    )
}

export default photoItem
