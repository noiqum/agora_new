
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../config/firebaseConfig';
import {toastr} from 'react-redux-toastr';

firebase.initializeApp(firebaseConfig);


 export const createEvent=(event)=>{
    
    return (dispatch)=>{
        firebase.firestore().collection('events').add(event)
        .then(docRef=>{
            
            
            
            dispatch({type:'CREATE_EVENT',event});  
        })
        .then(
            toastr.success('Success','Event Created !')
        )
        .catch(err=>console.log(err))
       
        
    }

 }

 export const getEvents=(data)=>{

    return {
        type:'GET_EVENTS',
        events:data
    }
 }

 export const initEvents=()=>{
     return dispatch => {
         firebase.firestore().collection('events').get().then(
            snapshot=>{
                let events_arr=[];
                snapshot.docs.forEach(doc=>{
                    let event=doc.data();
                    event['id']=doc.id;
                    events_arr.push(event);
                    
                })
                let events={...[...events_arr]}
                
               
              dispatch(getEvents(events))
        }).catch(err=>console.error(err));
         
     }
 }

 export const joinEventClick=()=>{
     return{
         type:'JOIN_EVENT_CLICK'
     }
 }

//  export const joinEvent=(eventId,userId)=>{
//      return dispatch =>{
         
//         firebase.firestore().collection('events').doc(eventId)
//         .update({"attendee":firebase.firestore.FieldValue.arrayUnion(userId)})
//         .then(
//             firebase.firestore().collection('user').doc(userId)
//             .update({"joinEvent":firebase.firestore.FieldValue.arrayUnion(eventId)})
//         )
       
//         .then(
//             dispatch(joinEventClick())
//         )
//         .catch(err=>console.log(err))
        
//      }
//  }
export const joinEventClickStart=()=>{
    return{
        type:'JOIN_EVENT_CLICK_START'
    }
} 
export const joinEventClickFinish=()=>{
    return {
        type:'JOIN_EVENT_CLICK_FINISH'
    }
}



 export const joinEvent =(eventId,userId)=>{
        return async dispatch =>{
            try{
                dispatch(joinEventClickStart());
                
                await firebase.firestore().collection('events').doc(eventId)
                 .update({"attendee":firebase.firestore.FieldValue.arrayUnion(userId)});
                await firebase.firestore().collection('user').doc(userId)
                .update({"joinEvent":firebase.firestore.FieldValue.arrayUnion(eventId)});

                toastr.success('Great!!!','You joined the Event');

                dispatch(joinEventClickFinish());
            }
            catch (error){
                console.log(error);
            }
        }
 }

 export const cancelJoin=()=>{
     return{
         type:'CANCEL_JOIN'
     }
 }

 export const onCancelClick=(eventId,userId)=>{
        return dispatch =>{
            firebase.firestore().collection('events').doc(eventId)
            .update({"attendee":firebase.firestore.FieldValue.arrayRemove(userId)})
            .then(firebase.firestore().collection('user').doc(userId)
            .update({"joinEvent":firebase.firestore.FieldValue.arrayRemove(eventId)}))
            .then(
                toastr.success('Okay','Just Canceled to Join the Event!')
            )
            .then(
                
                dispatch(cancelJoin())
            )
            .catch(err=>{console.log(err)})
        }
 }

 export const getAttendeeToStore=(attendee)=>{
     return{
         type:'GET_ATTENDEE_TO_STORE',
         attendee:attendee
     }
 }

 export const getAttendee=(attendeeId)=>{
        return async dispatch =>{
            try{
                let attendee;
                await firebase.firestore().collection('user').doc(attendeeId)
                .get().then(
                    res=>{
                        attendee=res.data()
                    }
                )
                console.log(attendee)
                dispatch(getAttendeeToStore(attendee))
            }
            catch (err){
                console.log(err)
            }
        }
 }
