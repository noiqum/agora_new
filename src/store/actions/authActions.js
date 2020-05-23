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
    return async dispatch => {
       try {
           let user={}
           await firebase.auth().signInWithEmailAndPassword(email,password).then(
                res=>{return user={email:res.user.email,id:res.user.uid}}
           )
           await firebase.firestore().collection('user').doc(user.id).get().then(
               res=>{return user={...user,displayName:res.data().displayName}}
           )
           dispatch(loginSuccess(user))
       } 
       
       catch (error) {
           return dispatch(loginFailed(error.message));
       }

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

export const signupUserSave=(userId,email,displayName,joinDate,gender,birthday)=>{
    return dispatch=>{
        firebase.firestore().collection('user').doc(userId).set({
            displayName:displayName,
            joinDate:joinDate,
            email:email,
            gender:gender,
            birthday:birthday
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
                    const gender=null;
                    const birthday='';
                    dispatch(signupSuccess(userId,email,displayName,joinDate,gender,birthday))
                    dispatch(signupUserSave(userId,email,displayName,joinDate,gender,birthday))
                    
                }
            }
            
        ).then(dispatch(signupFormClick()))
        .catch(err=>dispatch(signupFailed(err.message)))
    }
}