import React from 'react'
import {ReactComponent as Facebook} from './svg/facebook.svg'
import {ReactComponent as Github} from './svg/github.svg'
import {ReactComponent as Linkedin} from './svg/linkedin.svg'
import {ReactComponent as Twitter} from './svg/twitter.svg'
import {ReactComponent as Email} from './svg/email.svg'
import {ReactComponent as Youtube} from './svg/youtube.svg'
import {ReactComponent as Instagram} from './svg/instagram.svg'
import {ReactComponent as Bin} from './svg/bin.svg'
import {ReactComponent as Check} from './svg/check.svg'
import {ReactComponent as Pencil} from './svg/pencil.svg'




function contactItem({elm,onclick,record,inputFill}) {



    const item=(icon,link)=>{
    return <div className="contact-item">{icon}
    <input onChange={inputFill} id='contact-item__input' className='contact-item__input' value={link}></input>
    <div onClick={onclick} className="contact-item__bin">{!record && <Bin/>}{record && <Check/>}</div>
    </div>
    }

    const decide=()=>{
        switch (elm.type) {
            case 'facebook': 
                return item(<Facebook/>,elm.link)
            case 'github':
                return item(<Github/>,elm.link)
            case 'twitter':
                return item(<Twitter/>,elm.link)
            case 'instagram':
                return item(<Instagram/>,elm.link)
            case 'linkedin':
                return item(<Linkedin/>,elm.link)
            case 'email':
                return item(<Email/>,elm.link)
            case 'youtube':
                return item(<Youtube/>,elm.link)
            case 'other':
                return item(<Pencil/>,elm.link)
            default:
                break;
        }
    }


    return (
        <div className='contact-item__container'>
            {decide(elm)}
        </div>
    )
}

export default contactItem
