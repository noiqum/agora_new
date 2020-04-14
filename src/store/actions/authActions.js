import firebase from 'firebase/app';

export const loginModal =(click)=>{
    return{
        type:'LOGIN',
        click:click
    }
}
export const logout=()=>{
    return{
        type:'LOGOUT'
    }
}
export const loginSuccess=(user)=>{
    return{
        type:'LOGIN_SUCCESS',
        user:user
    }
}
export const loginButtonClick=(email,password)=>{
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            firebase.auth().onAuthStateChanged((userInfo)=>{
              const user={
                  displayName:userInfo.displayName,
                  email:userInfo.email,
                  userId:userInfo.uid,
                  people:userInfo.people,
                  events:userInfo.events
                }  

                dispatch(loginSuccess(user))
            })

           
            
            
        )
        .catch(err=>console.log(err))

    }
}
