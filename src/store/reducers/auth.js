const initialstate={
    user:{
        id:'',
        displayName:'',
        email:'',
        people:[],
        events:[],
        photos:[],
        profilePhoto:'',
        birthday:'',
        bio:'',
        job:'',
        interest:[]
    },
    login:false,
    signup:false,
    error:null,
    loginForm:false,
    signupProcess:false,
    signupError:null
};


const authReducer =(state=initialstate,action)=>{

    switch (action.type) {
        
          case 'LOGIN_SUCCESS':
            return{
                ...state,
                user:{
                    ...state.user,
                    displayName:action.user.displayName,
                    email:action.user.email,
                    id:action.user.id,
                    photos:action.user.photos,
                    people:action.user.people,
                    events:action.user.events,
                    joinDate:action.user.joinDate,
                    hostEvents:action.user.hostEvents,
                    profilePhoto:action.user.profilePhoto,
                    birthday:action.user.birthday,
                    bio:action.user.bio,
                    job:action.user.job,
                    interest:action.user.interest
                },
                login:true,
                error:null,
                signupProcess:false
                }
        case 'LOGOUT':
            return{
                ...state,
                login:false,
                signup:false,
                signupProcess:false
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                login:false,
                error:action.error
            };
        case 'SIGNUP_CLICK':
            return{
                ...state,
               
                signup:true
            };
        case 'LOGIN':
            return{
                ...state,
                signup:false,
                loginForm:true
            }

        case 'SIGNUP_FORM_CLICK':
            return{
                ...state,
            
            }
        case 'SIGNUP_SUCCESS':
            return{
                ...state,
                signupProcess:true
            }
        case 'SIGNUP_FAILED':
            return{
                ...state,
                signupProcess:false,
                signupError:action.error
            }
        case 'ERROR_MSG_CLOSE':
            return{
                ...state,
                signupError:null,
                error:null
            }
        case '  UPDATE_DISPLAYNAME':
            return {
                ...state,
                user:{
                    ...state.user,
                    displayName:action.newName
                }
                
            }
        case 'UPDATE_USER_PHOTO' :
            return {
                ...state,
                user:{
                    ...state.user,
                    photos:state.user.photos.concat(action.photoObj)
                }
            }
        case 'MAIN_PHOTO_UPDATE':
            return {
                ...state,
                user:{
                    ...state.user,
                    profilePhoto:action.photo
                }
            }
        case 'DELETE_USER_PHOTO':
            return{
                ...state,
                user:{
                    ...state.user,
                    photos:state.user.photos.filter(elm=>{
                        return elm !== action.photo
                    })
                }
            }
        case 'UPDATE_ABOUT_ME_BIO':
            return{
                ...state,
                user:{
                    ...state.user,
                    bio:action.bio
                }
            }
        case 'UPDATE_ABOUT_ME_JOB':
            return {
                ...state,
                user:{
                    ...state.user,
                    job:action.job
                }
            }
        case 'UPDATE_ABOUT_ME_INTEREST':
            return {
                ...state,
                user:{
                    ...state.user,
                    interest:state.user.interest.concat(action.interest)
                }
            }
        default:
            return state;
    }


    
};


export default authReducer;