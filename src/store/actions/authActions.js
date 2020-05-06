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
                        
                        email:userInfo.email,
                        userId:userInfo.uid,
                        people:userInfo.people,
                        events:userInfo.events
                      }  
                      firebase.firestore().collection('user').doc(user.userId).get().then(
                          res=>{
                              return user.displayName=res.data().displayName;
                          }
                      )
                      
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

export const signupFormClick=()=>{
    return  {
        type:'SIGNUP_FORM_CLICK'
    }
}
export const signupSuccess=(userId,email,displayName,joinDate)=>{
    return{
        type:'SIGNUP_SUCCESS',
        userId:userId,
        email:email,
        displayName:displayName,
        joinDate:joinDate
    };
}

export const signupFailed=(err)=>{
    return {
        type:'SIGNUP_FAILED',
        error:err
    }
}
export const errorMsgClose=()=>{
    return{
        type:'ERROR_MSG_CLOSE'
    }
}

export const signupUserSave=(userId,email,displayName,joinDate)=>{
    return dispatch=>{
        firebase.firestore().collection('user').doc(userId).set({
            displayName:displayName,
            joinDate:joinDate,
            email:email,
            
        }).then(
            dispatch(()=>{
                return{
                    type:'SIGNUP_USER_SAVE'
                }
            })
        ).then(
            console.log('signupUserSave')
        )
    }
}

export const onSignupClick=(email,password,displayName)=>{
    return dispatch =>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
            res=>{
                if(res.user.uid){
                    const userId=res.user.uid;
                    const email=res.user.email;
                    const joinDate=new Date().toDateString();
                    dispatch(signupSuccess(userId,email,displayName,joinDate))
                    dispatch(signupUserSave(userId,email,displayName,joinDate))
                    console.log('onSignUpClick')
                }
            }
            
        ).then(dispatch(signupFormClick()))
        .catch(err=>dispatch(signupFailed(err.message)))
    }
}