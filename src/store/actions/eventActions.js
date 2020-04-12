
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);


 export const createEvent=(event)=>{
    
    return (dispatch)=>{
        firebase.firestore().collection('events').add(event)
        .then(docRef=>{
            console.log(docRef.id)

            dispatch({type:'CREATE_EVENT',event});  
        })
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
                    events_arr.push(doc.data());
                })
                let events={...[...events_arr]}
                console.log(events)
                
              dispatch(getEvents(events))
        }).catch(err=>console.error(err));
         
     }
 }

