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
export const loginFailed=(error)=>{
    return{
        type:'LOGIN_FAILED',
        error:error
    }
}
export const loginButtonClick=(email,password)=>{
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res=>{
            if(res.user.uid !== ' '){
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
      
            }
        }
    )
        .catch(err=>dispatch(loginFailed(err.message)))

    }
}

export const signupClick=()=>{
    return{
        type:'SIGNUP_CLICK'
    }
}
